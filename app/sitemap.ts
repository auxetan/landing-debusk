import type { MetadataRoute } from "next";
import { absoluteUrl, UPDATED_AT } from "./seo";

const lastModified = new Date(UPDATED_AT + "T00:00:00+02:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
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
  ];
}
