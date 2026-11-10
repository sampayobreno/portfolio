import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Décisions produit et preuves",
  description: "Sélection de projets de design produit.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
