import { createI18n } from 'vue-i18n'

const messages = window.AppConfig.locales;
const defaultLocale = window.AppConfig.app_locale;

const i18n = createI18n({
    locale: localStorage.locale ?? defaultLocale,
    fallbackLocale: defaultLocale,
    legacy: false,
    globalInjection: true,
    messages,
})

export default i18n;
