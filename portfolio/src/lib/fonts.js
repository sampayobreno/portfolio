import {
  Cormorant_Garamond,
  DM_Sans,
  Inter_Tight,
  Newsreader,
} from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

// Remodel 2026 type pairing: Newsreader (display) + Inter Tight (text).
export const newsreader = Newsreader({ subsets: ["latin"], display: "swap", variable: "--font-newsreader", axes: ["opsz"], style: ["normal", "italic"] });
export const interTight = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--font-inter-tight" });

export const fontVariables = [dmSans, cormorant, newsreader, interTight].map((font) => font.variable).join(" ");
