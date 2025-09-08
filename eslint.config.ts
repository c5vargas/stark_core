import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['resources/js/**/*.{js,ts,tsx}'],
    ignores: ['node_modules/', 'vendor/', 'dist/', 'build/'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: { js, pluginReact },
    extends: ['js/recommended'],
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  tanstackQuery.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
])
