/* ----------------------------------------------------------------------------
// src\runtime\utils\tv.ts
// ----------------------------------------------------------------------------
// [ src > runtime > utils > * ]
import {} from '~/src/runtime/utils/tv';
----------------------------------------------------------------------------- */

import { createTV, type defaultConfig } from 'tailwind-variants';
import type { AppConfig } from '@nuxt/schema';
import _appConfig from '#build/app.config';

const appConfig = _appConfig as AppConfig & {
  tv: typeof defaultConfig;
};
// console.log(appConfig.tv);
// export const tv = createTV(pConfig?.tv || {});
export const tv = createTV(appConfig.tv || {});

// export const TvTheme = tv({
//   variants: {
//     // theme: {
//     // main0: '',
//     // main1: '',
//     // main2: '',
//     // main3: '',
//     // accent1: '',
//     // accent2: '',
//     // info: '',
//     // link: '',
//     // download: '',
//     // success: '',
//     // warn: '',
//     // error: '',
//     // white: '',
//     // black: '',
//     // dark: '',
//     // back: '',
//     // },
//   },
// });
