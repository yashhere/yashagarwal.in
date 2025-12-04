import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    {
        ignores: [".next/", ".vercel/", ".content-collections/", "node_modules/"],
    },
    ...nextCoreWebVitals,
    ...compat.extends("prettier"),
    {
        plugins: {
            "unused-imports": unusedImports,
        },

        settings: {
            next: {
                rootDir: true,
            },
        },

        rules: {
            "@next/next/no-html-link-for-pages": "off",
            "react/jsx-key": "off",
            "unused-imports/no-unused-imports": "error",
            "react-hooks/set-state-in-effect": "off",
            "react-hooks/static-components": "off",

            "unused-imports/no-unused-vars": ["warn", {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            }],

            "no-unused-vars": "off",
        },
    }
]);
