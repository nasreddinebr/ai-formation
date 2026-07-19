import { readFileSync } from "fs";
import { join } from "path";
import { highlightCode } from "./highlight";
import { calculateReadingTime } from "./reading-time";

export interface ChapterContent {
  moduleIndex: number;
  title: string;
  rawMarkdown: string;
  readingTime: string;
  highlightedHtml: string;
}

const CONTENT_DIR = join(process.cwd(), "content");

function stripAnchorTags(md: string): string {
  return md.replace(/<a name="[^"]*"><\/a>\s*/g, "");
}

function extractCodeBlocks(md: string): { cleaned: string; blocks: { lang: string; code: string; placeholder: string }[] } {
  const blocks: { lang: string; code: string; placeholder: string }[] = [];
  let counter = 0;
  const cleaned = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `__CODE_BLOCK_${counter}__`;
    blocks.push({ lang: lang || "text", code: code.trimEnd(), placeholder });
    counter++;
    return placeholder;
  });
  return { cleaned, blocks };
}

const ANCHORS: Record<number, string> = {
  0: "module-0", 1: "module-1", 2: "module-2", 3: "module-3",
  4: "module-4", 5: "module-5", 6: "module-6", 7: "module-7",
  8: "module-8", 9: "module-9", 10: "module-10", 11: "creation",
  12: "carriere", 13: "erreurs",
};

function extractRawMarkdown(content: string, moduleId: number): string | null {
  const anchor = ANCHORS[moduleId];
  if (!anchor) return null;

  const startPattern = new RegExp(`<a name="${anchor}">`, "i");
  const startMatch = startPattern.exec(content);
  if (!startMatch) return null;

  const startIdx = startMatch.index;
  const allAnchors = Array.from(
    content.matchAll(/<a name="([^"]+)">/gi)
  ).map((m) => ({ name: m[1], index: m.index! }));

  const nextAnchor = allAnchors.find((a) => a.index > startIdx);
  const endIdx = nextAnchor ? nextAnchor.index : content.length;

  return content.slice(startIdx, endIdx).trim();
}

function buildHighlightedHtml(md: string, highlightedBlocks: Map<string, string>): string {
  let html = stripAnchorTags(md);

  for (const [placeholder, highlighted] of highlightedBlocks) {
    html = html.replace(placeholder, highlighted);
  }

  html = html.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-neutral/50 px-1.5 py-0.5 text-sm dark:bg-card">$1</code>'
  );

  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g,
    (header, headerRow, bodyRows) => {
      const headers = headerRow
        .split("|")
        .filter((c: string) => c.trim())
        .map(
          (c: string) =>
            `<th class="border border-border px-3 py-2 text-left text-sm font-medium">${c.trim()}</th>`
        );
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map(
              (c: string) =>
                `<td class="border border-border px-3 py-2 text-sm">${c.trim()}</td>`
            );
          return `<tr>${cells.join("")}</tr>`;
        });
      return `<div class="overflow-x-auto my-4"><table class="border-collapse border border-border"><thead><tr>${headers.join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
    }
  );

  html = html.replace(/^#### (.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h4 id="${id}" class="mt-6 mb-2 text-base font-semibold text-foreground">${t}</h4>`;
  });
  html = html.replace(/^### (.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h3 id="${id}" class="mt-8 mb-3 text-lg font-semibold text-foreground">${t}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h2 id="${id}" class="mt-10 mb-4 text-xl font-bold text-foreground">${t}</h2>`;
  });

  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="my-4 border-l-4 border-accent pl-4 text-muted italic">$1</blockquote>'
  );

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
  html = html.replace(/((?:<li class="ml-4 list-disc[^"]*">.*<\/li>\n?)+)/g, '<ul class="my-2 space-y-1">$1</ul>');

  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$1</li>');

  html = html.replace(/^---$/gm, '<hr class="my-8 border-border" />');

  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<") ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("|")
      ) {
        return trimmed;
      }
      return `<p class="my-3 text-sm leading-relaxed text-foreground">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export async function getChapterContent(moduleId: number): Promise<ChapterContent | null> {
  try {
    const filePath = join(CONTENT_DIR, "formation-ia-complete.md");
    const content = readFileSync(filePath, "utf-8");

    const rawMarkdown = extractRawMarkdown(content, moduleId);
    if (!rawMarkdown) return null;

    const titleMatch = rawMarkdown.match(/^##\s+.+\n###\s+(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : `Module ${moduleId}`;

    const readingTime = calculateReadingTime(rawMarkdown);

    const { cleaned, blocks } = extractCodeBlocks(rawMarkdown);
    const highlightedBlocks = new Map<string, string>();
    for (const block of blocks) {
      const highlighted = await highlightCode(block.code, block.lang);
      highlightedBlocks.set(block.placeholder, highlighted);
    }

    const highlightedHtml = buildHighlightedHtml(cleaned, highlightedBlocks);

    return {
      moduleIndex: moduleId,
      title,
      rawMarkdown,
      readingTime,
      highlightedHtml,
    };
  } catch {
    return null;
  }
}
