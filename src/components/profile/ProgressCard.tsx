"use client";

import Link from "next/link";
import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/use-progress";

export function ProgressCard() {
  const { getModuleProgress, getOverallProgress } = useProgress();
  const overall = getOverallProgress();
  const overallPercent = overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Progression Globale
      </h2>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">
            {overall.completed} / {overall.total} sections completes
          </span>
          <span className="font-medium text-foreground">{overallPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral dark:bg-card">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((mod) => {
          const { completed, total } = getModuleProgress(mod.id);
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <Link
              key={mod.id}
              href={`/module/${mod.id}`}
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/10"
            >
              <span className="text-xl">{mod.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {mod.title}
                </p>
                <p className="text-xs text-muted">
                  {completed}/{total} sections
                </p>
              </div>
              <div className="h-2 w-16 overflow-hidden rounded-full bg-neutral dark:bg-card">
                <div
                  className="h-full rounded-full bg-secondary transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
