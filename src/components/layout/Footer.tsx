import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
        <p>
          Curriculum open-source.{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-foreground"
          >
            Voir sur GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
