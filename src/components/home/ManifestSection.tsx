import { modules } from "@/data/modules";

export function ManifestSection() {
  const technical = modules.filter((m) => m.id >= 1 && m.id <= 10).length;
  const transversal = modules.filter((m) => m.id >= 11).length;
  return (
    <section id="parcours" className="px-4 py-10 sm:px-8 lg:px-14 lg:py-16">
      <div className="grid max-w-[62rem] grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { num: String(modules.length), label: "étapes jalonnées" },
          { num: String(technical), label: "modules techniques" },
          { num: String(transversal), label: "sections transversales" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-xl border border-hair bg-card p-6"
          >
            <span className="font-display text-[2.6rem] leading-none text-route">
              {stat.num}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}