interface ChapterContentProps {
  html: string;
}

export function ChapterContent({ html }: ChapterContentProps) {
  return (
    <div
      className="atlas-article max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}