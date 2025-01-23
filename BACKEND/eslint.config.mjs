import { Linter } from "eslint";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

/** @type {Linter.Config} */
export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
      "no-warning-comments": [
        "error",
        { terms: ["todo", "fixme", "note"], location: "anywhere" },
      ],
      "no-inline-comments": "error",
    },
  },
];
