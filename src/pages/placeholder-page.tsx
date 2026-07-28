type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
      <p className="prose-content mt-4 text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </section>
  )
}
