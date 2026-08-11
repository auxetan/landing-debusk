import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informations — AixBusLive",
  description:
    "Confidentialité, mentions et sources utilisées par AixBusLive.",
};

export default function InformationsPage() {
  return (
    <main className="information-page">
      <Link className="information-back" href="/">
        <span aria-hidden="true">←</span>
        AixBusLive
      </Link>

      <header className="information-header">
        <p className="section-eyebrow">En toute transparence</p>
        <h1>Informations</h1>
        <p>
          Les réponses simples sur les données, la confidentialité et le statut
          du projet.
        </p>
      </header>

      <div className="information-sections">
        <section id="confidentialite">
          <p className="information-number">01</p>
          <div>
            <h2>Confidentialité</h2>
            <p>
              Le site est public et ne demande aucun compte ChatGPT. Le
              formulaire de contact transmet uniquement les informations que
              vous choisissez d’écrire.
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
              AixBusLive est un projet numérique indépendant conçu à
              Aix-en-Provence. Il n’est ni affilié ni mandaté par Aix en Bus ou
              la Métropole Aix-Marseille-Provence.
            </p>
            <p>
              Site hébergé avec OpenAI Sites. Pour toute demande, utilisez le{" "}
              <Link href="/#contact">formulaire de contact</Link>.
            </p>
          </div>
        </section>

        <section id="sources">
          <p className="information-number">03</p>
          <div>
            <h2>Sources</h2>
            <p>
              Les horaires théoriques et les perturbations officielles
              proviennent des informations publiées par Aix en Bus. Les
              positions en direct sont enrichies par les contributions
              volontaires des voyageurs à bord.
            </p>
            <p>
              Les informations affichées restent indicatives. En cas de doute,
              consultez également les canaux officiels du réseau.
            </p>
          </div>
        </section>
      </div>

      <footer className="information-footer">
        <span>AixBusLive</span>
        <Link href="/">Retour au site</Link>
      </footer>
    </main>
  );
}
