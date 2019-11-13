import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import { i18NextConfig } from '../../app/i18n';
import convertResources from '../../lib/i18n/convertResources';

const testConfig = {
    ...i18NextConfig,
    resources: convertResources(i18NextConfig.resources),
    lng: 'en-US'
};

i18n
    .use(ICU)
    .use(initReactI18next)
    .init(testConfig);

export default i18n;
