export interface CurriculumSection {
  id: string;
  title: string;
  level: number;
}

export interface CurriculumChapter {
  id: string;
  title: string;
  sections: CurriculumSection[];
}

export interface CurriculumData {
  moduleId: number;
  title: string;
  chapters: CurriculumChapter[];
  sections: CurriculumSection[];
  readingMinutes: number;
}

export interface Heading {
  level: 1 | 2 | 3 | 4;
  text: string;
  id: string;
  chapterIndex: number;
  isChapterTitle: boolean;
  isModuleTitle: boolean;
}

const CHAPTER_RE = /^#{1,4}\s*(?:[\uD83C-\uDBFF\uDC00-\uDFFF]+\s*)?CHAPITRE\b/i;
const SEPARATOR_RE = /^#{1,4}\s*[\u2500\u2550\u2501\u2014\u2013\-\=\.\s]*$/;
const HEADING_RE = /^(#{1,4})\s+(.+)$/;

function cleanedHeadingText(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\u{FE0F}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeModuleTitle(text: string): boolean {
  const clean = cleanedHeadingText(text);
  return /^(?:FORMATION\s+IA\s+)?MODULE\b/i.test(clean) || /^SECTION\b/i.test(clean);
}

function cleanModuleTitle(rawTitle: string, fallbackTitle: string): string {
  const cleaned = cleanedHeadingText(rawTitle)
    .replace(/^(?:FORMATION\s+IA\s+)?MODULE\s+[A-Za-z]?\d*\s*[:–—-]\s*/i, "")
    .replace(/^SECTION\s+TRANSVERSALE\s+[A-Za-z]?\d*\s*[:–—-]\s*/i, "")
    .replace(/^SECTION\s+[A-Za-z]?\d*\s*[:–—-]\s*/i, "")
    .trim();

  if (!cleaned) return fallbackTitle;

  const upperTest = cleaned.replace(/[^A-ZÀ-Þ0-9'’&.\-: ]/g, "");
  const isShouting = cleaned.length >= 4 && upperTest === cleaned && /[A-ZÀ-Þ]{3,}/.test(cleaned);
  if (isShouting) return fallbackTitle;

  return cleaned;
}

export function normalizeMarkdown(md: string): string {
  return md.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
}

export function slugify(text: string): string {
  const base = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2019']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "section";
}

export function assignUniqueIds(texts: string[]): string[] {
  const counts = new Map<string, number>();
  return texts.map((text) => {
    const base = slugify(text);
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  });
}

export function isSeparatorLine(line: string): boolean {
  return SEPARATOR_RE.test(line);
}

function stripAnchorMarkers(md: string): string {
  return md.replace(/<a\s+name="[^"]*"\s*><\/a>\s*/g, "");
}

export function collectHeadings(md: string): Heading[] {
  const lines = md.split("\n");
  const headingTexts: string[] = [];
  const heads: Heading[] = [];

  let chapterIndex = -1;

  for (const line of lines) {
    const match = HEADING_RE.exec(line);
    if (!match) continue;
    const text = match[2].trim();
    if (isSeparatorLine(line)) continue;

    const level = match[1].length as 1 | 2 | 3 | 4;
    const isChapterTitle = level === 1 && CHAPTER_RE.test(line);
    const isModuleTitle =
      (level === 1 || level === 2) && !isChapterTitle && looksLikeModuleTitle(text);
    if (isChapterTitle) chapterIndex += 1;

    headingTexts.push(text);
    heads.push({
      level,
      text,
      id: "",
      chapterIndex,
      isChapterTitle,
      isModuleTitle,
    });
  }

  const ids = assignUniqueIds(headingTexts);
  for (let i = 0; i < heads.length; i++) {
    heads[i].id = ids[i];
  }

  return heads;
}

export function extractInlineAnchor(md: string, anchor: string): string | null {
  const startPattern = new RegExp(`<a\\s+name="${anchor}"\\s*>`, "i");
  const startMatch = startPattern.exec(md);
  if (!startMatch) return null;

  const startIdx = startMatch.index;
  const allAnchors = Array.from(md.matchAll(/<a\s+name="([^"]+)"\s*>/gi)).map((m) => ({
    name: m[1],
    index: m.index!,
  }));

  const nextAnchor = allAnchors.find((a) => a.index > startIdx);
  const endIdx = nextAnchor ? nextAnchor.index : md.length;

  return stripAnchorMarkers(md.slice(startIdx, endIdx)).trim();
}

function countReadingMinutes(md: string): number {
  const plain = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/\*\*|\*|__|_|#+|>`|\|/g, " ")
    .replace(/\[|\]|\(|\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = plain.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function buildCurriculumData(
  moduleId: number,
  md: string,
  fallbackTitle: string
): CurriculumData {
  const normalized = stripAnchorMarkers(normalizeMarkdown(md));
  const headings = collectHeadings(normalized);

  const titleHeading = headings.find((h) => h.isModuleTitle);
  const title = cleanModuleTitle(titleHeading?.text || fallbackTitle, fallbackTitle);

  const chapters: CurriculumChapter[] = [];
  let current: CurriculumChapter | null = null;
  const preludeSections: CurriculumSection[] = [];

  const promoteH4 = headings.filter((h) => h.level === 3).length <= 4;

  for (const h of headings) {
    if (h.isChapterTitle) {
      if (current) chapters.push(current);
      current = { id: h.id, title: h.text, sections: [] };
    } else if (h.level === 3 || (h.level === 4 && promoteH4)) {
      const section = { id: h.id, title: h.text, level: h.level };
      if (current) current.sections.push(section);
      else preludeSections.push(section);
    }
  }
  if (current) chapters.push(current);

  if (chapters.length === 0) {
    chapters.push({
      id: `module-${moduleId}`,
      title,
      sections: [...preludeSections],
    });
  }

  const sections = chapters.flatMap((c) => c.sections);
  const readingMinutes = countReadingMinutes(normalized);

  return { moduleId, title, chapters, sections, readingMinutes };
}

export function plainTextFor(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/<a\s+name="[^"]*"\s*><\/a>\s*/g, "")
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/\*\*|\*|__|_/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\|[-| :]+\|/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface SectionBlock {
  heading: Heading;
  body: string;
}

export function sectionBlocks(md: string): SectionBlock[] {
  const normalized = stripAnchorMarkers(normalizeMarkdown(md));
  const lines = normalized.split("\n");
  const headings = collectHeadings(normalized);

  const level3: Array<{ heading: Heading; startLine: number }> = [];
  let headingIdx = 0;

  lines.forEach((line, ln) => {
    const match = HEADING_RE.exec(line);
    if (!match) return;
    if (isSeparatorLine(line)) return;
    const heading = headings[headingIdx];
    headingIdx += 1;
    if (heading.level === 3) level3.push({ heading, startLine: ln });
  });

  return level3.map((s, i) => {
    const endLine = i + 1 < level3.length ? level3[i + 1].startLine : lines.length;
    return {
      heading: s.heading,
      body: lines.slice(s.startLine + 1, endLine).join("\n").trim(),
    };
  });
}