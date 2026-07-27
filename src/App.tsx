import { RouterProvider } from 'react-router-dom'

import { QueryProvider } from '@/providers/query-provider'
import { router } from '@/routes/router'

export default function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
