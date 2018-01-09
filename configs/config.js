export default {
  env: NODE_ENV,
  paths: {
    static: `/static/${VERSION_HASH}`,
    styles: `/static/${VERSION_HASH}/styles`,
    images: `/static/${VERSION_HASH}/images`,
  },
  api: {
    baseURL: API_BASE_URL,
  },
};
