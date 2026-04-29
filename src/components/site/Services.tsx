"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Service = {
  _id: string;
  num: string;
  title: string;
  sub: string;
  body: string;
  bullets: string[];
};

type Props = {
  services: Service[];
  titleLine1: string;
  titleLine2: string;
  titleEm: string;
};

export function Services({ services, titleLine1, titleLine2, titleEm }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="services"
      style={{ padding: "120px 0", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-page">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            § 02 — Ce que je propose
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="display"
            style={{
              fontSize: "clamp(48px, 7vw, 112px)",
              marginBottom: 64,
            }}
          >
            {titleLine1}
            <br />
            {titleLine2} <em>{titleEm}</em>
          </h2>
        </Reveal>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s._id} delay={i * 60}>
                <div
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "32px 0",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(245,197,24,0.025)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    className="service-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto auto",
                      gap: 24,
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: 13,
                        color: "var(--accent)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {s.num}
                    </div>
                    <h3
                      className="display"
                      style={{
                        fontSize: "clamp(32px, 4.5vw, 64px)",
                        fontWeight: 400,
                        lineHeight: 1.05,
                        fontStyle: isOpen ? "italic" : "normal",
                        color: isOpen ? "var(--accent)" : "var(--ink)",
                        transition: "all 0.3s",
                      }}
                    >
                      {s.title}
                    </h3>
                    <div
                      className="mono service-sub"
                      style={{
                        fontSize: 12,
                        color: "var(--ink-mute)",
                        textAlign: "right",
                        maxWidth: 220,
                      }}
                    >
                      {s.sub}
                    </div>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                        background: isOpen ? "var(--accent)" : "transparent",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isOpen ? "#0a0908" : "currentColor"}
                        strokeWidth="2"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                          transition: "transform 0.3s",
                        }}
                      >
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="service-detail"
                    style={{
                      maxHeight: isOpen ? 600 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.5s ease, opacity 0.3s",
                      opacity: isOpen ? 1 : 0,
                      paddingLeft: 104,
                    }}
                  >
                    <div
                      className="service-detail-grid"
                      style={{
                        paddingTop: 24,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 48,
                      }}
                    >
                      <p
                        style={{
                          color: "var(--ink-dim)",
                          fontSize: 16,
                          lineHeight: 1.6,
                          maxWidth: 520,
                        }}
                      >
                        {s.body}
                      </p>
                      <ul style={{ listStyle: "none" }}>
                        {s.bullets.map((b, j) => (
                          <li
                            key={j}
                            style={{
                              padding: "10px 0",
                              borderTop:
                                j === 0 ? "none" : "1px solid var(--line)",
                              display: "flex",
                              gap: 14,
                              alignItems: "center",
                              fontSize: 14,
                              color: "var(--ink-dim)",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--accent)",
                                width: 16,
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: 11,
                              }}
                            >
                              {String(j + 1).padStart(2, "0")}
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .service-row { grid-template-columns: 50px 1fr 36px !important; }
          .service-sub { display: none !important; }
          .service-detail { padding-left: 50px !important; }
          .service-detail-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
