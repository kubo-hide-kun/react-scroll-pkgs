const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'styled-components-varname', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'prettier' /** 必ず最後に置く */,
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'import/order': 'error',
    'styled-components-varname/varname': [
      'error',
      {
        tagStyle: {
          prefix: '_',
        },
        extendedStyle: {
          prefix: '$',
        },
      },
    ],
  },
};

module.exports = config;
