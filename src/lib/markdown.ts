import { collectHeadings, isSeparatorLine } from "./curriculum";

export interface RenderedCodeBlock {
  idx: number;
  lang: string;
  code: string;
}

export interface MarkdownRenderResult {
  html: string;
  codeBlocks: RenderedCodeBlock[];
}

const HEADING_RE = /^(#{1,4})\s+(.+)$/;
const LIST_RE = /^(\s*)([-*+]|\d+\.)\s+(.+)$/;
const TASK_RE = /\[([ xX])\]\s+(.*)$/;
const TABLE_SEP_RE = /^\|?[\s:|-]+\|?$/;
const HR_RE = /^\s*(?:---|\*\*\*|___)\s*$/;
const CODE_PLACEHOLDER = "\u0000CODE\u0000";

export function renderMarkdown(md: string): MarkdownRenderResult {
  const headings = collectHeadings(md);
  const codeBlocks: RenderedCodeBlock[] = [];
  let headingIndex = 0;
  const htmlParts: string[] = [];

  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isSeparatorLine(line)) {
      i += 1;
      continue;
    }

    if (/^```/.test(line)) {
      const lang = /^```(\w*)/.exec(line)?.[1] || "";
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      const idx = codeBlocks.length;
      codeBlocks.push({ idx, lang, code: codeLines.join("\n").trimEnd() });
      htmlParts.push(`<div class="code-block" data-code-idx="${idx}">@@CODE:${idx}@@</div>\n`);
      continue;
    }

    const headMatch = HEADING_RE.exec(line);
    if (headMatch) {
      const heading = headings[headingIndex];
      headingIndex += 1;
      const level = headMatch[1].length;
      const text = headMatch[2].trim();
      if (heading?.isModuleTitle) {
        i += 1;
        continue;
      }
      const id = heading?.id ? ` id="${heading.id}"` : "";
      if (level === 1) {
        htmlParts.push(`<h2 class="chapter-heading"${id}>${inline(text)}</h2>\n`);
      } else if (level === 2) {
        htmlParts.push(`<h3${id}>${inline(text)}</h3>\n`);
      } else if (level === 3) {
        htmlParts.push(`<h3 class="section-heading"${id}>${inline(text)}</h3>\n`);
      } else {
        htmlParts.push(`<h4${id}>${inline(text)}</h4>\n`);
      }
      i += 1;
      continue;
    }

    if (HR_RE.test(line)) {
      htmlParts.push("<hr>\n");
      i += 1;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        block.push(lines[i]);
        i += 1;
      }
      htmlParts.push(renderTable(block));
      continue;
    }

    if (LIST_RE.test(line)) {
      const block: string[] = [];
      i = collectListLines(lines, i, block);
      const parsed = block.filter((l) => LIST_RE.test(l)).map(parseListLine);
      if (parsed.length) htmlParts.push(renderList(parsed));
      continue;
    }

    const block: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      const cur = lines[i];
      if (
        HEADING_RE.test(cur) ||
        /^```/.test(cur) ||
        LIST_RE.test(cur) ||
        cur.trim().startsWith("|") ||
        isSeparatorLine(cur) ||
        HR_RE.test(cur)
      ) {
        break;
      }
      block.push(cur);
      i += 1;
    }
    while (i < lines.length && lines[i].trim() === "") i += 1;

    if (block.length === 0) continue;

    const isQuote = block.every((l) => l.trim().startsWith(">"));
    if (isQuote) {
      const paragraphs = block
        .map((l) => `<p>${inline(l.trim().replace(/^>\s?/, ""))}</p>`)
        .join("");
      htmlParts.push(`<blockquote>${paragraphs}</blockquote>\n`);
    } else {
      const text = block.join(" ").replace(/\s+/g, " ").trim();
      if (text) htmlParts.push(`<p>${inline(text)}</p>\n`);
    }
  }

  return { html: htmlParts.join(""), codeBlocks };
}

function collectListLines(lines: string[], start: number, out: string[]): number {
  let i = start;
  while (i < lines.length) {
    const cur = lines[i];
    if (
      isSeparatorLine(cur) ||
      HEADING_RE.test(cur) ||
      /^```/.test(cur) ||
      HR_RE.test(cur) ||
      cur.trim().startsWith("|")
    ) {
      break;
    }
    if (LIST_RE.test(cur)) {
      out.push(cur);
      i += 1;
      continue;
    }
    if (/^\s*$/.test(cur)) {
      if (i + 1 < lines.length && LIST_RE.test(lines[i + 1])) {
        i += 1;
        continue;
      }
      break;
    }
    if (indentOf(cur) > 0) {
      out.push(cur);
      i += 1;
      continue;
    }
    break;
  }
  return i;
}

