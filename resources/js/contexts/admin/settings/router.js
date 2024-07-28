import hasPermission from "@/js/contexts/shared/utils/guards/hasPermission"

const routes = [
	{
		name: "dashboard.settings",
		path: "/dashboard/settings",
		beforeEnter: [hasPermission],
		redirect: { path: '/dashboard/settings/general' },
		meta: {permission: 'view.settings'},
	},
	{
		name: "dashboard.settings.general",
		path: "/dashboard/settings/general",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/general/pages/SettingsPage.vue"),
	},
	{
		name: "dashboard.settings.analytics",
		path: "/dashboard/settings/analytics",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/analytics/pages/AnalyticsPage.vue"),
	},
	{
		name: "dashboard.settings.localization",
		path: "/dashboard/settings/localization",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/localization/pages/LocalizationPage.vue"),
	},
	{
		name: "dashboard.settings.mail",
		path: "/dashboard/settings/mail",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/mail/pages/MailPage.vue"),
	},
	{
		name: "dashboard.settings.roles",
		path: "/dashboard/settings/roles",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/roles/pages/RolesPage.vue"),
	},
	{
		name: "dashboard.settings.onesignal",
		path: "/dashboard/settings/onesignal",
		beforeEnter: [hasPermission],
		meta: {permission: 'view.settings'},
		component: () => import("@/js/contexts/admin/settings/notifications/pages/OneSignalPage.vue"),
	},
]

export default routes
