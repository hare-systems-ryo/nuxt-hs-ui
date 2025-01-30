import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
  installModule,
  addPlugin,
} from "@nuxt/kit";
import { defu } from "defu";
type Config = any;
const defaultTwConfig = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      400: "400px",
      600: "600px",
      sm: "640px",
      md: "768px",
      800: "800px",
      1000: "1000px",
      lg: "1024px",
      1200: "1200px",
      xl: "1280px",
      1400: "1400px",
      "2xl": "1536px",
      1600: "1600px",
      1800: "1800px",
    },
    extend: {
      colors: {
        main0: "#192a61",
        main1: "#1c03a2",
        main2: "#4443ff",
        main3: "#628cff",
        accent1: "#ff8000",
        accent2: "#ffac7c",
        info: "#2badd5",
        link: "#6200EE",
        download: "#11691f",
        success: "#2bb60c",
        warn: "#EAB000",
        error: "#d80329",
        white: "#FFFFFF",
        black: "#000000",
        dark: "#224466",
        back: "#EDF2F7",
      },
    },
  },
} as const;

export interface ModuleOptions {
  prefix: {
    nuxtUi: string;
    form: string;
    interactive: string;
    layout: string;
    misc: string;
  };
  tailwind?: Partial<Config>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-hs-ui",
    configKey: "hsui",
    compatibility: {
      nuxt: ">=3.15.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: {
      nuxtUi: "",
      form: "",
      interactive: "",
      layout: "",
      misc: "",
    },
    tailwind: {},
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    const resolve = resolver.resolve;
    const runtimeDir = resolve("./runtime");
    const isDevelopment =
      runtimeDir.endsWith("src/runtime") || runtimeDir.endsWith("src\\runtime");
    const extension = isDevelopment ? "scss" : "css";
    // ----------------------------------------------------------------------------
    const twReqConfig = {
      content: {
        files: [
          //
          resolve("./runtime/components/**/*.{vue,mjs,ts}"),
          resolve("./runtime/**/*.{mjs,js,ts}"),
        ],
      },
    };
    const twConfig = defu(
      twReqConfig,
      defu(_options.tailwind, defaultTwConfig)
    );
    // ----------------------------------------------------------------------------
    // runtime config
    // console.log(_nuxt.options.appConfig.ui);
    // _nuxt.options.appConfig.ui = {
    //   colors: twConfig.theme.extend.colors,
    // };
    const pConfig = _nuxt.options.runtimeConfig.public;
    pConfig.hsui = {
      colors: twConfig.theme.extend.colors,
    };
    _nuxt.options.appConfig.tv = {
      twMerge: true,
      twMergeConfig: {
        theme: twConfig.theme,
      },
    };
    // ----------------------------------------------------------------------------
    addImportsDir(resolve("runtime/composables"));
    // ----------------------------------------------------------------------------
    addComponentsDir({
      path: resolve("runtime/components/form"),
      prefix: _options.prefix.form,
    });
    addComponentsDir({
      path: resolve("runtime/components/interactive"),
      prefix: _options.prefix.interactive,
    });
    addComponentsDir({
      path: resolve("runtime/components/layout"),
      prefix: _options.prefix.layout,
    });
    addComponentsDir({
      path: resolve("runtime/components/misc"),
      prefix: _options.prefix.misc,
    });
    // addComponentsDir({
    //   path: resolve("runtime/components/ui"),
    //   prefix: _options.prefix.form,
    //   // pathPrefix: false,
    // });
    // ----------------------------------------------------------------------------
    _nuxt.options.css.push(resolve("runtime/style." + extension));
    _nuxt.options.css.push(resolve("runtime/tailwind." + extension));
    _nuxt.options.css.push(resolve("runtime/assets/flatpickr-dark.css"));
    _nuxt.options.css.push(
      resolve("runtime/assets/flatpickr-month-select-style.css")
    );
    _nuxt.options.css.push(resolve("runtime/assets/vue-select.css"));
    _nuxt.options.css.push(resolve("runtime/assets/tabulator.css"));
    _nuxt.options.css.push(resolve("runtime/assets/tabulator-custom.css"));
    // ----------------------------------------------------------------------------
    // console.log(twConfig);
    // console.log(JSON.stringify({ twConfig: twConfig }, null, 3));
    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: twConfig,
    });
    await installModule("@pinia/nuxt", { disableVuex: true });
    await installModule("@vueuse/nuxt");
    // await installModule("@nuxt/ui");
    // await installModule("@nuxt/ui");

    addPlugin(resolve("runtime/plugin/v-select"));
  },
});
