import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RequireAuth from "./guards/RequireAuth";

import categoriesRouter from "@/contexts/categories/router";
import settingsRouter from "@/contexts/settings/router";

const DashboardPage = lazy(() => import("@/contexts/dashboard/pages/DashboardPage"));
const LoginPage = lazy(() => import("@/contexts/auth/pages/LoginPage"));
const HomePage = lazy(() => import("@/contexts/landing/pages/HomePage"));

const Router = createBrowserRouter([
  {
	  path: ":lang?",
	  element: <HomePage />,
	},
  {
	  path: ":lang?/auth",
		children: [
		  {
        index: true,
        element: <LoginPage />
			},
			{
        path: "login",
        element: <LoginPage />
			},
		]
	},
	{
		path: ":lang?/dashboard",
		element: <RequireAuth><Outlet /></RequireAuth>,
		children: [
		  {
        index: true,
        element: <DashboardPage />
			},
      { ...categoriesRouter },
      { ...settingsRouter },
		]
	},
]);

export default Router
