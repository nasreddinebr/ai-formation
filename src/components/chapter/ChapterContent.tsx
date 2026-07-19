interface ChapterContentProps {
  html: string;
}

export function ChapterContent({ html }: ChapterContentProps) {
  return (
    <div
      className="prose prose-sm max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
