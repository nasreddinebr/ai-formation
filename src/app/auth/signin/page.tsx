"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { ApiError } from "@/lib/api/client";

const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Connexion impossible. Réessayez.",
      );
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
          Connexion
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
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
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {submitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">
          Pas encore de compte ?{" "}
          <Link href="/auth/signup" className="text-secondary underline-offset-2 hover:underline">
            S&apos;inscrire
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted">
          <Link href="/profile" className="text-secondary underline-offset-2 hover:underline">
            Continuer sans compte
          </Link>
        </p>
      </div>
    </div>
  );
}
