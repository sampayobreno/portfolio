const copy = {
  en: {
    lang: "en-CA",
    title: "Page not found — Breno Sampaio",
    eyebrow: "404 · Page not found",
    heading: "This route does not exist.",
    body: "The page may have moved. Continue with the portfolio overview or return home.",
    home: "Home",
    work: "Explore work",
    homeHref: "/",
    workHref: "/work",
  },
  fr: {
    lang: "fr-CA",
    title: "Page introuvable — Breno Sampaio",
    eyebrow: "404 · Page introuvable",
    heading: "Cette page n’existe pas.",
    body: "La page a peut-être été déplacée. Consultez les projets ou revenez à l’accueil.",
    home: "Accueil",
    work: "Voir les projets",
    homeHref: "/fr",
    workHref: "/fr/work",
  },
};

export function notFoundResponse(locale) {
  const content = copy[locale];
  const html = `<!doctype html>
<html lang="${content.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <meta name="theme-color" content="#f8f7f3">
    <title>${content.title}</title>
    <style>
      :root{color-scheme:light dark;font-family:Arial,Helvetica,sans-serif;background:#f8f7f3;color:#1b1a17}
      *{box-sizing:border-box}body{margin:0;min-height:100vh;background:#f8f7f3;color:#1b1a17}
      main{width:min(1120px,calc(100% - 40px));min-height:100vh;margin:auto;display:grid;align-content:center;padding:96px 0}
      .mark{position:absolute;top:28px;font-size:.78rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
      .eyebrow{color:#a44a28;font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
      h1{max-width:800px;margin:18px 0 20px;font-family:Georgia,serif;font-size:clamp(3rem,10vw,7.5rem);font-weight:400;line-height:.92;letter-spacing:-.055em}
      p{max-width:580px;margin:0;color:#4d4b45;font-size:clamp(1rem,2vw,1.25rem);line-height:1.65}
      nav{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px}a{display:inline-flex;min-height:48px;align-items:center;padding:0 18px;border:1px solid #1b1a17;color:inherit;text-decoration:none;font-weight:700}
      a:first-child{background:#1b1a17;color:#f8f7f3}a:focus-visible{outline:3px solid #a44a28;outline-offset:3px}
      @media(prefers-color-scheme:dark){:root,body{background:#151513;color:#efede6}p{color:#bdb9af}a{border-color:#efede6}a:first-child{background:#efede6;color:#151513}.eyebrow{color:#e3916b}a:focus-visible{outline-color:#e3916b}}
    </style>
  </head>
  <body>
    <main>
      <div class="mark">Breno Sampaio</div>
      <span class="eyebrow">${content.eyebrow}</span>
      <h1>${content.heading}</h1>
      <p>${content.body}</p>
      <nav aria-label="${locale === "fr" ? "Récupération" : "Recovery"}">
        <a href="${content.workHref}">${content.work} <span aria-hidden="true">&nbsp;↗</span></a>
        <a href="${content.homeHref}">${content.home}</a>
      </nav>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
