import hasPermission from '@/js/contexts/shared/utils/guards/hasPermission'

const routes = [
    {
        name: "dashboard.users",
        path: "/dashboard/users",
        beforeEnter: [hasPermission],
        meta: {permission: 'view.users'},
        component: () => import("@/js/contexts/admin/users/pages/UsersPage.vue"),
    },
	{
		name: "dashboard.users.single",
		path: "/dashboard/users/:id",
		props: (route) => ({ id: route.params.id }),
		beforeEnter: [hasPermission],
		meta: {
			permission: 'edit.users'
		},
		component: () => import("@/js/contexts/admin/users/pages/SinglePage.vue"),
	}
]

export default routes
