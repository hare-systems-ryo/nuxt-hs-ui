# nuxt-hs-ui

.......
 

## Installation

```sh
npm i nuxt-hs-ui
```

### Nuxt

```ts
import twConfig from "./tailwind.config";
export default defineNuxtConfig({
  modules: [
    //
    [
      "nuxt-hs-ui",
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
  ],
});
```
