module.exports = {
  "env": {
    "mocha": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "rules": {
    "indent": ["error", 2],
    "class-methods-use-this": 0
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ]
};
