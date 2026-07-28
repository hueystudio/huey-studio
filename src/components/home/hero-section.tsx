import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'

import { SocialIconButtons } from '@/components/home/social-icon-buttons'
import { Button } from '@/components/ui/button'
import heroPortrait from '@/assets/hero-portrait.png'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="space-y-8">
            <p className="font-mono text-[12px] leading-4 font-normal tracking-[2.64px] text-[#06B6D4] uppercase">
              ✦ DIGITAL PRODUCT ENGINEER / 2026
            </p>

            <div className="overflow-visible">
              <h1 className="text-gradient-hero font-geist text-[60px] font-bold leading-[68px] tracking-tight">
                Huey Huang
              </h1>
            </div>

            <p className="max-w-xl font-sans text-base leading-8 text-muted-foreground sm:text-lg">
              把复杂的企业级需求，做成极速、稳定、可持续演进的数字产品
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="h-11 rounded-full bg-accent px-6 font-medium text-accent-foreground shadow-[0_10px_30px_-12px_rgba(6,182,212,0.55)] hover:bg-accent/90"
                render={<Link to="/cases" />}
              >
                查看精选案例
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full border-border bg-background px-6 font-medium hover:bg-muted/70"
                render={<Link to="/about" />}
              >
                <Mail className="size-4" />
                联系合作
              </Button>
              <SocialIconButtons />
            </div>

            {/* <div className="grid max-w-xl grid-cols-3 gap-6 border-t border-border/70 pt-6">
              {heroStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="font-heading text-xl font-bold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div> */}

            {/* <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowDown className="size-4" />
              向下浏览
            </p> */}
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[2rem] border border-[#22D3EE] bg-transparent p-3.5 sm:p-4">
              <div className="relative aspect-square overflow-hidden rounded-[1.625rem]">
                <img
                  src={heroPortrait}
                  alt="Huey Huang 肖像"
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
