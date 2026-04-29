type Props = { label: string; tone?: "yellow" | "neutral" };

export function Placeholder({ label, tone = "yellow" }: Props) {
  const accent = tone === "yellow" ? "var(--accent)" : "#b8b1a3";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#1a1815",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,197,24,0.06) 0 2px, transparent 2px 14px), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          textAlign: "center",
          padding: 24,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.2">
          <rect x="2.5" y="6" width="14" height="12" rx="0.5" />
          <path d="M16.5 10l5-3v10l-5-3z" />
        </svg>
        <div>{label}</div>
        <div style={{ opacity: 0.5 }}>// drop video frame</div>
      </div>
    </div>
  );
}
