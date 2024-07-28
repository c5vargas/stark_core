import hasPermission from "@/js/contexts/shared/utils/guards/hasPermission"

const routes = [
	{
        name: "dashboard",
        path: "/dashboard",
        beforeEnter: [hasPermission],
        meta: {
            permission: 'view.dashboard'
        },
		component: () => import("@/js/contexts/admin/dashboard/pages/IndexPage.vue"),
    },
]

export default routes
