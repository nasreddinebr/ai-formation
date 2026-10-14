"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { StartedCourses } from "@/components/profile/StartedCourses";
import { ApiError } from "@/lib/api/client";
import type { User } from "@/lib/api/types";

const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const labelClass = "mb-1 block text-sm font-medium text-foreground";

function AccountInfo({ user }: { user: User }) {
  const { updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(user.first_name ?? "");
  const [lastName, setLastName] = useState(user.last_name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await updateProfile({
        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        phone: phone.trim() || null,
      });
      setMessage("Informations enregistrées.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Mes informations</h2>
      <p className="mt-1 text-sm text-ink2">
        Rôle : <span className="font-mono text-xs text-route-deep">{user.role.name}</span>
      </p>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="first_name" className={labelClass}>
              Prénom
            </label>
            <input
              id="first_name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="last_name" className={labelClass}>
              Nom
            </label>
            <input
              id="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+33 6 12 34 56 78"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-70`}
          />
        </div>

        {message && <p className="rounded-lg bg-moss/10 px-3 py-2 text-xs text-ink">{message}</p>}
        {error && (
          <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-route disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

function ChangePassword() {
  const { changePassword } = useAuth();
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (next !== confirmed) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setSaving(true);
    try {
      await changePassword({
        current_password: current,
        new_password: next,
        confirmed_password: confirmed,
      });
      router.push("/auth/signin");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Modification impossible.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Mot de passe</h2>
      <p className="mt-1 text-sm text-ink2">
        Modifier le mot de passe déconnecte toutes vos sessions.
      </p>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="current_password" className={labelClass}>
            Mot de passe actuel
          </label>
          <input
            id="current_password"
            type="password"
            autoComplete="current-password"
            required
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="new_password" className={labelClass}>
            Nouveau mot de passe
          </label>
          <input
            id="new_password"
            type="password"
            autoComplete="new-password"
            required
            value={next}
            onChange={(e) => setNext(e.target.value)}
            placeholder="12 caractères minimum"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="confirmed_password" className={labelClass}>
            Confirmer
          </label>
          <input
            id="confirmed_password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmed}
            onChange={(e) => setConfirmed(e.target.value)}
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
          disabled={saving}
          className="rounded-xl border border-hair bg-card px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-route disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Modification…" : "Changer le mot de passe"}
        </button>
      </form>
    </div>
  );
}

function GuestPrompt() {
  return (
    <div className="rounded-2xl border border-dashed border-hair bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Mon compte</h2>
      <p className="mt-2 text-sm text-ink2">
        Connectez-vous pour synchroniser votre progression entre appareils et
        gérer vos informations.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/auth/signin"
          className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-route"
        >
          Se connecter
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-xl border border-hair bg-card px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-route"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}

export function AccountPanel() {
  const { user, status } = useAuth();

  if (status === "loading") {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="h-56 animate-pulse rounded-2xl bg-paper2" />
      </div>
    );
  }

  if (!user) {
    return <GuestPrompt />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <AccountInfo user={user} />
      <div className="space-y-8">
        <StartedCourses />
        <ChangePassword />
      </div>
    </div>
  );
}
