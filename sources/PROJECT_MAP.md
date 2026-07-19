# PROJECT_MAP.md — AI Formation Website

> Last updated: July 19, 2026
> Status: COMPLETE — M1-M11 all delivered

---

## [TECH_STACK]

| Layer | Technology | Version | Justification |
|---|---|---|---|
| Framework | Next.js | 16.2.10 (LTS) | App Router, Turbopack default, SSG via `generateStaticParams()` |
| Language | TypeScript | 5.9.3 | Battle-tested stable |
| UI Library | React | 19.2.4 | Server Components, `useSyncExternalStore` |
| Styling | Tailwind CSS | 4.3.3 | CSS-first config (`@theme`), native dark mode |
| Runtime | Node.js | 24.x LTS | Active LTS until Apr 2028 |
| Content | Markdown | — | Parsed at build time via `parse-chapter.ts` |
| State | localStorage | — | Bookmark + theme + progress persistence |
| Highlighting | shiki | 4.3.1 | Build-time syntax highlighting, pre-rendered HTML |
| Search | Custom Index | — | Build-time JSON + client-side scoring class |
| CI/CD | GitHub Actions | — | Lint, typecheck, build, deploy to Vercel |

---

## [SYSTEM_FLOW]

```
BUILD TIME (SSG)
  formation-ia-complete.md
    -> parse-chapter.ts
    -> shiki (highlight.ts)
    -> reading-time (reading-time.ts)
    -> 21 pages (pre-highlighted HTML)

  scripts/build-search-index.ts
    -> public/search-index.json (86 entries)

RUNTIME (CLIENT)
  Homepage -> useBookmark() -> ResumeBanner CTA
  Module page -> useBookmark() saves lastVisitedChapter
  Module page -> ReadingTime badge, BackToTop button
  Module page -> useProgress() saves section checkmarks
  Header -> useTheme() toggles dark class on <html>
  Header -> SearchModal (Cmd+K) -> custom SearchIndex class
  /profile -> useProgress() -> ProgressCard + Checklist
```

---

## [ARCHITECTURE]

```
ai-formation/
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout: Header + Footer + metadata)
│   │   ├── page.tsx                (Homepage: Hero + ModuleGrid + ResumeBanner)
│   │   ├── globals.css             (Tailwind v4 @theme with light/dark tokens)
│   │   ├── module/[id]/
│   │   │   ├── page.tsx            (Dynamic chapter page, SSG, async getChapterContent)
│   │   │   └── not-found.tsx       (404 page)
│   │   ├── profile/
│   │   │   └── page.tsx            (Profile + progress dashboard)
│   │   └── auth/
│   │       ├── signin/page.tsx     (Sign-in skeleton, links to /profile)
│   │       └── signup/page.tsx     (Sign-up skeleton, links to /profile)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          (Nav + theme toggle + SearchModal trigger)
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   └── ResumeBanner.tsx
│   │   ├── chapter/
│   │   │   ├── ChapterContent.tsx  (Renders pre-highlighted HTML)
│   │   │   ├── TableOfContents.tsx (IntersectionObserver scroll spy)
│   │   │   ├── SaveBookmark.tsx    (Auto-saves bookmark on visit)
│   │   │   ├── ReadingTime.tsx     (X min de lecture badge)
│   │   │   └── BackToTop.tsx       (Floating scroll-to-top after 400px)
│   │   ├── search/
│   │   │   └── SearchModal.tsx     (Overlay search with keyboard nav)
│   │   └── profile/
│   │       ├── ProgressCard.tsx    (Overall + per-module progress bars)
│   │       └── SectionChecklist.tsx (Per-section checkboxes)
│   ├── data/
│   │   ├── modules.ts             (14 module definitions)
│   │   ├── resources.ts           (Per-module links)
│   │   └── search-index.json      (GENERATED at build, 86 entries)
│   ├── lib/
│   │   ├── constants.ts           (Colors, nav, localStorage keys)
│   │   ├── parse-chapter.ts       (Extract + highlight markdown sections)
│   │   ├── highlight.ts           (Shiki wrapper, build-time)
│   │   ├── reading-time.ts        (Word count -> minutes)
│   │   └── search-index.ts        (SearchIndex class with scoring)
│   └── hooks/
│       ├── use-bookmark.ts        (useSyncExternalStore + localStorage)
│       ├── use-theme.ts           (useSyncExternalStore + dark mode)
│       └── use-progress.ts        (useSyncExternalStore + section checkmarks)
├── scripts/
│   └── build-search-index.ts      (Generates search-index.json)
├── content/
│   └── formation-ia-complete.md   (Source curriculum)
├── public/
│   └── search-index.json          (GENERATED, 86 entries)
├── .github/workflows/
│   └── ci.yml                     (GitHub Actions CI/CD pipeline)
├── DOCUMENTATION.md               (Getting started, deployment, features)
└── package.json
```

---

## [DESIGN_TOKENS]

| Token | Light | Dark |
|---|---|---|
| Primary | #355872 | #355872 |
| Secondary | #7AAACE | #7AAACE |
| Accent | #9CD5FF | #9CD5FF |
| Neutral | #F7F8F0 | — |
| Background | #ffffff | #0f172a |
| Card | #ffffff | #1e293b |
| Foreground | #1a1a1a | #e2e8f0 |

