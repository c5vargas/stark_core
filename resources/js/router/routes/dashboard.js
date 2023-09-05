import AnalyticsPage from '@/views/pages/Dashboard/Settings/AnalyticsPage.vue'
import IndexPage from '@/views/pages/Dashboard/IndexPage.vue'
import LocalizationPage from '@/views/pages/Dashboard/Settings/LocalizationPage.vue'
import MailPage from '@/views/pages/Dashboard/Settings/MailPage.vue'
import SettingsPage from '@/views/pages/Dashboard/Settings/SettingsPage.vue'
import UsersPage from '@/views/pages/Dashboard/Users/UsersPage.vue'
import SinglePage from '@/views/pages/Dashboard/Users/SinglePage.vue'
import isAuth from '../guards/isAuth'
import hasPermission from '../guards/hasPermission'

const routes = [
    {
        name: "dashboard",
        path: "/dashboard",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'view.dashboard'
        },
        component: IndexPage,
    },
    {
        name: "dashboard.users",
        path: "/dashboard/users",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'view.users'
        },
        component: UsersPage,
    },
    {
        name: "dashboard.users.single",
        path: "/dashboard/users/:id",
        props: (route) => ({ id: route.params.id }),
        beforeEnter: [hasPermission],
        meta: {
            permission: 'edit.users'
        },
        component: SinglePage,
    },
    {
        name: "dashboard.settings",
        path: "/dashboard/settings",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'view.settings'
        },
        redirect: { path: '/dashboard/settings/general' }
    },
    {
        name: "dashboard.settings.general",
        path: "/dashboard/settings/general",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'edit.settings'
        },
        component: SettingsPage,
    },
    {
        name: "dashboard.settings.analytics",
        path: "/dashboard/settings/analytics",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'edit.settings'
        },
        component: AnalyticsPage,
    },
    {
        name: "dashboard.settings.localization",
        path: "/dashboard/settings/localization",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'edit.settings'
        },
        component: LocalizationPage,
    },
    {
        name: "dashboard.settings.mail",
        path: "/dashboard/settings/mail",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'edit.settings'
        },
        component: MailPage,
    },
]

export default routes
