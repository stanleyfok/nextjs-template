/*eslint-disable */
export default {
  env: NODE_ENV,
  versionHash: VERSION_HASH,
  paths: {
    static: `${ASSET_PREFIX}/static/${VERSION_HASH}`,
    styles: `${ASSET_PREFIX}/static/${VERSION_HASH}/styles`,
    images: `${ASSET_PREFIX}/static/${VERSION_HASH}/images`,
    locales: `${ASSET_PREFIX}/locales/${VERSION_HASH}`,
  },
  api: {
    baseURL: API_BASE_URL,
  },
};
/* eslint-enable */
