module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  plugins: ['react'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { varsIgnorePattern: 'h' }],
    'no-global-assign': ['error']
  }
};
