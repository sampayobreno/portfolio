export default function sitemap() {
  const base = "https://brenosampaio.vercel.app";
  const lastModified = new Date();
  const hubs = [
    { en: "/", fr: "/fr", priority: 1 },
    { en: "/work", fr: "/fr/work", priority: 0.9 },
    { en: "/about", fr: "/fr/about", priority: 0.8 },
  ];

  return hubs.flatMap(({ en, fr, priority }) => {
    const languages = { "en-CA": `${base}${en}`, "fr-CA": `${base}${fr}` };
    return [
      { url: `${base}${en}`, lastModified, changeFrequency: "monthly", priority, alternates: { languages } },
      { url: `${base}${fr}`, lastModified, changeFrequency: "monthly", priority, alternates: { languages } },
    ];
  });
}
