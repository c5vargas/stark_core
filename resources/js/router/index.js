import {createWebHistory, createRouter} from "vue-router";
import dashboardRoutes from './routes/dashboard'
import authRoutes from './routes/auth'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        ...dashboardRoutes,
        ...authRoutes
    ]
})

export default router;
