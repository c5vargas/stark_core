import { createI18n } from 'vue-i18n'

//TODO Automatic messages
const messages = {
    'en-US': {
        auth: {
            login: "Login",
            logout: "Log Out",
            password: "Password",
            email: "Email Address",
            welcome: "Welcome back! Log in to your account.",
            signup: "Not a user? Sign up"
        },
        dashboard: {
            settings: {
                settings: "Settings",
                localization: "Localization",
                general: "General",
                analytics: "Analytics",
                site_name: "Site name",
                update: "Update settings",
                site_url: "Primary site URL",
                default_locale: "Default locale",
                locale_desc: "Which translation should be selected by default for new users.",
                default_timezone: "Timezone",
                timezone_desc: "Choose either a city in the same timezone as you or a UTC timezone offset.",
                translations: "Enable translations",
                translations_desc: "Enable translations functionality for the site."
            }
        }
    },
    'es-ES': {
        auth: {
            login: "Acceder",
            logout: "Cerrar sesión",
        },
    }
}

let defaultLocale = window.AppConfig.app_locale;

const i18n = createI18n({
    locale: localStorage.locale ?? defaultLocale,
    fallbackLocale: defaultLocale,
    legacy: false,
    globalInjection: true,
    messages,
})

export default i18n;
