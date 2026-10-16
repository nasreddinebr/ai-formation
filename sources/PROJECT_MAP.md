# PROJECT_MAP.md — AI Formation Website

> Last updated: October 14, 2026
> Status: COMPLETE — content migration + redesign + FastAPI back-office (auth, RBAC, profile, dashboard)

---

## [TECH_STACK]

| Layer | Technology | Version | Justification |
|---|---|---|---|
| Framework | Next.js | 16.2.10 (LTS) | App Router, Turbopack, SSG via `generateStaticParams()` |
| Language | TypeScript | 5.9.3 | Strict mode, `npx tsc --noEmit` clean |
| UI Library | React | 19.2.4 | Server Components, `useSyncExternalStore` |
| Styling | Tailwind CSS | 4.3.3 | CSS-first config (`@theme`), Atlas brand tokens |
| Runtime (web) | Node.js | 24.x LTS | Active LTS |
| Backend | Python + FastAPI | 3.14 / latest | Layered API, OpenAPI, async I/O |
| ORM (backend) | SQLAlchemy 2.0 async + asyncpg | 2.x | Mirrors the Prisma schema, async Postgres |
| Validation | Pydantic | v2 | Strict request/response schemas |
| Auth | Argon2id + PyJWT + opaque refresh | — | Argon2id hashing, HS256 access token, SHA-256 refresh |
| Content | Markdown | — | 13 source files + inline anchor, parsed at build time |
| State | localStorage + API | — | Guest progress/bookmark/theme; sync to API when signed in |
| Highlighting | shiki | 4.3.1 | Build-time syntax highlighting, pre-rendered HTML |
| Search | Custom Index | — | Build-time JSON (804 entries) + client-side scoring class |
| Scripts | tsx | — | `node --import tsx` for the build-time content generator |

---

## [SYSTEM_FLOW]

```
BUILD TIME (generator + SSG)
  sources/Module_XX_*.md + sources/Section_*.md
    |  + inline "module-0" anchor in sources/formation-ia-complete.md
    v
  scripts/build-content.ts  ──┬──> src/data/curriculum.gen.ts   (committed, 14 modules)
                              └──> public/search-index.json     (committed, 804 entries)
    v
  src/lib/curriculum.ts  (normalize, slugify, ids, chapters=#, sections=###) 
  src/lib/markdown.ts    (hand-rolled renderer → @@CODE:n@@ placeholders)
  src/lib/highlight.ts   (shiki → highlighted <pre> per block)
  src/lib/parse-chapter.ts (loadModuleMarkdown via MODULE_SOURCES + getChapterContent)
    -> 21 static pages (pre-highlighted HTML)

RUNTIME (CLIENT)
  Homepage -> RouteMap SVG + HERO + ResumeBanner (useBookmark)
  Homepage -> MediaSlider (planches + carrousel) + MotionBanner (SMIL play/pause)
  Module page -> TOC scroll-spy (IntersectionObserver) + ChapterContent + ReadingTime
  Module page -> SaveBookmark(visited) + ProgressTracker(API) + section checkmarks
  Header -> useTheme() toggles dark class on <html>
  Header -> useAuth() cluster (initials + logout) / Connexion link
  Header -> SearchModal (Cmd+K) -> custom SearchIndex class -> deep links /module/{id}#{sectionId}
  /auth/signin|signup -> forms -> AuthProvider.signIn/signUp
  /profile -> AccountPanel (info, started courses, change password) + ProgressCard + SectionChecklist

RUNTIME (API — FastAPI, /api)
  Browser -> /backend/* (Next route handler) -> API_PROXY_TARGET (backend:8000)
  Auth: csrf (double-submit) -> login/register -> HttpOnly af_access/af_refresh cookies
  401 -> client single-flight refresh -> retry
  Profile: GET/PATCH /api/profile, POST /api/profile/password
  Dashboard: GET /api/progress, PUT/DELETE /api/progress/{course_id}
  Admin: GET /api/admin/users, /api/admin/roles, PATCH role/active
```

---

## [ARCHITECTURE]

