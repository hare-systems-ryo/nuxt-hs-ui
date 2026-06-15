// import { defaultTwConfig } from '../src/tailwind-config';
export default defineNuxtConfig({
  colorMode: {
    preference: 'light', // デフォルトをlightに固定
    fallback: 'light', // SSR時のフォールバック
    classSuffix: '', // 'dark-mode'ではなく'dark'クラスを使う
    storageKey: 'nuxt-color-mode',
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    [
      '../src/module',
      {
        theme: {
          //
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
          back: '#EDF2F7',
          back2: '#AABED1',
          white: '#FFFFFF',
        },
      },
    ],
  ],
  css: ['../main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 8888,
  },
  devtools: { enabled: true },
});
