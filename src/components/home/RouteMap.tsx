export const NODES = [
  [24, 186],
  [112, 147],
  [200, 145],
  [288, 94],
  [376, 100],
  [465, 101],
  [554, 149],
  [642, 126],
  [730, 123],
  [818, 73],
  [907, 90],
  [997, 87],
  [1086, 131],
  [1176, 140],
] as const;

const NOTES = [0, 3, 5, 8, 10, 13] as const;

const NOTE_LABELS: Record<number, string> = {
  0: "Fondamentaux",
  3: "Machine Learning",
  5: "NLP & LLM",
  8: "Agents & RAG",
  10: "Ingénieur",
  13: "Débogage",
};

interface RouteMapProps {
  count: number;
}

function waypoint(n: number): string {
  return `0${n}`.slice(-2);
}

export function RouteMap({ count }: RouteMapProps) {
  return (
    <div className="mt-12 rounded-2xl border border-hair bg-card px-2 pb-4 pt-5 sm:px-5 lg:mt-16">
      <div className="mb-1 flex flex-wrap justify-between gap-1 px-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink2">
        <span>Parcours n° 01</span>
        <span>{count} étapes</span>
        <span>FR · métrique</span>
      </div>

      <svg
        className="block h-auto w-full"
        viewBox="0 0 1200 260"
        role="img"
        aria-label="Le parcours en 14 étapes, des fondamentaux à l’ingénieur IA"
      >
        <path
          className="route-line"
          d="M24 186 C 180 186, 210 84, 360 84 C 470 84, 480 150, 600 150 C 720 150, 730 70, 870 70 C 970 70, 990 140, 1176 140"
          fill="none"
          stroke="var(--color-route)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {NODES.map(([x, y], i) => {
          const isStart = i === 0;
          const isEnd = i === count - 1;
          const label = (NOTES as readonly number[]).includes(i)
            ? NOTE_LABELS[i]
            : null;
          const nodeFill = isStart
            ? "var(--color-moss)"
            : isEnd
              ? "var(--color-route)"
              : "var(--color-card)";
          const nodeStroke = isStart || isEnd ? nodeFill : "var(--color-ink)";
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill={nodeFill} stroke={nodeStroke} strokeWidth="1.6" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontFamily="var(--font-plex-mono), monospace"
                fontSize="11"
                fontWeight="600"
                fill={isStart || isEnd ? "#fff" : "var(--color-ink)"}
              >
                {waypoint(i + 1)}
              </text>
              {label && (
                <text
                  x={x}
                  y={y + 34}
                  textAnchor="middle"
                  fontFamily="var(--font-plex-mono), monospace"
                  fontSize="9.5"
                  fill="var(--color-ink2)"
                  className="hidden sm:block"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-x-8 gap-y-1 px-3 pt-2 font-mono text-xs text-ink2">
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-1.5 w-3.5 rounded-full bg-moss" aria-hidden="true" />
          Départ · Les fondamentaux
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
          {count} étapes jalonnées
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-1.5 w-3.5 rounded-full bg-route" aria-hidden="true" />
          Arrivée · Ingénieur IA
        </span>
      </div>
    </div>
  );
}