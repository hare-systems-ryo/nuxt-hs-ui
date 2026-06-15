/* ----------------------------------------------------------------------------
// src\module.ts
// ----------------------------------------------------------------------------
// [ src > * ]
import {} from '~/src/module';
----------------------------------------------------------------------------- */

import { AddTheme } from './module-lib/theme';
import { AddCss } from './module-lib/css';

import {
  defineNuxtModule, //
  createResolver,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit';

export interface ModuleOptions {
  prefix: {
    form: string;
    interactive: string;
    layout: string;
    misc: string;
  };
  theme: Record<string, string>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
    dependencies: [
      '@nuxt/ui', //
      // '@vueuse/nuxt',
      // '@pinia/nuxt',
      // 'pinia-plugin-persistedstate/nuxt',
    ],
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: {
      form: '',
      interactive: '',
      layout: '',
      misc: '',
    },
    theme: {
      main0: '#183C5E',
      main1: '#2C5A85',
      main2: '#487CB4',
      main3: '#A7CDED',
      main4: '#C4E1FF',
      accent1: '#FF6600',
      accent2: '#FFAC7C',
      info: '#2BABB5',
      link: '#6200EE',
      download: '#11691F',
      success: '#2BB60C',
      warn: '#EAB000',
      error: '#D80329',
      dark: '#224466',
      back1: '#EDF2F7',
      back2: '#AABED1',
      white: '#FFFFFF',
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    // -------------------------
    AddTheme(options.theme);
    // -------------------------

    addComponentsDir({
      path: resolve('runtime/components/form'),
      prefix: options.prefix.form,
      pattern: '**/*.vue',
      ignore: [
        '**/_*/**', // 深さ問わず、"_xxx" という名前のフォルダ配下を全部除外
        '**/*/_**', // 深さ問わず、"_xxx" という名前のフォルダ配下を全部除外
      ],
    });
    addComponentsDir({
      path: resolve('runtime/components/layout'),
      prefix: options.prefix.layout,
    });
    addComponentsDir({
      path: resolve('runtime/components/misc'),
      prefix: options.prefix.misc,
    });
    addComponentsDir({
      path: resolve('runtime/components/interactive'),
      prefix: options.prefix.interactive,
    });
    // -------------------------
    addImportsDir(resolve('runtime/composables'));
    // -------------------------
    AddCss(nuxt, resolve, { mode: 'bundle' });
    // -------------------------
  },
});
