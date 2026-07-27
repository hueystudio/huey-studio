# Huey Studio

React 18 + Vite + TypeScript starter with React Router v6, TanStack Query, Tailwind CSS, and ShadCN UI.

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run Oxlint |

## Project structure

```
src/
├── api/           # HTTP client + endpoint functions
├── components/    # Shared UI components
├── pages/         # Route pages
├── providers/     # React context providers
└── routes/        # Router config
```

## API layer

- `src/api/client.ts` — shared `fetch` wrapper, base URL, error handling
- `src/api/app.ts` — domain endpoints (add more files as the app grows)
- Configure backend URL via `VITE_API_BASE_URL` in `.env`

## Add ShadCN components

```bash
pnpm dlx shadcn@latest add card input dialog
```
