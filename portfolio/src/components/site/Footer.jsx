"use client";

import Link from "next/link";
import { useLang } from "@/context/AppContext";
import { profile } from "@/lib/content";
import { GITHUB_URL, LINKEDIN_URL, navigationFor } from "@/lib/siteNavigation";
import styles from "./Footer.module.css";

export function Footer() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const navigation = navigationFor(lang);
  const home = fr ? "/fr" : "/";

  return (
    <footer className={styles.footer} id="contact-footer">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Link href={home} className={styles.name}>Breno Sampaio</Link>
            <p>{fr ? "Designer produit · Valence, Espagne" : "Product designer · Valencia, Spain"}</p>
          </div>
          <nav className={styles.column} aria-label={fr ? "Navigation secondaire" : "Secondary navigation"}>
            <span className={styles.label}>{fr ? "Parcourir" : "Explore"}</span>
            {navigation.map((item) => <Link key={item.id} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className={styles.column}>
            <span className={styles.label}>{fr ? "Retrouvons-nous" : "Connect"}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
          <div className={styles.column}>
            <span className={styles.label}>{fr ? "Documents" : "Documents"}</span>
            <a href="/breno-sampaio-resume-en.pdf" download="Breno_Sampaio_Resume_EN.pdf">Resume EN ↓</a>
            <a href="/breno-sampaio-resume-fr.pdf" download="Breno_Sampaio_Resume_FR.pdf">CV FR ↓</a>
          </div>
        </div>
        <div className={styles.bottom}><span>© 2026 Breno Sampaio</span><a href={`${home}#top`}>{fr ? "Retour à l’accueil" : "Back to home"} ↑</a></div>
      </div>
    </footer>
  );
}
