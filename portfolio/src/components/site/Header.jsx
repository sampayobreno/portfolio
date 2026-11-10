"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { GITHUB_URL, navigationFor } from "@/lib/siteNavigation";
import { Icon } from "./Icon";
import { ThemePicker } from "./ThemePicker";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLiquidGlass } from "./LiquidGlass";
import styles from "./NavigationDock.module.css";

export function Header() {
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const fr = lang === "fr";
  const t = getT(lang);
  const home = fr ? "/fr" : "/";
  const navigation = navigationFor(lang);
  const icons = { work: "layout", about: "user", contact: "mail" };
  const dock = useRef(null);
  const glassFilter = useLiquidGlass(dock, "dock-glass");
  // Specular highlight follows the pointer across the glass.
  const onPointerMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  };
  const current = (item) => item.id !== "contact" && (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined;

  return (
    <header className={styles.header}>
      {glassFilter}
      <nav ref={dock} className={styles.dock} aria-label={t.a11y.primaryNavigation} onPointerMove={onPointerMove}>
        <Link href={home} className={styles.item} aria-label={fr ? "Accueil" : "Home"} aria-current={pathname === home ? "page" : undefined}>
          <Icon name="frame" size={20} /><span>{fr ? "Accueil" : "Home"}</span>
        </Link>
        {navigation.map((item) => <Link key={item.id} href={item.href} className={styles.item} aria-current={current(item)}>
          <Icon name={icons[item.id]} size={20} /><span>{item.label}</span>
        </Link>)}
        <button type="button" className={styles.item} aria-haspopup="dialog" onClick={() => window.dispatchEvent(new Event("portfolio:assistant-open"))}>
          <Icon name="search" size={20} /><span>{fr ? "Assistant" : "Ask"}</span>
        </button>
        <details className={styles.more}>
          <summary className={styles.moreTrigger}>{fr ? "Plus" : "More"}</summary>
          <div className={styles.panel}>
            <div className={styles.panelLinks}>
              <a href={t.resume.href} download={t.resume.fileName}>{fr ? "Télécharger le CV" : "Download resume"} ↓</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
            <div className={styles.preferences}><LanguageSwitcher /><ThemePicker lang={lang} /></div>
          </div>
        </details>
      </nav>
    </header>
  );
}
