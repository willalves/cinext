# Cinext

A movie discovery app built with **Next.js 16**, **React 19**, and **TypeScript**. Browse trending and popular movies, dive into detail pages with cast and trailers, search across TMDB's catalog, and build a personal watchlist.

This is a practicing project built to practice modern Next.js patterns end-to-end: Server Components, Server Actions, Suspense streaming, intercepted routes, optimistic UI, URL-as-state, and type-safe API consumption with Zod.

## Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack, React Compiler)
- **UI library** — [React 19](https://react.dev) with [shadcn/ui](https://ui.shadcn.com) on [Radix UI](https://radix-ui.com/) primitives
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) with CSS-first config
- **Language** — TypeScript (strict mode, `noUncheckedIndexedAccess`)
- **Validation** — [Zod](https://zod.dev) at every external boundary (API responses, cookies, env vars)
- **URL state** — [nuqs](https://nuqs.47ng.com) for type-safe search params
- **Persistence** — HTTP-only cookies (no database)
- **Typography** — [Geist Sans](https://vercel.com/font) via `next/font`
- **Testing** — [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + [Playwright](https://playwright.dev)
- **Tooling** — ESLint, Prettier (with Tailwind plugin), Husky + lint-staged, Conventional Commits

## Features

- **Cinematic home page** with a featured hero backdrop and three streaming-style movie rows (Trending, Popular, Top Rated), each streamed in parallel
- **Movie detail pages** with parallel-fetched cast, similar movies, runtime, genres, and rich SEO metadata
- **Trailer modal via intercepted routes** — `/movies/[id]/trailer` renders as a modal when navigated from the detail page, or a full page when accessed directly
- **Type-safe search** with URL-driven query and pagination, debounced input, and Suspense-keyed loading
- **Personal watchlist** backed by an HTTP-only cookie, with optimistic UI on toggle and an `AlertDialog`-confirmed clear flow
- **Dark mode** with class-based switching and no flash of incorrect theme
- **Skeleton states** matching real layouts dimension-for-dimension
- **View Transitions** for smooth page-to-page navigation (where the browser supports it)
- **Dynamic Open Graph images** for shareable link previews
- **Accessible by default** — semantic roles, `aria-label`s on icon buttons, `aria-pressed` on toggles, all locators verified via Playwright

## Notable patterns

The patterns I deliberately practiced while building this, with pointers to where to look in the code:

### Server Components by default

Every component is a Server Component unless interactivity demands otherwise. Client boundaries are pushed as deep into the tree as possible, so most components ship zero JavaScript to the browser.
→ Look at `src/components/site-header.tsx` (server) rendering `<ThemeToggle />` (client).

### Type-safe TMDB client

A single generic fetcher wraps `fetch`, adds auth, validates responses against Zod schemas, and returns types inferred from those schemas — write the shape once, get validation and types from the same source. The API token never reaches the browser, enforced with the `server-only` package.
→ `src/lib/tmdb/client.ts`, `src/lib/tmdb/schemas.ts`.

### Streaming with Suspense

The home page fires multiple data requests in parallel, each wrapped in its own Suspense boundary. The browser receives the shell and skeletons instantly, then each section streams in as its data resolves.
→ `src/app/page.tsx`.

### Intercepted routes for modals

The trailer route serves a modal when navigated from within the app, or a full page when opened directly — same URL, two presentations, all via file conventions.
→ `src/app/movies/[id]/@modal/(.)trailer/page.tsx` and the layout that wires the parallel slot.

### Optimistic UI with `useOptimistic`

Clicking "Add to watchlist" toggles the button label instantly while the Server Action runs in the background. React rolls back automatically if the action fails.
→ `src/features/watchlist/components/watchlist-button.tsx`.

### URL as state

Search query and pagination live in the URL via `nuqs`. Shareable, refresh-safe, browser-back compatible. No client state library needed for this category of UI.
→ `src/features/movies/components/search-input.tsx`, `search-pagination.tsx`.

### Cache invalidation via tags and paths

Each TMDB fetch is tagged. After a watchlist mutation, `revalidatePath('/', 'layout')` ensures the UI stays consistent without manual refetching.
→ `src/features/watchlist/actions.ts`.

### Feature-folder architecture

Routes stay thin and compose feature modules. Each feature owns its components, actions, types, and storage. Cross-feature imports are forbidden — shared concerns live in `lib/`.
→ `src/features/movies`, `src/features/watchlist`.

### Validate at every boundary

Environment variables (`src/lib/env.ts`), API responses (`src/lib/tmdb/schemas.ts`), and user-tamperable cookies (`src/features/watchlist/storage.ts`) all go through Zod. External data is never trusted blindly.

## Getting started

You'll need a free [TMDB](https://www.themoviedb.org) API token to run this locally.

### 1. Clone and install

```bash
git clone https://github.com/your-username/cinext.git
cd cinext
pnpm install
```

### 2. Get a TMDB token

1. Sign up at [themoviedb.org](https://www.themoviedb.org/signup).
2. Go to **Settings → API → Create → Developer**.
3. Copy the **API Read Access Token** (the long JWT-style string, not the v3 API key).

### 3. Configure environment

Create `.env.local` in the project root:

```bash
TMDB_READ_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Start dev server with Turbopack              |
| `pnpm build`        | Production build                             |
| `pnpm start`        | Run the production build locally             |
| `pnpm lint`         | Lint with ESLint                             |
| `pnpm typecheck`    | Run TypeScript without emitting              |
| `pnpm format`       | Format with Prettier                         |
| `pnpm format:check` | Verify formatting without writing            |
| `pnpm test`         | Unit and component tests in watch mode       |
| `pnpm test:run`     | Unit and component tests, one-shot           |
| `pnpm test:ui`      | Vitest UI mode                               |
| `pnpm test:e2e`     | Playwright end-to-end tests                  |
| `pnpm test:e2e:ui`  | Playwright UI mode                           |
| `pnpm ci`           | Full pipeline: typecheck + lint + unit + e2e |

## Project structure

```
src/
├── app/                          # Routes (App Router)
│   ├── layout.tsx                # Root layout, theme provider, header
│   ├── page.tsx                  # Home — streaming, parallel data fetch
│   ├── error.tsx                 # Route-level error boundary
│   ├── global-error.tsx          # Last-resort error boundary
│   ├── not-found.tsx             # Global 404
│   ├── opengraph-image.tsx       # Dynamic OG image
│   ├── sitemap.ts                # Generated sitemap
│   ├── robots.ts                 # Generated robots.txt
│   ├── movies/[id]/              # Movie detail
│   │   ├── layout.tsx            # Receives the @modal slot
│   │   ├── page.tsx              # Detail page
│   │   ├── loading.tsx           # Detail skeleton
│   │   ├── not-found.tsx         # Movie-specific 404
│   │   ├── trailer/page.tsx      # Full-page trailer (direct nav)
│   │   └── @modal/
│   │       ├── default.tsx
│   │       └── (.)trailer/       # Intercepted modal trailer
│   ├── search/                   # Search page
│   └── watchlist/                # Watchlist page
├── components/
│   ├── site-header.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/                       # shadcn/ui primitives
├── features/
│   ├── movies/                   # Movie cards, rows, hero, search
│   └── watchlist/                # Actions, storage, components
├── lib/
│   ├── env.ts                    # Zod-validated environment
│   ├── tmdb/                     # API client, schemas, endpoints, image helpers
│   └── utils.ts
└── hooks/

e2e/                              # Playwright tests
```

## Testing

Unit and component tests live colocated with source files (`*.test.ts(x)`). End-to-end tests live under `e2e/`.

```bash
pnpm test:run    # Unit and component
pnpm test:e2e    # End-to-end
```

The Playwright suite covers a full user flow — searching for a movie, opening its detail page, adding to the watchlist, and verifying it appears on `/watchlist` — plus a clear-watchlist flow with the confirmation dialog.

## A note on scope and AI assistance

No further improvements to this project are planned. It was built as a practice piece — it doesn't aim to cover 100% of a real-world professional codebase, but it carries a professional touch through the patterns and practices I work with day to day.

AI was part of my workflow throughout this project, the same way it is in my daily work as a developer. I use AI as a collaborator for practicality, for speed in problem-solving, and for help with topics I want to dig into. Being explicit about it here feels more honest than pretending otherwise.
