module.exports = {
  root: true,
  env: { browser: true, es2020: true, "cypress/globals": true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'cypress'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'linebreak-style': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/prop-types': 'off',
    'max-len': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
