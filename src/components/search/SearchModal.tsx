"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIndex, SearchEntry } from "@/lib/search-index";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIndex(new SearchIndex(data));
      })
      .catch(console.error);
    return () => { cancelled = true; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedIndex(0);
      if (!index || value.length < 2) {
        setResults([]);
        return;
      }
      setResults(index.search(value));
    },
    [index]
  );

  const handleSelect = useCallback(
    (entry: SearchEntry) => {
      router.push(`/module/${entry.moduleId}#${entry.sectionId}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, selectedIndex, handleSelect, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher dans la formation..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-muted sm:inline">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto p-2">
            {results.map((result, i) => (
              <li key={result.id}>
                <button
                  onClick={() => handleSelect(result)}
                  className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                    i === selectedIndex
                      ? "bg-accent/20 text-foreground"
                      : "text-muted hover:bg-accent/10 hover:text-foreground"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {result.moduleTitle}
                  </p>
                  <p className="text-xs text-secondary">
                    {result.sectionTitle}
                  </p>
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {result.snippet}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <p className="p-4 text-center text-sm text-muted">
            Aucun resultat pour &quot;{query}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
