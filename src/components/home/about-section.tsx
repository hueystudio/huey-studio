import { selfIntroduction, selfIntroductionEn } from '@/constants/home-content'

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex items-center gap-4">
          <span className="font-heading text-sm font-semibold tracking-wide text-accent">
            01
          </span>
          <span
            className="h-px w-10 shrink-0 bg-accent/50"
            aria-hidden="true"
          />
          <h2 className="font-heading text-xl font-bold text-accent">
            自我介绍
          </h2>
        </div>
        <p className="mt-6 max-w-none font-song text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {selfIntroduction}
        </p>
        <p className="mt-6 max-w-none font-song text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {selfIntroductionEn}
        </p>
      </div>
    </section>
  )
}
