"use client";

import Link from "next/link";
import { useBookmark } from "@/hooks/use-bookmark";

export function ResumeBanner() {
  const { lastVisited, clearBookmark } = useBookmark();

  if (!lastVisited) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-5 py-3">
        <p className="text-sm text-foreground">
          <span className="font-medium">Reprendre là où vous vous êtes arrêté :</span>{" "}
          Module {lastVisited.id} — {lastVisited.title}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`/module/${lastVisited.id}`}
            className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90"
          >
            Continuer
          </Link>
          <button
            onClick={clearBookmark}
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            Effacer
          </button>
        </div>
      </div>
    </div>
  );
}
