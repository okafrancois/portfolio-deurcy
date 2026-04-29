"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

type Quote = {
  _id: string;
  _creationTime: number;
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  message: string;
  status: "new" | "read" | "done";
};

const STATUS_LABEL: Record<Quote["status"], string> = {
  new: "Nouveau",
  read: "Lu",
  done: "Traité",
};

export default function QuotesPanel({ quotes }: { quotes: Quote[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const setStatus = async (id: string, status: Quote["status"]) => {
    await fetch("/api/admin/quotes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "setStatus", id, status }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    await fetch("/api/admin/quotes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    router.refresh();
  };

  if (quotes.length === 0) {
    return (
      <p style={{ color: "var(--ink-dim)" }}>
        Aucune demande pour l&apos;instant.
      </p>
    );
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Type</th>
          <th>Budget</th>
          <th>Statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((q) => {
          const open = openId === q._id;
          return (
            <Fragment key={q._id}>
              <tr
                onClick={() => {
                  setOpenId(open ? null : q._id);
                  if (q.status === "new") void setStatus(q._id, "read");
                }}
                style={{ cursor: "pointer" }}
              >
                <td>
                  {new Date(q._creationTime).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{q.name}</td>
                <td>{q.email}</td>
                <td>{q.type}</td>
                <td>{q.budget}</td>
                <td>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background:
                        q.status === "new"
                          ? "var(--accent)"
                          : q.status === "done"
                            ? "var(--bg-elev)"
                            : "var(--bg)",
                      color: q.status === "new" ? "#0a0908" : "var(--ink-dim)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {STATUS_LABEL[q.status]}
                  </span>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void remove(q._id);
                    }}
                    style={{ color: "var(--ink-mute)", fontSize: 12 }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
              {open ? (
                <tr>
                  <td colSpan={7} style={{ background: "var(--bg-elev)" }}>
                    <div style={{ padding: 16 }}>
                      <p style={{ marginBottom: 12, color: "var(--ink-dim)" }}>
                        <strong>Entreprise :</strong> {q.company || "—"}
                      </p>
                      <p style={{ whiteSpace: "pre-wrap", marginBottom: 12 }}>
                        {q.message}
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        {(["new", "read", "done"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation();
                              void setStatus(q._id, s);
                            }}
                            className="btn btn-ghost"
                            style={{
                              padding: "6px 12px",
                              fontSize: 12,
                              opacity: q.status === s ? 1 : 0.6,
                              borderColor:
                                q.status === s
                                  ? "var(--accent)"
                                  : "var(--line)",
                            }}
                          >
                            {STATUS_LABEL[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
