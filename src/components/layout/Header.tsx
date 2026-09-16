"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/use-theme";
import { NAV_LINKS } from "@/lib/constants";
import { SearchModal } from "@/components/search/SearchModal";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hair bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Formation IA, retour à l'accueil"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-route font-display text-lg italic text-card shadow-sm transition-transform group-hover:-rotate-6">
              IA
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-tight text-ink">
                Formation IA
              </span>
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink2">
                Parcours · de zéro à ingénieur
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink2 underline-offset-4 transition-colors hover:text-route-deep hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-md border border-hair bg-card px-3 py-1.5 text-sm text-ink transition-colors hover:border-route hover:bg-paper2"
              aria-label="Rechercher dans la formation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="hidden sm:inline">Rechercher</span>
              <kbd className="hidden rounded border border-hair px-1 py-0.5 font-mono text-[0.65rem] text-ink2 md:inline">
                ⌘K
              </kbd>
            </button>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-hair bg-card text-ink transition-colors hover:border-route hover:bg-paper2"
                aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {theme === "dark" ? (
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
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
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
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}