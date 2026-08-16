import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Débusk landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Débusk : horaires et itinéraires de bus à Aix-en-Provence<\/title>/i,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.debusk\.fr\/"\s*\/>/i,
  );
  assert.match(html, /"@type":"MobileApplication"/);
  assert.match(html, /"@id":"https:\/\/www\.debusk\.fr\/#application"/);
  assert.match(html, /"publisher":\{"@id":"https:\/\/www\.debusk\.fr\/#organization"\}/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Quelle application utiliser pour les bus à Aix-en-Provence/);
  assert.match(html, /Le bus à Aix\./);
  assert.match(html, /Nous contacter/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /href="\/guides"/);
  assert.match(html, /Votre bus arrive\./);
  assert.match(html, /Vous le voyez venir\./);
  assert.match(html, /Les bus autour de vous/);
  assert.match(html, /Vos départs en un coup d’œil/);
  assert.match(html, /Chaque contribution/);
  assert.match(html, /aide le suivant\./);
  assert.match(html, /sa position actualise le bus sur/);
  assert.match(html, /partage reste volontaire/);
  assert.match(html, /Débusk affiche-t-il les horaires/);
  assert.match(html, /Puis-je acheter un abonnement scolaire/);
  assert.match(html, /Voir toutes les questions/);
  assert.match(html, /Le suivi consomme-t-il de la batterie/);
  assert.doesNotMatch(html, /codex-preview|Building your site|loading skeleton/i);
});

