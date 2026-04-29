"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Erreur de connexion.");
      }
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          padding: 32,
          borderRadius: 4,
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          Espace admin
        </div>
        <h1
          className="display"
          style={{ fontSize: 40, marginBottom: 32, lineHeight: 1.05 }}
        >
          Se <em>connecter.</em>
        </h1>

        <label className="admin-label">Mot de passe</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"
          style={{ marginBottom: 20 }}
        />

        {error ? (
          <p style={{ color: "#ff8b6b", fontSize: 13, marginBottom: 16 }}>
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{
            width: "100%",
            justifyContent: "center",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Connexion…" : "Entrer"}
        </button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
