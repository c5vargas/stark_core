import hasPermission from '@/js/contexts/shared/utils/guards/hasPermission'

const routes = [
    {
        name: "dashboard.notifications",
        path: "/dashboard/notifications",
        beforeEnter: [hasPermission],
        meta: {permission: 'view.notifications'},
		component: () => import("@/js/contexts/admin/notifications/pages/NotificationsPage.vue"),
    },
	{
		name: "dashboard.notifications.single",
		path: "/dashboard/notifications/:id",
		props: (route) => ({ id: route.params.id }),
		beforeEnter: [hasPermission],
		meta: {permission: 'edit.notifications'},
		component: () => import("@/js/contexts/admin/notifications/pages/SinglePage.vue"),
	},
]

export default routes
