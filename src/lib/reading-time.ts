export function calculateReadingTime(markdown: string): string {
  const plainText = markdown
    .replace(/<a name="[^"]*"><\/a>\s*/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^[-#>]\s*/gm, "")
    .replace(/\|[-| ]+\|/g, "")
    .replace(/\|/g, "")
    .trim();

  const wordCount = plainText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes < 1) return "Moins d'1 min";
  if (minutes === 1) return "1 min de lecture";
  return `${minutes} min de lecture`;
}
