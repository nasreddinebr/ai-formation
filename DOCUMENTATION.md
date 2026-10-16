# DOCUMENTATION.md — AI Formation Website

> Last updated: October 14, 2026
> Version: 3.0.0

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Local Development](#local-development)
3. [Content Pipeline](#content-pipeline)
4. [Build & Deployment](#build--deployment)
5. [Features Overview](#features-overview)
6. [Architecture](#architecture)
7. [Styling & Design](#styling--design)
8. [Contributing](#contributing)

---

## Getting Started

### Prerequisites

- **Node.js** 24.x LTS (Krypton) — [Download](https://nodejs.org/)
- **npm** 10.x or higher (or **pnpm** 11)
- **Git** — [Download](https://git-scm.com/)
- **Docker Desktop** — recommended (runs web + backend + PostgreSQL)
- **Python** 3.14 (only for running the FastAPI backend outside Docker)

### Quick Start

```bash
# Install dependencies
npm install

# Start the dev server (predev auto-generates content data)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Local Development

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (runs content generator first) |
| `npm run build` | Generate content + search index, then build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run build:search` | Re-run the content generator only |
| `npx tsc --noEmit` | TypeScript type check |
| `pnpm backend:dev` | Run the FastAPI backend locally (uvicorn --reload) |
| `pnpm backend:test` | Run backend tests (pytest, SQLite in-memory) |
| `pnpm backend:lint` | Lint the backend (ruff check) |
| `pnpm backend:format` | Format the backend (ruff format) |
| `pnpm docker:backend-logs` | Tail the backend container logs |

### Project Structure

```
ai-formation/
├── sources/                  # Curriculum source of truth
│   ├── formation-ia-complete.md    # module-0 inline anchor
│   ├── Module_01..10_*.md          # 10 technical modules
│   └── Section_A/B/C_*.md          # 3 transversal sections
├── backend/                  # FastAPI back-office (layered architecture)
│   ├── app/
│   │   ├── main.py           # create_app: middleware + routers + lifespan (seed/schema)
│   │   ├── core/             # config, constants, errors, security (Argon2id, JWT)
│   │   ├── db/               # base, session, models (mirror of prisma/schema.prisma), seed
│   │   ├── rbac/             # role levels + permission inheritance
│   │   ├── schemas/          # Pydantic v2 (auth, user, progress)
│   │   ├── repositories/     # data access per aggregate
│   │   ├── services/         # auth, profile, progress, admin
│   │   ├── api/              # routes (auth, profile, progress, admin) + cookies/deps
│   │   └── middleware/       # csrf + error handling
│   └── tests/                # pytest suite
├── prisma/                   # schema.prisma + migrations (schema source of truth)
├── src/
│   ├── app/                  # layout, homepage, module/[id], backend proxy, profile, auth, global-error
│   ├── components/           # layout, home, media, chapter, search, providers, profile
│   ├── data/                 # modules.ts (meta) + curriculum.gen.ts (GENERATED)
│   ├── lib/                  # api/ (client+types), parse-chapter, curriculum, markdown, highlight…
│   └── hooks/                # use-bookmark, use-theme, use-progress
├── scripts/
│   └── build-content.ts      # generator: gen data + search index
├── public/
│   └── search-index.json     # GENERATED, committed
└── package.json
```

---

## Content Pipeline

The curriculum lives in `sources/`. Build order:

1. `scripts/build-content.ts` (via `predev` / `build` / `build:search`):
   - Parses each source, builds chapter/section structure (`src/lib/curriculum.ts`)
   - Emits `src/data/curriculum.gen.ts` (14 modules, 79 chapters, 816 sections)
   - Emits `public/search-index.json` (804 entries)
2. SSG during `next build`:
   - Each `/module/[id]` page calls `getChapterContent(id)` (`src/lib/parse-chapter.ts`)
   - `MODULE_SOURCES` maps ids 0–13 → per-module file or the inline `module-0` anchor
   - Markdown is rendered by the custom renderer (`src/lib/markdown.ts`) with `@@CODE:n@@` placeholders, then each block is highlighted with shiki (`src/lib/highlight.ts`)

Both generated files are **committed**; regenerate whenever sources change.

### Structure rules

- **Chapters:** level-1 headings `# CHAPITRE X.Y` (letter + number allowed, e.g. `B.1`)
- **Sections:** level-3 headings `###`. If a module has ≤4 level-3 headings, its `####` headings are promoted to sections (module 0 → 19 sections).
- **Module title:** first level-1/level-2 heading matching `MODULE`/`SECTION`; cleaned of `MODULE N -` / `SECTION TRANSVERSALE X —` prefixes; ALL-CAPS titles fall back to the curated meta title.
- URLs keep ids 0–13; section deep links are `/module/{id}#{sectionId}`.

---

## Build & Deployment

### Local Build

```bash
npm run build        # generator + Next.js build (outputs .next/)
npm run start        # serve the production build
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO | `https://ai-formation.dev` |
| `NEXT_PUBLIC_API_BASE` | API base used by the browser (empty → same-origin `/backend`) | `` (empty) |
| `API_PROXY_TARGET` | Server-side target of the `/backend/*` proxy | `http://backend:8000` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |
| `DATABASE_URL` | Postgres URL (shared with Prisma; backend normalizes to asyncpg) | — |
| `JWT_SECRET_KEY` | Access/refresh signing secret (**required in production**) | dev auto-generated |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token lifetime | `15` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh token lifetime | `14` |
| `COOKIE_SECURE` / `COOKIE_DOMAIN` | Cookie flags (`Secure` in production) | env-derived |
| `CORS_ORIGINS` | Extra allowed origins (comma-separated) | `http://localhost:3000` |
| `AUTO_CREATE_SCHEMA` | Backend `create_all` at startup (dev) | `true` |
| `SEED_ON_STARTUP` | Seed the default admin at startup | `true` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Bootstrap admin credentials | see README |

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variables
4. Deploy automatically on push to `main` (GitHub Actions pipeline in `.github/workflows/ci.yml`)

---

## Features Overview

### Content richness

- **Syntax highlighting:** shiki 4.3.1 at build time, theme `github-dark`. Languages: Python, JavaScript, TypeScript, Bash, JSON, YAML, HTML, CSS, Markdown, SQL, Rust, Go, Java, C, C++, Dockerfile, Nginx, GraphQL, Shell, Plaintext. Aliases map `gitignore → plaintext`, `sh/zsh → bash`, `py → python`.
- **Reading time:** custom word-count algorithm (`reading-time.ts`), ~200 words/min (French).
- **Back-to-top:** appears after 400px, smooth-scroll, `aria-label="Retour en haut"`.
- **Markdown renderer:** hand-rolled (`markdown.ts`) — headings, paragraphs, blockquotes, tables, nested lists + task checks, horizontal rules, and inline code/bold/italic/strikethrough/links/images.

### Media & illustrations

- **Plate set:** `src/components/media/module-art.tsx` renders one hand-authored SVG
  “atlas plate” per module (0–13) and a matching compact seal, inline and driven by the
  Atlas CSS tokens so light and dark mode stay in sync — no binary assets, no extra requests.
- **Frames & formats:** `ArtFrame` wraps a plate with its plate number, tag and caption,
  and accepts a Tailwind aspect ratio (used for the wide module cover).
- **Slider:** `MediaSlider` is the homepage carousel of journey highlights (auto-advance,
  pause on hover/focus, arrow-key navigation, `prefers-reduced-motion` aware).
- **Motion banner:** `MotionBanner` is an animated SVG “film” of the route — the path draws
  itself, milestones appear in sequence and a dot travels the path; play/pause drives SMIL
  via `pauseAnimations()`.

### Profile & progress

- `useProgress` (useSyncExternalStore + localStorage, key `ai-formation-progress`)
- `/profile`: `AccountPanel` (info, started courses, change password) for signed-in
  users, plus `ProgressCard` (overall + per-module bars) and a collapsible
  `SectionChecklist` (per-section checkboxes) as the guest/local view
- Auth forms at `/auth/signin` & `/auth/signup` call `useAuth()`
  (`AuthProvider` → `src/lib/api/client.ts`)

### Back-office (FastAPI)

- **Auth**: `POST /api/auth/register|login|logout|refresh`, `GET /api/auth/csrf|me`.
  Sessions use HttpOnly cookies (`af_access`, `af_refresh`) and a CSRF
  double-submit cookie (`af_csrf`, echoed via the `x-csrf-token` header).
- **RBAC**: fixed roles — `ADMIN` (level 3), `CONTRIBUTOR`/`MODERATOR` (level 2),
  `USER` (level 1, default), `ANONYMOUS` (level 0). A role inherits the union of
  permissions of roles with a **strictly lower** level (parallel roles do not
  inherit each other).
- **Profile**: `GET/PATCH /api/profile`, `POST /api/profile/password`
  (current + new password).
- **Dashboard**: `GET /api/progress` lists started courses with a deep link to
  the last visited chapter; `PUT/DELETE /api/progress/{course_id}` upsert/remove.
- **Admin**: `GET /api/admin/users`, `GET /api/admin/roles`, role/active toggles
  (requires an ADMIN session).

### Search

- **Index:** generated at build time → `public/search-index.json` (666 entries)
- **Modal:** header button or `Cmd+K` / `Ctrl+K`
- **Scoring:** title (3x) > section (2x) > content (1x); max 10 results
- **Keyboard:** ↑↓ navigate, Enter opens `/module/{id}#{sectionId}`, Esc closes

### Bookmarks & theme

- `useBookmark` (`ai-formation-last-visited`) powers the ResumeBanner CTA
- `useTheme` (`ai-formation-theme`) toggles the `dark` class on `<html>`; auto-detects system preference

---

## Architecture

```
Build time:
  sources/ → build-content.ts → curriculum.gen.ts + search-index.json
  sources/ → getChapterContent() → markdown.ts + highlight.ts + reading-time.ts → static HTML

Runtime (web):
  Homepage    → Hero (+ plate) + RouteMap (SVG) + MediaSlider + Manifest + 14 stage cards + MotionBanner
  /module/[id]→ TOC scroll-spy, ChapterContent, ProgressTracker, ReadingTime, resources, prev/next
  Header      → SearchModal (Cmd+K) + theme toggle + auth cluster
  /profile    → AccountPanel + ProgressCard + SectionChecklist

Runtime (API):
  Browser → /backend/* (route handler) → API_PROXY_TARGET → FastAPI → Postgres
  Auth (csrf/login/register/refresh/logout) · Profile · Progress · Admin
```

State hooks all use `useSyncExternalStore` (React 19) and persist to `localStorage`;
signed-in progress is additionally synced to the API (`src/lib/api/client.ts`).

---

## Styling & Design

- **Framework:** Tailwind CSS 4.3.3 (CSS-first config, `@theme`)
- **Brand:** "Le Parcours / Learning Atlas" — warm paper + ink + copper-route palette (see `sources/PROJECT_MAP.md` for the full token table)
- **Atlas tokens:** `paper`, `paper2`, `card`, `ink`, `ink2`, `hair`, `route`, `route-deep`, `route-light`, `moss` — light + dark variants
- **Legacy aliases** (`primary`, `secondary`, `accent`, `neutral`, `background`, `foreground`, `muted`, `border`, `card`) map onto the palette
- **Fonts:** Fraunces (display), Inter (body), IBM Plex Mono (labels)
- **Article typography:** `.atlas-article` in `globals.css` styles the rendered markdown (chapter/section headings, code `pre`, task lists, tables)
- **Illustrations:** all imagery is generated inline SVG (`src/components/media/`) painted with the Atlas tokens (`--color-route`, `--color-moss`, `--color-hair`…), so it inherits both themes automatically

---

## Contributing

### Code Style

- TypeScript strict mode
- ESLint with `eslint-config-next` (`npm run lint`, zero warnings)
- No comments unless explicitly requested
- Feature-folder component structure

### Changing the curriculum

1. Edit the relevant file(s) in `sources/`
2. Run `npm run build:search` to regenerate `curriculum.gen.ts` + `search-index.json`
3. Commit the generated files alongside your source change

### Testing

Frontend build-time verification:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Backend (pytest + ruff):

```bash
pnpm backend:lint
pnpm backend:test      # 30 tests, SQLite in-memory, no Postgres required
```

---

*This document is the single source of truth for the project documentation.*