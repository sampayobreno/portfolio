import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Product decisions and evidence",
  description: "Selected product design projects.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
