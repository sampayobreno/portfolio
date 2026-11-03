import { expect, test } from "@playwright/test";

async function movePointerToCodeVeilBackground(page) {
  const point = await page.evaluate(() => {
    const backgroundTags = new Set(["BODY", "HTML", "MAIN", "SECTION"]);

    for (let y = 140; y <= window.innerHeight - 100; y += 40) {
      for (let x = 120; x <= window.innerWidth - 120; x += 40) {
        const element = document.elementFromPoint(x, y);
        if (element && backgroundTags.has(element.tagName)) return { x, y };
      }
    }

    throw new Error("No unobstructed background point was found for the code-veil test.");
  });

  await page.mouse.move(1, 1);
  await page.mouse.move(point.x, point.y);
  return point;
}

test("current portfolio exposes core navigation and content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await expect(page.locator("#contact")).toBeAttached();
});

test("ultrawide layouts gain presence without widening regular desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const regular = await page.locator("#contact").boundingBox();
  expect(regular).not.toBeNull();
  expect(regular.width).toBeLessThanOrEqual(1100);

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.reload();
  const ultrawide = await page.locator("#contact").boundingBox();
  expect(ultrawide).not.toBeNull();
  expect(ultrawide.width).toBeGreaterThanOrEqual(1239);
  expect(ultrawide.width).toBeLessThanOrEqual(1240);
});

test("contact form sends inside the page and confirms delivery", async ({ page }) => {
  let submittedPayload;
  await page.route("**/api/contact", async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/");
  const form = page.getByRole("form", { name: "Contact form" });
  await form.getByLabel("Name").fill("Alex Morgan");
  await form.getByLabel("Email").fill("alex@example.com");
  await form.getByLabel("Reason").selectOption("product-design-role");
  await form.getByLabel("Message").fill("I would like to discuss a product design role.");
  await form.getByRole("button", { name: "Send message" }).click();

  await expect(form.getByRole("status")).toHaveText("Message sent. I’ll reply as soon as I can.");
  expect(submittedPayload).toEqual({
    name: "Alex Morgan",
    email: "alex@example.com",
    reason: "product-design-role",
    message: "I would like to discuss a product design role.",
    website: "",
  });
  await expect(form.getByLabel("Name")).toHaveValue("");
});

test("contact submit labels remain on one line at desktop widths", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const path of ["/", "/fr"]) {
    await page.goto(path);
    const button = page.locator(".contact-form__submit");
    const metrics = await button.evaluate((element) => {
      const label = element.querySelector("span");
      const lineHeight = Number.parseFloat(getComputedStyle(label).lineHeight);
      return { labelHeight: label.getBoundingClientRect().height, lineHeight };
    });
    expect(metrics.labelHeight).toBeLessThanOrEqual(metrics.lineHeight + 1);
  }
});

test("hero presents identity, portrait and real destinations", async ({ page }) => {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator("#top h1")).toBeVisible();
    await expect(page.locator("#top img")).toHaveAttribute("alt", /Breno Sampaio/i);
    await expect(page.locator(".hero__actions a").first()).toHaveAttribute("href", "/work");
    await expect(page.locator(".hero__actions a").nth(1)).toHaveAttribute("href", "/about");
  }
});

test("hero actions lead to selected work and the design practice", async ({ page }) => {
  for (const { path, work, about } of [
    { path: "/", work: "/work", about: "/about" },
    { path: "/fr", work: "/fr/work", about: "/fr/about" },
  ]) {
    await page.goto(path);
    const primaryAction = page.locator(".hero__actions a").first();
    const secondaryAction = page.locator(".hero__actions a").nth(1);
    await expect(primaryAction).toHaveAttribute("href", work);
    await expect(secondaryAction).toHaveAttribute("href", about);
    await primaryAction.click();
    await expect(page).toHaveURL(new RegExp(`${work}$`));
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("desktop pointer reveals a decorative code layer without intercepting the page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  await expect(veil).toHaveAttribute("aria-hidden", "true");
  await expect(veil).toHaveCSS("pointer-events", "none");

  const point = await movePointerToCodeVeilBackground(page);
  await expect(veil).toHaveAttribute("data-active", "true");
  const box = await veil.boundingBox();
  expect(box).not.toBeNull();
  expect(Math.abs(box.x + box.width / 2 - point.x)).toBeLessThanOrEqual(2);
  expect(Math.abs(box.y + box.height / 2 - point.y)).toBeLessThanOrEqual(2);
});

test("desktop code reveal remains a compact accent around the pointer", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.mouse.move(620, 420);

  const box = await page.locator(".code-veil").boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeLessThanOrEqual(180);
  expect(box.height).toBeLessThanOrEqual(180);
});

test("desktop code reveal stays hidden over foreground content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");

  for (const selector of [
    "#top img",
    "#contact-title",
    ".contact-form select",
    ".contact-form textarea",
  ]) {
    await page.goto("/");
    const surface = page.locator(selector);
    await surface.scrollIntoViewIfNeeded();
    await movePointerToCodeVeilBackground(page);
    await expect(veil).toHaveAttribute("data-active", "true");
    await surface.hover();
    await expect(veil).toHaveAttribute("data-active", "false");
    expect(await veil.evaluate((element) => getComputedStyle(element).opacity)).toBe("0");
  }
});

