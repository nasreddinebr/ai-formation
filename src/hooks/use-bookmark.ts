"use client";

import { useSyncExternalStore, useCallback } from "react";
import { BOOKMARK_KEY } from "@/lib/constants";

type BookmarkData = { id: number; title: string } | null;

let cachedBookmark: BookmarkData = null;
let cachedBookmarkRaw: string | null = null;

function getSnapshot(): BookmarkData {
  try {
    const stored = localStorage.getItem(BOOKMARK_KEY);
    if (stored === cachedBookmarkRaw) return cachedBookmark;
    cachedBookmarkRaw = stored;
    cachedBookmark = stored ? JSON.parse(stored) : null;
    return cachedBookmark;
  } catch {
    cachedBookmarkRaw = null;
    cachedBookmark = null;
    return null;
  }
}

function getServerSnapshot(): BookmarkData {
  return null;
}

function subscribe(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

export function useBookmark() {
  const lastVisited = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveBookmark = useCallback((moduleId: number, moduleTitle: string) => {
    try {
      const data: BookmarkData = { id: moduleId, title: moduleTitle };
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(data));
      cachedBookmarkRaw = null;
      cachedBookmark = null;
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const clearBookmark = useCallback(() => {
    try {
      localStorage.removeItem(BOOKMARK_KEY);
      cachedBookmarkRaw = null;
      cachedBookmark = null;
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Silently fail
    }
  }, []);

  return { lastVisited, saveBookmark, clearBookmark };
}
