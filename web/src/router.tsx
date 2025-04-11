import { createBrowserRouter } from 'react-router'

import { Application } from './pages/application'
import { NotFound } from './pages/not-found'
import { Shortened } from './pages/shortened'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Application />,
  },
  {
    path: '/:shortenedUrl',
    element: <Shortened />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
])
