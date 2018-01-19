module.exports = {
  "env": {
    "jest": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "rules": {
    "indent": ["error", 2],
    "class-methods-use-this": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "plugins": [
    "react",
    "jest",
    "json"
  ],
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ]
};
