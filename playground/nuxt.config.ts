// import { defaultTwConfig } from '../src/tailwind-config';
export default defineNuxtConfig({
  compatibilityDate: '2026-10-12',
  colorMode: {
    preference: 'light', // デフォルトをlightに固定
    fallback: 'light', // SSR時のフォールバック
    classSuffix: '', // 'dark-mode'ではなく'dark'クラスを使う
    storage: 'cookie',
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
          main0: '#183C5E',
          main1: '#2C5A85',
          main2: '#487CB4',
          main3: '#A7CDED',
          main4: '#C4E1FF',
          accent1: '#FF6600',
          accent2: '#FFAC7C',
          info: '#2BABB5',
          success: '#2BB60C',
          warn: '#EAB000',
          error: '#D80329',
          link: '#6200EE',
          download: '#11691F',
          dark: '#224466',
          back0: '#FFFFFF',
          back1: '#DCE1E8',
          back2: '#BAC3D1',
          back3: '#97A5BA',
          back4: '7487A3',
        },
      },
    ],
  ],
  css: ['~~/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 8888,
  },
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: [
        '@internationalized/date',
        'bignumber.js',
        'body-scroll-lock',
        'dayjs/esm/index',
        'dayjs/esm/locale/en.js',
        'dayjs/esm/locale/ja.js',
        'dayjs/esm/plugin/advancedFormat',
        'dayjs/esm/plugin/timezone',
        'dayjs/esm/plugin/utc',
        'tailwind-merge',
        'tailwind-variants',
      ],
    },
  },
});
