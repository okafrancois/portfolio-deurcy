import { Reveal } from "./Reveal";

type Step = { _id: string; num: string; label: string; body: string };

type Props = {
  steps: Step[];
  titleLine1: string;
  titleEm: string;
};

export function Process({ steps, titleLine1, titleEm }: Props) {
  return (
    <section
      id="process"
      style={{
        padding: "120px 0",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-elev)",
      }}
    >
      <div className="container-page">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            § 03 — Méthode
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
            <em>{titleEm}</em>
          </h2>
        </Reveal>
        <div
          className="process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {steps.map((p, i) => (
            <Reveal key={p._id} delay={i * 100}>
              <div
                style={{
                  padding: "32px 0",
                  borderTop: "1px solid var(--accent)",
                  height: "100%",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    marginBottom: 28,
                    letterSpacing: "0.1em",
                  }}
                >
                  STEP {p.num}
                </div>
                <h3
                  className="display"
                  style={{ fontSize: 32, fontWeight: 400, marginBottom: 12 }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: 14,
                    lineHeight: 1.55,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
