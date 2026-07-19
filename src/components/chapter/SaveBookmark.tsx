"use client";

import { useEffect } from "react";
import { useBookmark } from "@/hooks/use-bookmark";

interface SaveBookmarkProps {
  moduleId: number;
  moduleTitle: string;
}

export function SaveBookmark({ moduleId, moduleTitle }: SaveBookmarkProps) {
  const { saveBookmark } = useBookmark();

  useEffect(() => {
    saveBookmark(moduleId, moduleTitle);
  }, [moduleId, moduleTitle, saveBookmark]);

  return null;
}
