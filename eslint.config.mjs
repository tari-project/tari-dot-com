import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
        rules: {
            // React specific rules
            "react/jsx-no-target-blank": "error",
            "react/no-unescaped-entities": "error",

            // General JavaScript/TypeScript rules
            "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
            "no-debugger": "error",
            "no-unused-vars": "off", // Handled by TypeScript

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
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
    {
        ignores: [
            ".next/**",
            ".open-next/**",
            ".wrangler/**",
            ".vercel/**",
            "node_modules/**",
            "out/**",
            "build/**",
            "public/**",
            "src/generated/**",
            "cloudflare-env.d.ts",
            "next-env.d.ts",
        ],
    },
];

export default eslintConfig;
