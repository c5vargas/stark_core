import { lazy } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import RequireAuth from './guards/RequireAuth'

import usersRouter from '@/contexts/user/router'
import settingsRouter from '@/contexts/settings/router'
import mediaRouter from '@/contexts/media/router'

const DashboardPage = lazy(() => import('@/contexts/dashboard/pages/DashboardPage'))
const LoginPage = lazy(() => import('@/contexts/auth/pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('@/contexts/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/contexts/auth/pages/ResetPasswordPage'))
const HomePage = lazy(() => import('@/contexts/public/pages/HomePage'))
const PrivacyPage = lazy(() => import('@/contexts/public/pages/PrivacyPage'))
const CookiesPage = lazy(() => import('@/contexts/public/pages/CookiesPage'))

const Router = createBrowserRouter([
  {
    path: ':lang?',
    element: <HomePage />,
  },
  {
    path: ':lang?/privacy',
    element: <PrivacyPage />,
  },
  {
    path: ':lang?/cookies',
    element: <CookiesPage />,
  },
  {
    path: ':lang?/auth',
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: ':lang?/dashboard',
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      { ...usersRouter },
      { ...settingsRouter },
      { ...mediaRouter },
    ],
  },
])

export default Router
