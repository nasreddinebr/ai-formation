"use client";

import { modules } from "@/data/modules";
import { useProgress } from "@/hooks/use-progress";

export function SectionChecklist() {
  const { toggleSection, isSectionCompleted } = useProgress();

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Checklist des Sections
      </h2>

      <div className="space-y-6">
        {modules.map((mod) => (
          <div key={mod.id}>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <span>{mod.icon}</span>
              {mod.title}
            </h3>
            <ul className="space-y-1 pl-6">
              {mod.sections.map((section) => {
                const completed = isSectionCompleted(mod.id, section.id);
                return (
                  <li key={section.id}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleSection(mod.id, section.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-accent"
                      />
                      <span className={completed ? "line-through opacity-60" : ""}>
                        {section.title}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
