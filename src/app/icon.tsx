import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0908",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          color: "#f5c518",
          fontStyle: "italic",
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: 6,
            right: 6,
            height: 2,
            background: "#f5c518",
            opacity: 0.85,
          }}
        />
        D3
      </div>
    ),
    size,
  );
}