test("desktop code reveal follows pointer coordinates in the same event", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  await expect.poll(async () => {
    await movePointerToCodeVeilBackground(page);
    return veil.getAttribute("data-active");
  }).toBe("true");

  const center = await page.evaluate(() => {
    const target = { x: 873, y: 517 };
    window.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      clientX: target.x,
      clientY: target.y,
      pointerType: "mouse",
    }));
    const rect = document.querySelector(".code-veil").getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });

  expect(Math.abs(center.x - 873)).toBeLessThanOrEqual(1);
  expect(Math.abs(center.y - 517)).toBeLessThanOrEqual(1);
});

test("decorative code reveal stays off for reduced motion and narrow layouts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  await page.mouse.move(620, 420);
  await expect(veil).toHaveAttribute("data-active", "false");
  await expect(veil).toHaveCSS("display", "none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.mouse.move(180, 360);
  await expect(veil).toHaveAttribute("data-active", "false");
  await expect(veil).toHaveCSS("display", "none");
});

test("saved dark theme survives hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  await page.waitForTimeout(1100);

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
});

test("legacy case routes remain reachable", async ({ page }) => {
  for (const path of [
    "/work/access-restored",
    "/work/missing-reservation",
    "/work/connectivity-broke",
  ]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("mobile More closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation.getByRole("link", { name: "Work", exact: true })).toBeVisible();
  await expect(primaryNavigation.getByRole("link", { name: "About", exact: true })).toBeVisible();

  const trigger = page.getByRole("button", { name: /more|tools|menu/i });
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "More" }).getByRole("link", { name: "Labs", exact: true })).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("mobile More closes after same-page Contact navigation in both languages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    { path: "/", more: "More", hash: /\/#contact$/ },
    { path: "/fr", more: "Plus", hash: /\/fr#contact$/ },
  ]) {
    await page.goto(route.path);
    await page.getByRole("button", { name: route.more, exact: true }).click();
    const moreNavigation = page.getByRole("navigation", { name: route.more, exact: true });
    await moreNavigation.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(moreNavigation).toHaveCount(0);
    await expect(page).toHaveURL(route.hash);
    await expect(page.locator("#contact")).toBeInViewport();
  }
});

const nonCaseRoutes = [
  { path: "/", lang: "en-CA", sectionIds: ["top", "work", "capabilities", "approach", "about", "contact"] },
  { path: "/work", lang: "en-CA", sectionIds: ["work-overview"] },
  { path: "/labs", lang: "en-CA", sectionIds: ["labs-overview", "current-learning", "publishing-standard"] },
  { path: "/about", lang: "en-CA", sectionIds: ["about-overview", "perspective", "timeline", "languages-location"] },
  { path: "/fr", lang: "fr-CA", sectionIds: ["top", "work", "capabilities", "approach", "about", "contact"] },
  { path: "/fr/work", lang: "fr-CA", sectionIds: ["work-overview"] },
  { path: "/fr/labs", lang: "fr-CA", sectionIds: ["labs-overview", "current-learning", "publishing-standard"] },
  { path: "/fr/about", lang: "fr-CA", sectionIds: ["about-overview", "perspective", "timeline", "languages-location"] },
];

test("every exposed non-case route has one localized H1 and stable sections", async ({ page }) => {
  for (const { path, lang, sectionIds } of nonCaseRoutes) {
    await page.goto(path);
    await expect(page.locator("main h1:visible")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    expect(await page.locator("main section[id]").evaluateAll((sections) => sections.map((section) => section.id))).toEqual(sectionIds);
    await expect(page.getByText(/^(?:Built|Shipped)$/i)).toHaveCount(0);
  }
});


test("Home and Work lead to the honest Relay case without promoting future projects", async ({ page }) => {
  for (const { path, casePath } of [
    { path: "/", casePath: "/work/relay" },
    { path: "/work", casePath: "/work/relay" },
    { path: "/fr", casePath: "/fr/work/relay" },
    { path: "/fr/work", casePath: "/fr/work/relay" },
  ]) {
    await page.goto(path);
    await expect(page.locator(`main a[href="${casePath}"]`)).toBeVisible();
    await expect(page.locator("main")).not.toContainText(/Basis|Signalroom|Project title|Titre du projet/);
    await expect(page.locator('.site-header a[href$="/labs"], .site-footer a[href$="/labs"]')).toHaveCount(0);
    await page.locator(`main a[href="${casePath}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${casePath}$`));
    await expect(page.locator("main")).toContainText(/synthetic|synthétiques/i);
  }
});

