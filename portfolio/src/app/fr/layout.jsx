import { SiteDocument } from "@/components/site/SiteDocument";

const title = "Breno Sampaio — Designer produit · Produits complexes";
const description = "Designer produit transformant des processus complexes en produits accessibles, du cadrage et du design d’interaction aux systèmes et prototypes fonctionnels.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: title, template: "%s — Breno Sampaio" },
  description,
  openGraph: {
    title,
    description,
    url: "https://brenosampaio.vercel.app/fr",
    siteName: "Breno Sampaio",
    locale: "fr_CA",
    type: "website",
    images: [{ url: "https://brenosampaio.vercel.app/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["https://brenosampaio.vercel.app/opengraph-image"] },
};

export const viewport = { themeColor: "#F6F6F4", width: "device-width", initialScale: 1 };

export default function FrenchRootLayout({ children }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
