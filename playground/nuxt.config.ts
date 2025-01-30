import twConfig from "../tailwind.config";
export default defineNuxtConfig({
  experimental: {
    appManifest: false,
  },
  modules: [
    //
    [
      "../src/module",
      {
        tailwind: twConfig,
        prefix: {
          nuxtUi: "",
          form: "",
          interactive: "",
          layout: "",
        },
      },
    ],
    // ["@nuxtjs/tailwindcss", { config: twConfig, exposeConfig: true }],
    "@pinia/nuxt",
  ],
  // myModule: {},
  devServer: {
    port: 8888, // デフォルト: 3000
    host: "0.0.0.0", // デフォルト: localhost,
  },
  css: ["./assets/main.scss"],
  devtools: { enabled: true },
  compatibilityDate: "2025-01-16",
});
