type Props = { size?: number; main: string; accent: string; suffix: string };

export function Logo({ size = 22, main, accent, suffix }: Props) {
  return (
    <a
      href="#top"
      style={{
        fontFamily: "var(--font-display), serif",
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 0,
      }}
    >
      <span>{main}</span>
      <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{accent}</span>
      <span style={{ marginLeft: 4, fontWeight: 300 }}>{suffix}</span>
    </a>
  );
}
