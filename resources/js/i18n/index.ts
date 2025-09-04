import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const defaultLocale = window.AppConfig.app_locale;
const rawLocales = window.AppConfig.locales;

const messages = Object.fromEntries(
  Object.entries(rawLocales).map(([lang, dict]) => [
    lang,
    { translation: dict }
  ])
);

export const setLng = (code: string) => {
  i18n.changeLanguage(code);
};

export const getLng = () => i18n.resolvedLanguage || defaultLocale;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: messages,
    fallbackLng: defaultLocale,
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lng',
    },
  });

i18n.changeLanguage(defaultLocale);

export default i18n;
