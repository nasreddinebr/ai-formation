# DOCUMENTATION.md — AI Formation Website

> Last updated: July 19, 2026
> Version: 1.0.0

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Local Development](#local-development)
3. [Build & Deployment](#build--deployment)
4. [Features Overview](#features-overview)
5. [Architecture](#architecture)
6. [Configuration](#configuration)
7. [Contributing](#contributing)

---

## Getting Started

### Prerequisites

- **Node.js** 24.x LTS (Krypton) — [Download](https://nodejs.org/)
- **npm** 10.x or higher
- **Git** — [Download](https://git-scm.com/)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/ai-formation.git
cd ai-formation

# Install dependencies
npm install

# Generate search index
npm run build:search

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Local Development

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Generate search index + build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run build:search` | Generate search index only |

### Project Structure

```
ai-formation/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Header, Footer, metadata)
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Tailwind v4 theme config
│   │   ├── module/[id]/        # Dynamic chapter pages (SSG)
│   │   ├── profile/            # User profile + progress
│   │   └── auth/               # Auth skeletons (signin, signup)
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # Hero, ModuleCard, ResumeBanner
│   │   ├── chapter/            # ChapterContent, TableOfContents, ReadingTime, BackToTop, SaveBookmark
│   │   ├── search/             # SearchModal
│   │   └── profile/            # ProgressCard, SectionChecklist
│   ├── data/                   # modules.ts, resources.ts, search-index.json
│   ├── lib/                    # constants.ts, parse-chapter.ts, highlight.ts, reading-time.ts, search-index.ts
│   └── hooks/                  # use-bookmark.ts, use-theme.ts, use-progress.ts
├── scripts/                    # build-search-index.ts
├── content/                    # formation-ia-complete.md (source curriculum)
├── public/                     # Static assets, search-index.json
└── .github/workflows/          # CI/CD pipeline
```

### Content Management

The curriculum is stored in `content/formation-ia-complete.md`. Each module is identified by an anchor tag:

```markdown
<a name="module-0"></a>
## MODULE 0 — TITLE
```

The `parse-chapter.ts` script extracts content between anchors at build time.

---

## Build & Deployment

### Local Build

```bash
# Full build (search index + Next.js)
npm run build

# Output: .next/ directory (production-ready)
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO | `https://ai-formation.dev` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to `main`

### Deploy to Render

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
   - **Node Version:** 24
4. Add environment variables

### Deploy to AWS (Manual)

```bash
# Build
npm run build

# Export static files (if needed)
npx next export

# Deploy to S3 + CloudFront
aws s3 sync .next s3://your-bucket
```

### GitHub Actions CI/CD

The pipeline (`.github/workflows/ci.yml`) runs:

1. **Lint** — ESLint check
2. **Type Check** — TypeScript compilation
3. **Build** — Full production build
4. **Deploy** — Auto-deploy to Vercel on `main` push

Required GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SITE_URL`

---

## Features Overview

### M9: Content Richness

#### Syntax Highlighting

- **Technology:** shiki 4.3.1 (build-time)
- **Languages supported:** Python, JavaScript, TypeScript, Bash, JSON, YAML, HTML, CSS, Markdown, SQL, Rust, Go, Java, C, C++
- **Theme:** github-dark
- **How it works:** Code blocks are highlighted at build time via `highlight.ts`, pre-rendered HTML served as-is (no client-side processing)

#### Reading Time Estimation

- **Technology:** Custom word-count algorithm (`reading-time.ts`)
- **Calculation:** 200 words/minute (French reading speed)
- **Display:** Clock icon + "X min de lecture" badge in chapter header
- **Component:** `ReadingTime.tsx`

#### Back-to-Top Button

- **Behavior:** Appears after 400px scroll, smooth-scrolls to top
- **Component:** `BackToTop.tsx`
- **Accessibility:** `aria-label="Retour en haut"`

### M10: Profile & Progress Tracking

#### Progress Hook

- **Technology:** `useSyncExternalStore` + localStorage
- **Storage key:** `ai-formation-progress`
- **Data structure:**
  ```typescript
  {
    visitedModules: number[];
    completedSections: Record<number, string[]>;
  }
  ```

#### Profile Page (`/profile`)

- **ProgressCard:** Shows overall progress bar + per-module progress
- **SectionChecklist:** Checkbox list of all sections across all modules
- **Persistence:** All data stored in localStorage (no backend)

#### Auth Skeletons

- **Sign-in/Sign-up pages:** Form skeletons with disabled inputs
- **Links to:** `/profile` ("Continuer sans compte")

### M11: Search

#### Search Index

- **Generation:** `scripts/build-search-index.ts` runs at build time
- **Output:** `public/search-index.json` (86 entries)
- **Content indexed:** Module titles, section titles, content snippets (200 chars)

#### Search Modal

- **Trigger:** Header search button or `Cmd+K` / `Ctrl+K`
- **Technology:** Custom `SearchIndex` class with scoring algorithm
- **Scoring:** Title match (3x) > Section match (2x) > Content match (1x)
- **Keyboard navigation:** ↑↓ to navigate, Enter to select, Esc to close
- **Results:** Max 10, sorted by relevance

---

## Architecture

### Data Flow

```
Build Time:
  formation-ia-complete.md
    → parse-chapter.ts (extract sections)
    → highlight.ts (shiki syntax highlighting)
    → reading-time.ts (word count)
    → Static HTML pages

  scripts/build-search-index.ts
    → public/search-index.json

Runtime:
  Homepage → useBookmark() → ResumeBanner
  Module page → ChapterContent (pre-highlighted HTML)
  Module page → ReadingTime badge
  Module page → BackToTop button
  Module page → useProgress() → Save section completion
  Header → SearchModal (Cmd+K)
  /profile → ProgressCard + SectionChecklist
```

### State Management

| Hook | Purpose | Storage |
|---|---|---|
| `useBookmark` | Last visited module | localStorage |
| `useTheme` | Dark/light mode | localStorage + `class` on `<html>` |
| `useProgress` | Section completion + modules visited | localStorage |

All hooks use `useSyncExternalStore` for React 19 compatibility.

### Styling

- **Framework:** Tailwind CSS 4.3.3 (CSS-first config)
- **Theme:** Custom light/dark tokens in `globals.css`
- **Colors:** Primary `#355872`, Secondary `#7AAACE`, Accent `#9CD5FF`, Neutral `#F7F8F0`

---

## Configuration

### Tailwind CSS

Custom theme defined in `src/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: #355872;
  --color-secondary: #7AAACE;
  --color-accent: #9CD5FF;
  --color-neutral: #F7F8F0;
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-card: #ffffff;
  --color-border: #e5e7eb;
  --color-muted: #6b7280;
}
```

### Dark Mode

- **Strategy:** `class` on `<html>` element
- **Toggle:** Header sun/moon button
- **Persistence:** localStorage key `ai-formation-theme`
- **System preference:** Auto-detected on first visit

---

## Contributing

### Code Style

- TypeScript strict mode
- ESLint with `eslint-config-next`
- No comments unless explicitly requested
- Component-based architecture (feature folders)

### Commit Convention

Use conventional commits:
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `chore:` — Maintenance

### Testing

Currently no test framework configured. When adding tests:
1. Install `vitest` or `jest`
2. Add test scripts to `package.json`
3. Update CI/CD pipeline

---

*This document is the single source of truth for the project documentation.*
