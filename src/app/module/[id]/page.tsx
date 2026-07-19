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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Module {mod.id}</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-start gap-4">
        <span className="text-4xl">{mod.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{mod.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[mod.difficulty]}`}
            >
              {DIFFICULTY_LABELS[mod.difficulty]}
            </span>
            <span>{mod.estimatedTime}</span>
            <span>{mod.sections.length} sections</span>
            {chapterData && <ReadingTime time={chapterData.readingTime} />}
          </div>
        </div>
      </div>

      <SaveBookmark moduleId={mod.id} moduleTitle={mod.title} />

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <TableOfContents sections={mod.sections} />
        </aside>

        <article className="min-w-0 flex-1">
          {chapterData ? (
            <ChapterContent html={chapterData.highlightedHtml} />
          ) : (
            <p className="text-muted">
              Contenu en cours de chargement.
            </p>
          )}

          {resources.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Ressources
              </h2>
              <ul className="space-y-2">
                {resources.map((res) => (
                  <li key={res.url}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary underline-offset-2 hover:underline"
                    >
                      {res.title}
                    </a>
                    <span className="ml-2 text-xs text-muted">
                      ({res.language === "fr" ? "FR" : "EN"})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>

      <BackToTop />
    </div>
  );
}
