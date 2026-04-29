import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";

type Props = {
  titleLine1: string;
  titleEm: string;
  body1: string;
  body2: string;
  portraitLabel: string;
  miniGrid: { k: string; v: string }[];
};

export function About({
  titleLine1,
  titleEm,
  body1,
  body2,
  portraitLabel,
  miniGrid,
}: Props) {
  return (
    <section
      id="about"
      style={{ padding: "120px 0", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-page">
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: 64,
          }}
        >
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 18 }}>
                § 05 — À propos
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div
                style={{
                  aspectRatio: "3 / 4",
                  background: "#1a1815",
                  border: "1px solid var(--line)",
                  position: "relative",
                  marginTop: 24,
                }}
              >
                <Placeholder label={`Portrait — ${portraitLabel.split(" ")[0]}`} />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    background: "var(--accent)",
                    color: "#0a0908",
                    padding: "10px 16px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {portraitLabel}
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(40px, 5vw, 80px)",
                  marginBottom: 32,
                }}
              >
                {titleLine1}
                <br />
                <em>{titleEm}</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  fontSize: 18,
                  color: "var(--ink-dim)",
                  lineHeight: 1.55,
                  marginBottom: 24,
                }}
              >
                {body1}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--ink-dim)",
                  lineHeight: 1.6,
                  marginBottom: 40,
                }}
              >
                {body2}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div
                className="about-mini"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  background: "var(--line)",
                  border: "1px solid var(--line)",
                  marginTop: 32,
                }}
              >
                {miniGrid.map((m, i) => (
                  <div
                    key={i}
                    style={{ background: "var(--bg)", padding: "20px 24px" }}
                  >
                    <div
                      className="display"
                      style={{
                        fontSize: 22,
                        fontStyle: "italic",
                        color: "var(--accent)",
                      }}
                    >
                      {m.k}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--ink-mute)",
                        marginTop: 4,
                      }}
                    >
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-mini { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
