import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Claude-SearchBot",
          "Claude-User",
          "ClaudeBot",
          "Googlebot",
          "Google-Extended",
          "bingbot",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: SITE_URL + "/sitemap.xml",
    host: SITE_URL,
  };
}
