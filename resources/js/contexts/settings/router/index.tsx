import { lazy } from "react";

const SettingsPage = lazy(() => import("@/contexts/settings/pages/SettingsPage"));

const router = {
	path: "settings",
	children: [
		{
			index: true,
			element: <SettingsPage />
		},
    {
			path: 'general',
			element: <SettingsPage />
		},
	]
}

export default router
