"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { ApiError } from "@/lib/api/client";

const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

function passwordProblems(password: string): string[] {
  const problems: string[] = [];
  if (password.length < 12) problems.push("au moins 12 caractères");
  if (!/[A-Z]/.test(password)) problems.push("une majuscule");
  if (!/[a-z]/.test(password)) problems.push("une minuscule");
  if (!/\d/.test(password)) problems.push("un chiffre");
  if (!/[^A-Za-z0-9]/.test(password)) problems.push("un caractère spécial");
  return problems;
}

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const problems = passwordProblems(password);
    if (problems.length > 0) {
      setError(`Le mot de passe doit contenir ${problems.join(", ")}.`);
      return;
    }
    if (password !== confirmed) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    try {
      await signUp({
        email,
        password,
        confirmed_password: confirmed,
        first_name: firstName || null,
        last_name: lastName || null,
      });
      router.push("/profile");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError && err.fields.length > 0) {
        setError(err.fields.map((field) => field.msg).join(" · "));
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Inscription impossible. Réessayez.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-hair bg-card p-8 shadow-sm">
        <p className="mb-1 text-center font-mono text-xs uppercase tracking-[0.14em] text-route-deep">
          Formation IA
        </p>
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-ink">
          Inscription
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first_name" className="mb-1 block text-sm font-medium text-foreground">
                Prénom
              </label>
              <input
                id="first_name"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jean"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="mb-1 block text-sm font-medium text-foreground">
                Nom
              </label>
              <input
                id="last_name"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12 caractères minimum"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirmed_password" className="mb-1 block text-sm font-medium text-foreground">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmed_password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmed}
              onChange={(e) => setConfirmed(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-route disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Création…" : "Créer un compte"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Déjà un compte ?{" "}
          <Link href="/auth/signin" className="text-secondary underline-offset-2 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
