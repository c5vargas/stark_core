import { lazy } from 'react'
import UserLayout from '../layouts/UserLayout'
import { Navigate } from 'react-router-dom'

const UsersListPage = lazy(() => import('@/contexts/user/pages/UsersListPage'))
const UserCreatePage = lazy(() => import('@/contexts/user/pages/UserCreatePage'))
const UserDetailPage = lazy(() => import('@/contexts/user/pages/UserDetailPage'))
const UserDetailRolesPage = lazy(() => import('@/contexts/user/pages/UserDetailRolesPage'))
const UserDetailActivityPage = lazy(() => import('@/contexts/user/pages/UserDetailActivityPage'))
const UserDetailSessionsPage = lazy(() => import('@/contexts/user/pages/UserDetailSessionsPage'))
const UserDetailSecurity = lazy(() => import('@/contexts/user/pages/UserDetailSecurity'))
const UserDetailRemovePage = lazy(() => import('@/contexts/user/pages/UserDetailRemovePage'))

const router = {
  path: 'users',
  children: [
    {
      index: true,
      element: <UsersListPage />,
    },
    {
      path: 'create',
      element: <UserCreatePage />,
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
          path: 'roles',
          element: <UserDetailRolesPage />,
        },
        {
          path: 'activity',
          element: <UserDetailActivityPage />,
        },
        {
          path: 'sessions',
          element: <UserDetailSessionsPage />,
        },
        {
          path: 'security',
          element: <UserDetailSecurity />,
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
