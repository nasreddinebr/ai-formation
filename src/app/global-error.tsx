"use client";

import Link from "next/link";

import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
          Erreur inattendue
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Une erreur est survenue
        </h1>
        <p className="max-w-md text-sm text-ink2">
          Quelque chose s’est mal passé. Vous pouvez réessayer, ou revenir à
          l’accueil si le problème persiste.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-full bg-route px-5 py-2 text-sm font-medium text-paper transition hover:bg-route-deep"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-full border border-line px-5 py-2 text-sm font-medium text-ink transition hover:border-route hover:text-route"
          >
            Retour à l’accueil
          </Link>
        </div>
        {error.digest ? (
          <p className="mt-2 font-mono text-[11px] text-ink2">Réf. {error.digest}</p>
        ) : null}
      </body>
    </html>
  );
}
