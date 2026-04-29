import { Reveal } from "./Reveal";

type Stat = { num: string; label: string };

export function Stats({ items }: { items: Stat[] }) {
  return (
    <section
      style={{ padding: "80px 0", borderBottom: "1px solid var(--line)" }}
    >
      <div className="container-page">
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(48px, 6vw, 88px)",
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    color: "var(--ink-dim)",
                    maxWidth: 200,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