test("non-case pages have no broken internal links", async ({ page, request }) => {
  for (const { path } of nonCaseRoutes) {
    await page.goto(path);
    const hrefs = await page.locator('main a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))],
    );
    for (const href of hrefs) {
      const response = await request.get(href.split("#")[0]);
      expect(response.ok(), `${path} links to ${href}`).toBe(true);
    }
  }
});

test("About contact actions return to the localized Home contact section", async ({ page }) => {
  for (const route of [
    { path: "/about", href: "/#contact" },
    { path: "/fr/about", href: "/fr#contact" },
  ]) {
    await page.goto(route.path);
    await expect(page.locator(`#languages-location a[href="${route.href}"]`)).toBeVisible();
  }
});

test("external profile links are isolated from the opener", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator('a[target="_blank"]');
  await expect(externalLinks).not.toHaveCount(0);
  const relValues = await externalLinks.evaluateAll((links) => links.map((link) => link.rel));
  expect(relValues.every((rel) => rel.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});

test("keyboard section navigation reaches and focuses Contact", async ({ page }) => {
  await page.goto("/");
  const jumpNav = page.locator(".section-jump-nav");
  await expect(jumpNav).toHaveAttribute("aria-label", "Page sections");
  const firstLink = jumpNav.getByRole("link").first();
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Tab");
    if (await firstLink.evaluate((link) => document.activeElement === link)) break;
  }
  await expect(firstLink).toBeFocused();

  const contactLink = jumpNav.getByRole("link", { name: "Contact", exact: true });
  await contactLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contact")).toBeFocused();
  await expect(page).toHaveURL(/#contact$/);
});

test("desktop rail follows the current section after real scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#approach").evaluate((element) => {
    window.scrollTo(0, element.offsetTop - window.innerHeight * 0.35);
  });
  await expect(page.locator(".rail__label")).toHaveText("How I work");
  await expect(page.locator('.rail__dot.is-active[href="#approach"]')).toHaveCount(1);
  await expect(page.locator(".case-dock")).toBeHidden();
});

test("editorial rail stays beside the reading column on wide screens", async ({ page }) => {
  for (const route of ["/", "/work/relay"]) {
    for (const width of [1440, 1680, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await expect(page.locator(".rail")).toBeVisible();
      const geometry = await page.evaluate(() => {
        const rail = document.querySelector(".rail").getBoundingClientRect();
        const content = document.querySelector("main .container").getBoundingClientRect();
        const label = document.querySelector(".rail__label").getBoundingClientRect();
        return { gap: content.left - rail.left, labelRight: label.right, railLeft: rail.left, contentLeft: content.left };
      });
      expect(geometry.gap, `${route} at ${width}px`).toBeGreaterThanOrEqual(90);
      expect(geometry.railLeft / geometry.contentLeft, `${route} at ${width}px`).toBeGreaterThan(0.35);
      expect(geometry.railLeft / geometry.contentLeft, `${route} at ${width}px`).toBeLessThan(0.55);
      expect(geometry.labelRight, `${route} label and dot at ${width}px`).toBeLessThanOrEqual(geometry.railLeft - 8);
      expect(geometry.labelRight, `${route} label at ${width}px`).toBeLessThan(geometry.contentLeft - 12);
    }
  }
});

test("editorial surfaces and meaningful text use the shared design scale", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const design = await page.evaluate(() => {
      const style = (part) => getComputedStyle(document.querySelector(`[class*="${part}"]`));
      const rect = (part) => document.querySelector(`[class*="${part}"]`).getBoundingClientRect();
      return {
        heroTitle: parseFloat(style("heroTitle").fontSize),
        projectDescription: parseFloat(style("projectDescription").fontSize),
        projectCardRadius: style("projectCard").borderTopLeftRadius,
        heroCanvasRadius: style("heroPortrait").borderTopLeftRadius,
        skillsDescription: parseFloat(style("cardDesc").fontSize),
        skillsCardRadius: style("activeCard").borderTopLeftRadius,
        skillsTabHeight: rect("segBtn").height,
      };
    });
    expect(design.heroTitle).toBeLessThanOrEqual(60);
    expect(design.projectDescription).toBeGreaterThanOrEqual(16);
    expect(design.projectCardRadius).toBe("16px");
    expect(design.heroCanvasRadius).toBe("16px");
    if (width === 390) {
      expect(design.skillsDescription).toBeGreaterThanOrEqual(14);
      expect(design.skillsCardRadius).toBe("16px");
      expect(design.skillsTabHeight).toBeGreaterThanOrEqual(44);
    }
  }
});

