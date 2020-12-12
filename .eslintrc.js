module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false, 'argsIgnorePattern': "^_",
    }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'quotes': ['error', 'single'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': ['error', {
      code: 120,
      'ignoreTrailingComments': true,
      'ignoreUrls': true,
      'ignoreRegExpLiterals': true,
      'ignorePattern': '^\\s*var\\s.+=\\s*require\\s*\\(',
    }],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': 'warn',
  },
};
