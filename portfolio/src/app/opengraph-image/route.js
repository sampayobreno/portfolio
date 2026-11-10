import { ImageResponse } from "next/og";

// Stable bilingual social card. ImageResponse uses its deterministic fallback
// instead of fetching typography at request time; the public URL stays fixed.
const size = { width: 1200, height: 630 };
const headline = "Complex products, made clear.";
const headlineFr = "Des produits complexes, rendus clairs.";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F8F7F3",
          color: "#1B1A17",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#A44A28" }}>
          <div style={{ width: 32, height: 2, backgroundColor: "#A44A28", marginRight: 18 }} />
          <div style={{ display: "flex", fontSize: 20, fontWeight: 500, letterSpacing: 5 }}>
            BRENO SAMPAIO · PRODUCT DESIGNER · DESIGNER PRODUIT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.02, letterSpacing: -4 }}>
            {headline}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 46, lineHeight: 1.08, letterSpacing: -2, color: "#A44A28" }}>
            {headlineFr}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 23, lineHeight: 1.35, color: "#4D4B45" }}>
            Product strategy · Interaction design · Design systems / Stratégie · Interaction · Systèmes
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#4D4B45" }}>
          <div style={{ display: "flex" }}>brenosampaio.vercel.app</div>
          <div style={{ display: "flex" }}>Valencia, Spain · Available across Europe</div>
        </div>
      </div>
    ),
    size,
  );
}
