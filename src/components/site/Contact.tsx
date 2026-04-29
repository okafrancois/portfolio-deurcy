"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Props = {
  titleLine1: string;
  titleEm: string;
  email: string;
  phone: string;
  socialHandle: string;
  socialUrl: string;
  replyNotice: string;
  quoteTypes: string[];
  budgets: string[];
};

type FormState = {
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  message: string;
};

export function Contact({
  titleLine1,
  titleEm,
  email,
  phone,
  socialHandle,
  socialUrl,
  replyNotice,
  quoteTypes,
  budgets,
}: Props) {
  const initial: FormState = {
    name: "",
    email: "",
    company: "",
    type: quoteTypes[0] ?? "",
    budget: budgets[Math.min(2, budgets.length - 1)] ?? "",
    message: "",
  };
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Échec de l'envoi.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "120px 0",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-elev)",
      }}
    >
      <div className="container-page">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            § 07 — Démarrer un projet
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 160px)",
              marginBottom: 64,
              maxWidth: 1100,
            }}
          >
            {titleLine1}
            <br />
            <em>{titleEm}</em>
          </h2>
        </Reveal>

        <div
          className="contact-grid"
          style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80 }}
        >
          <div>
            <Reveal>
              <ContactItem label="// EMAIL" href={`mailto:${email}`}>
                {email}
              </ContactItem>
            </Reveal>
            <Reveal delay={80}>
              <ContactItem
                label="// TÉLÉPHONE"
                href={`tel:${phone.replace(/\s/g, "")}`}
              >
                {phone}
              </ContactItem>
            </Reveal>
            <Reveal delay={160}>
              <ContactItem label="// SOCIAL" href={socialUrl}>
                {socialHandle}
              </ContactItem>
            </Reveal>
            <Reveal delay={220}>
              <p
                style={{
                  color: "var(--ink-dim)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxWidth: 360,
                }}
              >
                {replyNotice}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: 36,
                position: "relative",
              }}
            >
              {sent && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10,9,8,0.96)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 32,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0a0908"
                      strokeWidth="3"
                    >
                      <path
                        d="M5 12l5 5L20 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="display" style={{ fontSize: 36 }}>
                    Demande reçue.
                  </h3>
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      marginTop: 12,
                      maxWidth: 380,
                    }}
                  >
                    Merci {form.name || "!"} — je reviens vers vous sous 24h
                    ouvrées avec une première proposition.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm(initial);
                    }}
                    className="btn btn-ghost"
                    style={{ marginTop: 24 }}
                  >
                    Nouveau message
                  </button>
                </div>
              )}

              <div
                className="form-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <Field
                  label="Nom"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  required
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <Field
                  label="Entreprise / projet"
                  value={form.company}
                  onChange={(v) => update("company", v)}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <Label>Type de prestation</Label>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  {quoteTypes.map((t) => (
                    <Chip
                      key={t}
                      active={form.type === t}
                      onClick={() => update("type", t)}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <Label>Budget estimé</Label>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginTop: 10,
                  }}
                >
                  {budgets.map((b) => (
                    <Chip
                      key={b}
                      active={form.budget === b}
                      onClick={() => update("budget", b)}
                    >
                      {b} €
                    </Chip>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <Label>Parlez-moi de votre projet</Label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Quel est l'objectif ? Pour quand ? Avez-vous un moodboard ?"
                  rows={5}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--line)",
                    padding: "12px 0",
                    color: "var(--ink)",
                    fontFamily: "inherit",
                    fontSize: 15,
                    resize: "vertical",
                    outline: "none",
                    marginTop: 6,
                  }}
                />
              </div>

              {error ? (
                <p
                  style={{
                    color: "#ff8b6b",
                    fontSize: 13,
                    marginBottom: 14,
                  }}
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "18px",
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting
                  ? "Envoi en cours…"
                  : "Envoyer ma demande de devis"}
                <svg
                  className="btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactItem({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--ink-mute)",
          letterSpacing: "0.15em",
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <a
        href={href}
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize: 28,
          display: "block",
          borderBottom: "1px solid var(--line)",
          paddingBottom: 14,
          transition: "color 0.2s",
        }}
      >
        {children}
      </a>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mono"
      style={{
        fontSize: 11,
        color: "var(--ink-mute)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && " *"}
      </Label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--line)",
          padding: "12px 0",
          color: "var(--ink)",
          fontFamily: "inherit",
          fontSize: 16,
          outline: "none",
          marginTop: 6,
        }}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        fontSize: 13,
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#0a0908" : "var(--ink-dim)",
        border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
        transition: "all 0.2s",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}
