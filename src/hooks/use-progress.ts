"use client";

import { useSyncExternalStore, useCallback } from "react";
import { PROGRESS_KEY } from "@/lib/constants";
import { modules } from "@/data/modules";

interface ProgressData {
  visitedModules: number[];
  completedSections: Record<number, string[]>;
}

const defaultProgress: ProgressData = {
  visitedModules: [],
  completedSections: {},
};

let cachedProgress: ProgressData = defaultProgress;
let cachedProgressRaw: string | null = null;

function getSnapshot(): ProgressData {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored === cachedProgressRaw) return cachedProgress;
    cachedProgressRaw = stored;
    cachedProgress = stored ? JSON.parse(stored) : defaultProgress;
    return cachedProgress;
  } catch {
    cachedProgressRaw = null;
    cachedProgress = defaultProgress;
    return defaultProgress;
  }
}

function getServerSnapshot(): ProgressData {
  return defaultProgress;
}

function subscribe(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    cachedProgressRaw = null;
    cachedProgress = null;
    window.dispatchEvent(new Event("storage"));
  } catch {
    // Silently fail
  }
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const markModuleVisited = useCallback((moduleId: number) => {
    const current = getSnapshot();
    if (!current.visitedModules.includes(moduleId)) {
      saveProgress({
        ...current,
        visitedModules: [...current.visitedModules, moduleId],
      });
    }
  }, []);

  const toggleSection = useCallback((moduleId: number, sectionId: string) => {
    const current = getSnapshot();
    const moduleSections = current.completedSections[moduleId] || [];
    const isCompleted = moduleSections.includes(sectionId);
    const updatedSections = isCompleted
      ? moduleSections.filter((s) => s !== sectionId)
      : [...moduleSections, sectionId];

    saveProgress({
      ...current,
      completedSections: {
        ...current.completedSections,
        [moduleId]: updatedSections,
      },
    });
  }, []);

  const isSectionCompleted = useCallback(
    (moduleId: number, sectionId: string): boolean => {
      return (progress.completedSections[moduleId] || []).includes(sectionId);
    },
    [progress.completedSections]
  );

  const getModuleProgress = useCallback(
    (moduleId: number): { completed: number; total: number } => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return { completed: 0, total: 0 };
      const completed = (progress.completedSections[moduleId] || []).length;
      return { completed, total: mod.sections.length };
    },
    [progress.completedSections]
  );

  const getOverallProgress = useCallback((): { completed: number; total: number } => {
    const totalSections = modules.reduce((sum, m) => sum + m.sections.length, 0);
    const completedSections = Object.values(progress.completedSections)
      .reduce((sum, sections) => sum + sections.length, 0);
    return { completed: completedSections, total: totalSections };
  }, [progress.completedSections]);

  const clearProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, []);

  return {
    progress,
    markModuleVisited,
    toggleSection,
    isSectionCompleted,
    getModuleProgress,
    getOverallProgress,
    clearProgress,
  };
}