function indentOf(line: string): number {
  return /^(\s*)/.exec(line)?.[1].length ?? 0;
}

interface ParsedListItem {
  ordered: boolean;
  content: string;
  indent: number;
}

interface ListItem {
  ordered: boolean;
  content: string;
  indent: number;
  children: ListItem[];
}

function parseListLine(line: string): ParsedListItem {
  const match = LIST_RE.exec(line)!;
  const indent = match[1].length;
  const ordered = /^\d+\.$/.test(match[2]);
  const rest = match[3];
  const task = TASK_RE.exec(rest);
  const content = task
    ? `<span class="task-check">${task[1].toLowerCase() === "x" ? "✓" : ""}</span> ${task[2]}`
    : rest;
  return { ordered, content: inline(content), indent };
}

function renderList(rows: ParsedListItem[]): string {
  const roots: ListItem[] = [];
  const stack: Array<{ item: ListItem; indent: number }> = [];

  for (const row of rows) {
    const item: ListItem = { ...row, children: [] };
    while (stack.length && stack[stack.length - 1].indent >= row.indent) stack.pop();
    if (stack.length === 0) roots.push(item);
    else stack[stack.length - 1].item.children.push(item);
    stack.push({ item, indent: row.indent });
  }

  return renderListTree(roots);
}

function renderListTree(items: ListItem[]): string {
  const children = items
    .map(
      (item) =>
        `<li>${item.content}${item.children.length ? renderListTree(item.children) : ""}</li>`
    )
    .join("");
  const tag = items[0].ordered ? "ol" : "ul";
  return `<${tag}>${children}</${tag}>\n`;
}

function renderTable(rows: string[]): string {
  const parseRow = (row: string): string[] =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  let header: string[] | null = null;
  let sep = -1;
  rows.forEach((raw, r) => {
    if (r === 0) header = parseRow(raw);
    else if (TABLE_SEP_RE.test(raw)) sep = r;
  });

  const body: string[][] = [];
  for (let r = 1; r < rows.length; r += 1) {
    if (r === sep) continue;
    if (r === rows.length - 1 && rows[r].trim() === "") continue;
    body.push(parseRow(rows[r]));
  }

  const headCells: string[] = header && sep !== -1 ? header : [];
  const thead = headCells.length
    ? `<thead><tr>${headCells.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`
    : "";
  const tbody = `<tbody>${body
    .map(
      (cols) =>
        `<tr>${cols.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`
    )
    .join("")}</tbody>`;
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>\n`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(input: string): string {
  let s = escapeHtml(input);
  const codeSpans: string[] = [];
  s = s.replace(/`([^`]+)`/g, (_m, c) => {
    codeSpans.push(c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    return CODE_PLACEHOLDER + (codeSpans.length - 1) + CODE_PLACEHOLDER;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2" loading="lazy">');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(new RegExp(CODE_PLACEHOLDER + "(\\d+)" + CODE_PLACEHOLDER, "g"), (_m, idx) => {
    return `<code>${codeSpans[Number(idx)]}</code>`;
  });
  return s;
}