interface ReadingTimeProps {
  time: string;
}

export function ReadingTime({ time }: ReadingTimeProps) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {time}
    </span>
  );
}
