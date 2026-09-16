import { writeFileSync } from "fs";
import { join } from "path";
import {
  buildCurriculumData,
  normalizeMarkdown,
  plainTextFor,
  sectionBlocks,
  type CurriculumData,
} from "../src/lib/curriculum";
import {
  MODULE_SOURCES,
  loadModuleMarkdown,
} from "../src/lib/parse-chapter";
import { getModuleById } from "../src/data/modules";

const DATA_OUT = join(process.cwd(), "src", "data", "curriculum.gen.ts");
const SEARCH_OUT = join(process.cwd(), "public", "search-index.json");

interface SearchEntry {
  id: string;
  moduleId: number;
  moduleTitle: string;
  sectionId: string;
  sectionTitle: string;
  snippet: string;
}

function build() {
  const moduleIds = Object.keys(MODULE_SOURCES)
    .map(Number)
    .sort((a, b) => a - b);

  const records: Record<number, CurriculumData> = {};
  const entries: SearchEntry[] = [];
  const problems: string[] = [];

  for (const moduleId of moduleIds) {
    const seenSectionIds = new Map<string, number>();
    let md: string;
    try {
      md = normalizeMarkdown(loadModuleMarkdown(moduleId));
    } catch (error) {
      problems.push(`Module ${moduleId} : introuvable (${(error as Error).message})`);
      continue;
    }

    const fallbackTitle = getModuleById(moduleId)?.title ?? `Module ${moduleId}`;
    const data = buildCurriculumData(moduleId, md, fallbackTitle);
    records[moduleId] = data;

    if (data.sections.length === 0) {
      problems.push(`Module ${moduleId} : aucun chapitre/section detecte`);
    }

    for (const section of data.sections) {
      const occurrences = seenSectionIds.get(section.id) ?? 0;
      if (occurrences > 0) {
        problems.push(`Id de section duplique "${section.id}" (module ${moduleId})`);
      }
      seenSectionIds.set(section.id, occurrences + 1);
    }

    for (const block of sectionBlocks(md)) {
      const sectionId = block.heading.id;
      const plain = plainTextFor(block.body);
      entries.push({
        id: `${moduleId}-${sectionId}`,
        moduleId,
        moduleTitle: data.title,
        sectionId,
        sectionTitle: block.heading.text,
        snippet: plain.slice(0, 200) + (plain.length > 200 ? "..." : ""),
      });
    }
  }

  if (problems.length) {
    console.error("Validation du contenu :");
    for (const problem of problems) console.error(`  - ${problem}`);
    throw new Error(`${problems.length} probleme(s) de contenu detecte(s)`);
  }

  const header = `// AUTO-GENERATED par scripts/build-content.ts - ne pas editer.\n// Sources : sources/Module_*.md, sources/Section_*.md, sources/formation-ia-complete.md#module-0\nimport type { CurriculumData } from "../lib/curriculum";\n\nexport const CURRICULUM: Record<number, CurriculumData> = `;
  const body = JSON.stringify(records, null, 2).replace(/"(\d+)":/g, "$1:");
  writeFileSync(DATA_OUT, `${header}${body};\n`, "utf-8");

  writeFileSync(SEARCH_OUT, JSON.stringify(entries, null, 2), "utf-8");

  const chapterCount = Object.values(records).reduce(
    (sum, r) => sum + r.chapters.length,
    0
  );
  console.log(`Contenu genere :`);
  console.log(`  - ${Object.keys(records).length} modules, ${chapterCount} chapitres`);
  for (const id of moduleIds) {
    const r = records[id];
    console.log(
      `    #${id} "${r?.title}" : ${r?.sections.length} sections, ${r?.readingMinutes} min`
    );
  }
  console.log(`  - ${entries.length} entrees d'index de recherche -> ${SEARCH_OUT}`);
  console.log(`  - donnees curriculaires -> ${DATA_OUT}`);
}

build();