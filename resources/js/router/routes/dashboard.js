import AnalyticsPage from '@/views/pages/Dashboard/Settings/AnalyticsPage.vue'
import IndexPage from '@/views/pages/Dashboard/IndexPage.vue'
import LocalizationPage from '@/views/pages/Dashboard/Settings/LocalizationPage.vue'
import MailPage from '@/views/pages/Dashboard/Settings/MailPage.vue'
import SettingsPage from '@/views/pages/Dashboard/Settings/SettingsPage.vue'

const routes = [
    {
        name: "dashboard",
        path: "/dashboard",
        component: IndexPage,
    },
    {
        name: "dashboard.settings",
        path: "/dashboard/settings",
        redirect: { path: '/dashboard/settings/general' }
    },
    {
        name: "dashboard.settings.general",
        path: "/dashboard/settings/general",
        component: SettingsPage,
    },
    {
        name: "dashboard.settings.analytics",
        path: "/dashboard/settings/analytics",
        component: AnalyticsPage,
    },
    {
        name: "dashboard.settings.localization",
        path: "/dashboard/settings/localization",
        component: LocalizationPage,
    },
    {
        name: "dashboard.settings.mail",
        path: "/dashboard/settings/mail",
        component: MailPage,
    },
]

export default routes
