module.exports = {
  debug: false,

  fallbackLng: 'en',
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE

  ns: ['common'],
  defaultNS: 'common',
  saveMissing: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format) => {
      if (format === 'uppercase') return value.toUpperCase();

      // to add more formatting function if needed
      // ref: https://www.i18next.com/formatting.html

      return value;
    },
  },
};
