"use client";

import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/use-progress";

export function SectionChecklist() {
  const { toggleSection, isSectionCompleted, getModuleProgress } = useProgress();

  return (
    <div className="rounded-2xl border border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">
        Checklist des Sections
      </h2>
      <p className="mt-1 text-sm text-ink2">
        Cochez une section pour la marquer comme terminée.
      </p>

      <div className="mt-4 space-y-4">
        {modules.map((mod, index) => {
          const { completed, total } = getModuleProgress(mod.id);
          return (
            <details key={mod.id} open={index === 0} className="group border-b border-hair pb-1 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center gap-2 py-2 text-sm font-medium text-ink marker:hidden">
                <span aria-hidden="true">{mod.icon}</span>
                <span className="min-w-0 flex-1 truncate">{mod.title}</span>
                <span className="font-mono text-xs text-ink2">
                  {completed}/{total}
                </span>
                <svg
                  className="h-4 w-4 text-ink2 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <ul className="mb-3 space-y-1 pl-8">
                {mod.sections.map((section) => {
                  const completed = isSectionCompleted(mod.id, section.id);
                  return (
                    <li key={section.id}>
                      <label className="flex cursor-pointer items-start gap-2 text-sm text-ink2 transition-colors hover:text-ink">
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => toggleSection(mod.id, section.id)}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-hair accent-[color:var(--color-route)]"
                        />
                        <span className={completed ? "opacity-60 line-through" : ""}>
                          {section.title}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </div>
    </div>
  );
}