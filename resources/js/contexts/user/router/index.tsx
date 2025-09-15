import { lazy } from 'react'

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
      element: <UserPage />,
    },
  ],
}

export default router
