import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '首页', to: '/' },
  { label: '服务项目', to: '/services' },
  { label: '精选案例', to: '/cases' },
  { label: '深度专栏', to: '/blog' },
  // { label: '关于我', to: '/about' },
]

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    setIsDark(next)
  }

  return (
    <header className="relative z-10 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span
            className="flex size-9 items-center justify-center rounded-lg font-heading text-[14px] leading-5 font-bold tracking-normal text-[#020618]"
            style={{
              background:
                'linear-gradient(to right bottom in oklab, rgb(34, 211, 238) 0%, rgb(37, 99, 235) 100%)',
            }}
          >
            H.
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-sm font-semibold tracking-tight text-foreground">
              Huey Studio
            </span>
            <span className="block text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
            Build your world with care and curiosity
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm transition-colors hover:text-foreground',
                  isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="切换主题"
            onClick={toggleTheme}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  )
}
