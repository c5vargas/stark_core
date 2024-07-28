import {createWebHistory, createRouter} from "vue-router";
import adminRoutes from '@/js/contexts/admin/router'
import authRoutes from '@/js/contexts/auth/router'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [...adminRoutes, ...authRoutes ]
})

export default router;
