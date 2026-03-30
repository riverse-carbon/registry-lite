# registry-lite

A light version of the Registry — monorepo containing a Next.js frontend and a NestJS GraphQL backend.

## Structure

```
registry-lite/
├── apps/
│   ├── frontend/        # Next.js 16 app (React 19, Tailwind CSS, TypeScript)
│   └── backend/         # NestJS 11 app (GraphQL via Apollo Server 5, TypeScript + Prisma)
│       ├── prisma/      # Prisma schema and migrations
│       └── docker-compose.yml  # Local PostgreSQL database
├── packages/            # Shared packages (future)
├── turbo.json           # Turborepo pipeline config
├── tsconfig.base.json
└── package.json         # Root workspace config
```

## Prerequisites

- Node.js >= 20
- pnpm >= 10
- Docker (for the local database)

## Getting started

Install dependencies:

```bash
pnpm install
```

### Database

Start the local PostgreSQL database (from `apps/backend/`, or prefix with `pnpm --filter backend`):

```bash
pnpm --filter backend db:up
```

Apply migrations, generate prisma client & graphql types:

```bash
pnpm --filter backend prisma migrate reset
```

Other database commands:

| Command | Description |
|---|---|
| `pnpm --filter backend db:down` | Stop the database container |
| `pnpm --filter backend db:reset` | Destroy all data and recreate the database |
| `pnpm --filter backend db:studio` | Open Prisma Studio (database GUI) |

### Development

Run both apps in parallel:

```bash
pnpm dev
```

Or run individually:

```bash
# Frontend — http://localhost:3000
pnpm --filter frontend dev

# Backend — http://localhost:3001/graphql (GraphQL Playground)
pnpm --filter backend dev
```

### Build

```bash
pnpm build
```

### Lint, format & typecheck

```bash
pnpm lint        # biome check via Turbo (all packages)
pnpm check       # biome check across entire repo at once
pnpm format      # biome format --write
pnpm typecheck   # tsc --noEmit via Turbo (all packages)
```

## Apps

### `apps/frontend`

Next.js 16 with the App Router, Tailwind CSS v4, and TypeScript.

### `apps/backend`

NestJS 11 with code-first GraphQL (Apollo Server 5) and Prisma ORM. The GraphQL Playground is available at `/graphql` when the server is running.

The `docker-compose.yml` for the local PostgreSQL database lives here. All database scripts (run from `apps/backend/` or prefixed with `pnpm --filter backend`):

| Script | Description |
|---|---|
| `db:up` | Start the local PostgreSQL container |
| `db:down` | Stop the database container |
| `db:reset` | Destroy all data and recreate the database |
| `db:seed` | Seed the database with initial data |
| `db:generate` | Regenerate the Prisma client and NestJS/GraphQL types |
| `db:migrate` | Create and apply a new migration (dev) |
| `db:migrate:deploy` | Apply pending migrations (production) |
| `db:studio` | Open Prisma Studio |
