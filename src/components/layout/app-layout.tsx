import { Outlet } from 'react-router-dom'

import { SiteHeader } from '@/components/layout/site-header'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
