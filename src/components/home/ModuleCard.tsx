import Link from "next/link";
import type { Module } from "@/data/modules";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
} from "@/lib/constants";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      href={`/module/${module.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl">{module.icon}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[module.difficulty]}`}
        >
          {DIFFICULTY_LABELS[module.difficulty]}
        </span>
      </div>
      <h3 className="mb-1 text-base font-semibold text-foreground group-hover:text-primary">
        {module.title}
      </h3>
      <p className="mb-3 flex-1 text-sm text-muted line-clamp-2">
        {module.description}
      </p>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{module.sections.length} sections</span>
        <span>{module.estimatedTime}</span>
      </div>
    </Link>
  );
}
