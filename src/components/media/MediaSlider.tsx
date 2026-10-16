"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArtFrame } from "./ArtFrame";

export interface MediaSlide {
  moduleId: number;
  plateNumber: number;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
}

const AUTOPLAY_MS = 7000;

interface MediaSliderProps {
  slides: MediaSlide[];
  title?: string;
  eyebrow?: string;
}

export function MediaSlider({
  slides,
  title = "Points de vue du parcours",
  eyebrow = "Diaporama · Planches",
}: MediaSliderProps) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % total),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  if (total === 0) return null;

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-10 sm:px-8 lg:py-14"
      aria-roledescription="carrousel"
      aria-label={title}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
            {eyebrow}
          </p>
          <h2 className="font-display text-[1.9rem] font-medium tracking-[-0.01em] sm:text-4xl">
            {title}
          </h2>
        </div>
        <p className="font-mono text-xs tabular-nums text-ink2">
          <span className="text-route-deep">{String(index + 1).padStart(2, "0")}</span>
          {" / "}
          {String(total).padStart(2, "0")}
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-hair bg-card">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <article
              key={slide.moduleId}
              className="w-full shrink-0"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${total}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <div className="grid items-center gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_0.92fr] lg:gap-10 lg:p-8">
                <div>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-route-deep">
                    {slide.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-ink sm:text-3xl">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink2">
                    {slide.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hair bg-paper2/60 px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={slide.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:bg-route"
                  >
                    Ouvrir l’étape
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <ArtFrame
                  moduleId={slide.moduleId}
                  plateNumber={slide.plateNumber}
                  caption={slide.title}
                  className="shadow-[6px_6px_0_0_var(--color-hair)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Choisir une planche"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.moduleId}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`Planche ${slide.plateNumber} — ${slide.title}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-route" : "w-2 bg-hair hover:bg-route-light"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Planche précédente"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hair bg-card text-ink transition-colors hover:border-route hover:text-route-deep"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Planche suivante"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hair bg-card text-ink transition-colors hover:border-route hover:text-route-deep"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
