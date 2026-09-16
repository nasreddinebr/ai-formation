"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-hair bg-card p-8 shadow-sm">
        <p className="mb-1 text-center font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
          Formation IA
        </p>
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
          Connexion
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="vous@example.com"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              disabled
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-route"
            disabled
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Fonctionnalité bientôt disponible.{" "}
          <Link href="/profile" className="text-secondary underline-offset-2 hover:underline">
            Continuer sans compte
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted">
          Pas encore de compte… ?{" "}
          <Link href="/auth/signup" className="text-secondary underline-offset-2 hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
