import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintJs from "@eslint/js";
import stylisticsJs from "@stylistic/eslint-plugin-js";


export default defineConfig([
  {
    ignores: [
      "dist/",
    ]
  },
  eslintJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      "@stylistics/js": stylisticsJs,
    },
    rules: {
      "@stylistics/js/indent": ["error", 2],
      "@stylistics/js/linebreak-style": ["error", "unix"],
      "@stylistics/js/quotes": ["error", "single"],
      "@stylistics/js/semi": ["error", "never"],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "no-console": 0
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
