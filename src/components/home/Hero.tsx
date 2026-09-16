import Link from "next/link";
import { modules } from "@/data/modules";
import { RouteMap } from "./RouteMap";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-10 sm:px-8 lg:px-14 lg:pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(var(--color-hair) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />
      <div className="relative max-w-[56rem]">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
          Carte du parcours · Édition 2026
        </p>
        <h1 className="font-display text-[2.8rem] font-medium leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[5.2rem]">
          De zéro à
          <br />
          <em className="italic text-route">ingénieur IA.</em>
        </h1>
        <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-ink2 sm:text-lg">
          Un itinéraire complet, progressif et professionnalisant. Python,
          Machine Learning, Deep Learning, LLMs, agents et MLOps — étape par
          étape, jusqu’à la maîtrise.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/#modules"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-route"
          >
            Commencer la formation
          </Link>
          <Link
            href="/#parcours"
            className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-card"
          >
            Voir l’itinéraire
          </Link>
        </div>
      </div>

      <RouteMap count={modules.length} />
    </section>
  );
}