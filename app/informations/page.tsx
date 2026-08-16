import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "../contact";
import { createPageMetadata } from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Confidentialité, sources et mentions de Débusk",
  description:
    "Découvrez les règles de confidentialité, les sources des horaires et le statut indépendant de l’application de bus Débusk à Aix-en-Provence.",
  path: "/informations",
  type: "website",
});

export default function InformationsPage() {
  return (
    <main className="information-page">
      <Link className="information-back" href="/">
        <span aria-hidden="true">←</span>
        Débusk
      </Link>

      <header className="information-header">
        <h1>Informations</h1>
        <p>
          Les réponses claires sur le projet, les données transport, la
          confidentialité et la manière dont Débusk présente un bus sur la
          carte.
        </p>
      </header>

      <div className="information-sections">
        <section id="confidentialite">
          <p className="information-number">01</p>
          <div>
            <h2>Confidentialité</h2>
            <p>
              Le site est public et la consultation ne demande aucun compte. Le
              formulaire de contact transmet uniquement les informations que
              vous choisissez d’écrire à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p>
              Dans l’application, le suivi de trajet reste volontaire. Aucun
              nom n’apparaît sur la carte et le partage s’arrête lorsque vous
              touchez « Je descends » ou quittez le mode conduite.
            </p>
          </div>
        </section>

        <section id="mentions">
          <p className="information-number">02</p>
          <div>
            <h2>Mentions</h2>
            <p>
              Débusk est un projet numérique indépendant conçu à
              Aix-en-Provence. Il n’est ni affilié ni mandaté par Aix en Bus ou
              la Métropole Aix-Marseille-Provence.
            </p>
            <p>
              Pour toute demande, écrivez à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ou utilisez
              le <Link href="/#contact">formulaire de contact</Link>.
            </p>
          </div>
        </section>

        <section id="sources">
          <p className="information-number">03</p>
          <div>
            <h2>Sources</h2>
            <p>
              Les horaires théoriques reposent sur les données de transport
              publiées pour le réseau d’Aix. Les perturbations officielles
              proviennent des canaux du réseau. Les positions communautaires et
              les signalements sont ajoutés volontairement par les voyageurs à
              bord.
            </p>
            <p>
              Les informations affichées restent indicatives. En cas de doute,
              consultez également les{" "}
              <a
                href="https://www.lametropolemobilite.fr/plans-et-horaires/"
                target="_blank"
                rel="noopener noreferrer"
              >
                plans et horaires de La Métropole Mobilité
              </a>{" "}
              ou le{" "}
              <a
                href="https://www.aixenbus.fr/fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                site Aix en Bus
              </a>
              .
            </p>
          </div>
        </section>

        <section id="methodologie">
          <p className="information-number">04</p>
          <div>
            <h2>Méthodologie</h2>
            <p>
              Un horaire décrit le service prévu. Une perturbation officielle
              signale une modification connue. Une position communautaire
              n’apparaît que lorsqu’un voyageur présent dans le bus active le
              suivi pendant son trajet : elle ne constitue donc pas un suivi
              permanent de tous les véhicules.
            </p>
            <p>
              Débusk distingue ces trois niveaux pour ne pas présenter une
              estimation comme une position réelle. Cette page a été vérifiée
              le <time dateTime="2026-08-16">16 août 2026</time>.
            </p>
          </div>
        </section>
      </div>

      <footer className="information-footer">
        <span>Débusk</span>
        <div>
          <Link href="/guides">Guides bus</Link>
          <Link href="/a-propos-debusk">À propos de Débusk</Link>
          <Link href="/donnees-couverture-debusk">Données et couverture</Link>
          <Link href="/">Retour au site</Link>
        </div>
      </footer>
    </main>
  );
}
