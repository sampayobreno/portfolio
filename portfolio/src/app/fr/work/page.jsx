import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Décisions produit et preuves",
  description: "Découvrez Relay et Taskroom, deux prototypes indépendants avec des interfaces fonctionnelles et des décisions de design documentées.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
