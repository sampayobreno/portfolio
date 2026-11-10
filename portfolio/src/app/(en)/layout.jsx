import { SiteDocument } from "@/components/site/SiteDocument";

const title = "Breno Sampaio — Product Designer for complex products";
const description = "Product Designer turning complex workflows into accessible products, from problem framing and interaction design to systems and working prototypes.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: title, template: "%s — Breno Sampaio" },
  description,
  openGraph: {
    title,
    description,
    url: "https://brenosampaio.vercel.app",
    siteName: "Breno Sampaio",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://brenosampaio.vercel.app/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["https://brenosampaio.vercel.app/opengraph-image"] },
};

export const viewport = { themeColor: "#F6F6F4", width: "device-width", initialScale: 1 };

export default function EnglishRootLayout({ children }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
