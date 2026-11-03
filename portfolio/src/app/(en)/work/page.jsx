import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Product decisions and evidence",
  description: "Explore Relay and Taskroom, independent product prototypes with working interfaces and documented design decisions.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
