/* ----------------------------------------------------------------------------
// src\module-lib\theme.ts
// ----------------------------------------------------------------------------
// [ src > module-lib > * ]
import {} from '~/src/module-lib/theme';
----------------------------------------------------------------------------- */

import { addTemplate } from '@nuxt/kit';
export const AddTheme = (theme: Record<string, string>) => {
  const themeColor = JSON.stringify(theme, null, 2);
  const themekey = Object.keys(theme || {});
  const Theme = themekey.reduce((ret, key) => {
    ret[key] = key;
    return ret;
  }, {} as Record<string, string>);

  addTemplate({
    filename: 'nuxt-hs-ui-next/runtime/theme.mjs',
    getContents: () => `
export const Theme = ${JSON.stringify(Theme, null, 2)};
const themeColor = ${themeColor};
export function GetColorCode(key){
  return themeColor[key] ?? '#000000';
}
`,
  });
  addTemplate({
    filename: 'nuxt-hs-ui-next/types/theme.d.ts',
    getContents: () => {
      const union = themekey.length ? themekey.map((k) => `'${k}'`).join(' | ') : 'never';
      return `
declare module '#build/nuxt-hs-ui-next/runtime/theme' {
  export type ThemeColor = ${union};
  export const Theme: Record<ThemeColor, ThemeColor>;
  export function GetColorCode(key: ThemeColor): string;
}
declare module '#build/nuxt-hs-ui-next/runtime/theme-internal' {
  export function GetColorCode(key: string): string;
}
export type ThemeColor = ${union};
 const theme = ${JSON.stringify(Theme, null, 2)
   .replace(/"(\w*)":/g, '$1:')
   .replace(/"/g, "'")};
export type Theme =typeof  theme
export {}
`;
    },
  });
};
