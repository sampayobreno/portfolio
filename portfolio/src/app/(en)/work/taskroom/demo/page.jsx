import { TaskroomWorkspace } from "@/components/taskroom/TaskroomWorkspace";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Taskroom — Interactive demo",
  description: "Try a browser-based request workflow with fictional data.",
  robots: { index: false, follow: true },
};

export default async function TaskroomDemoPage({ searchParams }) {
  if (process.env.ENABLE_DRAFT_CASES !== "true") notFound();
  const { from } = await searchParams;
  return <TaskroomWorkspace frenchCase={from === "fr"} />;
}
