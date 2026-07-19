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
  debutant: "Debutant",
  intermediaire: "Intermediaire",
  avance: "Avance",
  expert: "Expert",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  debutant: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediaire:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  avance:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export const BOOKMARK_KEY = "ai-formation-last-visited";
export const THEME_KEY = "ai-formation-theme";
export const PROGRESS_KEY = "ai-formation-progress";
