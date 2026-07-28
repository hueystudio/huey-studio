import { RouterProvider, BrowserRouter } from 'react-router-dom'

import { QueryProvider } from '@/providers/query-provider'
import { router } from '@/routes/router'

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter basename="/huey-studio/">
        <RouterProvider router={router} />
      </BrowserRouter>
    </QueryProvider>
  )
}
