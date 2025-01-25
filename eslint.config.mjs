// // @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    semi: true,
    quotes: "single",
  },
  dirs: {
    src: ["./playground"],
  },
})
  .overrideRules({
    //
    "regexp/no-obscure-range": "off",
    "regexp/prefer-character-class": "off",
    "unicorn/number-literal-case": "off",
    "import/first": "off",
    "import/order": "off",
    "import/no-duplicates": "off",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": ["error", { singleline: 5 }],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
  })
  .override("nuxt/vue/rules", {
    rules: {
      //
      "vue/html-self-closing": ["off"],
      "vue/multi-word-component-names": 0,
    },
  })
  .prepend({
    ignores: ["node_modules/"],
    // rules: {
    //   //
    //   // "@typescript-eslint/no-empty-object": ["off"],
    //   // "@typescript-eslint/no-explicit-any": ["off"],
    //   // "@typescript-eslint/no-unused-vars": ["off"],
    // },
  });
