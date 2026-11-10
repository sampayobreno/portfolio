"use client";
import { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  isLocalizedHub,
  languageFromPath,
  localizedPath,
  SUPPORTED_LANGS,
} from "@/lib/locales";

const ThemeCtx = createContext({ theme: "light", toggle: () => {} });
const LangCtx  = createContext({ lang: "en", setLang: () => {} });

export function Providers({ children, initialLang = "en" }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [themePreference, setThemePreference] = useState("system");
  const [lang, setLang] = useState(() => initialLang || languageFromPath(pathname));

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let saved;
    try { saved = localStorage.getItem("theme"); } catch {}
    const preference = ["light", "dark"].includes(saved) ? saved : "system";
    setThemePreference(preference);
    setTheme(preference === "system" ? (media.matches ? "dark" : "light") : preference);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setTheme(themePreference === "system" ? (media.matches ? "dark" : "light") : themePreference);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [themePreference]);

  useLayoutEffect(() => {
    if (isLocalizedHub(pathname) || languageFromPath(pathname) === "fr") return;
    let savedLang;
    try { savedLang = localStorage.getItem("lang"); } catch {}
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      setLang(savedLang);
    } else if (navigator.language.toLowerCase().startsWith("fr")) {
      setLang("fr");
    }
  }, [pathname]);

  useEffect(() => {
    if (isLocalizedHub(pathname) || languageFromPath(pathname) === "fr") {
      setLang(languageFromPath(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#151513" : "#F8F7F3";
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const chooseTheme = useCallback((preference) => {
    if (!["light", "dark", "system"].includes(preference)) return;
    setThemePreference(preference);
    try { localStorage.setItem("theme", preference); } catch {}
  }, []);
  const toggle = () => chooseTheme(theme === "light" ? "dark" : "light");
  const setLangWithTransition = useCallback((nextLang) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(() => setLang(nextLang));
      return;
    }
    setLang(nextLang);
  }, []);

  const changeLang = useCallback((nextLang) => {
    if (!SUPPORTED_LANGS.includes(nextLang)) return;
    if (isLocalizedHub(pathname)) {
      router.push(localizedPath(`${pathname}${window.location.hash}`, nextLang));
      return;
    }
    setLangWithTransition(nextLang);
  }, [pathname, router, setLangWithTransition]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, themePreference, chooseTheme }}>
      <LangCtx.Provider value={{ lang, setLang: changeLang }}>
        {children}
      </LangCtx.Provider>
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
export const useLang  = () => useContext(LangCtx);
