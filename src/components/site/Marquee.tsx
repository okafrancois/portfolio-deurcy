type Props = { items: string[]; speed?: number; separator?: string };

export function Marquee({ items, speed = 50, separator = "✦" }: Props) {
  if (items.length === 0) return null;
  const list = [...items, ...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "26px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          whiteSpace: "nowrap",
          animation: `scroll-x ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {list.map((it, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 56 }}
          >
            <span
              className="display"
              style={{ fontSize: 56, fontWeight: 300, fontStyle: "italic" }}
            >
              {it}
            </span>
            <span style={{ color: "var(--accent)", fontSize: 22 }}>
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
