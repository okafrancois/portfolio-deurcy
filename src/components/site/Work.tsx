"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";

type Project = {
  _id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  blurb: string;
  tag: string;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  projectUrl?: string | null;
};

type Props = {
  projects: Project[];
  titleLine1: string;
  titleEm: string;
  intro: string;
  cta: string;
};

const FIXED_CATS = ["Tous", "Contenu", "Interviews", "Événementiel", "Mariage"];

export function Work({ projects, titleLine1, titleEm, intro, cta }: Props) {
  const [filter, setFilter] = useState("Tous");

  const counts = useMemo(() => {
    const c: Record<string, number> = { Tous: projects.length };
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, [projects]);

  const filtered =
    filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="work"
      style={{
        padding: "120px 0 80px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-page">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            § 01 — Projets sélectionnés
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 32,
              marginBottom: 56,
              flexWrap: "wrap",
            }}
          >
            <h2
              className="display"
              style={{ fontSize: "clamp(48px, 7vw, 112px)" }}
            >
              {titleLine1}
              <br />
              <em>{titleEm}</em>
            </h2>
            <p style={{ maxWidth: 380, color: "var(--ink-dim)", fontSize: 15 }}>
              {intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 40,
              paddingBottom: 24,
              borderBottom: "1px solid var(--line)",
            }}
          >
            {FIXED_CATS.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontFamily: "var(--font-body), sans-serif",
                    background: active ? "var(--accent)" : "transparent",
                    color: active ? "#0a0908" : "var(--ink-dim)",
                    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
                    transition: "all 0.2s",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {c}{" "}
                  <span style={{ opacity: 0.6, marginLeft: 4 }}>
                    ({counts[c] || 0})
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className="work-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 24,
          }}
        >
          {filtered.map((p, idx) => {
            const span =
              idx % 5 === 0
                ? 8
                : idx % 5 === 1
                  ? 4
                  : idx % 5 === 2
                    ? 5
                    : idx % 5 === 3
                      ? 7
                      : 6;
            const ar = span >= 7 ? "16 / 9" : "4 / 5";
            return (
              <Reveal
                key={p._id}
                delay={(idx % 3) * 80}
                as="article"
                className="work-item"
                style={{ gridColumn: `span ${span}` }}
              >
                <ProjectCard p={p} ar={ar} />
              </Reveal>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 56,
          }}
        >
          <a href="#contact" className="btn btn-ghost">
            {cta}
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
          </a>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .work-item { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, ar }: { p: Project; ar: string }) {
  const [hover, setHover] = useState(false);
  const link = p.videoUrl || p.projectUrl || "#contact";
  const external = link.startsWith("http");
  return (
    <a
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "block" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: ar,
          background: "#1a1815",
          border: "1px solid var(--line)",
          overflow: "hidden",
          transition: "border-color 0.3s",
          borderColor: hover ? "var(--accent)" : "var(--line)",
        }}
      >
        {p.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.coverImageUrl}
            alt={p.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hover ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <Placeholder label={p.title} />
        )}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            padding: "5px 10px",
            background: "rgba(10,9,8,0.85)",
            backdropFilter: "blur(6px)",
            color: "var(--accent)",
            border: "1px solid var(--line)",
          }}
        >
          {p.duration}
        </div>
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "5px 10px",
            background: "rgba(10,9,8,0.85)",
            backdropFilter: "blur(6px)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
          }}
        >
          {p.category}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,9,8,0.4)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hover ? "scale(1)" : "scale(0.8)",
              transition: "transform 0.3s",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a0908">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginTop: 18,
        }}
      >
        <div>
          <h3
            className="display"
            style={{
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            {p.title}
          </h3>
          <div style={{ fontSize: 13, color: "var(--ink-mute)" }}>
            {p.client}
          </div>
        </div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink-mute)",
            letterSpacing: "0.1em",
          }}
        >
          {p.year}
        </div>
      </div>
    </a>
  );
}
