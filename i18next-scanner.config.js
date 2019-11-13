require('@babel/register');
const { i18NextConfig } = require('./app/i18n');
const { transform, flush } = require('./lib/i18n/smartlingScannerHelpers');

module.exports = {
  input: [
    'app/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    '!app/**/*.test.{js,jsx}',
    '!app/**/__snapshots__/**',
    '!i18n/**',
    '!**/node_modules/**'
  ],
  output: './',
  options: {
    debug: false,
    func: {
      list: ['t', 'i18n.t'],
      extensions: ['.js']
    },
    trans: false,
    lngs: Object.keys(i18NextConfig.resources),
    defaultNs: i18NextConfig.defaultNS, // `defaultNS` in i18Next `defaultNs` in scanner.
    ns: i18NextConfig.ns,
    removeUnusedKeys: true,
    sort: true,
    defaultLng: i18NextConfig.fallbackLng,
    defaultValue: '__NOT_TRANSLATED__',
    resource: {
      loadPath: 'i18n/{{lng}}/{{ns}}.json',
      savePath: 'i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: i18NextConfig.nsSeparator,
    keySeparator: false,
    contextSeparator: '_',
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    smartling: {
      string_format: 'icu',
      translate_paths: {
        path: '*/translation',
        key: '{*}/translation',
        instruction: '*/instruction'
      }
    }
  },
  transform,
  flush
};
