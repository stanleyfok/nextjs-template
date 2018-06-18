/*eslint-disable */
export default {
  env: NODE_ENV,
  versionHash: VERSION_HASH,
  paths: {
    static: `${ASSET_PREFIX}/static/${VERSION_HASH}`,
    locales: `${ASSET_PREFIX}/static/${VERSION_HASH}/locales`,
  },
  api: {
    baseURL: API_BASE_URL,
  },
};
/* eslint-enable */
