export const SITE_NAME = "Formation IA — De Zero a Ingenieur";
export const SITE_DESCRIPTION =
  "Parcours complet, progressif et professionnalisant pour devenir ingenieur IA.";
export const SITE_URL = "https://ai-formation.dev";

export const COLORS = {
  primary: "#355872",
  secondary: "#7AAACE",
  accent: "#9CD5FF",
  neutral: "#F7F8F0",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Modules", href: "/#modules" },
  { label: "Profil", href: "/profile" },
  { label: "Connexion", href: "/auth/signin" },
] as const;

export const DIFFICULTY_LABELS: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
  expert: "Expert",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  debutant: "bg-[color:var(--color-moss)]/15 text-[color:var(--color-moss)]",
  intermediaire: "bg-[color:var(--color-route)]/15 text-[color:var(--color-route-deep)]",
  avance: "bg-[color:var(--color-ink)]/10 text-[color:var(--color-ink)]",
  expert: "bg-[color:var(--color-route)]/20 text-[color:var(--color-route-deep)]",
};

export const BOOKMARK_KEY = "ai-formation-last-visited";
export const THEME_KEY = "ai-formation-theme";
export const PROGRESS_KEY = "ai-formation-progress";
