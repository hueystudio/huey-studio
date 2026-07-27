import { Link, Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            Huey Studio
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" render={<Link to="/" />}>
              Home
            </Button>
            <Button variant="ghost" size="sm" render={<Link to="/about" />}>
              About
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}
