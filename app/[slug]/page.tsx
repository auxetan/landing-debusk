import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuidePage } from "../GuidePage";
import { absoluteUrl, createPageMetadata } from "../seo";
import { StructuredData } from "../StructuredData";
import { topicGuideBySlug, topicGuides } from "../topic-guide-data";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return topicGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = topicGuideBySlug.get(slug);

  if (!guide) {
    return {};
  }

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/${guide.slug}`,
    image: guide.image,
    imageAlt: guide.imageAlt,
    imageWidth: guide.imageWidth,
    imageHeight: guide.imageHeight,
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const guide = topicGuideBySlug.get(slug);

  if (!guide) {
    notFound();
  }

  const path = `/${guide.slug}`;
  const imageUrl = absoluteUrl(guide.image);

  return (
    <GuidePage
      path={path}
      eyebrow={guide.eyebrow}
      title={guide.title}
      intro={guide.intro}
      image={{
        url: guide.image,
        width: guide.imageWidth,
        height: guide.imageHeight,
        alt: guide.imageAlt,
      }}
    >
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: guide.title,
          description: guide.description,
          url: absoluteUrl(path),
          inLanguage: "fr-FR",
          primaryImageOfPage: {
            "@type": "ImageObject",
            contentUrl: imageUrl,
            url: imageUrl,
            width: guide.imageWidth,
            height: guide.imageHeight,
            caption: guide.imageCaption,
          },
        }}
      />

      <section className="topic-overview" aria-label="À retenir">
        <figure className="topic-image">
          <Image
            src={guide.image}
            alt={guide.imageAlt}
            width={guide.imageWidth}
            height={guide.imageHeight}
            sizes="(max-width: 680px) 72vw, 360px"
            priority
          />
          <figcaption>{guide.imageCaption}</figcaption>
        </figure>

        <dl className="topic-facts">
          {guide.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {guide.callout ? (
        <aside
          className={`guide-callout ${
            guide.callout.tone === "signal"
              ? "guide-callout-signal"
              : guide.callout.tone === "green"
                ? "guide-callout-green"
                : ""
          }`}
        >
          <h2>{guide.callout.title}</h2>
          <p>{guide.callout.text}</p>
        </aside>
      ) : null}

      {guide.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets ? (
            <ul className="guide-bullet-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="guide-source-box">
        <h2>Sources et vérification</h2>
        <p>
          Contenu vérifié le 16 août 2026. Les données de Débusk facilitent la
          consultation ; les règles, tarifs, réservations et changements
          contractuels restent ceux publiés par les organismes officiels.
        </p>
        <ul>
          {guide.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav className="topic-related" aria-label="Guides liés à ce trajet">
        <h2>Continuer la préparation</h2>
        <div>
          {guide.related.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </nav>
    </GuidePage>
  );
}
