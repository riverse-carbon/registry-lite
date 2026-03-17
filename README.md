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

Requires Node.js >= 20.

```bash
npm install
```

### Development

Run both apps in parallel:

```bash
npm run dev
```

Or run individually:

```bash
# Frontend — http://localhost:3000
npm run dev --workspace=apps/frontend

# Backend — http://localhost:3000/graphql (GraphQL Playground)
npm run dev --workspace=apps/backend
```

### Build

```bash
npm run build
```

### Lint & typecheck

```bash
npm run lint
npm run typecheck
```

## Apps

### `apps/frontend`

Next.js 16 with the App Router, Tailwind CSS v4, and TypeScript.

### `apps/backend`

NestJS 11 with code-first GraphQL (Apollo Server 5). The GraphQL Playground is available at `/graphql` when the server is running.
