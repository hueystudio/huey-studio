import { aboutSections } from '@/constants/home-content'

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <p className="text-sm font-medium text-muted-foreground">关于我</p>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {aboutSections.map((section) => (
            <article key={section.index} className="space-y-4">
              <div className="space-y-2">
                <p className="font-heading text-sm font-semibold tracking-wide text-accent">
                  {section.index}
                </p>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <p className="font-sans text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
