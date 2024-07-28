import hasPermission from "@/js/contexts/shared/utils/guards/hasPermission"

const routes = [
	{
        name: "auth",
        path: "/auth",
		beforeEnter: [hasPermission],
		redirect: {path: '/auth/login'},
    },
	{
		name: "auth.login",
		path: "/auth/login",
		meta: {},
		component: () => import("@/js/contexts/auth/pages/LoginPage.vue"),
	},
]

export default routes

