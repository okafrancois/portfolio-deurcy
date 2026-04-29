import { Reveal } from "./Reveal";

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
};

type Props = {
  items: Testimonial[];
  titleLine1: string;
  titleEm: string;
  rating: string;
};

export function Testimonials({ items, titleLine1, titleEm, rating }: Props) {
  return (
    <section
      id="avis"
      style={{ padding: "120px 0", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-page">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            § 04 — Témoignages
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 32,
              marginBottom: 64,
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
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: "var(--ink-mute)",
                letterSpacing: "0.15em",
              }}
            >
              {rating}
            </div>
          </div>
        </Reveal>

        <div
          className="avis-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
        >
          {items.map((t, i) => {
            const span =
              i % 5 === 0
                ? 4
                : i % 5 === 4
                  ? 4
                  : i % 5 === 1
                    ? 2
                    : i % 5 === 2
                      ? 3
                      : 3;
            return (
              <Reveal
                key={t._id}
                delay={(i % 3) * 80}
                className="avis-cell"
                style={{
                  gridColumn: `span ${span}`,
                  background: "var(--bg)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 28,
                  minHeight: 280,
                }}
              >
                <div>
                  <div
                    style={{
                      color: "var(--accent)",
                      fontSize: 13,
                      marginBottom: 18,
                      letterSpacing: 2,
                    }}
                  >
                    ★★★★★
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display), serif",
                      fontSize: i % 5 === 0 || i % 5 === 4 ? 22 : 17,
                      fontStyle: "italic",
                      fontWeight: 300,
                      lineHeight: 1.4,
                      color: "var(--ink)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    paddingTop: 20,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "#0a0908",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 600,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .avis-cell { grid-column: span 6 !important; }
        }
      `}</style>
    </section>
  );
}
