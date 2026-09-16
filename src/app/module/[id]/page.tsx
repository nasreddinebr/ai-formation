import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, getModuleById } from "@/data/modules";
import { getResourcesByModuleId } from "@/data/resources";
import { getChapterContent } from "@/lib/parse-chapter";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants";
import { ChapterContent } from "@/components/chapter/ChapterContent";
import { TableOfContents } from "@/components/chapter/TableOfContents";
import { SaveBookmark } from "@/components/chapter/SaveBookmark";
import { ReadingTime } from "@/components/chapter/ReadingTime";
import { BackToTop } from "@/components/chapter/BackToTop";

export function generateStaticParams() {
  return modules.map((m) => ({ id: String(m.id) }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);

  if (isNaN(moduleId)) notFound();

  const mod = getModuleById(moduleId);
  if (!mod) notFound();

  const chapterData = await getChapterContent(moduleId);
  const resources = getResourcesByModuleId(moduleId);
  const chapterCount = mod.chapters.length;

  const modIndex = modules.findIndex((m) => m.id === moduleId);
  const prevModule = modIndex > 0 ? modules[modIndex - 1] : undefined;
  const nextModule =
    modIndex >= 0 && modIndex < modules.length - 1 ? modules[modIndex + 1] : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <nav className="mb-8 font-mono text-xs uppercase tracking-[0.08em] text-ink2" aria-label="Fil d'Ariane">
        <Link href="/" className="transition-colors hover:text-route-deep">
          Accueil
        </Link>
        <span className="mx-2 text-hair">/</span>
        <span className="text-route-deep">
          {mod.id === 0 ? "Préambule" : mod.id <= 10 ? `Module ${mod.id}` : "Section transversale"}
        </span>
      </nav>

      <header className="mb-10 border-b border-hair pb-8">
        <div className="flex flex-wrap items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-hair bg-card text-3xl shadow-sm" aria-hidden="true">
            {mod.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl">
              {mod.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink2">
              {mod.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] ${DIFFICULTY_COLORS[mod.difficulty]}`}>
            {DIFFICULTY_LABELS[mod.difficulty]}
          </span>
          <span className="rounded-full border border-hair px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink2">
            {mod.estimatedTime}
          </span>
          <span className="rounded-full border border-hair px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink2">
            {mod.sections.length} sections
          </span>
          {chapterCount > 1 && (
            <span className="rounded-full border border-hair px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-ink2">
              {chapterCount} chapitres
            </span>
          )}
          {chapterData && <ReadingTime time={chapterData.readingTime} />}
        </div>
      </header>

      <SaveBookmark moduleId={mod.id} moduleTitle={mod.title} />

      <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          {chapterData ? (
            <TableOfContents chapters={chapterData.data.chapters} />
          ) : null}
        </aside>

        <article className="min-w-0">
          {chapterData ? (
            <ChapterContent html={chapterData.html} />
          ) : (
            <p className="py-8 text-ink2">Contenu en cours de chargement.</p>
          )}

          {resources.length > 0 && (
            <section className="mt-12 rounded-2xl border border-hair bg-card p-6">
              <h2 className="mb-1 font-display text-xl font-semibold text-ink">
                Ressources
              </h2>
              <p className="mb-4 text-sm text-ink2">
                Lectures et références complémentaires pour approfondir.
              </p>
              <ul className="space-y-2">
                {resources.map((res) => (
                  <li key={res.url}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-route-deep underline-offset-2 transition-colors hover:text-route"
                    >
                      {res.title}
                    </a>
                    <span className="ml-2 font-mono text-xs text-ink2">
                      ({res.language === "fr" ? "FR" : "EN"})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(prevModule || nextModule) && (
            <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Navigation entre étapes">
              {prevModule && (
                <Link
                  href={`/module/${prevModule.id}`}
                  className="group rounded-xl border border-hair bg-card p-4 transition-colors hover:border-route"
                >
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink2">
                    ← Étape précédente
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-route-deep">
                    {prevModule.icon} {prevModule.title}
                  </span>
                </Link>
              )}
              {nextModule && (
                <Link
                  href={`/module/${nextModule.id}`}
                  className="group rounded-xl border border-hair bg-card p-4 text-right transition-colors hover:border-route sm:col-start-2"
                >
                  <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink2">
                    Étape suivante →
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-route-deep">
                    {nextModule.icon} {nextModule.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </div>

      <BackToTop />
    </div>
  );
}