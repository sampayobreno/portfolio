import { TaskroomCase } from "@/components/taskroom/TaskroomCase";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Taskroom — De la demande au brief",
  description: "Un prototype indépendant pour consigner des demandes, compléter les informations manquantes et attribuer la prochaine action.",
  alternates: { canonical: "/fr/work/taskroom", languages: { "en-CA": "/work/taskroom", "fr-CA": "/fr/work/taskroom" } },
};

export default function FrenchTaskroomCasePage() {
  if (process.env.ENABLE_DRAFT_CASES !== "true") notFound();
  return <TaskroomCase lang="fr" />;
}
