import ApiClient from './api-client';

function t(key) {
  return key;
}

const config = {
  env: 'test',
  versionHash: 'test',
  paths: {
    static: '/static/test',
    styles: '/static/test/styles',
    images: '/static/test/images',
    locales: '/static/test/locales',
  },
  api: {
    baseURL: '.',
  },
};

const apiClient = new ApiClient('.');

export { t, config, apiClient };
