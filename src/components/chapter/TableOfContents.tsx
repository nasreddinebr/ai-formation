"use client";

import { useEffect, useState } from "react";
import type { CurriculumChapter } from "@/lib/curriculum";

interface TableOfContentsProps {
  chapters: CurriculumChapter[];
}

export function TableOfContents({ chapters }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const targets: string[] = [];
    for (const chapter of chapters) {
      targets.push(chapter.id);
      for (const section of chapter.sections) targets.push(section.id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const id of targets) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Sommaire du module" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-route-deep">
        Sommaire
      </p>
      <ul className="space-y-3 border-l border-hair pl-3">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={`block rounded px-2 py-0.5 text-[0.8rem] leading-snug transition-colors ${
                activeId === chapter.id
                  ? "font-semibold text-route-deep"
                  : "font-medium text-ink hover:text-route-deep"
              }`}
            >
              {chapter.title}
            </a>
            {chapter.sections.length > 0 && (
              <ul className="mt-1 space-y-0.5 border-l border-hair pl-2.5">
                {chapter.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block rounded px-2 py-0.5 text-[0.72rem] leading-snug transition-colors ${
                        activeId === section.id
                          ? "bg-route/10 font-medium text-route-deep"
                          : "text-ink2 hover:text-ink"
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}