import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "@/components/ds/Text";

const pathFor = (file) => resolve(process.cwd(), file);
const read = (file) => readFileSync(pathFor(file), "utf8");

function cssBlock(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`))?.[1] || "";
}

function cssVariable(block, name) {
  return block.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1]?.toUpperCase();
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

describe("portfolio visual foundation", () => {
  it("loads the remodel Newsreader + Inter Tight pairing at the document boundary", () => {
    const fontsPath = pathFor("src/lib/fonts.js");
    expect(existsSync(fontsPath)).toBe(true);

    const loader = read("src/lib/fonts.js");
    const document = read("src/components/site/SiteDocument.jsx");
    const foundation = read("src/app/foundation.css");
    expect(loader).toContain("Newsreader");
    expect(loader).toContain("Inter_Tight");
    expect(loader).toContain("--font-newsreader");
    expect(loader).toContain("--font-inter-tight");
    expect(document).toContain("fontVariables");
    expect(document).toContain("foundation.css");
    expect(foundation).toMatch(/--font-display:\s*var\(--font-newsreader\)/);
    expect(foundation).toMatch(/--font-sans:\s*var\(--font-inter-tight\)/);
  });

  it("keeps remodel foundation text colours at WCAG AA in light and dark", () => {
    const foundation = read("src/app/foundation.css");
    for (const selector of [":root", ':root[data-theme="dark"]']) {
      const block = cssBlock(foundation, selector);
      const paper = cssVariable(block, "c-paper");
      const surface = cssVariable(block, "c-surface");
      for (const token of ["c-ink", "c-ink-2", "c-ink-3"]) {
        const ink = cssVariable(block, token);
        expect(contrastRatio(ink, paper), `${selector} ${token} on paper`).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(ink, surface), `${selector} ${token} on surface`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrastRatio(cssVariable(block, "c-on-ink"), cssVariable(block, "c-ink"))).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(cssVariable(block, "c-focus"), paper), `${selector} focus`).toBeGreaterThanOrEqual(3);
    }
  });

  it("does not duplicate font loading through remote stylesheets", () => {
    const fontTokens = read("design-system/tokens/fonts.css");
    const document = read("src/components/site/SiteDocument.jsx");
    const fontSurface = `${fontTokens}\n${document}`;

    expect(fontSurface).not.toMatch(/fonts\.googleapis\.com|@import\s+url/i);
    expect(fontSurface).toMatch(/DM Sans|Cormorant Garamond/i);
  });

  it("restores sans headings and reserves serif for editorial accents", () => {
    const variants = ["display", "h1", "h2", "h3", "body", "mono", "eyebrow", "serif-display"];
    render(createElement("div", null, variants.map((variant) => createElement(
      Text,
      { variant, key: variant, "data-testid": variant },
      variant,
    ))));

    for (const variant of ["display", "h1", "h2", "h3", "body"]) {
      expect(screen.getByTestId(variant)).toHaveStyle({ fontFamily: "var(--font-sans)" });
    }
    for (const variant of ["mono", "eyebrow"]) {
      expect(screen.getByTestId(variant)).toHaveStyle({ fontFamily: "var(--font-mono)" });
    }
    expect(screen.getByTestId("serif-display")).toHaveStyle({ fontFamily: "var(--font-serif)" });
  });

  it("keeps the refined type scale and rhythm", () => {
    const typography = read("design-system/tokens/typography.css");
    expect(typography).toContain("--text-display:      64px");
    expect(typography).toContain("--text-h1:           52px");
    expect(typography).toContain("--text-h2:           36px");
    expect(typography).toContain("--text-body:         16px");
    expect(typography).toContain("--text-small:        14px");
    expect(typography).toContain("--leading-display:  0.95");
    expect(typography).toContain("--leading-body:     1.68");
    expect(typography).toContain("--tracking-display: -0.04em");
    const manifest = JSON.parse(read("design-system/_ds_manifest.json"));
    const token = (name) => manifest.tokens.find((item) => item.name === name)?.value;
    expect(token("--text-display")).toBe("64px");
    expect(token("--radius-lg")).toBe("16px");
  });

  it("defines the approved light and dark semantic palette", () => {
    const colors = read("design-system/tokens/colors.css");
    const light = cssBlock(colors, ":root");
    const dark = cssBlock(colors, '[data-theme="dark"]');

    expect({
      page: cssVariable(light, "paper"),
      surface: cssVariable(light, "silk"),
      border: cssVariable(light, "mist"),
      secondary: cssVariable(light, "stone"),
      ink: cssVariable(light, "ink"),
      accent: cssVariable(light, "vermilion"),
      accentHover: cssVariable(light, "vermilion-dark"),
      onAccent: cssVariable(light, "on-accent"),
    }).toEqual({
      page: "#FFFFFF",
      surface: "#F3F2EE",
      border: "#DEDCD6",
      secondary: "#5F5B56",
      ink: "#1F1C1B",
      accent: "#C74624",
      accentHover: "#A93618",
      onAccent: "#FFFFFF",
    });

    expect({
      page: cssVariable(dark, "paper"),
      surface: cssVariable(dark, "silk"),
      secondary: cssVariable(dark, "stone"),
      ink: cssVariable(dark, "ink"),
      accent: cssVariable(dark, "vermilion"),
      onAccent: cssVariable(dark, "on-accent"),
    }).toEqual({
      page: "#0F0F0E",
      surface: "#191817",
      secondary: "#B9B4AC",
      ink: "#F8F6F1",
      accent: "#FF7A52",
      onAccent: "#1F1C1B",
    });
  });

  it("keeps every normal-text palette combination at WCAG AA contrast", () => {
    const combinations = [
      ["#1F1C1B", "#FFFFFF"],
      ["#5F5B56", "#FFFFFF"],
      ["#FFFFFF", "#C74624"],
      ["#F8F6F1", "#0F0F0E"],
      ["#1F1C1B", "#FF7A52"],
    ];

    for (const [foreground, background] of combinations) {
      expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps the global grid quiet and section rhythm token-driven", () => {
    const globalStyles = read("src/app/globals.css");
    expect(globalStyles).toContain("--grid-dot: color-mix(in srgb, var(--ink) 2%, transparent)");
    expect(globalStyles).toMatch(/\.container\s*\{[\s\S]*?max-width:\s*var\(--max-content\)/);
    expect(globalStyles).toMatch(/\.section,\s*\n\.section--standard\s*\{\s*padding-block:\s*var\(--section-standard\)/);
    expect(globalStyles).toMatch(/\.section--emphasis\s*\{\s*padding-block:\s*var\(--section-emphasis\)/);
  });

  it("aligns localized discovery metadata and social sharing with Product Design", () => {
    const english = read("src/app/(en)/layout.jsx");
    const french = read("src/app/fr/layout.jsx");
    const englishPages = ["page.jsx", "work/page.jsx", "labs/page.jsx", "about/page.jsx"]
      .map((file) => read(`src/app/(en)/${file}`)).join("\n");
    const frenchPages = ["page.jsx", "work/page.jsx", "labs/page.jsx", "about/page.jsx"]
      .map((file) => read(`src/app/fr/${file}`)).join("\n");
    const social = read("src/app/opengraph-image/route.js");
    const document = read("src/components/site/SiteDocument.jsx");
    const providers = read("src/context/AppContext.jsx");

    expect(english).toContain("Product Designer for complex products");
    expect(french).toContain("Designer produit · Produits complexes");
    expect(`${english}\n${french}\n${englishPages}\n${frenchPages}`).not.toMatch(/building with code|frontend learning|apprentissage frontend|product design and frontend|design produit et le frontend|design produit et frontend/i);
    expect(englishPages).toContain("Systems Lab — Product interface experiments");
    expect(frenchPages).toContain("Systems Lab — Expériences d’interface produit");
    expect(english).toContain('themeColor: "#FFFFFF"');
    expect(french).toContain('themeColor: "#FFFFFF"');
    expect(providers).toContain('theme === "dark" ? "#0F0F0E" : "#FFFFFF"');

    expect(social).toContain("Complex products, made clear.");
    expect(social).toContain("Des produits complexes, rendus clairs.");
    expect(social).toContain("PRODUCT DESIGNER · DESIGNER PRODUIT");
    expect(social).toContain('backgroundColor: "#FFFFFF"');
    expect(social).toContain('color: "#1F1C1B"');
    expect(social).toContain('color: "#C74624"');
    expect(social).not.toMatch(/fonts\.googleapis\.com|loadFont\(|await fetch\(/);

    expect(document).toContain('jobTitle: "Product Designer"');
    expect(document).toContain("description: content.hero.lead");
  });
});
