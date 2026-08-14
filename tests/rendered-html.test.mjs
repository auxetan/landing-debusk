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
  assert.match(html, /<title>Débusk — Partez au bon moment !<\/title>/i);
  assert.match(html, /Partez au/);
  assert.match(html, /Nous contacter/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /Votre bus arrive\./);
  assert.match(html, /Vous le voyez venir\./);
  assert.match(html, /Les bus autour de vous/);
  assert.match(html, /Vos départs en un coup d’œil/);
  assert.match(html, /Le suivi communautaire/);
  assert.match(html, /Chaque contribution/);
  assert.match(html, /aide le suivant\./);
  assert.match(html, /sa position actualise le bus sur/);
  assert.match(html, /Volontaire · 100 % anonyme · Limité au trajet/);
  assert.match(html, /Le suivi est-il 100 % anonyme/);
  assert.match(html, /Puis-je simplement consulter/);
  assert.match(html, /Voir toutes les questions/);
  assert.match(html, /Le suivi consomme-t-il de la batterie/);
  assert.doesNotMatch(html, /Un coup d’œil|Signalez\./);
  assert.doesNotMatch(
    html,
    /Repérez votre départ|Suivez votre bus|Passez le relais|Chaque trajet|Un passager à bord|transforme les contributions/,
  );
  assert.doesNotMatch(html, /codex-preview|Building your site|loading skeleton/i);
});

test("ships all seven app screens in a swipeable, keyboard-friendly carousel", async () => {
  const [showcase, css] = await Promise.all([
    readFile(new URL("../app/AppShowcase.tsx", import.meta.url), "utf8"),
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

  assert.equal((showcase.match(/image: "\/app-screens\//g) ?? []).length, 7);
  assert.match(showcase, /aria-roledescription="carrousel"/);
  assert.match(showcase, /ArrowRight/);
  assert.match(showcase, /ArrowLeft/);
  assert.match(showcase, /position réelle du bus/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /touch-action:\s*pan-x pan-y/);
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
    "message",
    "time",
  ]) {
    assert.match(dialog, new RegExp(`\\b${parameter}:`));
  }
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
  assert.match(html, /Les horaires théoriques et les perturbations officielles/);

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
  assert.match(layout, /Débusk — Partez au bon moment !/);
  assert.match(packageJson, /"name": "debusk-site"/);
  assert.doesNotMatch(packageJson, /starter|drizzle|react-loading-skeleton/);
  assert.doesNotMatch(readme, /vinext-starter|Workspace Auth Headers/);
});
