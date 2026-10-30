import { ImageResponse } from "next/og"
import { portfolioContent } from "@/data/content"

export const alt = portfolioContent.metadata.openGraphAlt
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "76px",
          background: "linear-gradient(135deg, #fbfbfe 0%, #eeedff 100%)",
          color: "#1c1c2e",
          fontFamily: "Geist, Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "820px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#4742b8",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 99,
                background: "#4742b8",
              }}
            />
            {portfolioContent.site.role}
          </div>
          <h1
            style={{
              margin: "24px 0 12px",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 1,
            }}
          >
            {portfolioContent.hero.name}
          </h1>
          <p style={{ margin: 0, color: "#5e6074", fontSize: 32, lineHeight: 1.3 }}>
            {portfolioContent.hero.role}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 160,
            height: 160,
            borderRadius: 44,
            background: "#4742b8",
            color: "#ffffff",
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            boxShadow: "0 28px 70px rgba(71, 66, 184, 0.22)",
          }}
        >
          {portfolioContent.site.mark}
        </div>
      </div>
    ),
    { ...size },
  )
}
