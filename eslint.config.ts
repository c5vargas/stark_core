import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import prettier from 'eslint-plugin-prettier/recommended'
import prettierConfig from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'vendor/**',
      'dist/**',
      'build/**',
      'public/**',
      'storage/**',
      'bootstrap/cache/**',
      '*.min.js',
      '*.min.css',
    ],
  },
  {
    files: ['resources/js/**/*.{js,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: true,
      },
      globals: globals.browser,
    },

    plugins: {
      react,
    },

    settings: {
      react: { version: 'detect', runtime: 'automatic' },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  tanstackQuery.configs['flat/recommended'],
  prettier,
  prettierConfig,
])
