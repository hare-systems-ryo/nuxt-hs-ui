import twConfig from '../tailwind.config';
export default defineNuxtConfig({
  modules: [
    //
    ['../src/module', twConfig],
    ['@nuxtjs/tailwindcss', twConfig],
    '@pinia/nuxt',
  ],
  // myModule: {},
  devtools: { enabled: true },
  devServer: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost,
  },
  css: ['./assets/scss/main.scss'],
});
