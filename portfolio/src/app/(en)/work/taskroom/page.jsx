import { TaskroomCase } from "@/components/taskroom/TaskroomCase";

export const metadata = {
  title: "Taskroom — From client request to actionable brief",
  description: "An independent prototype for capturing requests, resolving missing details and assigning next actions.",
  alternates: { canonical: "/work/taskroom", languages: { "en-CA": "/work/taskroom", "fr-CA": "/fr/work/taskroom" } },
};

export default function TaskroomCasePage() {
  return <TaskroomCase />;
}
