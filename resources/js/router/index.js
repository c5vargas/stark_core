import {createWebHistory, createRouter} from "vue-router";
import IndexPage from '@/views/pages/Dashboard/IndexPage.vue'
import LoginPage from '@/views/pages/Auth/LoginPage.vue'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
    {
        name: "dashboard",
        path: "/dashboard",
        meta: {},
        component: IndexPage,
    },
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
})

export default router;
