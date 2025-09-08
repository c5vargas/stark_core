import { lazy } from 'react'
import SettingsLayout from '../layouts/SettingsLayout'
import { Navigate } from 'react-router-dom'

const SettingsPage = lazy(() => import('@/contexts/settings/pages/SettingsPage'))

const router = {
  path: 'settings',
  element: <SettingsLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="general" replace />,
    },
    {
      path: 'general',
      element: <SettingsPage />,
    },
  ],
}

export default router
