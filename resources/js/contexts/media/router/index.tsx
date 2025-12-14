import { lazy } from 'react'

const MediaListPage = lazy(() => import('@/contexts/media/pages/MediaListPage'))

const router = {
  path: 'media',
  children: [
    {
      index: true,
      element: <MediaListPage />,
    },
  ],
}

export default router
