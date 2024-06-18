/* ----------------------------------------------------------------------------
src\runtime\lib\theme.ts
// ----------------------------------------------------------------------------
// [ src > runtime > lib > * ]
import {} from '~/src/runtime/lib/theme';
----------------------------------------------------------------------------- */

export const Theme = [
  //
  'main0',
  'main1',
  'main2',
  'main3',
  'accent1',
  'accent2',
  //
  'info',
  'link',
  'download',
  'success',
  'warn',
  'error',
  //
  'white',
  'black',
  'dark',
  'back',
] as const;

export type Theme = (typeof Theme)[number];
