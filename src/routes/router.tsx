import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/app-layout'
import { AboutPage } from '@/pages/about-page'
import { HomePage } from '@/pages/home-page'
import { PlaceholderPage } from '@/pages/placeholder-page'

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
        path: 'services',
        element: (
          <PlaceholderPage
            title="服务项目"
            description="这里将展示 Huey Studio 的前端开发、全栈交付与工程咨询服务。"
          />
        ),
      },
      {
        path: 'cases',
        element: (
          <PlaceholderPage
            title="精选案例"
            description="这里将展示代表性项目案例与交付成果。"
          />
        ),
      },
      {
        path: 'blog',
        element: (
          <PlaceholderPage
            title="深度专栏"
            description="这里将发布技术思考、工程实践与产品观察。"
          />
        ),
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
])
