import { Linter } from "eslint";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser"; // Import the TypeScript parser using import

/** @type {Linter.Config} */
export default [
  {
    files: ["**/*.ts", "**/*.js"], // Lint TypeScript and JavaScript files
    languageOptions: {
      parser: parser, // Use the TypeScript parser imported here
      parserOptions: {
        ecmaVersion: 2021, // Support ES2021 features
        sourceType: "module", // Support ES Modules (import/export)
      },
      globals: {
        process: "readonly", // Allow Node.js globals like `process`
        __dirname: "readonly", // Allow Node.js globals like `__dirname`
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Correct way to specify the plugin
    },
    rules: {
      "no-console": "warn", // Warn about console.log
    },
  },
];
