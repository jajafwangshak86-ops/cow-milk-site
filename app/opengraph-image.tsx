import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CowCare — Milk Supply Chain DApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: "#166534", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 16 }}>🐄 COWCARE</div>
      <div style={{ fontSize: 32, opacity: 0.85 }}>Milk Supply Chain on Celo Blockchain</div>
    </div>
  );
}
