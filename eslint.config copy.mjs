// // @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    // stylistic: true,
    semi: true,
    quotes: 'single',
  },
  dirs: {
    src: ['./playground'],
  },
})
  // .append
  // // your custom flat config here...
  // ()
  .override('nuxt/typescript', {
    // rules: {
    //   // ...Override rules, for example:
    //   // '@typescript-eslint/ban-types': 'off',
    //   semi: ['error', 'always'],
    //   'semi-style': ['error', 'last'],
    //   'semi-spacing': ['error', { after: true, before: false }],
    //   quotes: 0,
    //   curly: 0,
    //   'arrow-parens': 0,
    //   'object-shorthand': 0,
    // },
    rules: {
      quotes: 0,
      curly: 0,
      'func-call-spacing': 0,
      'import/no-named-as-default': 0,
      semi: ['error', 'always'],
      'vue/html-indent': 0,
      'object-shorthand': 0,
      'arrow-parens': 0,
      'import/no-duplicates': 'off',
      'space-before-function-paren': 'off',
      'semi-spacing': ['error', { after: true, before: false }],
      'semi-style': ['error', 'last'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'comma-dangle': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      'vue/multi-word-component-names': 0,
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/max-attributes-per-line': ['off'],
      'vue/singleline-html-element-content-newline': ['off'],
      'vue/html-self-closing': ['off'],
      'vue/no-v-html': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-quotes': 'off',
    },
  });
// .override('nuxt/typescript/rules', {
//   rules: {
//     // ...Override rules, for example:
//     // // '@typescript-eslint/ban-types': 'off',
//     // semi: ['error', 'always'],
//     // 'semi-style': ['error', 'last'],
//     // 'semi-spacing': ['error', { after: true, before: false }],

// 'import/no-named-as-default': 0,
//     'func-call-spacing': 0,
//
//     'vue/html-indent': 0,
//
//
//     'import/no-duplicates': 'off',
//     'space-before-function-paren': 'off',
//     'semi-spacing': ['error', { after: true, before: false }],
//     'semi-style': ['error', 'last'],
//     'no-extra-semi': 'error',
//     'no-unexpected-multiline': 'error',
//     'no-unreachable': 'error',
//     'comma-dangle': 'off',
//     'no-console': 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     '@typescript-eslint/no-namespace': 'off',
//     '@typescript-eslint/no-explicit-any': ['off'],
//     'vue/multi-word-component-names': 0,
//     '@typescript-eslint/no-unused-vars': 'off',
//     'vue/max-attributes-per-line': ['off'],
//     'vue/singleline-html-element-content-newline': ['off'],
//     'vue/html-self-closing': ['off'],
//     'vue/no-v-html': 'off',
//     'vue/no-multiple-template-root': 'off',
//     'vue/html-quotes': 'off',
//   },
// });
