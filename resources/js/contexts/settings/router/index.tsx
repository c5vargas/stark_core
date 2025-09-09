import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import SettingsLayout from '@/contexts/settings/layouts/SettingsLayout'

const SettingsPage = lazy(() => import('@/contexts/settings/pages/SettingsPage'))
const MailPage = lazy(() => import('@/contexts/settings/pages/MailPage'))
const LocalizationPage = lazy(() => import('@/contexts/settings/pages/LocalizationPage'))

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
    {
      path: 'mail',
      element: <MailPage />,
    },
    {
      path: 'localization',
      element: <LocalizationPage />,
    },
  ],
}

export default router
