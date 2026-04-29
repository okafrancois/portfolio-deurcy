import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  bgWord: string;
  titleLine1: string;
  titleLine2: string;
  titleEm: string;
  signatureName: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export function Hero({
  eyebrow,
  bgWord,
  titleLine1,
  titleLine2,
  titleEm,
  signatureName,
  description,
  primaryCta,
  secondaryCta,
}: Props) {
  // descriptions reads "Je m'appelle <name>. <rest>" — split on first sentence
  const [intro, ...restParts] = description.split(/(?<=\.\s)/);
  const rest = restParts.join("");

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 120,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -40,
          left: -20,
          right: -20,
          fontFamily: "var(--font-display), serif",
          fontSize: "clamp(160px, 26vw, 420px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(245,197,24,0.07)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {bgWord}
      </div>

      <div
        className="container-page"
        style={{ position: "relative", zIndex: 2, paddingTop: 60 }}
      >
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 32 }}>
            {eyebrow}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 9.5vw, 168px)",
              fontWeight: 400,
              margin: "8px 0 0 0",
            }}
          >
            {titleLine1}
            <br />
            {titleLine2}
            <br />
            <em>{titleEm}</em>
          </h1>
        </Reveal>
      </div>

      <div
        className="container-page"
        style={{ position: "relative", zIndex: 2, marginTop: 64 }}
      >
        <div
          className="hero-bottom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "end",
          }}
        >
          <Reveal delay={300}>
            <p
              style={{
                maxWidth: 480,
                fontSize: 17,
                color: "var(--ink-dim)",
                lineHeight: 1.5,
              }}
            >
              {signatureName ? (
                <>
                  Je m&apos;appelle{" "}
                  <span style={{ color: "var(--ink)" }}>{signatureName}</span>.{" "}
                </>
              ) : null}
              {signatureName ? rest || intro : description}
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#work" className="btn btn-primary">
                {primaryCta}
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
              <a href="#contact" className="btn btn-ghost">
                {secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .hero-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
