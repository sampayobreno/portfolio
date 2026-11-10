import { TaskroomCase } from "@/components/taskroom/TaskroomCase";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Taskroom — From client request to actionable brief",
  description: "An independent prototype for capturing requests, resolving missing details and assigning next actions.",
  alternates: { canonical: "/work/taskroom", languages: { "en-CA": "/work/taskroom", "fr-CA": "/fr/work/taskroom" } },
};

export default function TaskroomCasePage() {
  if (process.env.ENABLE_DRAFT_CASES !== "true") notFound();
  return <TaskroomCase />;
}
