import { ProgressCard } from "@/components/profile/ProgressCard";
import { SectionChecklist } from "@/components/profile/SectionChecklist";

export const metadata = {
  title: "Mon Profil",
  description: "Suivez votre progression dans la formation IA.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Mon Profil</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProgressCard />
        <SectionChecklist />
      </div>
    </div>
  );
}