test("desktop and tablet show vertical rail and hide bottom dock on case studies", async ({ page }) => {
  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/relay");
  await expect(page.locator(".rail")).toBeVisible();
  await expect(page.locator(".case-dock")).toBeHidden();

  // Keep the section label out of the case text until the rail is explored.
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/work/relay");
  await expect(page.locator(".rail__label")).toHaveCSS("opacity", "0");
  await page.locator(".rail__dot").first().hover();
  await expect(page.locator(".rail__label")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(500, 100);
  await page.goto("/work/relay");
  await expect(page.locator(".rail__label")).toHaveCSS("opacity", "0");
  await page.locator(".rail__dot").first().hover();
  await expect(page.locator(".rail__label")).toHaveCSS("opacity", "1");

  // Tablet (iPad)
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/work/relay");
  await expect(page.locator(".rail")).toBeVisible();
  await expect(page.locator(".case-dock")).toBeHidden();

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/relay");
  await expect(page.locator(".case-dock")).toBeVisible();
  await expect(page.locator(".rail")).toBeHidden();
});

test("mobile dock keeps current-section orientation with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#about").evaluate((element) => {
    window.scrollTo(0, element.offsetTop - window.innerHeight * 0.35);
  });
  await expect(page.locator(".case-dock__name")).toHaveText("About");
  await expect(page.locator('.case-dock__dot.is-active[href="#about"]')).toHaveAttribute("aria-current", "true");
});

test("case collapsibles preserve stable section anchors while toggling", async ({ page }) => {
  await page.goto("/work/access-restored");
  const section = page.locator("main section#incident");
  await expect(section).toHaveCount(1);
  const toggle = section.locator(".collapsible__toggle");
  const initial = await toggle.getAttribute("aria-expanded");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", initial === "true" ? "false" : "true");
  await expect(page.locator("main section#incident")).toHaveCount(1);
});

test("mobile dock advances one section only on horizontal swipe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const pill = page.locator(".case-dock__pill");

  await pill.dispatchEvent("touchstart", { touches: [{ identifier: 0, clientX: 220, clientY: 760 }] });
  await pill.dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 210, clientY: 680 }] });
  await expect(page).not.toHaveURL(/#work$/);

  await pill.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 260, clientY: 760 }] });
  await pill.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 180, clientY: 756 }] });
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("non-case metadata is localized, reciprocal and truthful", async ({ page }) => {
  const titles = new Set();
  const descriptions = new Set();

  for (const { path, lang } of nonCaseRoutes) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(titles.has(title), `duplicate title at ${path}`).toBe(false);
    expect(descriptions.has(description), `duplicate description at ${path}`).toBe(false);
    titles.add(title);
    descriptions.add(description);

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en-CA"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="fr-CA"]')).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);

    const schema = JSON.parse(await page.locator("#person-schema").textContent());
    expect(schema.jobTitle).toBe("Product Designer");
    expect(schema.sameAs).toContain("https://github.com/sampayobreno-spec");
    expect(schema.sameAs).toContain("https://www.linkedin.com/in/brenosampaio");
  }
});

test("social metadata points to a public image response in both languages", async ({ page }) => {
  for (const route of ["/", "/fr"]) {
    await page.goto(route);

    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const content = await page.locator(selector).getAttribute("content");
      expect(content, `${route} ${selector}`).toBeTruthy();

      const imageUrl = new URL(content);
      const response = await page.request.get(`${imageUrl.pathname}${imageUrl.search}`);
      expect(response.status(), `${route} ${selector} status`).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  }
});

test("localized 404 offers Home and Work recovery", async ({ page }) => {
  for (const route of [
    { path: "/missing-route", home: "/", work: "/work" },
    { path: "/fr/missing-route", home: "/fr", work: "/fr/work" },
  ]) {
    await page.goto(route.path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(`main a[href="${route.home}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${route.work}"]`)).toBeVisible();
  }
});

test("localized 404 is server-rendered and recoverable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  for (const route of [
    { path: "/missing-without-javascript", lang: "en-CA", home: "/", work: "/work" },
    { path: "/fr/missing-without-javascript", lang: "fr-CA", home: "/fr", work: "/fr/work" },
  ]) {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(`main a[href="${route.home}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${route.work}"]`)).toBeVisible();
  }

  await context.close();
});
