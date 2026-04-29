"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Item = { _id: string; q: string; a: string };

type Props = {
  items: Item[];
  titleLine1: string;
  titleEm: string;
};

export function Faq({ items, titleLine1, titleEm }: Props) {
  const [open, setOpen] = useState(0);
  return (
    <section
      style={{ padding: "120px 0", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-page">
        <div
          className="faq-grid"
          style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 64 }}
        >
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 18 }}>
                § 06 — Questions
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="display"
                style={{ fontSize: "clamp(40px, 5vw, 80px)" }}
              >
                {titleLine1}
                <br />
                <em>{titleEm}</em>
              </h2>
            </Reveal>
          </div>
          <div>
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f._id} delay={i * 60}>
                  <div
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--line)" : "none",
                      borderBottom: "1px solid var(--line)",
                      padding: "24px 0",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 24,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-display), serif",
                          fontSize: 22,
                          fontWeight: 400,
                          color: isOpen ? "var(--accent)" : "var(--ink)",
                          transition: "color 0.2s",
                        }}
                      >
                        {f.q}
                      </h3>
                      <div
                        style={{
                          color: "var(--accent)",
                          fontSize: 22,
                          fontWeight: 300,
                          transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                          transition: "transform 0.3s",
                        }}
                      >
                        +
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: isOpen ? 200 : 0,
                        overflow: "hidden",
                        transition:
                          "max-height 0.5s, padding-top 0.3s, opacity 0.3s",
                        opacity: isOpen ? 1 : 0,
                        paddingTop: isOpen ? 14 : 0,
                      }}
                    >
                      <p
                        style={{
                          color: "var(--ink-dim)",
                          fontSize: 15,
                          lineHeight: 1.6,
                          maxWidth: 600,
                        }}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
