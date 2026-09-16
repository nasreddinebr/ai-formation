import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hair bg-ink text-paper dark:bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-route font-display text-sm italic text-card">
              IA
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              Formation IA
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">
            Un parcours cartographié : 14 étapes — des fondamentaux à
            l&apos;ingénieur IA.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm" aria-label="Liens du pied de page">
          <Link href="/#modules" className="text-route-light transition-colors hover:text-paper">
            Le parcours
          </Link>
          <Link href="/profile" className="text-route-light transition-colors hover:text-paper">
            Mon profil
          </Link>
          <Link href="/auth/signin" className="text-route-light transition-colors hover:text-paper">
            Connexion
          </Link>
        </nav>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-paper/60">
          <p>© {year} Formation IA — Curriculum open-source.</p>
          <span className="font-mono uppercase tracking-[0.15em]">
            Python · ML · Deep Learning · LLM · MLOps
          </span>
        </div>
      </div>
    </footer>
  );
}