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
