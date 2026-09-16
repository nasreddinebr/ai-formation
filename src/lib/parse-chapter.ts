import { readFileSync } from "fs";
import { join } from "path";
import { calculateReadingTime } from "./reading-time";
import { highlightCode } from "./highlight";
import { renderMarkdown } from "./markdown";
import {
  buildCurriculumData,
  extractInlineAnchor,
  normalizeMarkdown,
  type CurriculumData,
} from "./curriculum";
import { getModuleById } from "../data/modules";

export interface ChapterContent {
  moduleId: number;
  title: string;
  rawMarkdown: string;
  readingTime: string;
  html: string;
  data: CurriculumData;
}

const SOURCE_DIR = join(process.cwd(), "sources");
const MAIN_FILE = join(SOURCE_DIR, "formation-ia-complete.md");

export const MODULE_SOURCES: Record<
  number,
  { type: "file"; file: string } | { type: "inline"; anchor: string }
> = {
  0: { type: "inline", anchor: "module-0" },
  1: { type: "file", file: "Module_01_Python_et_Outils.md" },
  2: { type: "file", file: "Module_02_Mathematiques_pour_IA.md" },
  3: { type: "file", file: "Module_03_Machine_Learning.md" },
  4: { type: "file", file: "Module_04_Deep_Learning_PyTorch.md" },
  5: { type: "file", file: "Module_05_NLP_LLMs.md" },
  6: { type: "file", file: "Module_06_IA_Generative.md" },
  7: { type: "file", file: "Module_07_Computer_Vision.md" },
  8: { type: "file", file: "Module_08_Agents_IA_RAG.md" },
  9: { type: "file", file: "Module_09_Deploiement_MLOps.md" },
  10: { type: "file", file: "Module_10_Cursus_Ingenieur_IA.md" },
  11: { type: "file", file: "Section_A_Modele_Chatbot_SaaS.md" },
  12: { type: "file", file: "Section_B_Portfolio_Emploi_Freelance.md" },
  13: { type: "file", file: "Section_C_Erreurs_Apprentissage_Efficace.md" },
};

export function loadModuleMarkdown(moduleId: number): string {
  const src = MODULE_SOURCES[moduleId];
  if (!src) throw new Error(`Aucune source connue pour le module ${moduleId}`);

  if (src.type === "file") {
    return readFileSync(join(SOURCE_DIR, src.file), "utf-8");
  }

  const main = readFileSync(MAIN_FILE, "utf-8");
  const block = extractInlineAnchor(normalizeMarkdown(main), src.anchor);
  if (!block) throw new Error(`Ancre "${src.anchor}" introuvable dans ${MAIN_FILE}`);
  return block;
}

export async function getChapterContent(moduleId: number): Promise<ChapterContent | null> {
  try {
    const md = normalizeMarkdown(loadModuleMarkdown(moduleId));
    if (!md.trim()) return null;

    const fallbackTitle = fallbackTitleFor(moduleId);
    const data = buildCurriculumData(moduleId, md, fallbackTitle);

    const { html, codeBlocks } = renderMarkdown(md);
    let rendered = html;
    for (const block of codeBlocks) {
      const highlighted = await highlightCode(block.code, block.lang);
      rendered = rendered.replace(`@@CODE:${block.idx}@@`, highlighted);
    }

    return {
      moduleId,
      title: data.title,
      rawMarkdown: md,
      readingTime: calculateReadingTime(md),
      html: rendered,
      data,
    };
  } catch (error) {
    console.error(`getChapterContent(${moduleId}) a échoué`, error);
    return null;
  }
}

function fallbackTitleFor(moduleId: number): string {
  return getModuleById(moduleId)?.title ?? `Module ${moduleId}`;
}