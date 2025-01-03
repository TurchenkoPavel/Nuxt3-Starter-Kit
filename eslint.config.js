import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    ignores: [
      'node_modules/',
      '.nuxt/',
      '.git/',
      '.env',
      '*.d.ts',
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false, // Для поддержки Babel без отдельного файла
      },
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'vue/no-v-model-argument': 'off',
      'prettier/prettier': 'error',
    },
  },
];
