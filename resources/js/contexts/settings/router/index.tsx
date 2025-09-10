import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import SettingsLayout from '@/contexts/settings/layouts/SettingsLayout'

const SettingsPage = lazy(() => import('@/contexts/settings/pages/SettingsPage'))
const MailPage = lazy(() => import('@/contexts/settings/pages/MailPage'))
const LocalizationPage = lazy(() => import('@/contexts/settings/pages/LocalizationPage'))
const AnalyticsPage = lazy(() => import('@/contexts/settings/pages/AnalyticsPage'))
const GdprPage = lazy(() => import('@/contexts/settings/pages/GdprPage'))

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
      path: 'localization',
      element: <LocalizationPage />,
    },
    {
      path: 'analytics',
      element: <AnalyticsPage />,
    },
    {
      path: 'mail',
      element: <MailPage />,
    },
    {
      path: 'gdpr',
      element: <GdprPage />,
    },
  ],
}

export default router
