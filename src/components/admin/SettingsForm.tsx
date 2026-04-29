"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type MiniGridItem = { k: string; v: string };

type Settings = {
  accent: string;
  bgTone: "warm-black" | "pure-black" | "deep-charcoal";
  grain: boolean;
  logoMain: string;
  logoAccent: string;
  logoSuffix: string;
  siteTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroBgWord: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleEm: string;
  heroSignatureName: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  workTitleLine1: string;
  workTitleEm: string;
  workIntro: string;
  workCta: string;
  servicesTitleLine1: string;
  servicesTitleLine2: string;
  servicesTitleEm: string;
  processTitleLine1: string;
  processTitleEm: string;
  avisTitleLine1: string;
  avisTitleEm: string;
  avisRating: string;
  aboutTitleLine1: string;
  aboutTitleEm: string;
  aboutBody1: string;
  aboutBody2: string;
  aboutPortraitLabel: string;
  aboutMiniGrid: MiniGridItem[];
  faqTitleLine1: string;
  faqTitleEm: string;
  contactTitleLine1: string;
  contactTitleEm: string;
  contactEmail: string;
  contactPhone: string;
  contactSocialHandle: string;
  contactSocialUrl: string;
  contactReplyNotice: string;
  contactQuoteTypes: string[];
  contactBudgets: string[];
  footerWordmark1: string;
  footerWordmark2: string;
  footerTagline: string;
  footerCopy: string;
  footerLocation: string;
};

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const update = <K extends keyof Settings>(k: K, v: Settings[K]) =>
    setS((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "update", data: s }),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error ?? "Erreur lors de la sauvegarde.");
      return;
    }
    setSavedAt(Date.now());
    router.refresh();
  };

  return (
    <form onSubmit={submit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 className="display" style={{ fontSize: 48, lineHeight: 1.05 }}>
          Paramètres
        </h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {savedAt ? (
            <span style={{ color: "var(--ink-mute)", fontSize: 12 }}>
              Sauvegardé à{" "}
              {new Date(savedAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
            style={{ opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>

      <Section title="Identité">
        <Row>
          <Field
            label="Titre du site"
            value={s.siteTitle}
            onChange={(v) => update("siteTitle", v)}
          />
          <Field
            label="Description SEO"
            value={s.metaDescription}
            onChange={(v) => update("metaDescription", v)}
          />
        </Row>
        <Row>
          <Field label="Logo · texte 1" value={s.logoMain} onChange={(v) => update("logoMain", v)} />
          <Field label="Logo · texte 2 (accent)" value={s.logoAccent} onChange={(v) => update("logoAccent", v)} />
          <Field label="Logo · texte 3" value={s.logoSuffix} onChange={(v) => update("logoSuffix", v)} />
        </Row>
      </Section>

      <Section title="Apparence">
        <Row>
          <div>
            <label className="admin-label">Couleur accent</label>
            <input
              type="color"
              value={s.accent}
              onChange={(e) => update("accent", e.target.value)}
              style={{
                width: 80,
                height: 36,
                border: "1px solid var(--line)",
                borderRadius: 4,
                background: "var(--bg)",
                cursor: "pointer",
              }}
            />
            <input
              className="admin-input"
              style={{ marginTop: 8 }}
              value={s.accent}
              onChange={(e) => update("accent", e.target.value)}
            />
          </div>
          <div>
            <label className="admin-label">Tonalité du noir</label>
            <select
              className="admin-select"
              value={s.bgTone}
              onChange={(e) =>
                update("bgTone", e.target.value as Settings["bgTone"])
              }
            >
              <option value="warm-black">Chaud</option>
              <option value="pure-black">Pur</option>
              <option value="deep-charcoal">Anthracite</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Grain de film</label>
            <label
              style={{
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                fontSize: 14,
                color: "var(--ink-dim)",
              }}
            >
              <input
                type="checkbox"
                checked={s.grain}
                onChange={(e) => update("grain", e.target.checked)}
              />
              Activer le grain
            </label>
          </div>
        </Row>
      </Section>

      <Section title="Hero">
        <Row>
          <Field label="Eyebrow" value={s.heroEyebrow} onChange={(v) => update("heroEyebrow", v)} />
          <Field label="Mot d'arrière-plan" value={s.heroBgWord} onChange={(v) => update("heroBgWord", v)} />
        </Row>
        <Row>
          <Field label="Titre · ligne 1" value={s.heroTitleLine1} onChange={(v) => update("heroTitleLine1", v)} />
          <Field label="Titre · ligne 2" value={s.heroTitleLine2} onChange={(v) => update("heroTitleLine2", v)} />
          <Field label="Titre · accent" value={s.heroTitleEm} onChange={(v) => update("heroTitleEm", v)} />
        </Row>
        <Row>
          <Field label="Prénom (signature)" value={s.heroSignatureName} onChange={(v) => update("heroSignatureName", v)} />
          <FieldArea label="Description" value={s.heroDescription} onChange={(v) => update("heroDescription", v)} />
        </Row>
        <Row>
          <Field label="CTA principal" value={s.heroPrimaryCta} onChange={(v) => update("heroPrimaryCta", v)} />
          <Field label="CTA secondaire" value={s.heroSecondaryCta} onChange={(v) => update("heroSecondaryCta", v)} />
        </Row>
      </Section>

      <Section title="Section travaux">
        <Row>
          <Field label="Titre · ligne 1" value={s.workTitleLine1} onChange={(v) => update("workTitleLine1", v)} />
          <Field label="Titre · accent" value={s.workTitleEm} onChange={(v) => update("workTitleEm", v)} />
        </Row>
        <Row>
          <FieldArea label="Intro" value={s.workIntro} onChange={(v) => update("workIntro", v)} />
          <Field label="CTA bas de section" value={s.workCta} onChange={(v) => update("workCta", v)} />
        </Row>
      </Section>

      <Section title="Section services">
        <Row>
          <Field label="Titre · ligne 1" value={s.servicesTitleLine1} onChange={(v) => update("servicesTitleLine1", v)} />
          <Field label="Titre · ligne 2" value={s.servicesTitleLine2} onChange={(v) => update("servicesTitleLine2", v)} />
          <Field label="Titre · accent" value={s.servicesTitleEm} onChange={(v) => update("servicesTitleEm", v)} />
        </Row>
      </Section>

      <Section title="Section process">
        <Row>
          <Field label="Titre · ligne 1" value={s.processTitleLine1} onChange={(v) => update("processTitleLine1", v)} />
          <Field label="Titre · accent" value={s.processTitleEm} onChange={(v) => update("processTitleEm", v)} />
        </Row>
      </Section>

      <Section title="Section témoignages">
        <Row>
          <Field label="Titre · ligne 1" value={s.avisTitleLine1} onChange={(v) => update("avisTitleLine1", v)} />
          <Field label="Titre · accent" value={s.avisTitleEm} onChange={(v) => update("avisTitleEm", v)} />
          <Field label="Note affichée" value={s.avisRating} onChange={(v) => update("avisRating", v)} />
        </Row>
      </Section>

      <Section title="À propos">
        <Row>
          <Field label="Titre · ligne 1" value={s.aboutTitleLine1} onChange={(v) => update("aboutTitleLine1", v)} />
          <Field label="Titre · accent" value={s.aboutTitleEm} onChange={(v) => update("aboutTitleEm", v)} />
        </Row>
        <FieldArea label="Paragraphe 1" value={s.aboutBody1} onChange={(v) => update("aboutBody1", v)} />
        <FieldArea label="Paragraphe 2" value={s.aboutBody2} onChange={(v) => update("aboutBody2", v)} />
        <Field label="Légende portrait" value={s.aboutPortraitLabel} onChange={(v) => update("aboutPortraitLabel", v)} />
        <div>
          <label className="admin-label">Mini-grille (clé / valeur)</label>
          {s.aboutMiniGrid.map((m, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 8, marginBottom: 6 }}
            >
              <input
                className="admin-input"
                value={m.k}
                onChange={(e) => {
                  const next = [...s.aboutMiniGrid];
                  next[i] = { ...next[i], k: e.target.value };
                  update("aboutMiniGrid", next);
                }}
              />
              <input
                className="admin-input"
                value={m.v}
                onChange={(e) => {
                  const next = [...s.aboutMiniGrid];
                  next[i] = { ...next[i], v: e.target.value };
                  update("aboutMiniGrid", next);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const next = s.aboutMiniGrid.filter((_, j) => j !== i);
                  update("aboutMiniGrid", next);
                }}
                style={{ color: "var(--ink-mute)" }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-ghost"
            style={{ padding: "8px 14px", fontSize: 12 }}
            onClick={() =>
              update("aboutMiniGrid", [...s.aboutMiniGrid, { k: "", v: "" }])
            }
          >
            + Ajouter une cellule
          </button>
        </div>
      </Section>

      <Section title="FAQ">
        <Row>
          <Field label="Titre · ligne 1" value={s.faqTitleLine1} onChange={(v) => update("faqTitleLine1", v)} />
          <Field label="Titre · accent" value={s.faqTitleEm} onChange={(v) => update("faqTitleEm", v)} />
        </Row>
      </Section>

      <Section title="Contact">
        <Row>
          <Field label="Titre · ligne 1" value={s.contactTitleLine1} onChange={(v) => update("contactTitleLine1", v)} />
          <Field label="Titre · accent" value={s.contactTitleEm} onChange={(v) => update("contactTitleEm", v)} />
        </Row>
        <Row>
          <Field label="Email" value={s.contactEmail} onChange={(v) => update("contactEmail", v)} />
          <Field label="Téléphone" value={s.contactPhone} onChange={(v) => update("contactPhone", v)} />
        </Row>
        <Row>
          <Field label="Handle social" value={s.contactSocialHandle} onChange={(v) => update("contactSocialHandle", v)} />
          <Field label="URL social" value={s.contactSocialUrl} onChange={(v) => update("contactSocialUrl", v)} />
        </Row>
        <FieldArea label="Mention de réponse" value={s.contactReplyNotice} onChange={(v) => update("contactReplyNotice", v)} />
        <FieldList label="Types de prestation" value={s.contactQuoteTypes} onChange={(v) => update("contactQuoteTypes", v)} />
        <FieldList label="Tranches de budget" value={s.contactBudgets} onChange={(v) => update("contactBudgets", v)} />
      </Section>

      <Section title="Footer">
        <Row>
          <Field label="Wordmark · ligne 1" value={s.footerWordmark1} onChange={(v) => update("footerWordmark1", v)} />
          <Field label="Wordmark · ligne 2" value={s.footerWordmark2} onChange={(v) => update("footerWordmark2", v)} />
        </Row>
        <FieldArea label="Tagline" value={s.footerTagline} onChange={(v) => update("footerTagline", v)} />
        <Row>
          <Field label="Copyright" value={s.footerCopy} onChange={(v) => update("footerCopy", v)} />
          <Field label="Localisation" value={s.footerLocation} onChange={(v) => update("footerLocation", v)} />
        </Row>
      </Section>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--bg-elev)",
        border: "1px solid var(--line)",
        padding: 24,
        marginBottom: 24,
        display: "grid",
        gap: 16,
      }}
    >
      <h2
        className="display"
        style={{ fontSize: 22, color: "var(--accent)", fontStyle: "italic" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input
        className="admin-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FieldArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <textarea
        className="admin-textarea"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FieldList({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <textarea
        className="admin-textarea"
        rows={3}
        value={value.join("\n")}
        onChange={(e) =>
          onChange(e.target.value.split("\n").filter((s) => s.length > 0))
        }
      />
      <small style={{ color: "var(--ink-mute)", fontSize: 11 }}>
        Une entrée par ligne.
      </small>
    </div>
  );
}