```
ai-formation/
├── sources/                        # CURRICULUM SOURCE OF TRUTH (13 files + inline)
│   ├── formation-ia-complete.md    (module-0 anchor + repositioned content)
│   ├── Module_01..10_*.md
│   └── Section_A/B/C_*.md
├── backend/                        # FASTAPI BACK-OFFICE
│   ├── app/
│   │   ├── main.py                 (create_app: middleware, routers, lifespan seed/schema)
│   │   ├── core/                   (config, constants, errors, security=Argon2/JWT)
│   │   ├── db/                     (base, session, models, seed — mirrors prisma/schema.prisma)
│   │   ├── rbac/                   (role levels, permission union, dependencies)
│   │   ├── schemas/                (Pydantic v2: auth, user, progress)
│   │   ├── repositories/           (data access per aggregate)
│   │   ├── services/               (auth, profile, progress, admin)
│   │   ├── api/                    (routes: auth, profile, progress, admin + cookies, deps)
│   │   └── middleware/             (csrf double-submit, error handling)
│   ├── tests/                      (30 tests: auth, rbac, profile, progress, config)
│   ├── requirements*.txt, pyproject.toml, Dockerfile, .dockerignore
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout: AuthProvider + Header + <main> + Footer)
│   │   ├── global-error.tsx        (Branded fr error boundary)
│   │   ├── page.tsx                (Homepage: Hero + RouteMap + Manifest + 14 stages)
│   │   ├── globals.css             (Tailwind v4 @theme, Atlas tokens light/dark + .atlas-article)
│   │   ├── backend/[...path]/      (route.ts: same-origin proxy to the FastAPI backend)
│   │   ├── module/[id]/            (page.tsx SSG via generateStaticParams; chips, TOC,
│   │   │                            ChapterContent, ProgressTracker, resources, prev/next)
│   │   ├── profile/page.tsx        (AccountPanel + ProgressCard + SectionChecklist)
│   │   └── auth/signin|signup       (Functional forms -> AuthProvider)
│   ├── components/
│   │   ├── layout/  Header.tsx (auth cluster), Footer.tsx
│   │   ├── home/    Hero.tsx, RouteMap.tsx, ManifestSection.tsx, ModuleCard.tsx, ResumeBanner.tsx
│   │   ├── media/   module-art.tsx (14 planches + sceaux SVG), ArtFrame.tsx,
│   │   │            MediaSlider.tsx (carrousel), MotionBanner.tsx (film SVG animé)
│   │   ├── chapter/ ChapterContent.tsx, TableOfContents.tsx, SaveBookmark.tsx,
│   │   │            ProgressTracker.tsx (API sync), ReadingTime.tsx, BackToTop.tsx
│   │   ├── search/  SearchModal.tsx
│   │   ├── providers/ AuthProvider.tsx (useAuth)
│   │   └── profile/ ProgressCard.tsx, SectionChecklist.tsx, AccountPanel.tsx, StartedCourses.tsx
│   ├── data/
│   │   ├── modules.ts              (meta + overlay of curriculum.gen.ts; getModuleById/BySlug)
│   │   ├── curriculum.gen.ts       (GENERATED — committed; rebuild with build:content)
│   │   └── resources.ts            (per-module external links, has `language` field)
│   ├── lib/
│   │   ├── api/                    (client.ts: api + ApiError, CSRF + refresh; types.ts)
│   │   ├── curriculum.ts           (pure parsing: normalize, slugify, ids, countReadingMinutes)
│   │   ├── markdown.ts             (hand-rolled renderer; inline formatting, tables, tasks)
│   │   ├── highlight.ts            (shiki wrapper; LANG_ALIASES incl. gitignore→plaintext)
│   │   ├── parse-chapter.ts        (MODULE_SOURCES mapping 0-13 + getChapterContent)
│   │   ├── reading-time.ts         (word count → minutes)
│   │   ├── search-index.ts         (SearchIndex class with scoring)
│   │   └── constants.ts            (Atlas difficulty chips, nav, localStorage keys)
│   └── hooks/  use-bookmark.ts, use-theme.ts, use-progress.ts
├── scripts/
│   └── build-content.ts            (generator: curriculum.gen.ts + public/search-index.json)
├── prisma/                         (schema.prisma + migration auth_rbac_user_profile)
├── public/
│   └── search-index.json           (GENERATED — committed, 804 entries)
├── docker-compose.yml, docker-compose.prod.yml
├── DOCUMENTATION.md
└── package.json                    (predev + build:search + backend:* scripts)
```

---

## [DESIGN_TOKENS — Atlas "Learning Atlas"]

| Token | Light | Dark |
|---|---|---|
| paper | `#f3eddf` | `#151a20` |
| paper2 | `#e9e1cf` | `#222b34` |
| card | `#fbf6ea` | `#1c232b` |
| ink | `#22303c` | `#ece5d4` |
| ink2 | `#4a5a68` | `#a79e8d` |
| hair | `#d6cab0` | `#303a46` |
| route | `#b4633b` | `#d98e62` |
| route-deep | `#8a3d13` | `#f0c5aa` |
| route-light | `#dea375` | `#eab897` |
| moss | `#5c7260` | `#8aa080` |

