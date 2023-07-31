import LoginPage from '@/views/pages/Auth/LoginPage.vue'

const routes = [
    {
        path: "/auth",
        redirect: {
            path: '/auth/login'
        }
    },
    {
        name: "auth.login",
        path: "/auth/login",
        meta: {},
        component: LoginPage,
    },
]

export default routes
