"use client";

import { useEffect, useRef, useState } from "react";

const ROUTE_PATH =
  "M80 300 C 200 300, 220 170, 340 170 C 460 170, 470 260, 590 260 C 710 260, 720 130, 840 130 C 940 130, 980 210, 1120 210";

const MILESTONES = [
  { x: 80, y: 300, label: "Fondamentaux", begin: 0.05, anchor: "start" as const },
  { x: 340, y: 170, label: "Maths & ML", begin: 1.8, anchor: "middle" as const },
  { x: 590, y: 260, label: "Deep Learning", begin: 3.55, anchor: "middle" as const },
  { x: 840, y: 130, label: "LLM & agents", begin: 5.3, anchor: "middle" as const },
  { x: 1120, y: 210, label: "Ingénieur IA", begin: 6.95, anchor: "end" as const },
];

const LOOP_SECONDS = 7;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function MotionBanner() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlaying(false);
      svgRef.current?.pauseAnimations();
    }
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (playing) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setElapsed((e) => (e + 1) % LOOP_SECONDS),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-8 lg:py-16">
      <header className="mb-6 max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
          Film · Parcours en mouvement
        </p>
        <h2 className="font-display text-[1.9rem] font-medium tracking-[-0.01em] sm:text-4xl">
          Quatorze étapes, une seule ligne de route
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink2 sm:text-base">
          De la première boussole jusqu’au métier d’ingénieur IA : visualisez la
          progression du programme, étape après étape.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-hair bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hair bg-paper2/60 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink2">
          <span className="inline-flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full bg-route ${playing ? "animate-pulse" : ""}`}
              aria-hidden="true"
            />
            Lecture {playing ? "en cours" : "en pause"}
          </span>
          <span>Atlas animé · 14 étapes</span>
        </div>

        <div
          className="relative aspect-[16/9] w-full"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-hair) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1200 420"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Animation du parcours : la route se dessine de l’étape 01 à l’étape 14"
          >
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="var(--color-hair)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d={ROUTE_PATH}
              pathLength={100}
              fill="none"
              stroke="var(--color-route)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="7s"
                begin="0s"
                repeatCount="indefinite"
              />
            </path>

            {MILESTONES.map((m, i) => (
              <g key={m.label} opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;1;1"
                  keyTimes="0;0.06;1"
                  dur="7s"
                  begin={`${m.begin}s`}
                  repeatCount="indefinite"
                />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="18"
                  fill="var(--color-paper)"
                  stroke="var(--color-hair)"
                />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="10"
                  fill={i === 0 ? "var(--color-moss)" : "var(--color-route)"}
                />
                <text
                  x={m.x}
                  y={m.y + 4}
                  textAnchor="middle"
                  fontFamily="var(--font-plex-mono), monospace"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--color-card)"
                >
                  {String(i * 3 + 1).padStart(2, "0")}
                </text>
                <text
                  x={m.x}
                  y={m.y + 44}
                  textAnchor={m.anchor}
                  fontFamily="var(--font-plex-mono), monospace"
                  fontSize="14"
                  fill="var(--color-ink2)"
                >
                  {m.label}
                </text>
              </g>
            ))}

            <circle r="8" fill="var(--color-ink)">
              <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE_PATH} />
            </circle>
            <circle r="16" fill="var(--color-route)" opacity="0.25">
              <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE_PATH} />
            </circle>
          </svg>

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 35%, transparent) 0 1px, transparent 1px 4px)",
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-hair px-4 py-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition-colors hover:bg-route"
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            {playing ? "Pause" : "Lecture"}
          </button>

          <div className="relative h-1.5 min-w-[8rem] flex-1 overflow-hidden rounded-full bg-hair/60">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-route transition-[width] duration-1000 ease-linear"
              style={{ width: `${((elapsed + 1) / LOOP_SECONDS) * 100}%` }}
            />
          </div>

          <p className="font-mono text-xs tabular-nums text-ink2">
            {formatTime(elapsed)} / {formatTime(LOOP_SECONDS)}
          </p>
        </div>
      </div>
    </section>
  );
}
