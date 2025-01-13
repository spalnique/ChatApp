import js from '@eslint/js';
import ts_eslint from '@typescript-eslint/eslint-plugin';
import ts_parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import react_refresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // Files to be linted by ESLint
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // path to tsconfig.json !!!
      },
      globals: globals.browser,
    },
  },
  // JavaScript: base rules
  { rules: { ...js.configs.recommended.rules, 'no-undef': 'off' } },

  // TypeScript: config recommended rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: ts_parser,
    },
    plugins: {
      '@typescript-eslint': ts_eslint,
    },
    rules: {
      ...ts_eslint.configs.recommended.rules,
    },
  },

  // React: config recommended rules
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // React Refresh: підтримка HMR (Vite)
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-refresh': react_refresh,
    },
    rules: {
      ...react_refresh.configs.vite.rules,
    },
  },
];
