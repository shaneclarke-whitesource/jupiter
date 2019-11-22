import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '../i18n';

export const i18NextConfig = {
  resources,
  detection: {
    order: ['navigator']
  },
  fallbackLng: {
    'en': ['en-US'],
    'ja': ['ja-JP'],
    'default': ['en-US']
  },
  ns: ['common', 'validation'],
  preload: ['en-US', 'ja-JP'],
  defaultNS: 'common',
  nsSeparator: ':',
  debug: false,
  load: 'languageOnly',
  interpolation: { escapeValue: true },
  react: {
    hashTransKey(defaultValue) {
      return false;
    },
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'ul', 'li', 'p'],
    wait: true
  },
  keySeparator: false
};

i18n
  .use(ICU)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(i18NextConfig);

export default i18n;
