# syntax=docker/dockerfile:1.7
# ---------------------------------------------------------------------------
# ai-formation — image Next.js multi-stage
#
#   docker build --target dev  -t ai-formation:dev  .
#   docker build --target prod -t ai-formation:prod .
#
# Le stage `prod` s'appuie sur la sortie `output: "standalone"` de Next.js
# (voir next.config.ts). Le stage `dev` sert au developpement avec rechargement
# a chaud ; voir docker-compose.yml.
# ---------------------------------------------------------------------------

ARG NODE_VERSION=24

# La version de pnpm est figee par le champ `packageManager` de package.json ;
# corepack l'installe automatiquement au premier usage.

# ===========================================================================
# Stage 1 — deps : installation des dependances (cache-friendly)
# ===========================================================================
FROM node:${NODE_VERSION}-alpine AS deps

RUN corepack enable

WORKDIR /app

# `postinstall` execute `prisma generate` : le schema doit deja etre present.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma7.config.ts ./
COPY prisma ./prisma

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# ===========================================================================
# Stage 2 — base : tout ce qui est necessaire au build et au dev
# ===========================================================================
FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/generated ./src/generated

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs ./
COPY prisma7.config.ts ./
COPY prisma ./prisma

# `sources/` alimente `pnpm build:search`, `src/` alimente `next build`.
COPY sources ./sources
COPY scripts ./scripts
COPY src ./src
COPY public ./public

# ===========================================================================
# Stage 3 — builder : generation du contenu puis build Next.js
# ===========================================================================
FROM base AS builder

ENV NODE_ENV=production

# Regenere src/data/curriculum.gen.ts + public/search-index.json depuis sources/
RUN pnpm build:search

# Genere le client Prisma dans src/generated/prisma (cible du schema).
RUN pnpm db:generate

# `output: "standalone"` emet .next/standalone avec un server.js minimal.
RUN pnpm exec next build

# ===========================================================================
# Stage 4 — runner : image de production finale
# ===========================================================================
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Syntaxe Alpine (busybox) pour l'utilisateur non privilegie.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Client Prisma complet : necessaire pour `pnpm db:deploy` (migrations)
# et pour le health check depuis le conteneur.
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma7.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Sortie standalone : server.js + node_modules traces par Next (par-dessus).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Filet de securite : aucun secret ne doit etre embarque dans l'image finale.
RUN rm -f .env .env.* && \
    chown -R nextjs:nodejs /app

# `public/` et `.next/static/` ne sont PAS copies par le mode standalone.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]

# ===========================================================================
# Stage 5 — dev : dependances + sources, pour docker compose developpement
# ===========================================================================
FROM base AS dev

ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Le bind-mount `.:/app` masque le src/generated de l'image : on le regenere
# s'il est absent (clone frais sur l'hote).
CMD ["sh", "-c", "[ -f src/generated/prisma/client.ts ] || pnpm db:generate; exec pnpm dev"]
