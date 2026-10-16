import { Hero } from "@/components/home/Hero";
import { ManifestSection } from "@/components/home/ManifestSection";
import { ModuleCard } from "@/components/home/ModuleCard";
import { ResumeBanner } from "@/components/home/ResumeBanner";
import { MediaSlider, type MediaSlide } from "@/components/media/MediaSlider";
import { MotionBanner } from "@/components/media/MotionBanner";
import { modules } from "@/data/modules";
import { DIFFICULTY_LABELS } from "@/lib/constants";

const HIGHLIGHT_IDS = [1, 3, 4, 5, 8, 9];

const slides: MediaSlide[] = modules
  .map((mod, position) => ({ mod, position }))
  .filter(({ mod }) => HIGHLIGHT_IDS.includes(mod.id))
  .map(({ mod, position }) => ({
    moduleId: mod.id,
    plateNumber: position + 1,
    href: `/module/${mod.id}`,
    eyebrow: `Étape ${String(position + 1).padStart(2, "0")} · ${mod.estimatedTime}`,
    title: mod.title,
    description: mod.description,
    tags: [
      DIFFICULTY_LABELS[mod.difficulty],
      `${mod.chapters.length} chapitres`,
      `${mod.sections.length} sections`,
    ],
  }));

export default function Home() {
  return (
    <>
      <Hero />
      <ResumeBanner />
      <MediaSlider slides={slides} />
      <ManifestSection />

      <section id="modules" className="px-4 py-10 sm:px-8 lg:px-14 lg:py-16" aria-labelledby="modules-title">
        <header className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
            L’itinéraire
          </p>
          <h2 id="modules-title" className="font-display text-[1.9rem] font-medium tracking-[-0.01em] sm:text-4xl">
            Les étapes du parcours
          </h2>
        </header>

        <ol className="flex flex-col gap-3">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </ol>
      </section>

      <MotionBanner />
    </>
  );
}
