"use client";

import { useSyncExternalStore, useCallback } from "react";
import { THEME_KEY } from "@/lib/constants";

type Theme = "light" | "dark";

let currentTheme: Theme = "light";

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function initTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      currentTheme = stored;
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      currentTheme = "dark";
      document.documentElement.classList.add("dark");
    }
  } catch {
    // localStorage may be unavailable
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
    try {
      localStorage.setItem(THEME_KEY, currentTheme);
    } catch {
      // Silently fail
    }
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { theme, toggleTheme, mounted: true };
}

if (typeof window !== "undefined") {
  initTheme();
}
