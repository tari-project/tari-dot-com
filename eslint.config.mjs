import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // React specific rules
            "react/jsx-no-target-blank": "error",
            "react/no-unescaped-entities": "error",

            // General JavaScript/TypeScript rules
            "no-console": "warn",
            "no-debugger": "error",
            "no-unused-vars": "off", // Handled by TypeScript
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",

            // Code style rules
            "prefer-const": "error",
            "no-var": "error",
            "eqeqeq": ["error", "always"],

            // Import rules
            "import/no-duplicates": "error",

            // Accessibility rules
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/aria-role": "error",
        },
    },
];

export default eslintConfig;
