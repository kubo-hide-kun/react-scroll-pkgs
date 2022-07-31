module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: [
        'standard',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/typescript',
        'prettier', // 必ず末尾に置く
      ],
      plugins: ['react', '@typescript-eslint', 'import'],
      rules: {
        'react/prop-types': 'off',
        'no-use-before-define': 'off',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal', // baseUrlを使ったimportをしているので、デフォルトにこれを追加
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc' },
          },
        ],
        // 不要な変数が存在する場合はエラーを発火させたい
        '@typescript-eslint/no-unused-vars': 'error',
        // useEffect内でPromiseそのまま呼べなかったりして不便であるため
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
