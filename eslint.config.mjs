// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ['./playground'],
  },
})
  .append
  // your custom flat config here...
  ()
  .override('nuxt/typescript', {
    rules: {
      // ...Override rules, for example:
      // '@typescript-eslint/ban-types': 'off',
      semi: ['error', 'always'],
      'semi-style': ['error', 'last'],
      'semi-spacing': ['error', { after: true, before: false }],
    },
  });