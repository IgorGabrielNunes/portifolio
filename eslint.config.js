import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        window: 'readonly',
        localStorage: 'readonly',
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];
