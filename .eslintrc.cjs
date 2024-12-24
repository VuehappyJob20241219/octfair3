const autoImportGlobals = require("./.eslintrc-auto-import.json");

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  globals: {
    ...autoImportGlobals.globals,
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
};
