import type { MetadataRoute } from "next";
import { appScreenImageUrls } from "./app-screen-data";
import { absoluteUrl } from "./seo";
import { topicGuides } from "./topic-guide-data";

const lastModified = new Date("2026-08-18T00:00:00+02:00");

const topicGuideEntries: MetadataRoute.Sitemap = topicGuides.map((guide) => ({
  url: absoluteUrl("/" + guide.slug),
  lastModified,
  changeFrequency: "weekly",
  priority: 0.75,
  images: [absoluteUrl(guide.image)],
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: appScreenImageUrls,
    },
    {
      url: absoluteUrl("/guide"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/application-bus-aix-en-provence"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: appScreenImageUrls,
    },
    {
      url: absoluteUrl("/a-propos-debusk"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/donnees-couverture-debusk"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/guide-rentree-bus-aix-en-provence"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/horaires-bus-aix-en-provence"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/itineraire-bus-aix-en-provence"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/lignes-bus-aix-en-provence"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/abonnement-bus-scolaire-aix-en-provence"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/informations"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...topicGuideEntries,
  ];
}
