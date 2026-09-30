# Formation IA — Parcours & Learning Atlas

Un parcours cartographié pour passer **de zéro à ingénieur IA** : 14 étapes couvrant Python, Machine Learning, Deep Learning, LLMs, agents, MLOps, et les sections transversales (projet, emploi, méthode).

## Content

- 14 modules (10 techniques + 3 transversaux + fondamentaux introductifs)
- 666 sections, 78 chapitres — entièrement tirés des sources dans `sources/`
- Recherche instantanée (Cmd+K), suivi de progression (localStorage), mode sombre, synthaxe des code highlightée à la compilation (shiki)

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Style | Tailwind CSS 4 (config CSS-first, `@theme`) |
| Recherche | Index statique JSON + scoring maison (`src/lib/search-index.ts`) |
| Base de données | PostgreSQL 17 (Docker) + Prisma 7 (`@prisma/adapter-pg`) |
| Conteneurisation | Dockerfile multi-stage + Docker Compose |
| Paquets | pnpm 11 |

## Getting Started

```bash
pnpm install
pnpm dev              # predev regénère curriculum.gen.ts + search-index.json
```

Production build :

```bash
pnpm build            # generator + next build
pnpm start
```

## Developing with Docker (recommandé)

Le stack Docker lève à la fois l'application et PostgreSQL. C'est la voie
recommandée : elle reproduit l'environnement de déploiement.

### Prérequis

- **Docker Desktop** (Windows / macOS) ou **Docker Engine + plugin Compose** (Linux)
- `docker compose version` doit fonctionner

### Démarrage

```bash
# 1. Variables d'environnement
cp .env.example .env        # Windows PowerShell : Copy-Item .env.example .env

# 2. Monter le stack (web + postgres)
docker compose up -d --build

# 3. Appliquer le schéma de base de données
pnpm db:deploy

# 4. Vérifier la liaison Next.js <-> PostgreSQL
pnpm db:health
```

L'application est disponible sur <http://localhost:3000> et la base sur
`localhost:5432`.

### Commandes utiles

```bash
pnpm docker:up            # docker compose up -d --build
pnpm docker:down          # arrete et supprime les conteneurs
pnpm docker:logs          # logs du conteneur web
pnpm docker:db-logs       # logs de postgres

# Base de donnees
pnpm db:generate          # regenere le client Prisma dans src/generated/prisma
pnpm db:deploy            # applique les migrations (migrate deploy)
pnpm db:migrate           # cree une migration (migrate dev, avec reinitialisation)
pnpm db:push              # synchronise le schema sans migration (prototypage)
pnpm db:studio            # Prisma Studio
pnpm db:health            # test de connexion + latence + version serveur
```

### Ce que fait le stack

| Service | Image | Rôle |
|---|---|---|
| `web` | cible `dev` du Dockerfile | `next dev` sur le port 3000, sources montées (hot reload) |
| `db` | `postgres:17-alpine` | PostgreSQL, volume persistant `postgres_data` |

`web` attend que `db` passe son `healthcheck` (`pg_isready`) avant de démarrer.
Les identifiants viennent de `.env` (`POSTGRES_*`) et sont injectés dans
`DATABASE_URL` par Compose, pour que la valeur soit cohérente entre les deux
services.

> **Avec vs sans Docker.** Sans Docker, indiquez `localhost` au lieu de `db`
> dans `DATABASE_URL` : un PostgreSQL local reste utilisable tel quel.

### Déploiement sur un VPS

```bash
cp .env.example .env      # puis renseignez des secrets forts
docker compose -f docker-compose.prod.yml up -d --build
```

Le fichier `docker-compose.prod.yml` construit la cible `prod` du Dockerfile :
build Next.js complet (génération du contenu puis `output: "standalone"`),
aucun montage de sources, utilisateur non privilégié, port PostgreSQL non
exposé. Placez un reverse proxy (nginx ou Caddy) devant le port 3000.

```bash
docker compose -f docker-compose.prod.yml exec web pnpm db:deploy
```

### Explication de `target: dev` et `target: prod`

Le `Dockerfile` a cinq étages :

```
deps  -> base -> builder -> runner   (prod)
                 \
                  `-> dev
```

- `deps` installe les dépendances pnpm (cache Docker, invalidé uniquement par
  les lockfiles). `postinstall` y lance `prisma generate`.
- `base` ajoute les sources et la config ; c'est le parent de `dev` et `builder`.
- `builder` exécute `pnpm build:search` (contenu depuis `sources/`),
  `pnpm db:generate`, puis `next build`.
- `runner` ne contient que la sortie standalone, les assets, et l'utilisateur
  non privilégié. `public/` et `.next/static/` sont copiés à la main car le
  mode standalone ne le fait pas.
- `dev` sert au développement avec rechargement à chaud.

## Architecture

See [`DOCUMENTATION.md`](DOCUMENTATION.md) and [`sources/PROJECT_MAP.md`](sources/PROJECT_MAP.md) for the full rundown of the content pipeline, design tokens, and verification.

### Accès aux données

`src/lib/db/client.ts` expose un client Prisma paresseux et un singleton
réutilisé entre les rechargements HMR. L'instanciation est différée à
`getPrisma()` : importer le module ne déclenche aucune connexion, ce qui
préserve le build statique. Ce module ne doit jamais être importé depuis un
composant client.

Les modèles `User`, `Progress` et `Bookmark` préfigurent le remplacement du
`localStorage` côté client, sans modifier le code existant : les hooks
`use-progress` et `use-bookmark` continuent de fonctionner.

## Changing the curriculum

Edit files in `sources/`, then run `pnpm build:search` to regenerate the
committed generated data (`src/data/curriculum.gen.ts` + `public/search-index.json`).