Legacy aliases (`primary`, `secondary`, `accent`, `neutral`, `background`, `foreground`, `muted`, `border`, `card`) map onto the palette so older components remain compatible.

Fonts: **Fraunces** (display/serif headings), **Inter** (body), **IBM Plex Mono** (labels/numbers).

---

## [ORPHANS & PENDING]

Content pipeline delivered and verified:

| Task | Status |
|---|---|
| 13 sources + inline module-0 anchor → single build-time pipeline | DONE |
| `curriculum.gen.ts` + `public/search-index.json` generated & committed | DONE |
| Module titles from content (incl. ALL-CAPS fallback, FORMATION IA MODULE N — prefix) | DONE |
| Section rules (### sections; #### promoted when ≤4 ### — module 0 → 19 sections) | DONE |
| Chapter rule (`# CHAPITRE X.Y`, letter+num OK) | DONE |
| Hand-rolled markdown renderer (tables, nested lists, tasks, blockquote, images) | DONE |
| shiki highlighting baked at build time (all 205 code blocks) | DONE |
| Atlas redesign: Header, Footer, Homepage (RouteMap/Manifest/Cards), module page, profile, auth | DONE |
| Preview routes `/1 /2 /3` + `PreviewChrome` removed; layout uses Header/Footer directly | DONE |
| `npm run build` (generator + Next) PASS — 21 pages | DONE |
| `npm run lint` PASS — 0 errors; `npx tsc --noEmit` PASS | DONE |
| Browser smoke tests: search deep-link, progress persistence, dark mode, tables, code | DONE |
| Prisma schema + migration `auth_rbac_user_profile` (Role/User/UserProgress/RefreshToken) | DONE |
| FastAPI back-office (auth, RBAC inheritance, profile, dashboard) + layered architecture | DONE |
| Admin seeded idempotently (id 1, role ADMIN) on startup / `python -m app.db.seed` | DONE |
| Backend tests: 30 passed (pytest, SQLite in-memory); ruff clean | DONE |
| Docker: `backend` service (dev + prod), `/backend` proxy, healthchecks, prod secrets required | DONE |
| Frontend wiring: AuthProvider, api client, Header cluster, signin/signup, profile, ProgressTracker | DONE |

### Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Content sources | Per-file markdown in `sources/` | Cleaner than one giant anchor-based file |
| Generated data | Committed `curriculum.gen.ts` + `search-index.json` | Stable builds without network/dynamic parsing |
| Markdown rendering | Custom renderer, zero deps | Full control over ids/structure parity with TOC+search |
| Syntax highlighting | shiki at build time | Pre-rendered HTML, no client-side lib |
| Search approach | Custom `SearchIndex` class + build-time JSON | No server needed |
| Progress storage | localStorage via `useSyncExternalStore` | Consistent with bookmark pattern |
| Design direction | `n1` "Le Parcours (Learning Atlas)" | User-approved; distinctive, map-first home |
| Backend data layer | SQLAlchemy 2.0 async + asyncpg (mirrors Prisma) | Async API over the Prisma-owned schema |
| Web ↔ API transport | Node route handler proxy `/backend/*` | Runtime target, no baked build-time env |
| Session transport | HttpOnly cookies + CSRF double-submit | XSS/CSRF safe, no token in JS storage |

---

## [VERIFICATION]

| Check | Result |
|---|---|
| `npm run build` | PASS — generator ran, 21 pages generated |
| `npm run lint` | PASS — 0 errors, 0 warnings |
| TypeScript (`npx tsc --noEmit`) | PASS — no type errors |
| Search index | PASS — 804 entries generated |
| Content totals | 14 modules, 79 chapters, 816 sections |
| Static page count | 21 (homepage + 14 modules + signin + signup + profile + not-found) |
| Highlighting | PASS — all code fences render `pre.shiki` |
| Smoke tests (Chrome) | search deep-link to section anchor, progress persists across reload, dark mode toggle, module content (tables/code/TOC/nav) |
| Backend tests (`pnpm backend:test`) | PASS — 30 passed (auth, rbac, profile, progress, config) |
| Backend lint (`pnpm backend:lint`) | PASS — ruff, no issues |
| End-to-end (proxy) | PASS — csrf → login (admin id 1) → me → progress PUT/GET/DELETE → logout |

---

*This document is the single source of truth for the project architecture.*