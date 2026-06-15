/* ----------------------------------------------------------------------------
// src\module-lib\css.ts
// ----------------------------------------------------------------------------
// [ src > module-lib > * ]
import {} from '~/src/module-lib/css';
----------------------------------------------------------------------------- */
import type { Nuxt } from '@nuxt/schema';

// import { addTemplate } from '@nuxt/kit';

type CssMode = 'bundle' | 'link' | 'none';

export const AddCss = (
  nuxt: Nuxt,
  resolve: (...path: string[]) => string,
  {
    // moduleName = 'nuxt-hs-ui',
    mode = 'bundle', // ← 今はここを固定で使う（将来オプション化）
    files = [
      'flatpickr-dark.css',
      'flatpickr-month-select-style.css',
      'tabulator.css',
      'tabulator-custom.css',
      // // 'vue-select.css',
      'main.css',
    ],
  }: {
    moduleName?: string;
    mode?: CssMode;
    files?: readonly string[];
  } = {}
) => {
  if (mode === 'none') return;
  if (mode === 'bundle') {
    for (const name of files) {
      const ref = resolve(`./runtime/assets/${name}`);
      if (!nuxt.options.css.includes(ref)) {
        nuxt.options.css.push(ref);
      }
    }
  }
  // const builtPaths: string[] = [];
  // for (const name of files) {
  //   const tpl = addTemplate({
  //     filename: `${moduleName}/styles/${name}`, // => .nuxt/#build/...
  //     src: resolve(`./runtime/assets/${name}`),
  //   });
  //   builtPaths.push(tpl.filename);
  // }
  // if (mode === 'bundle') {
  //   // バンドルに混ぜる（HMR/順序管理が楽）
  //   for (const p of builtPaths) {
  //     const ref = `#build/${p}`;
  //     // 重複防止（プロジェクト側から同じCSSを読んでも二重にならないように）
  //     if (!nuxt.options.css.includes(ref)) nuxt.options.css.push(ref);
  //   }
  // } else if (mode === 'link') {
  //   // <head> に<link>追加（将来 public 配布に切り替えたい時の雛形）
  //   // ひとまず _nuxt 配下の生成物を直リンク（本番は public/ に置き換え推奨）
  //   // nuxt.hook('app:resolve', (app) => {
  //   //   app.head ||= {};
  //   //   app.head.link ||= [];
  //   //   for (const p of builtPaths) {
  //   //     app.head.link.push({ rel: 'stylesheet', href: `/_nuxt/${p}` });
  //   //   }
  //   // });
  // }
};
