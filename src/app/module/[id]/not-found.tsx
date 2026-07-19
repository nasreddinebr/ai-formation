"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-6xl">🔍</span>
      <h1 className="mb-2 text-2xl font-bold text-foreground">Module introuvable</h1>
      <p className="mb-6 text-muted">
        Ce module n&apos;existe pas ou a été déplacé.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
