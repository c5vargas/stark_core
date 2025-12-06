import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import SettingsLayout from '@/contexts/settings/layouts/SettingsLayout'
import RequirePermission from '@/router/guards/RequirePermission'

const SettingsPage = lazy(() => import('@/contexts/settings/pages/SettingsPage'))
const MailPage = lazy(() => import('@/contexts/settings/pages/MailPage'))
const LocalizationPage = lazy(() => import('@/contexts/settings/pages/LocalizationPage'))
const AnalyticsPage = lazy(() => import('@/contexts/settings/pages/AnalyticsPage'))
const NotificationsPage = lazy(() => import('@/contexts/settings/pages/NotificationsPage'))
const GdprPage = lazy(() => import('@/contexts/settings/pages/GdprPage'))
const PermissionsPage = lazy(() => import('@/contexts/settings/pages/PermissionsPage'))
const BackupsPage = lazy(() => import('@/contexts/settings/pages/BackupsPage'))
const ActivityLogsPage = lazy(() => import('@/contexts/settings/pages/ActivityLogsPage'))
const HelpPage = lazy(() => import('@/contexts/settings/pages/HelpPage'))

const router = {
  path: 'settings',
  element: (
    <RequirePermission permission="view.settings">
      <SettingsLayout />
    </RequirePermission>
  ),
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
      path: 'roles',
      element: <PermissionsPage />,
    },
    {
      path: 'push',
      element: <NotificationsPage />,
    },
    {
      path: 'gdpr',
      element: <GdprPage />,
    },
    {
      path: 'backups',
      element: <BackupsPage />,
    },
    {
      path: 'activity-logs',
      element: <ActivityLogsPage />,
    },
    {
      path: 'help',
      element: <HelpPage />,
    },
  ],
}

export default router
