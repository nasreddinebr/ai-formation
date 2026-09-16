# DOCUMENTATION.md — AI Formation Website

> Last updated: September 15, 2026
> Version: 2.0.0

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
- **npm** 10.x or higher
- **Git** — [Download](https://git-scm.com/)

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

### Project Structure

```
ai-formation/
├── sources/                  # Curriculum source of truth
│   ├── formation-ia-complete.md    # module-0 inline anchor
│   ├── Module_01..10_*.md          # 10 technical modules
│   └── Section_A/B/C_*.md          # 3 transversal sections
├── src/
│   ├── app/                  # layout, homepage, module/[id], profile, auth
│   ├── components/           # layout, home, chapter, search, profile
│   ├── data/                 # modules.ts (meta) + curriculum.gen.ts (GENERATED)
│   ├── lib/                  # parse-chapter, curriculum, markdown, highlight…
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
   - Emits `src/data/curriculum.gen.ts` (14 modules, 78 chapters, 666 sections)
   - Emits `public/search-index.json` (666 entries)
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
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

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

### Profile & progress

- `useProgress` (useSyncExternalStore + localStorage, key `ai-formation-progress`)
- `/profile`: ProgressCard (overall + per-module bars) and a collapsible SectionChecklist (per-section checkboxes)
- Auth skeletons at `/auth/signin` & `/auth/signup` (disabled forms, link to `/profile`)

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

Runtime:
  Homepage    → RouteMap (SVG) + Hero + Manifest + 14 stage cards + ResumeBanner
  /module/[id]→ TOC scroll-spy, ChapterContent, ReadingTime, resources, prev/next, BackToTop
  Header      → SearchModal (Cmd+K) + theme toggle
  /profile    → ProgressCard + SectionChecklist
```

State hooks all use `useSyncExternalStore` (React 19) and persist to `localStorage`.

---

## Styling & Design

- **Framework:** Tailwind CSS 4.3.3 (CSS-first config, `@theme`)
- **Brand:** "Le Parcours / Learning Atlas" — warm paper + ink + copper-route palette (see `sources/PROJECT_MAP.md` for the full token table)
- **Atlas tokens:** `paper`, `paper2`, `card`, `ink`, `ink2`, `hair`, `route`, `route-deep`, `route-light`, `moss` — light + dark variants
- **Legacy aliases** (`primary`, `secondary`, `accent`, `neutral`, `background`, `foreground`, `muted`, `border`, `card`) map onto the palette
- **Fonts:** Fraunces (display), Inter (body), IBM Plex Mono (labels)
- **Article typography:** `.atlas-article` in `globals.css` styles the rendered markdown (chapter/section headings, code `pre`, task lists, tables)

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

No test framework configured. Build-time verification:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

*This document is the single source of truth for the project documentation.*