module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    indent: ['error', 2],
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  plugins: ['react', 'json'],
  globals: {
    document: true,
    window: true,
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./'],
        alias: {
          actions: './redux/actions',
          assets: './assets',
          components: './components',
          configs: './configs',
          lib: './lib',
          reducers: './redux/reducers',
        },
      },
    },
  },
};
