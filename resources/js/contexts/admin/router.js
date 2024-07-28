import settingsRoutes from "@/js/contexts/admin/settings/router"
import notificationRoutes from "@/js/contexts/admin/notifications/router"
import dashboardRoutes from "@/js/contexts/admin/dashboard/router"
import userRoutes from "@/js/contexts/admin/users/router"

const routes = [...dashboardRoutes, ...userRoutes, ...notificationRoutes ,...settingsRoutes];

export default routes;
