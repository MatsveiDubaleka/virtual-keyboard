module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "babel-eslint",
  },
  rules: {
    'import/prefer-default-export': 'off',
    "no-unused-vars": "off",
    'no-plusplus': 'off',
    "linebreak-style": 0
  }
}