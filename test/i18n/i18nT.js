import i18n from './i18n';

function i18nTMock() {
  return i18n.t.bind(i18n);
}

export const t = i18nTMock();
