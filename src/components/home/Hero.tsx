import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          De Zéro à Ingénieur IA
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
          Parcours complet, progressif et professionnalisant. Maîtrisez Python,
          le Machine Learning, le Deep Learning, les LLMs et bien plus.
        </p>
        <Link
          href="/#modules"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral"
        >
          Commencer la formation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
