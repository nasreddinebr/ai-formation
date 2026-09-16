import Link from "next/link";
import type { Module } from "@/data/modules";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
} from "@/lib/constants";

interface ModuleCardProps {
  module: Module;
  index: number;
}

function waypoint(n: number): string {
  return `0${n}`.slice(-2);
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  return (
    <li className="transition-all hover:translate-x-0.5 hover:shadow-[4px_4px_0_0_var(--color-hair)]">
      <Link
        href={`/module/${module.id}`}
        className="grid grid-cols-[2.9rem_2rem_1fr] items-center gap-3 rounded-xl border border-hair bg-card p-4 transition-colors hover:border-route sm:grid-cols-[3.2rem_2.2rem_1fr_auto] sm:gap-4 sm:p-5"
      >
        <span
          className="font-display text-[1.7rem] italic leading-none text-route sm:text-3xl"
          aria-hidden="true"
        >
          {waypoint(index + 1)}
        </span>
        <span className="text-[1.4rem] leading-none" aria-hidden="true">
          {module.icon}
        </span>
        <span className="min-w-0 text-left">
          <span className="block text-base font-semibold tracking-[-0.01em] text-ink">
            {module.title}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-ink2 line-clamp-2">
            {module.description}
          </span>
        </span>
        <span className="col-start-2 flex flex-wrap gap-2 sm:col-auto sm:justify-end">
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] ${DIFFICULTY_COLORS[module.difficulty]}`}
          >
            {DIFFICULTY_LABELS[module.difficulty]}
          </span>
          <span className="rounded-full border border-dashed border-hair px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink2">
            {module.estimatedTime}
          </span>
        </span>
      </Link>
    </li>
  );
}