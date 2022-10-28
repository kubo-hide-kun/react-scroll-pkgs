module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-namespace": "off"
  },
};
