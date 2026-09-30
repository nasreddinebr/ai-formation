# Contexte du Projet
Tu travailles sur le projet **ai-formation**, un site d'apprentissage statique en français basé sur Next.js 16 (App Router). Actuellement, le site fonctionne en SSG pur avec un pipeline de contenu basé sur des fichiers Markdown (`sources/*.md` compilés via `npm run build:search` vers `src/data/curriculum.gen.ts` et `public/search-index.json`), et l'état utilisateur est géré uniquement via `localStorage`.

# Objectif de la tâche
Je souhaite faire évoluer l'architecture du projet pour préparer l'arrivée future d'un **véritable backend**. Pour cela, tu dois configurer :
1. **Un stack Docker local** complet (via `docker-compose.yml` et un `Dockerfile` optimisé pour Next.js).
2. **Une base de données relationnelle** (PostgreSQL) intégrée au stack Docker, avec la gestion des volumes persistants et des variables d'environnement.
3. **Les fondations de connexion à la base de données** dans le projet Next.js (installation d'un ORM moderne comme Prisma ou Drizzle, configuration du client et d'un script/test de santé de connexion) sans casser le fonctionnement statique actuel du pipeline de contenu.
4. **La documentation** de mise en route dans le `README.md`.

---

## Spécifications Techniques et Étapes à Réaliser

### 1. Conteneurisation (Docker & Docker Compose)
- **`Dockerfile`** : Crée un Dockerfile multi-stage pour le projet Next.js (optimisé pour le développement et la production). Prévois les étapes d'installation des dépendances (`pnpm`), de génération du contenu (`npm run build:search`), et de build de l'application.
- **`docker-compose.yml`** : Crée un fichier de composition à la racine définissant deux services principaux :
  - `web` : L'application Next.js (port `3000`), connectée au service de base de données.
  - `db` : Une base de données PostgreSQL (version récente, ex: 16 ou 17) avec un volume persistant pour les données (`postgres_data`) et les variables d'environnement de connexion configurées.

### 2. Gestion des variables d'environnement
- Crée un fichier `.env.example` à la racine contenant :
  - Les variables de connexion à la base de données (`DATABASE_URL`).
  - Les configurations nécessaires pour l'environnement Docker.
- Assure-toi que les fichiers `.env` locaux sont bien ignorés par Git (`.gitignore`).

### 3. Intégration de la Base de Données (ORM)
- Installe un ORM léger et moderne adapté à l'écosystème TypeScript/Next.js (ex: **Prisma** ou **Drizzle ORM** — privilégie Prisma pour sa robustesse de migration, sauf indication contraire).
- Initialise la configuration de l'ORM et crée un premier modèle de test (par exemple, un modèle `User` ou `Progress` minimaliste) pour valider que la liaison Next.js <-> Base de données Docker fonctionne.
- Ajoute une commande ou un script de vérification simple pour tester la connexion à la base de données.

### 4. Robustesse et Déploiement Futur
- Le stack doit être conçu pour être facilement déployable sur un serveur externe (VPS) via `docker compose up -d --build`.
- Vérifie que les scripts existants (`npm run build:search`, `npm run lint`, `npx tsc --noEmit`) s'exécutent correctement dans le conteneur ou pendant le build.

---

## Livrables attendus
- Les fichiers de configuration créés/modifiés : `Dockerfile`, `docker-compose.yml`, `.env.example`, et la configuration de l'ORM.
- Les modifications nécessaires dans `package.json` (scripts utilitaires pour lancer le stack ou les migrations).
- Une mise à jour de la section dédiée au **Développement Local avec Docker** dans le `README.md`.