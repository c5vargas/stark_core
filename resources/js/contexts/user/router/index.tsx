import { lazy } from 'react'
import UserLayout from '../layouts/UserLayout'
import { Navigate } from 'react-router-dom'

const UsersPage = lazy(() => import('@/contexts/user/pages/UsersPage'))
const UserPage = lazy(() => import('@/contexts/user/pages/UserPage'))

const router = {
  path: 'users',
  children: [
    {
      index: true,
      element: <UsersPage />,
    },
    {
      path: ':id',
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="general" replace />,
        },
        {
          path: 'general',
          element: <UserPage />,
        },
      ],
    },
  ],
}

export default router
