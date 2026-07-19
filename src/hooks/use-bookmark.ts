"use client";

import { useSyncExternalStore, useCallback } from "react";
import { BOOKMARK_KEY } from "@/lib/constants";

type BookmarkData = { id: number; title: string } | null;

function getSnapshot(): BookmarkData {
  try {
    const stored = localStorage.getItem(BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getServerSnapshot(): BookmarkData {
  return null;
}

function subscribe(): () => void {
  return () => {};
}

export function useBookmark() {
  const lastVisited = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveBookmark = useCallback((moduleId: number, moduleTitle: string) => {
    try {
      const data: BookmarkData = { id: moduleId, title: moduleTitle };
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const clearBookmark = useCallback(() => {
    try {
      localStorage.removeItem(BOOKMARK_KEY);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Silently fail
    }
  }, []);

  return { lastVisited, saveBookmark, clearBookmark };
}
