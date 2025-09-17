import { lazy } from 'react'
import UserLayout from '../layouts/UserLayout'
import { Navigate } from 'react-router-dom'

const UsersListPage = lazy(() => import('@/contexts/user/pages/UsersListPage'))
const UserDetailPage = lazy(() => import('@/contexts/user/pages/UserDetailPage'))
const UserDetailRemovePage = lazy(() => import('@/contexts/user/pages/UserDetailRemovePage'))

const router = {
  path: 'users',
  children: [
    {
      index: true,
      element: <UsersListPage />,
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
          element: <UserDetailPage />,
        },
        {
          path: 'remove',
          element: <UserDetailRemovePage />,
        },
      ],
    },
  ],
}

export default router
