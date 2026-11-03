import { TaskroomWorkspace } from "@/components/taskroom/TaskroomWorkspace";

export const metadata = {
  title: "Taskroom — Interactive demo",
  description: "Try a browser-based request workflow with fictional data.",
  robots: { index: false, follow: true },
};

export default async function TaskroomDemoPage({ searchParams }) {
  const { from } = await searchParams;
  return <TaskroomWorkspace frenchCase={from === "fr"} />;
}
