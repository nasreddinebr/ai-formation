# Formation IA — Parcours & Learning Atlas

Un parcours cartographié pour passer **de zéro à ingénieur IA** : 14 étapes couvrant Python, Machine Learning, Deep Learning, LLMs, agents, MLOps, et les sections transversales (projet, emploi, méthode).

## Content

- 14 modules (10 techniques + 3 transversaux + fondamentaux introductifs)
- 666 sections, 78 chapitres — entièrement tirés des sources dans `sources/`
- Recherche instantanée (Cmd+K), suivi de progression (localStorage), mode sombre, synthaxe des code highlightée à la compilation (shiki)

## Getting Started

```bash
npm install
npm run dev        # predev regénère curriculum.gen.ts + search-index.json
```

Production build :

```bash
npm run build      # generator + next build
npm run start
```

## Architecture

See [`DOCUMENTATION.md`](DOCUMENTATION.md) and [`sources/PROJECT_MAP.md`](sources/PROJECT_MAP.md) for the full rundown of the content pipeline, design tokens, and verification.

## Changing the curriculum

Edit files in `sources/`, then run `npm run build:search` to regenerate the committed generated data (`src/data/curriculum.gen.ts` + `public/search-index.json`).