import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0908",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          color: "#f4efe6",
          padding: 18,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.18em",
            color: "#6b665d",
            textTransform: "uppercase",
          }}
        >
          D3
        </div>
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#f5c518",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "#f4efe6",
            fontSize: 76,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <span>D</span>
          <span style={{ color: "#f5c518", fontStyle: "italic" }}>3</span>
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            fontStyle: "italic",
            color: "#f5c518",
            letterSpacing: "-0.02em",
          }}
        >
          Vision
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 22,
            right: 22,
            height: 2,
            background: "#f5c518",
            opacity: 0.85,
          }}
        />
      </div>
    ),
    size,
  );
}
