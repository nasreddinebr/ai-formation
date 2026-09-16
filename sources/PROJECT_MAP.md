# PROJECT_MAP.md — AI Formation Website

> Last updated: September 15, 2026
> Status: COMPLETE — content migration + "Le Parcours (Learning Atlas)" redesign delivered

---

## [TECH_STACK]

| Layer | Technology | Version | Justification |
|---|---|---|---|
| Framework | Next.js | 16.2.10 (LTS) | App Router, Turbopack, SSG via `generateStaticParams()` |
| Language | TypeScript | 5.9.3 | Strict mode, `npx tsc --noEmit` clean |
| UI Library | React | 19.2.4 | Server Components, `useSyncExternalStore` |
| Styling | Tailwind CSS | 4.3.3 | CSS-first config (`@theme`), Atlas brand tokens |
| Runtime | Node.js | 24.x LTS | Active LTS |
| Content | Markdown | — | 13 source files + inline anchor, parsed at build time |
| State | localStorage | — | Bookmark + theme + progress persistence |
| Highlighting | shiki | 4.3.1 | Build-time syntax highlighting, pre-rendered HTML |
| Search | Custom Index | — | Build-time JSON (666 entries) + client-side scoring class |
| Scripts | tsx | — | `node --import tsx` for the build-time content generator |

---

## [SYSTEM_FLOW]

```
BUILD TIME (generator + SSG)
  sources/Module_XX_*.md + sources/Section_*.md
    |  + inline "module-0" anchor in sources/formation-ia-complete.md
    v
  scripts/build-content.ts  ──┬──> src/data/curriculum.gen.ts   (committed, 14 modules)
                              └──> public/search-index.json     (committed, 666 entries)
    v
  src/lib/curriculum.ts  (normalize, slugify, ids, chapters=#, sections=###) 
  src/lib/markdown.ts    (hand-rolled renderer → @@CODE:n@@ placeholders)
  src/lib/highlight.ts   (shiki → highlighted <pre> per block)
  src/lib/parse-chapter.ts (loadModuleMarkdown via MODULE_SOURCES + getChapterContent)
    -> 21 static pages (pre-highlighted HTML)

RUNTIME (CLIENT)
  Homepage -> RouteMap SVG + HERO + ResumeBanner (useBookmark)
  Module page -> TOC scroll-spy (IntersectionObserver) + ChapterContent + ReadingTime
  Module page -> SaveBookmark(visited) + section checkmarks (useProgress)
  Header -> useTheme() toggles dark class on <html>
  Header -> SearchModal (Cmd+K) -> custom SearchIndex class -> deep links /module/{id}#{sectionId}
  /profile -> ProgressCard + SectionChecklist (collapsible per module)
```

---

## [ARCHITECTURE]

```
ai-formation/
├── sources/                        # CURRICULUM SOURCE OF TRUTH (13 files + inline)
│   ├── formation-ia-complete.md    (module-0 anchor + repositioned content)
│   ├── Module_01..10_*.md
│   └── Section_A/B/C_*.md
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout: Header + <main> + Footer, Atlas fonts)
│   │   ├── page.tsx                (Homepage: Hero + RouteMap + Manifest + 14 stages)
│   │   ├── globals.css             (Tailwind v4 @theme, Atlas tokens light/dark + .atlas-article)
│   │   ├── module/[id]/            (page.tsx SSG via generateStaticParams; chips, chips, TOC,
│   │   │                            ChapterContent, resources, prev/next, BackToTop)
│   │   ├── profile/page.tsx        (Profile + progress dashboard)
│   │   └── auth/signin|signup       (Form skeletons, links to /profile)
│   ├── components/
│   │   ├── layout/  Header.tsx, Footer.tsx
│   │   ├── home/    Hero.tsx, RouteMap.tsx, ManifestSection.tsx, ModuleCard.tsx, ResumeBanner.tsx
│   │   ├── chapter/ ChapterContent.tsx, TableOfContents.tsx, SaveBookmark.tsx,
│   │   │            ReadingTime.tsx, BackToTop.tsx
│   │   ├── search/  SearchModal.tsx
│   │   └── profile/ ProgressCard.tsx, SectionChecklist.tsx
│   ├── data/
│   │   ├── modules.ts              (meta + overlay of curriculum.gen.ts; getModuleById/BySlug)
│   │   ├── curriculum.gen.ts       (GENERATED — committed; rebuild with build:content)
│   │   └── resources.ts            (per-module external links, has `language` field)
│   ├── lib/
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
├── public/
│   └── search-index.json           (GENERATED — committed, 666 entries)
├── DOCUMENTATION.md
└── package.json                    (predev + build:search → build-content.ts; build runs it first)
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

---

## [VERIFICATION]

| Check | Result |
|---|---|
| `npm run build` | PASS — generator ran, 21 pages generated |
| `npm run lint` | PASS — 0 errors, 0 warnings |
| TypeScript (`npx tsc --noEmit`) | PASS — no type errors |
| Search index | PASS — 666 entries generated |
| Static page count | 21 (homepage + 14 modules + signin + signup + profile + not-found) |
| Highlighting | PASS — all code fences render `pre.shiki` |
| Smoke tests (Chrome) | search deep-link to section anchor, progress persists across reload, dark mode toggle, module content (tables/code/TOC/nav) |

---

*This document is the single source of truth for the project architecture.*