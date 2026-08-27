import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
    {
        ignores: [
            '.next/**',
            '.open-next/**',
            '.wrangler/**',
            '.vercel/**',
            'out/**',
            'build/**',
            'src/generated/**',
            'cloudflare-env.d.ts',
            '*.tsbuildinfo',
        ],
    },
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
        rules: {
            // React specific rules
            'react/jsx-no-target-blank': 'error',
            'react/no-unescaped-entities': 'error',

            // General JavaScript/TypeScript rules
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
            'no-debugger': 'error',
            'no-unused-vars': 'off', // Handled by TypeScript
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],

            // Import rules
            'import/no-duplicates': 'error',

            // Accessibility rules
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/aria-role': 'error',

            // React Compiler rules newly enabled by Next 16's bundled
            // eslint-plugin-react-hooks v6. Surfaced as warnings pending a
            // dedicated cleanup pass rather than blocking the version bump.
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/static-components': 'warn',
            'react-hooks/error-boundaries': 'warn',
            'react-hooks/purity': 'warn',
            'react-hooks/preserve-manual-memoization': 'warn',
        },
    },
    {
        files: ['scripts/**/*.{js,cjs}'],
        languageOptions: {
            sourceType: 'commonjs',
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];

export default eslintConfig;
