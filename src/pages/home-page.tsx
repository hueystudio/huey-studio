import { useQuery } from '@tanstack/react-query'

import { getSamplePost } from '@/api/app'
import { Button } from '@/components/ui/button'

export function HomePage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['sample-post'],
    queryFn: getSamplePost,
  })

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Welcome to</p>
        <h1 className="text-3xl font-semibold tracking-tight">Huey Studio</h1>
        <p className="max-w-2xl text-muted-foreground">
          Frontend starter with React Router v6, TanStack Query, Tailwind CSS,
          and ShadCN UI.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">API + TanStack Query demo</p>
        {isLoading ? (
          <p className="mt-2 text-lg font-medium">Loading sample post...</p>
        ) : isError ? (
          <p className="mt-2 text-lg font-medium text-destructive">
            {error instanceof Error ? error.message : 'Request failed'}
          </p>
        ) : (
          <div className="mt-2 space-y-2">
            <p className="text-lg font-medium">{data?.title}</p>
            <p className="text-sm text-muted-foreground">{data?.body}</p>
          </div>
        )}
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    </section>
  )
}
