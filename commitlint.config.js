module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    'scope-empty-exceptions', // scope が空の場合にエラーを出す
    'workspace-scopes' // workspace のパッケージ名を scope として許可する
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['all']], // scope が all の場合も許可する
  },
};
