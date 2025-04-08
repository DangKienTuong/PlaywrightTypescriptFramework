import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright'

// Following typescript rules at: https://typescript-eslint.io/
// and playwright rules at: https://github.com/playwright-community/eslint-plugin-playwright
// Customize based on project need
export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars":"warn",
            "@typescript-eslint/no-explicit-any": "off",
            "prefer-const": "off",
            "no-empty-pattern": "off",
            "@typescript-eslint/no-unsafe-function-type": "off"
        }
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/tests-management/**'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/no-commented-out-tests': 'warn',
            'playwright/no-duplicate-hooks': 'error',
            'playwright/no-get-by-title': 'warn',
            'playwright/no-nth-methods': 'error',
            'playwright/no-restricted-matchers': 'warn',
            'playwright/prefer-comparison-matcher': 'warn',
            'playwright/prefer-equality-matcher': 'warn',
            'playwright/prefer-hooks-in-order': 'warn',
            'playwright/prefer-hooks-on-top': 'warn',
            'playwright/expect-expect': 'off',
            'playwright/prefer-lowercase-title': 'off'
        },
    },
);