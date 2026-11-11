import "../../../design-system/styles.css";
import "../../app/globals.css";
import "../../app/signature.css";
import "../../app/foundation.css";
import "../../app/motion.css";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CodeVeil } from "@/components/site/CodeVeil";
import { LocaleMetadata } from "@/components/site/LocaleMetadata";
import { SkipLink } from "@/components/site/SkipLink";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ToTop } from "@/components/site/ToTop";
import { AssistantDock } from "@/components/site/AssistantDock";
import { MotionObserver } from "@/components/site/MotionObserver";
import { Providers } from "@/context/AppContext";
import { profile } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function SiteDocument({ children, lang }) {
  const htmlLang = lang === "fr" ? "fr-CA" : "en-CA";
  const content = getPortfolioV2(lang);

  return (
    <html
      lang={htmlLang}
      data-lang={lang}
      className={fontVariables}
      suppressHydrationWarning
    >
      {/* The two locale root layouts delegate their complete document shell here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;d.setAttribute('data-theme',s==='light'||s==='dark'?s:(p?'dark':'light'));if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-live'))d.classList.remove('motion');},3000);}}catch(e){}})();` }} />
      </head>
      <body>
        <script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Product Designer",
          description: content.hero.lead,
          url: "https://brenosampaio.vercel.app",
          email: `mailto:${content.links.email}`,
          address: { "@type": "PostalAddress", addressLocality: lang === "fr" ? "Valence" : "Valencia", addressCountry: "ES" },
          knowsLanguage: profile.languages.map((item) => item.name),
          sameAs: [content.links.linkedin, content.links.github],
        }) }} />
        <script id="js-flag" dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <Providers initialLang={lang}>
          <LocaleMetadata />
          <CodeVeil />
          <SmoothScroll />
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ToTop />
          <AssistantDock />
          <MotionObserver />
        </Providers>
      </body>
    </html>
  );
}
