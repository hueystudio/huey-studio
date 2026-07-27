import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/app-layout'
import { AboutPage } from '@/pages/about-page'
import { HomePage } from '@/pages/home-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
])