---

## [ORPHANS & PENDING]

| ID | Task | Milestone | Status |
|---|---|---|---|
| P-01 | Scaffold Next.js project + install deps | M1 | DONE |
| P-02 | Configure Tailwind v4 with custom theme | M1 | DONE |
| P-03 | Create folder structure | M1 | DONE |
| P-04 | Extract module metadata into `modules.ts` | M2 | DONE |
| P-05 | Extract resources into `resources.ts` | M2 | DONE |
| P-06 | Build `parse-chapter.ts` | M2 | DONE |
| P-07 | Build Homepage (Hero + ModuleGrid) | M3 | DONE |
| P-08 | Build ResumeBanner with localStorage | M3 | DONE |
| P-09 | Build Header with nav + ThemeToggle | M3 | DONE |
| P-10 | Build Footer | M3 | DONE |
| P-11 | Build dynamic chapter page | M4 | DONE |
| P-12 | Build TableOfContents sidebar | M4 | DONE |
| P-13 | Build ChapterContent markdown renderer | M4 | DONE |
| P-14 | Build auth/signin skeleton | M5 | DONE |
| P-15 | Build auth/signup skeleton | M5 | DONE |
| P-16 | Implement `useBookmark` hook | M6 | DONE |
| P-17 | Implement `useTheme` hook | M7 | DONE |
| P-18 | Add Open Graph metadata | M8 | DONE |
| P-19 | Responsive design audit | M8 | DONE |
| P-20 | Accessibility audit | M8 | DONE |
| P-21 | Install shiki, create `highlight.ts` | M9a | DONE |
| P-22 | Integrate shiki into `parse-chapter.ts` + `ChapterContent.tsx` | M9a | DONE |
| P-23 | Create `ReadingTime.tsx` + add to chapter page | M9b | DONE |
| P-24 | Create `BackToTop.tsx` + add to chapter page | M9c | DONE |
| P-25 | Create `use-progress.ts` hook (useSyncExternalStore) | M10a | DONE |
| P-26 | Create `/profile` page with ProgressCard + SectionChecklist | M10b | DONE |
| P-27 | Update auth skeletons to link to `/profile` | M10c | DONE |
| P-28 | Create `scripts/build-search-index.ts` | M11a | DONE |
| P-29 | Generate `public/search-index.json` at build time | M11a | DONE |
| P-30 | Create `SearchModal.tsx` with scoring algorithm | M11b | DONE |
| P-31 | Integrate SearchModal into Header, keyboard nav (Cmd+K) | M11c | DONE |
| P-32 | Create GitHub Actions CI/CD pipeline | M12 | DONE |
| P-33 | Create DOCUMENTATION.md | M12 | DONE |
| P-34 | Final `npm run build` + `npm run lint` | M12 | DONE |

### Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Syntax highlighting | `shiki` at build time via `highlight.ts` | Pre-rendered HTML, no client-side lib needed |
| Custom rehype pipeline | Rejected | Would require rewriting `ChapterContent.tsx` entirely |
| Search approach | Custom `SearchIndex` class + build-time JSON | No server needed, <100ms on 14 modules |
| Progress storage | localStorage via `useSyncExternalStore` | Consistent with existing bookmark pattern |
| Shared/Core layer | Not created | Only 1 new hook (`useProgress`), no reuse justified |
| CI/CD | GitHub Actions + Vercel | Zero-config deployment, automatic preview URLs |

---

## [MILESTONES]

| Milestone | Tasks | Verifiable Goal | Status |
|---|---|---|---|
| **M9a** | P-21, P-22 | Code blocks render with syntax colors on `/module/1` | DONE |
| **M9b** | P-23 | "X min de lecture" displays on every chapter page | DONE |
| **M9c** | P-24 | Floating back-to-top button appears after 400px scroll | DONE |
| **M10a** | P-25 | Section checkmarks persist across page reloads | DONE |
| **M10b** | P-26 | `/profile` shows visited modules + per-section checkboxes | DONE |
| **M10c** | P-27 | Auth forms link to `/profile` | DONE |
| **M11a** | P-28, P-29 | Static JSON with all 14 modules + sections + content snippets | DONE |
| **M11b** | P-30 | Typing "pytorch" shows Module 4 result with section match | DONE |
| **M11c** | P-31 | Cmd+K opens search, ↑↓ navigate, Enter selects, Esc closes | DONE |
| **M12** | P-32, P-33, P-34 | 0 lint errors, all pages generated, CI/CD + docs | DONE |

---

## [VERIFICATION]

| Check | Result |
|---|---|
| `npm run build` | PASS — 21 pages generated |
| `npm run lint` | PASS — 0 errors, 0 warnings |
| TypeScript compilation | PASS — No type errors |
| Search index | PASS — 86 entries generated |
| Static page count | 21 (homepage + 14 modules + signin + signup + profile + not-found + 404) |

---

*This document is the single source of truth for the project architecture. Updated as implementation progresses.*
