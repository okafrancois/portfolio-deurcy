"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SeedButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          const res = await fetch("/api/admin/seed", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ action: "create" }),
          });
          setBusy(false);
          if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? "Échec du seed.");
            return;
          }
          router.refresh();
        }}
      >
        {busy ? "Seed en cours…" : "Initialiser le contenu"}
      </button>
      {error ? (
        <p style={{ color: "#ff8b6b", fontSize: 13, marginTop: 8 }}>{error}</p>
      ) : null}
    </div>
  );
}
