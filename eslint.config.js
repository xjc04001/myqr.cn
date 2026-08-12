import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLImageElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        URL: 'readonly',
        atob: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
    languageOptions: {
      globals: {
        File: 'readonly',
        FileReader: 'readonly',
        HTMLCanvasElement: 'readonly',
        URL: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
);
