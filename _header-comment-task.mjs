/* ----------------------------------------------------------------------------
// _task.mjs
// ----------------------------------------------------------------------------
// [ _task.mjs ]
import {} from '~/_task.mjs';
----------------------------------------------------------------------------- */

import path from 'node:path';
import fs from 'node:fs';

// ----------------------------------------------------------------------------

const dir = [
  '../src/', //
  '../playground/app', //
  '../playground/server', //
];

// ----------------------------------------------------------------------------
const __dirname = import.meta.filename;
const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const listFiles = (dirPath) => {
  const files = [];
  const paths = fs.readdirSync(dirPath);
  for (const name of paths) {
    try {
      const path = `${dirPath}/${name}`;
      const stat = fs.statSync(path);
      switch (true) {
        case stat.isFile():
          files.push(path);
          break;
        case stat.isDirectory():
          files.push(...listFiles(path));
          break;
        default:
      }
    } catch (err) {
      console.error('error:', err.message);
    }
  }
  return files;
};
// ----------------------------------------------------------------------------
let updateCounter = 0;
const excludePath = [
  'server/tsconfig.json', //
];
const fileCheck = (path) => {
  const rPath = path.replace(__dirname.replace('_header-comment-task.mjs', ''), '');
  // console.log('対象ファイル：vue  :: vueComponents', rPath);
  if (excludePath.includes(rPath)) return;
  if (!/\.ts$|\.vue$/.test(rPath)) {
    //  console.info('対象外以外', rPath);
    // console.log('対象外以外', rPath);
    return;
  }
  const state = {
    textBefore: fs.readFileSync(path, { encoding: 'utf-8' }),
    textAfter: '',
  };
  // console.log(rPath);
  if (rPath.endsWith('.ts')) {
    state.textAfter = tsNormal(rPath, state.textBefore);
  } else if (rPath.endsWith('.vue') && rPath.startsWith('src')) {
    state.textAfter = vueComponentsRuntime(rPath, state.textBefore);
  } else if (rPath.endsWith('.vue') && rPath.startsWith('playground')) {
    state.textAfter = vueComponentsPlayground(rPath, state.textBefore);
  } else {
    // console.info('対象外以外', rPath);
    return;
  }
  const fileName = rPath.split('/').filter((row, index, list) => list.length === index + 1)[0] || '';
  state.textAfter = state.textAfter
    .replace(/\r\n/g, '\n')
    .replace(/^\/\/ *const ctRoot = `[^$].*`;/m, `// const ctRoot = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(/^const ctRoot = `[^$].*`;/m, `const ctRoot = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(/^\/\/ *export const ctRoot = `[^$].*`;/m, `// export const ctRoot = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(/^export const ctRoot = `[^$].*`;/m, `export const ctRoot = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(/^const ct = `[^$].*`;/m, `const ct = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(/^\/\/ *const ct = `[^$].*`;/m, `// const ct = \`${rPath.replace(/\//g, ':')}\`;`)
    .replace(
      /^const ctRoot = `[^$].*`;/m,
      `const ctRoot = \`${rPath.replace(/\//g, ':').replace(/\/.*(?:\.ts|\.vue)/g, '')}\`;`
    )
    .replace(/^const ct = `\$\{ctRoot\}.*/m, `const ct = \`$\{ctRoot}${fileName}\`;`);

  if (state.textAfter.length !== 0 && state.textBefore !== state.textAfter) {
    updateCounter++;
    console.info(`Update : ${rPath}`);
    fs.writeFileSync(path, state.textAfter, { encoding: 'utf8' });
  }
};

// ----------------------------------------------------------------------------

const tsNormal = (rPath, textBefore) => {
  const breadcrumb =
    rPath
      .split('/')
      .filter((row, index, list) => {
        return list.length !== index + 1;
      })
      .join(' > ') || '';

  const header = `/* ----------------------------------------------------------------------------
// ${rPath.replace(/\//g, '\\')}
// ----------------------------------------------------------------------------
// [ ${breadcrumb} > * ]
import {} from '~/${rPath.replace(/\.ts/, '')}';
----------------------------------------------------------------------------- */`;
  const after = textBefore.replace(/^\s*\/\*[\s\S]*?\*\//, header);
  return after;
};

const vueComponentsPlayground = (rPath, textBefore) => {
  const ComponentName =
    rPath
      .replace(/\/index\.vue$/g, '')
      .replace(/\//g, '-')
      .split('-')
      .filter((row, index) => index !== 0)
      .map((row) => row.replace(/\.vue$/, ''))
      .map((row) => capitalizeFirst(row))
      .join('')
      .replace(/^Components/, '') || '';

  const header = `/* ----------------------------------------------------------------------------
// ${rPath.replace(/\//g, '\\')}
// ----------------------------------------------------------------------------
// ${ComponentName}
// ${ComponentName}${ComponentName}
---------------------------------------------------------------------------- */`;
  return textBefore.replace(/^(.*\n)\s*\/\*[\s\S]*?\*\//, '$1' + header);
};

const vueComponentsRuntime = (rPath, textBefore) => {
  console.log(rPath);
  const ComponentName =
    rPath
      .replace(/\/index\.vue$/g, '')
      .replace(/\//g, '-')
      .split('-')
      .filter((row, index) => index !== 0)
      .map((row) => row.replace(/\.vue$/, ''))
      .map((row) => capitalizeFirst(row))
      .join('')
      .replace(/^RuntimeComponents(Form|Interactive|Layout|Misc)/, '') || '';

  const header = `/* ----------------------------------------------------------------------------
// ${rPath.replace(/\//g, '\\')}
// ----------------------------------------------------------------------------
// ${ComponentName}
// ${ComponentName}${ComponentName}
---------------------------------------------------------------------------- */`;
  return textBefore.replace(/^(.*\n)\s*\/\*[\s\S]*?\*\//, '$1' + header);
};

// ----------------------------------------------------------------------------
let totalCount = 0;
const taskComment = () => {
  console.info('[File Comment Check] Run');
  console.info(
    dir
      .map((row, index, list) => `${index + 1 === list.length ? '  └ ' : '  ├ '}${row.replace(/^\.\./, '')}`)
      .join('\n')
  );
  console.info('');
  const count = dir.length;
  for (let i = 0; i < count; i++) {
    const p = path.resolve(__dirname, dir[i]);
    const list = listFiles(p);
    list.forEach((filePath) => {
      fileCheck(filePath);
      totalCount++;
    });
  }
  console.info('');
  console.info(`[File Comment Check] Fin.  ${updateCounter}/${totalCount}`);
  console.info('');
};
taskComment();
