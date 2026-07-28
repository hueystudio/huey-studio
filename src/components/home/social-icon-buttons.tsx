import { socialLinks } from '@/constants/home-content'
import { cn } from '@/lib/utils'

type SocialIconButtonsProps = {
  className?: string
}

export function SocialIconButtons({ className }: SocialIconButtonsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground transition-colors hover:border-accent/40 hover:bg-muted/70 hover:text-foreground"
          >
            <Icon className="size-[18px]" />
          </a>
        )
      })}
    </div>
  )
}
