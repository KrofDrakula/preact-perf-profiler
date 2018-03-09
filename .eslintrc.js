module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-unused-vars': ['error', { varsIgnorePattern: 'h' }],
    'no-global-assign': ['error'],
    'react/jsx-key': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off'
  }
};
