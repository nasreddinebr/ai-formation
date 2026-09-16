import { ProgressCard } from "@/components/profile/ProgressCard";
import { SectionChecklist } from "@/components/profile/SectionChecklist";

export const metadata = {
  title: "Mon Profil",
  description: "Suivez votre progression dans la formation IA.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
        Votre carte d’avancement
      </p>
      <h1 className="mb-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Mon Profil
      </h1>
      <p className="mb-8 max-w-xl text-sm text-ink2">
        Suivez vos sections terminées et reprenez chaque étape du parcours là où
        vous en êtes resté.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProgressCard />
        <SectionChecklist />
      </div>
    </div>
  );
}