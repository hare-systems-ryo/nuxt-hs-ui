import {
  //
  defineNuxtModule,
  addPlugin,
  installModule,
  addImportsDir,
  createResolver,
  addComponentsDir,
} from '@nuxt/kit';
import twConfig from '../tailwind.config';
import { defu } from 'defu';

// Module options TypeScript interface definition
export interface ModuleOptions {
  prefix: 'tw-' | '';
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-hs-ui',
    configKey: 'hsui',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: '',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.public.hsui = defu((nuxt.options.runtimeConfig.public as any).hsui, {
      prefix: options.prefix || '',
    });
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolve('runtime/plugin'));
    addComponentsDir({
      path: resolve('runtime/components'),
    });
    addImportsDir(resolve('runtime/composables'));
    nuxt.options.css.push(resolve('runtime/style.css'));
    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      exposeConfig: true,
      config: {
        ...twConfig,
        ...options,
        content: {
          files: [
            //
            resolve('./runtime/components/**/*.{vue,mjs,ts}'),
            resolve('./runtime/*.{mjs,js,ts}'),
          ],
        },
      },
    });
    await installModule('@pinia/nuxt');
  },
});