test("keeps the landing page and guide openings visually airy", async () => {
  const [home, faq, guidePage, guideIndex, applicationPage, css] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/FaqSection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/GuidePage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/guides/page.tsx", import.meta.url), "utf8"),
      readFile(
        new URL(
          "../app/application-bus-aix-en-provence/page.tsx",
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    ]);

  assert.doesNotMatch(
    home,
    /className="(?:kicker|hero-proof|section-eyebrow|community-privacy)"/,
  );
  assert.match(home, /const homeGuideLinks = \[/);
  assert.match(home, /featuredGuideLinks\[4\]/);
  assert.match(home, /homeGuideLinks\.map/);
  assert.match(home, /Découvrir l’app/);
  assert.match(faq, /initialQuestionCount = 3/);
  assert.doesNotMatch(faq, /section-eyebrow|faq-number/);
  assert.doesNotMatch(guidePage, /guide-eyebrow|guide-updated/);
  assert.doesNotMatch(guidePage, /\{guide\.label\}/);
  assert.doesNotMatch(guideIndex, /guide-eyebrow|guide-index-number/);
  assert.doesNotMatch(applicationPage, /moteurs de recherche/);

  for (const removedClass of [
    "kicker",
    "hero-proof",
    "section-eyebrow",
    "community-privacy",
    "guide-eyebrow",
    "guide-updated",
    "guide-callout-label",
  ]) {
    assert.doesNotMatch(css, new RegExp(`\\.${removedClass}\\b`));
  }
});

test("ships all seven app screens in a swipeable, keyboard-friendly carousel", async () => {
  const [showcase, screenData, css] = await Promise.all([
    readFile(new URL("../app/AppShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/app-screen-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  const images = [
    "main-screen.png",
    "favoris-choix-bus.png",
    "perturbations-officielles.png",
    "mode-itineraire.png",
    "mode-conduite.png",
    "contribution-communautaire.png",
    "progression-communautaire.png",
  ];

  await Promise.all(
    images.map((image) =>
      access(new URL(`../public/app-screens/${image}`, import.meta.url)),
    ),
  );

  assert.equal((screenData.match(/src: "\/app-screens\//g) ?? []).length, 7);
  assert.match(showcase, /import Image from "next\/image"/);
  assert.match(showcase, /<figure/);
  assert.match(showcase, /<figcaption/);
  assert.match(showcase, /<Image/);
  assert.match(showcase, /sizes="\(max-width: 440px\) 44vw/);
  assert.match(showcase, /appScreenStructuredData/);
  assert.match(screenData, /"@type": "ImageObject"/);
  assert.match(screenData, /encodingFormat: "image\/png"/);
  assert.match(showcase, /aria-roledescription="carrousel"/);
  assert.match(showcase, /ArrowRight/);
  assert.match(showcase, /ArrowLeft/);
  assert.match(screenData, /suivi volontaire/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /touch-action:\s*pan-x pan-y/);
  for (const className of [
    "brand-logo-frame",
    "download-logo-frame",
    "guide-brand-icon",
  ]) {
    const block = css.match(
      new RegExp(`\\.${className}\\s*\\{([\\s\\S]*?)\\}`),
    )?.[1];
    assert.ok(block, className);
    assert.match(block, /overflow:\s*hidden/, className);
    assert.match(block, /border-radius:\s*22%/, className);
    assert.match(block, /background:\s*transparent/, className);
  }
});

test("keeps the hamburger contact form wired to the dedicated template", async () => {
  const [dialog, header, contact] = await Promise.all([
    readFile(new URL("../app/ContactDialog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact.ts", import.meta.url), "utf8"),
  ]);

  assert.match(header, /label:\s*"Nous contacter"/);
  assert.match(header, /contact:\s*true/);
  assert.match(header, /<ContactDialog/);

  assert.match(dialog, /template_qp34ygq/);
  assert.match(dialog, /service_7znwy0i/);
  assert.match(dialog, /mailto:\$\{CONTACT_EMAIL\}/);
  assert.match(contact, /info@debusk\.fr/);
  for (const parameter of [
    "subject",
    "title",
    "category",
    "name",
    "email",
    "reply_to",
    "to_email",
    "message",
    "time",
  ]) {
    assert.match(dialog, new RegExp(`\\b${parameter}:`));
  }
  assert.match(dialog, /to_email:\s*CONTACT_EMAIL/);
  assert.match(dialog, /Message envoyé\./);
  assert.match(dialog, /Patientez 30 secondes/);
});

test("renders the information page and contains no unused starter or login code", async () => {
  const response = await render("/informations");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Confidentialité/);
  assert.match(html, /Aucun nom n’apparaît sur la carte/);
  assert.match(html, /Débusk est un projet numérique indépendant/);
  assert.match(html, /mailto:info@debusk\.fr/);
  assert.match(html, /info@debusk\.fr/);
  assert.match(html, /Les horaires théoriques reposent sur les données/);
  assert.match(html, /Méthodologie/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.debusk\.fr\/informations"\s*\/>/i,
  );

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db", import.meta.url)));
  await assert.rejects(access(new URL("../drizzle", import.meta.url)));
  await assert.rejects(access(new URL("../examples", import.meta.url)));

  const [page, layout, packageJson, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<SiteHeader \/>/);
  assert.match(
    layout,
    /Débusk : horaires et itinéraires de bus à Aix-en-Provence/,
  );
  assert.doesNotMatch(layout, /headers\(\)/);
  assert.match(packageJson, /"name": "debusk-site"/);
  assert.doesNotMatch(packageJson, /starter|drizzle|react-loading-skeleton/);
  assert.doesNotMatch(readme, /vinext-starter|Workspace Auth Headers/);
});

test("server-renders the search-intent guides with unique metadata", async () => {
  const pages = [
    [
      "/guide-rentree-bus-aix-en-provence",
      "Bus scolaire à Aix : préparer la rentrée 2026-2027",
      "Bus scolaire à Aix-en-Provence : préparer la rentrée 2026–2027",
    ],
    [
      "/horaires-bus-aix-en-provence",
      "Horaires de bus à Aix-en-Provence et prochains départs",
      "Trouver le prochain bus à Aix-en-Provence",
    ],
    [
      "/itineraire-bus-aix-en-provence",
      "Itinéraire bus à Aix-en-Provence : calculer son trajet",
      "Calculer un itinéraire en bus à Aix-en-Provence",
    ],
    [
      "/lignes-bus-aix-en-provence",
      "Lignes de bus à Aix-en-Provence : réseau et scolaires",
      "Les lignes de bus disponibles dans Débusk",
    ],
    [
      "/abonnement-bus-scolaire-aix-en-provence",
      "Abonnement bus scolaire Aix 2026-2027 : inscription",
      "Abonnement bus scolaire à Aix : les démarches pour 2026–2027",
    ],
  ];

  for (const [pathname, title, heading] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(
      html,
      new RegExp("<title>" + title + "</title>", "i"),
      pathname,
    );
    assert.match(html, new RegExp(heading), pathname);
    assert.ok(
      html.includes(
        `<link rel="canonical" href="https://www.debusk.fr${pathname}"/>`,
      ),
      pathname,
    );
    assert.match(html, /"@type":"Article"/, pathname);
    assert.match(html, /"@type":"BreadcrumbList"/, pathname);
  }
});

test("publishes crawlable robots and sitemap endpoints", async () => {
  const [robotsResponse, sitemapResponse, topicGuideSource] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    readFile(new URL("../app/topic-guide-data.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  for (const agent of [
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
    "Google-Extended",
    "bingbot",
    "Applebot",
  ]) {
    assert.match(robots, new RegExp(`User-Agent:\\s*${agent}`, "i"));
  }
  assert.match(robots, /Sitemap:\s*https:\/\/www\.debusk\.fr\/sitemap\.xml/i);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const pathname of [
    "/guides",
    "/application-bus-aix-en-provence",
    "/a-propos-debusk",
    "/donnees-couverture-debusk",
    "/guide-rentree-bus-aix-en-provence",
    "/horaires-bus-aix-en-provence",
    "/itineraire-bus-aix-en-provence",
    "/lignes-bus-aix-en-provence",
    "/abonnement-bus-scolaire-aix-en-provence",
  ]) {
    assert.ok(sitemap.includes(`https://www.debusk.fr${pathname}`));
  }

  assert.match(
    sitemap,
    /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/,
  );
  const topicGuideImages = [
    ...topicGuideSource.matchAll(
      /slug: "([^"]+)"[\s\S]*?image: "([^"]+)"/g,
    ),
  ].map((match) => ({ slug: match[1], image: match[2] }));

  assert.equal(topicGuideImages.length, 20);
  assert.equal(
    (sitemap.match(/<image:image>/g) ?? []).length,
    14 + topicGuideImages.length,
  );
  for (const image of [
    "main-screen.png",
    "favoris-choix-bus.png",
    "perturbations-officielles.png",
    "mode-itineraire.png",
    "mode-conduite.png",
    "contribution-communautaire.png",
    "progression-communautaire.png",
  ]) {
    assert.ok(
      sitemap.includes(
        `<image:loc>https://www.debusk.fr/app-screens/${image}</image:loc>`,
      ),
      image,
    );
  }

  for (const { slug, image } of topicGuideImages) {
    const entry = sitemap.match(
      new RegExp(
        `<url>\\s*<loc>https://www\\.debusk\\.fr/${slug}</loc>` +
          `[\\s\\S]*?</url>`,
      ),
    )?.[0];
    assert.ok(entry, slug);
    assert.ok(
      entry.includes(
        `<image:loc>https://www.debusk.fr${image}</image:loc>`,
      ),
      slug,
    );
  }

  await access(new URL("../public/og.png", import.meta.url));
});

test("publishes a citeable Débusk identity, exact coverage and agent guidance", async () => {
  const [aboutResponse, coverageResponse, llms, indexNowKey] = await Promise.all([
    render("/a-propos-debusk"),
    render("/donnees-couverture-debusk"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../public/ba209defc82913f8d72883481adefc74.txt",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.equal(aboutResponse.status, 200);
  const about = await aboutResponse.text();
  assert.match(about, /Quelle application pour les bus à Aix-en-Provence/);
  assert.match(about, /application indépendante et gratuite/);
  assert.match(about, /"@type":"AboutPage"/);
  assert.match(about, /"@id":"https:\/\/www\.debusk\.fr\/#application"/);
  assert.ok(
    about.includes(
      '<link rel="canonical" href="https://www.debusk.fr/a-propos-debusk"/>',
    ),
  );

  assert.equal(coverageResponse.status, 200);
  const coverage = await coverageResponse.text();
  assert.match(coverage, /67 lignes · 1 190 arrêts · 52 646 courses/);
  assert.match(coverage, /29 dessertes scolaires actives le mardi 1er septembre/);
  assert.match(coverage, /26 le mercredi 2 septembre/);
  assert.match(coverage, /302d1b16cf3bdc0422d55dd17eded36/);
  assert.match(coverage, /aucune course A2/);
  assert.match(coverage, /transport à la demande n’est pas inclus/);
  assert.match(coverage, /"isBasedOn":\[/);
  assert.ok(
    coverage.includes(
      '<link rel="canonical" href="https://www.debusk.fr/donnees-couverture-debusk"/>',
    ),
  );

  assert.match(llms, /^# Débusk/m);
  assert.match(llms, /indépendante et non officielle/);
  assert.match(llms, /aucune course A2/);
  assert.equal(indexNowKey.trim(), "ba209defc82913f8d72883481adefc74");
});

test("server-renders the new transport clusters and image-rich app page", async () => {
  const pages = [
    ["/application-bus-aix-en-provence", /Débusk, l’application pour préparer/, /L’application Débusk en images/],
    ["/transport-scolaire-aix-en-provence", /Transport scolaire à Aix-en-Provence/, /Séries scolaires intégrées/],
    ["/bus-aix-marseille", /Bus Aix–Marseille/, /L49, L50 et L51/],
    ["/ligne-50-aix-marseille-saint-charles", /Ligne L50 Aix–Marseille Saint-Charles/, /302 mardi/],
    ["/bus-aix-aeroport-marseille-provence", /Bus Aix–Aéroport Marseille Provence/, /aucun horaire A2 exploitable/],
    ["/bus-a-la-demande-pays-aix", /Bus à la demande à Aix et au Pays d’Aix/, /Ni réservation ni horaires TAD/],
    ["/keolis-aix-en-bus-metropole-mobilite", /Keolis, Aix en Bus et La Métropole Mobilité/, /application non officielle/],
    ["/bus-venelles-aix-en-provence", /Bus Venelles–Aix-en-Provence/, /8377 et 8379/],
  ];

  for (const [pathname, heading, proof] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, heading, pathname);
    assert.match(html, proof, pathname);
    assert.ok(
      html.includes(
        `<link rel="canonical" href="https://www.debusk.fr${pathname}"/>`,
      ),
      pathname,
    );
    assert.match(html, /<img[^>]+app-screens/i, pathname);
    assert.match(html, /"@type":"ImageObject"/, pathname);
  }
});

test("emits valid JSON-LD on the landing page and editorial pages", async () => {
  for (const pathname of [
    "/",
    "/guides",
    "/guide-rentree-bus-aix-en-provence",
  ]) {
    const response = await render(pathname);
    const html = await response.text();
    const scripts = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([^<]+)<\/script>/g,
      ),
    ];

    assert.ok(scripts.length > 0, pathname);
    for (const script of scripts) {
      assert.doesNotThrow(() => JSON.parse(script[1]), pathname);
    }

    if (pathname === "/") {
      const structuredData = scripts.map((script) => JSON.parse(script[1]));
      const imageObjects = structuredData.flatMap((entry) =>
        Array.isArray(entry?.["@graph"])
          ? entry["@graph"].filter(
              (item) => item?.["@type"] === "ImageObject",
            )
          : [],
      );
      assert.equal(imageObjects.length, 7);
      for (const image of imageObjects) {
        assert.match(image.contentUrl, /^https:\/\/www\.debusk\.fr\/app-screens\//);
        assert.equal(image.encodingFormat, "image/png");
        assert.equal(typeof image.width, "number");
        assert.equal(typeof image.height, "number");
        assert.ok(image.caption);
      }
    }
  }
});
