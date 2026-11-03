export const SUPPORTED_LANGS = ["en", "fr"];

const HUBS = new Set(["/", "/work", "/labs", "/about", "/work/taskroom"]);

function splitHash(pathname) {
  const [path, hash = ""] = pathname.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
}

export function stripFrenchPrefix(pathname) {
  const { path, hash } = splitHash(pathname);
  const stripped = path.replace(/^\/fr(?=\/|$)/, "") || "/";
  return `${stripped}${hash}`;
}

export function languageFromPath(pathname) {
  return /^\/fr(?:\/|$)/.test(splitHash(pathname).path) ? "fr" : "en";
}

export function isLocalizedHub(pathname) {
  return HUBS.has(splitHash(stripFrenchPrefix(pathname)).path);
}

export function localizedPath(pathname, lang) {
  if (!SUPPORTED_LANGS.includes(lang) || !isLocalizedHub(pathname)) return pathname;
  const base = stripFrenchPrefix(pathname);
  const { path, hash } = splitHash(base);
  if (lang === "en") return `${path}${hash}`;
  return `${path === "/" ? "/fr" : `/fr${path}`}${hash}`;
}
