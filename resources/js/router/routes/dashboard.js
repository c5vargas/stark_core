import IndexPage from '@/views/pages/Dashboard/IndexPage.vue'
import SettingsPage from '@/views/pages/Dashboard/Settings/SettingsPage.vue'
import LocalizationPage from '@/views/pages/Dashboard/Settings/LocalizationPage.vue'

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
        component: SettingsPage,
    },
    {
        name: "dashboard.settings.localization",
        path: "/dashboard/settings/localization",
        component: LocalizationPage,
    },
]

export default routes
