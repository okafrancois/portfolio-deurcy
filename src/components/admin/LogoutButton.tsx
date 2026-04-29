"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      style={{
        fontSize: 13,
        color: "var(--ink-dim)",
        textDecoration: "underline",
        opacity: busy ? 0.6 : 1,
      }}
    >
      Déconnexion
    </button>
  );
}
