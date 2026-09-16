import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "../contact";
import { createPageMetadata } from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Supprimer votre compte et vos données | Débusk",
  description:
    "Demandez la suppression de votre compte Débusk et des données associées, même sans accès à l’application.",
  path: "/suppression-compte",
  type: "website",
});

const deletionEmail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Demande de suppression de mon compte Débusk",
)}&body=${encodeURIComponent(
  "Bonjour,\n\nJe demande la suppression de mon compte Débusk et des données associées.\n\nAdresse e-mail utilisée pour le compte :\n\nMerci de me confirmer la prise en charge de ma demande.",
)}`;

export default function AccountDeletionPage() {
  return (
    <main className="information-page">
      <Link className="information-back" href="/">
        <span aria-hidden="true">←</span>
        Débusk
      </Link>

      <header className="information-header">
        <h1>Supprimer votre compte Débusk</h1>
        <p>
          Vous pouvez demander la suppression de votre compte et des données
          associées par e-mail, même si vous avez désinstallé l’application ou
          ne pouvez plus vous connecter.
        </p>
      </header>

      <div className="information-sections">
        <section id="demande">
          <p className="information-number">01</p>
          <div>
            <h2>Envoyer votre demande</h2>
            <p>
              <a href={deletionEmail}>Ouvrir un e-mail de demande de suppression</a>
            </p>
            <p>
              Vous pouvez également écrire directement à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, avec
              l’objet « Suppression de mon compte Débusk ». Indiquez l’adresse
              e-mail utilisée pour votre compte. Aucun mot de passe n’est
              nécessaire : ne nous l’envoyez pas.
            </p>
            <p>
              Envoyez si possible la demande depuis l’adresse liée au compte.
              Si vous n’y avez plus accès, signalez-le dans votre message :
              nous vous indiquerons comment vérifier que le compte vous
              appartient avant de le supprimer.
            </p>
            <p>
              Le lien ouvre votre logiciel de messagerie ; la demande n’est
              transmise que lorsque vous envoyez l’e-mail. Nous vous répondons
              pour confirmer sa prise en charge et vous informer de la
              suppression ou d’une vérification nécessaire.
            </p>
          </div>
        </section>

        <section id="donnees">
          <p className="information-number">02</p>
          <div>
            <h2>Les données concernées</h2>
            <p>
              La suppression porte sur votre compte et les données qui lui
              sont associées dans Débusk : profil et pseudonyme, favoris,
              lieux enregistrés, historique de trajets synchronisé,
              contributions et progression liées au compte, ainsi que les
              préférences et jetons de notification enregistrés pour ce compte.
              Elle est définitive : ces données ne sont plus récupérables dans
              l’application.
            </p>
            <p>
              Si vous souhaitez aussi supprimer des messages envoyés au
              support ou une demande d’information sur le lancement,
              précisez-le dans le même e-mail. Ces échanges sont traités
              séparément du compte de l’application.
            </p>
            <p>
              Si vous avez utilisé le formulaire de contact, un compteur
              technique de protection contre les envois abusifs peut subsister
              après la suppression du compte. Il contient un identifiant
              technique, des dates d’envoi et un nombre de messages, pas leur
              contenu. Un nettoyage horaire supprime les entrées dont le
              dernier envoi remonte à plus de 24 heures.
            </p>
            <p>
              L’historique technique utilisé pour améliorer les horaires est
              enregistré sans identifiant de compte, d’appareil ou de session,
              ni coordonnées GPS brutes. Il ne peut pas être retrouvé à partir
              de votre compte et suit son cycle de conservation de 25 mois,
              indépendamment de la suppression du compte.
            </p>
            <p>
              Une demande par e-mail ne peut pas effacer à distance les
              préférences ou autres données restées uniquement sur votre
              appareil. Vous pouvez les supprimer dans les réglages de
              l’application ou en effaçant ses données sur votre appareil.
            </p>
          </div>
        </section>

        <section id="dans-application">
          <p className="information-number">03</p>
          <div>
            <h2>Depuis l’application</h2>
            <p>
              Si vous avez toujours accès à votre compte, ouvrez Profil,
              puis Zone de danger et Supprimer mon compte. Suivez les étapes
              de confirmation affichées. Le parcours par e-mail reste
              disponible si vous ne pouvez pas terminer cette opération.
            </p>
            <p>
              Pour en savoir plus sur les données utilisées par Débusk,
              consultez notre{" "}
              <Link href="/informations#confidentialite">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </section>
      </div>

      <footer className="information-footer">
        <span>Débusk</span>
        <div>
          <Link href="/informations">Confidentialité et informations</Link>
          <Link href="/">Retour au site</Link>
        </div>
      </footer>
    </main>
  );
}
