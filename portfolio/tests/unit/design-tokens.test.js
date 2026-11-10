import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("portfolio v2 tokens", () => {
  it("defines the approved light and dark canvases and accent", () => {
    const css = read("design-system/tokens/colors.css");
    expect(css).toContain("--paper: #FFFFFF");
    expect(css).toContain("--vermilion: #C74624");
    expect(css).toContain("--paper: #0F0F0E");
    expect(css).toContain("--vermilion: #FF7A52");
  });

  it("keeps meaningful microtype at twelve pixels or above", () => {
    const css = read("design-system/tokens/typography.css");
    expect(css).toContain("--text-micro: 12px");
    expect(css).toContain("--text-mono: 12px");
    expect(css).not.toMatch(/--text-(?:micro|mono):\s*(?:10|11)px/);
  });

  it("defines semantic section rhythm and restrained radii", () => {
    const css = read("design-system/tokens/spacing.css");
    expect(css).toContain("--section-compact: clamp(3.5rem, 5vw, 4rem)");
    expect(css).toContain("--section-standard: clamp(4.5rem, 7vw, 6rem)");
    expect(css).toContain("--section-emphasis: clamp(6rem, 9vw, 7.5rem)");
    expect(css).toContain("--radius-lg: 16px");
    expect(css).not.toMatch(/--radius-xl:\s*(?:2[0-9]|3[0-2])px/);
  });

  it("uses the approved semantic motion cadence", () => {
    const css = read("design-system/tokens/motion.css");
    expect(css).toContain("--duration-hover: 160ms");
    expect(css).toContain("--duration-reveal: var(--duration-lg)");
  });
});
