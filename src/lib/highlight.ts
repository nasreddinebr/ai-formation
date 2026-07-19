import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (highlighter) return highlighter;
  highlighter = await createHighlighter({
    themes: ["github-dark"],
    langs: [
      "python", "javascript", "typescript", "bash", "json",
      "yaml", "html", "css", "markdown", "sql",
      "rust", "go", "java", "c", "cpp",
    ],
  });
  return highlighter;
}

export async function highlightCode(
  code: string,
  lang: string = "text"
): Promise<string> {
  try {
    const hl = await getHighlighter();
    const supportedLangs = hl.getLoadedLanguages();
    const normalizedLang = supportedLangs.includes(lang) ? lang : "text";
    return hl.codeToHtml(code, {
      lang: normalizedLang,
      theme: "github-dark",
    });
  } catch {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="overflow-x-auto rounded-lg bg-neutral/50 p-4 text-sm dark:bg-card my-4"><code class="language-${lang}">${escaped}</code></pre>`;
  }
}
