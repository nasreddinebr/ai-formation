import { Hero } from "@/components/home/Hero";
import { ModuleCard } from "@/components/home/ModuleCard";
import { ResumeBanner } from "@/components/home/ResumeBanner";
import { modules } from "@/data/modules";

export default function Home() {
  return (
    <>
      <Hero />
      <ResumeBanner />
      <section id="modules" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Curriculum Complet
        </h2>
        <p className="mb-8 text-muted">
          14 modules couvrant tout le parcours, des fondamentaux à l&apos;expertise.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </section>
    </>
  );
}
