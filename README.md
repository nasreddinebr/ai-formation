# Formation IA — Parcours & Learning Atlas

Un parcours cartographié pour passer **de zéro à ingénieur IA** : 14 étapes couvrant Python, Machine Learning, Deep Learning, LLMs, agents, MLOps, et les sections transversales (projet, emploi, méthode).

## Content

- 14 modules (10 techniques + 3 transversaux + fondamentaux introductifs)
- 816 sections, 79 chapitres — entièrement tirés des sources dans `sources/`
- Recherche instantanée (Cmd+K), suivi de progression (localStorage + compte), mode sombre, synthaxe des code highlightée à la compilation (shiki)
- Back-office FastAPI : authentification sécurisée (JWT + refresh opaque), RBAC hiérarchique, profil et tableau de bord de progression

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Style | Tailwind CSS 4 (config CSS-first, `@theme`) |
| Recherche | Index statique JSON + scoring maison (`src/lib/search-index.ts`) |
| Base de données | PostgreSQL 17 (Docker) + Prisma 7 (`@prisma/adapter-pg`) |
| API / Back-office | Python 3.14 + FastAPI, SQLAlchemy 2.0 async (asyncpg), Pydantic v2 |
| Auth | Argon2id, JWT HS256 (access 15 min) + refresh opaque rotatif (cookie HttpOnly), CSRF double-submit |
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

# 2. Monter le stack (web + backend + postgres)
docker compose up -d --build

# 3. Appliquer le schéma de base de données
pnpm db:deploy

# 4. Vérifier la liaison Next.js <-> PostgreSQL
pnpm db:health
```

L'application est disponible sur <http://localhost:3000>, l'API FastAPI sur
<http://localhost:8000> (Swagger : <http://localhost:8000/docs>) et la base sur
`localhost:5432`.

### Compte administrateur initial

Au premier démarrage, un administrateur est créé de manière idempotente (rôle
`ADMIN`, id `1`) :

| Champ | Valeur par défaut |
|---|---|
| Email | `admin@ai-formation.dev` |
| Mot de passe | `Admin_Formation_2026!` |

Ces valeurs sont surchargeables via `ADMIN_EMAIL` / `ADMIN_PASSWORD` (voir
`.env.example`). **Changez le mot de passe après la première connexion.**

### Authentification (Next.js <-> FastAPI)

Le navigateur appelle `/backend/api/*` ; un route handler Node
(`src/app/backend/[...path]/route.ts`) proxifie vers `API_PROXY_TARGET`
(`http://backend:8000`). L'API dépose ses jetons dans des cookies HttpOnly
(`af_access`, `af_refresh`) et un cookie CSRF double-submit (`af_csrf`). Côté
client, `src/lib/api/client.ts` injecte l'en-tête `x-csrf-token` et rafraîchit
la session sur un `401`. Les pages `/auth/signin`, `/auth/signup`, `/profile` et
le suivi de chapitre s'appuient sur `useAuth()` (`AuthProvider`).

### Commandes utiles

```bash
pnpm docker:up            # docker compose up -d --build
pnpm docker:down          # arrete et supprime les conteneurs
pnpm docker:logs          # logs du conteneur web
pnpm docker:db-logs       # logs de postgres

# Backend FastAPI
pnpm backend:dev          # uvicorn --reload en local (sans Docker)
pnpm backend:test         # pytest (SQLite en memoire, 30 tests)
pnpm backend:lint         # ruff check app tests
pnpm backend:format       # ruff format app tests
pnpm docker:backend-logs  # logs du conteneur backend

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
| `web` | cible `dev` du Dockerfile | `next dev` sur le port 3000, sources montées (hot reload), proxifie `/backend/*` |
| `backend` | cible `dev` de `backend/Dockerfile` | FastAPI (uvicorn --reload) sur le port 8000, sources montées |
| `db` | `postgres:17-alpine` | PostgreSQL, volume persistant `postgres_data` |

`web` attend que `db` **et** `backend` passent leur `healthcheck` avant de
démarrer. Les identifiants viennent de `.env` (`POSTGRES_*`) et sont injectés
dans `DATABASE_URL` par Compose, pour que la valeur soit cohérente entre les
services. Le backend normalise l'URL Prisma (`postgresql://…?schema=public`) en
`postgresql+asyncpg://…` et ignore le paramètre `schema` (non supporté par
asyncpg).

> **Avec vs sans Docker.** Sans Docker, indiquez `localhost` au lieu de `db`
> dans `DATABASE_URL` : un PostgreSQL local reste utilisable tel quel.

### Déploiement sur un VPS

```bash
cp .env.example .env      # puis renseignez des secrets forts
docker compose -f docker-compose.prod.yml up -d --build
```

Le fichier `docker-compose.prod.yml` construit les cibles `prod` des
Dockerfiles web **et backend** : build Next.js complet (génération du contenu
puis `output: "standalone"`), backend uvicorn sans `--reload`, aucun montage de
sources, utilisateur non privilégié, aucun port backend ni PostgreSQL exposé.
Placez un reverse proxy (nginx ou Caddy) devant le port 3000.

Deux variables sont **obligatoires** en production (Compose échoue sinon) :
`JWT_SECRET_KEY` (≥ 32 caractères aléatoires) et `ADMIN_PASSWORD`. Les cookies
passent en `Secure` (`COOKIE_SECURE=true`) et `AUTO_CREATE_SCHEMA=false` : le
schéma est alors piloté par les migrations Prisma.

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

### Back-office (FastAPI)

Le back-office vit dans `backend/` (architecture en couches : `api` →
`services` → `repositories` → `db`). Prisma reste la source de vérité du schéma
et des migrations ; les modèles SQLAlchemy 2.0 (`backend/app/db/models.py`)
reflètent `prisma/schema.prisma` (duplication contrôlée) pour exposer l'API
async.

- Rôles (`Role`) : `ADMIN` (niveau 3), `CONTRIBUTOR`/`MODERATOR` (niveau 2),
  `USER` (niveau 1, défaut), `ANONYMOUS` (niveau 0). L'héritage de permissions
  est l'union des rôles de **niveau strictement inférieur** (les rôles parallèles
  n'héritent pas entre eux).
- Routes : `/api/auth/*` (csrf, register, login, refresh, logout, me),
  `/api/profile` (lecture, mise à jour, changement de mot de passe),
  `/api/progress` (tableau de bord, upsert/suppression d'un cours),
  `/api/admin/*` (utilisateurs, rôles, santé).
- Tests : `pnpm backend:test` (30 tests, SQLite in-memory via `ASGITransport`),
  lint : `pnpm backend:lint` (ruff).

### Accès aux données

`src/lib/db/client.ts` expose un client Prisma paresseux et un singleton
réutilisé entre les rechargements HMR. L'instanciation est différée à
`getPrisma()` : importer le module ne déclenche aucune connexion, ce qui
préserve le build statique. Ce module ne doit jamais être importé depuis un
composant client.

Les hooks `use-progress` et `use-bookmark` restent la source de progression des
visiteurs (localStorage) ; pour un utilisateur connecté, elle est synchronisée
avec l'API via `src/lib/api/client.ts` (composant `ProgressTracker`).

## Changing the curriculum

Edit files in `sources/`, then run `pnpm build:search` to regenerate the
committed generated data (`src/data/curriculum.gen.ts` + `public/search-index.json`).
