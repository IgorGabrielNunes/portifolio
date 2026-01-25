export default {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
