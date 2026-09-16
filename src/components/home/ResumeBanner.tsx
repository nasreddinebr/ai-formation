"use client";

import Link from "next/link";
import { useBookmark } from "@/hooks/use-bookmark";

export function ResumeBanner() {
  const { lastVisited, clearBookmark } = useBookmark();

  if (!lastVisited) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-route/40 bg-route/10 px-5 py-3">
        <p className="text-sm text-ink">
          <span className="font-medium">Reprendre là où vous vous êtes arrêté :</span>{" "}
          Module {lastVisited.id} — {lastVisited.title}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href={`/module/${lastVisited.id}`}
            className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper transition-colors hover:bg-route"
          >
            Continuer
          </Link>
          <button
            onClick={clearBookmark}
            className="text-xs text-ink2 transition-colors hover:text-ink"
          >
            Effacer
          </button>
        </div>
      </div>
    </div>
  );
}
