export default {
  env: NODE_ENV,
  versionHash: VERSION_HASH,
  static: STATIC_SERVER,
  paths: {
    static: `${STATIC_SERVER}/static/${VERSION_HASH}`,
    styles: `${STATIC_SERVER}/static/${VERSION_HASH}/styles`,
    images: `${STATIC_SERVER}/static/${VERSION_HASH}/images`,
    locales: `${STATIC_SERVER}/locales/${VERSION_HASH}`,
  },
  api: {
    baseURL: API_BASE_URL,
  },
};
