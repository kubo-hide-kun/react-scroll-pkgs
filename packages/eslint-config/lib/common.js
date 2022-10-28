module.exports = {
  plugins: ['import'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
    commonjs: true,
  },
  rules: {
    "no-empty-function": 'error',
    "no-unused-vars": 'error',
    'import/no-duplicates': 'error',
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  },
};
