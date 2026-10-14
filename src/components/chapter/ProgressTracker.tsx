"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { api } from "@/lib/api/client";
import type { CurriculumChapter } from "@/lib/curriculum";

interface ProgressTrackerProps {
  moduleId: number;
  moduleTitle: string;
  chapters: CurriculumChapter[];
}

/**
 * Reports the chapter currently in view to the API for authenticated users, so
 * the training dashboard can resume them at the right place. Guests are ignored
 * (their progress stays in localStorage via `useProgress`).
 */
export function ProgressTracker({ moduleId, moduleTitle, chapters }: ProgressTrackerProps) {
  const { user } = useAuth();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [chapters]);

  useEffect(() => {
    if (!user || !activeId) return;
    const chapter = chapters.find((item) => item.id === activeId);
    if (!chapter) return;

    const timer = window.setTimeout(() => {
      void api
        .recordVisit(moduleId, {
          course_id: moduleId,
          course_title: moduleTitle,
          chapter_id: chapter.id,
          chapter_title: chapter.title,
          chapter_url: `${window.location.pathname}#${chapter.id}`,
        })
        .catch(() => {
          // Progress tracking is best-effort: never disrupt reading.
        });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [user, activeId, chapters, moduleId, moduleTitle]);

  return null;
}
