import { notFound } from "next/navigation";
import { CaseContent } from "@/components/site/CaseContent";
import { EXAMPLE_SLUGS, getExampleProject } from "@/lib/exampleProjects";

// Example case studies (design direction only). Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMPLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getExampleProject(slug, "en");
  if (!project) return {};
  return {
    title: `${project.title} — ${project.headline}`,
    description: project.summary,
    robots: { index: false, follow: true },
    alternates: { canonical: `/work/${slug}`, languages: { "en-CA": `/work/${slug}`, "fr-CA": `/fr/work/${slug}` } },
  };
}

export default async function ExampleCasePage({ params }) {
  const { slug } = await params;
  const project = getExampleProject(slug, "en");
  if (!project) notFound();
  return <CaseContent project={project} lang="en" />;
}
