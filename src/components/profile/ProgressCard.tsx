"use client";

import Link from "next/link";
import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/use-progress";

export function ProgressCard() {
  const { getModuleProgress, getOverallProgress } = useProgress();
  const overall = getOverallProgress();
  const overallPercent =
    overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">
        Progression Globale
      </h2>

      <div className="mt-4 mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink2">
            {overall.completed} / {overall.total} sections complètes
          </span>
          <span className="font-mono font-medium text-route-deep">{overallPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-paper2">
          <div
            className="h-full rounded-full bg-route transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {modules.map((mod) => {
          const { completed, total } = getModuleProgress(mod.id);
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <li key={mod.id}>
              <Link
                href={`/module/${mod.id}`}
                className="flex items-center gap-3 rounded-xl border border-hair p-3 transition-colors hover:border-route"
              >
                <span className="text-xl" aria-hidden="true">
                  {mod.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{mod.title}</p>
                  <p className="font-mono text-xs text-ink2">
                    {completed}/{total} sections
                  </p>
                </div>
                <div className="h-2 w-16 overflow-hidden rounded-full bg-paper2">
                  <div
                    className="h-full rounded-full bg-moss transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}