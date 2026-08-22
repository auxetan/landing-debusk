import type { Metadata } from "next";
import Link from "next/link";
import { AnalyticsPrivacyControl } from "../AnalyticsPrivacyControl";
import { CONTACT_EMAIL } from "../contact";
import { createPageMetadata } from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Confidentialité, sources et mentions | App Débusk",
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
              Si vous demandez à être prévenu du lancement, votre adresse e-mail
              et la boutique choisie sont envoyées à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> par le même
              service EmailJS que le formulaire de contact, avec la catégorie
              « Watchlist ». Elles servent uniquement à vous annoncer la
              disponibilité de l’application et ne sont ni revendues ni ajoutées
              aux données d’audience. Vous pouvez demander la suppression de ce
              message à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p>
              Une mesure d’audience interne comptabilise les pages consultées,
              le domaine d’origine, le type d’appareil et les clics vers les
              boutiques ou le contact. Elle n’utilise aucun cookie publicitaire,
              n’enregistre aucune adresse IP ni identité dans les données
              d’audience et ne suit personne entre plusieurs sites. Le pays, la
              région et une position arrondie au degré entier peuvent être
              déduits côté serveur par Vercel ; aucune ville, code postal,
              adresse IP ni coordonnée précise n’est conservé dans l’audience.
              Le navigateur, le système et la langue sont réduits à des
              catégories, sans conserver le user-agent. La largeur d’écran est
              enregistrée par tranche. Des mesures de performance arrondies et
              un résumé d’engagement par page peuvent aussi être comptés. Un
              signal de présence est envoyé au maximum une fois par minute
              lorsque l’onglet est visible et supprimé après vingt-quatre
              heures.
            </p>
            <p>
              Un identifiant aléatoire limité à l’onglet expire après trente
              minutes d’inactivité et est effacé à sa fermeture. En cas de
              coupure réseau, une petite file d’attente reste uniquement dans
              cet onglet le temps d’une unique nouvelle tentative. Les autres
              données brutes sont supprimées après treize mois. Les signaux
              « Do Not Track » et Global Privacy Control désactivent la mesure
              et effacent la session locale. Vous pouvez aussi la désactiver
              durablement ci-dessous ; seule cette préférence est conservée
              dans le navigateur.
            </p>
            <AnalyticsPrivacyControl />
            <p>
              <strong>Dans l’application mobile, le compte reste facultatif.</strong>{" "}
              Lors d’une connexion par e-mail ou d’une connexion OAuth via Apple,
              Supabase et Apple traitent l’adresse e-mail, le nom d’affichage,
              l’identifiant technique de compte et les données de session
              nécessaires à l’authentification, selon leurs propres politiques.
            </p>
            <p>
              Les lignes et arrêts favoris, le domicile, le travail, les lieux
              enregistrés et les trajets récents restent sur l’appareil et
              peuvent être synchronisés avec le compte. L’historique peut être
              effacé depuis l’application. Un signalement comprend son type, la
              ligne, l’arrêt ou le trajet concerné, la position utile, son
              horodatage et les validations ou contestations de la communauté ;
              l’identité de son auteur n’est pas affichée publiquement.
            </p>
            <p>
              Si les notifications sont activées, Débusk enregistre dans
              Supabase un identifiant aléatoire d’installation, le token APNs
              fourni par Apple, la plateforme, l’environnement technique et les
              préférences nécessaires à l’envoi des alertes demandées. Ce token
              n’est ni un identifiant publicitaire ni un moyen de suivi entre
              applications. Il est désactivé ou supprimé lors de la
              désactivation, de la déconnexion, de la suppression du compte ou
              de son invalidation par Apple.
            </p>
            <p>
              Mapbox fournit les cartes et peut recevoir les requêtes nécessaires
              à leur chargement ainsi que l’adresse IP et des informations
              techniques ou de diagnostic sur l’appareil ou l’application,
              conformément à sa propre politique. Débusk n’utilise ces
              informations ni pour la publicité ciblée ni pour suivre une
              personne entre les services d’autres entreprises. La mesure
              produit de l’application mobile reste désactivée tant qu’un
              dispositif d’information, de choix et d’opposition n’est pas
              disponible.
            </p>
            <p>
              Le suivi de trajet reste volontaire. Aucun nom n’apparaît sur la
              carte et le partage s’arrête lorsque vous touchez « Je descends »
              ou quittez le mode conduite. Le compte et les données synchronisées
              peuvent être supprimés directement depuis Profil ▸ Zone de danger.
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
              le{" "}
              <Link href="/#contact" data-site-event="contact_open">
                formulaire de contact
              </Link>
              .
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
              le <time dateTime="2026-08-22">22 août 2026</time>.
            </p>
          </div>
        </section>
      </div>

      <footer className="information-footer">
        <span>Débusk</span>
        <div>
          <Link href="/guide">Guide bus</Link>
          <Link href="/a-propos-debusk">À propos de Débusk</Link>
          <Link href="/donnees-couverture-debusk">Données et couverture</Link>
          <Link href="/">Retour au site</Link>
        </div>
      </footer>
    </main>
  );
}
