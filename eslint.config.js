const jie = require('@djie/eslint-config').default

module.exports = jie({
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
  },
}, {
  ignores: [
    'src/db/models',
  ],
})
