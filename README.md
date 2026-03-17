# registry-lite

A light version of the Registry — monorepo containing a Next.js frontend and a NestJS GraphQL backend.

## Structure

```
registry-lite/
├── apps/
│   ├── frontend/   # Next.js 16 app (React 19, Tailwind CSS, TypeScript)
│   └── backend/    # NestJS 11 app (GraphQL via Apollo Server 5, TypeScript)
├── packages/       # Shared packages (future)
├── turbo.json      # Turborepo pipeline config
├── tsconfig.base.json
└── package.json    # Root workspace config
```

## Getting started

Requires Node.js >= 20 and pnpm >= 10.

```bash
pnpm install
```

### Development

Run both apps in parallel:

```bash
pnpm dev
```

Or run individually:

```bash
# Frontend — http://localhost:3000
pnpm --filter frontend dev

# Backend — http://localhost:3000/graphql (GraphQL Playground)
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

NestJS 11 with code-first GraphQL (Apollo Server 5). The GraphQL Playground is available at `/graphql` when the server is running.
