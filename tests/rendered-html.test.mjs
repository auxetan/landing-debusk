import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the finished AixBusLive landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AixBusLive — Partez au bon moment !<\/title>/i);
  assert.match(html, /Partez au/);
  assert.match(html, /Nous contacter/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /Votre bus arrive\./);
  assert.match(html, /Vous le voyez venir\./);
  assert.match(html, /Repérez votre départ\./);
  assert.match(html, /Suivez votre bus\./);
  assert.match(html, /Passez le relais\./);
  assert.match(html, /Le suivi communautaire/);
  assert.match(html, /Chaque contribution/);
  assert.match(html, /aide le suivant\./);
  assert.match(html, /sa position actualise le bus sur/);
  assert.doesNotMatch(html, /Un coup d’œil|Signalez\./);
  assert.doesNotMatch(html, /Chaque trajet|Un passager à bord|transforme les contributions/);
  assert.doesNotMatch(html, /codex-preview|Building your site|loading skeleton/i);
});

test("keeps the hamburger contact form wired to the dedicated template", async () => {
  const [dialog, header] = await Promise.all([
    readFile(new URL("../app/ContactDialog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(header, /label:\s*"Nous contacter"/);
  assert.match(header, /contact:\s*true/);
  assert.match(header, /<ContactDialog/);

  assert.match(dialog, /template_qp34ygq/);
  assert.match(dialog, /service_7znwy0i/);
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

test("contains no disposable starter preview", async () => {
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));

  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<SiteHeader \/>/);
  assert.match(layout, /AixBusLive — Partez au bon moment !/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
