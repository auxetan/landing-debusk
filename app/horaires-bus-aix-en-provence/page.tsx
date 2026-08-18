import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";

const path = "/horaires-bus-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Horaires de bus à Aix-en-Provence | App Débusk",
  description:
    "Consultez les horaires de bus à Aix-en-Provence, les prochains départs, vos arrêts favoris et les perturbations du réseau avec Débusk.",
  path,
});

export default function BusSchedulesPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Horaires bus Aix-en-Provence"
      title="Trouver le prochain bus à Aix-en-Provence"
      intro="Débusk rassemble les prochains départs, les horaires du réseau et les perturbations pour vérifier rapidement quand partir."
    >
      <section>
        <h2>Consulter un horaire en trois gestes</h2>
        <ol className="guide-steps guide-steps-compact">
          <li>
            <span>01</span>
            <div>
              <h3>Choisissez un arrêt</h3>
              <p>
                Recherchez son nom ou utilisez la carte pour repérer les arrêts
                autour de votre position.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Vérifiez le sens de la ligne</h3>
              <p>
                Un même arrêt peut desservir plusieurs directions. Contrôlez le
                terminus avant de choisir le départ.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Ajoutez-le aux favoris</h3>
              <p>
                Votre arrêt, votre ligne et les prochains passages deviennent
                accessibles dès l’ouverture de l’application.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <aside className="guide-callout">
        <h2>Horaire théorique et bus partagé en direct.</h2>
        <p>
          L’horaire vient des données du réseau. La position sur la carte
          devient communautaire lorsqu’un passager à bord active volontairement
          le suivi. Sans contribution, l’horaire reste disponible mais la
          position réelle du véhicule peut manquer.
        </p>
      </aside>

      <section>
        <h2>Pourquoi l’heure peut-elle changer ?</h2>
        <p>
          Circulation, travaux, déviation ou incident peuvent décaler le passage
          d’un bus. Les horaires théoriques donnent le service prévu ; les
          perturbations officielles signalent une modification connue ; le
          suivi communautaire peut compléter ces informations lorsqu’un
          voyageur participe depuis le bus.
        </p>
        <p>
          Pour un trajet important — rentrée, examen, rendez-vous — prévoyez une
          marge et contrôlez aussi l’information officielle du réseau.
        </p>
      </section>

      <section>
        <h2>Horaires scolaires et horaires de vacances</h2>
        <p>
          Une ligne peut suivre des horaires différents selon le jour, la
          période scolaire et les vacances. Les services spéciaux scolaires ne
          circulent pas toujours comme les lignes régulières. Lancez votre
          recherche pour la date et l’heure exactes du déplacement.
        </p>
        <p>
          Pour préparer septembre, consultez aussi notre{" "}
          <Link href="/guide-rentree-bus-aix-en-provence">
            checklist de rentrée
          </Link>{" "}
          et la page des{" "}
          <Link href="/lignes-bus-aix-en-provence">
            lignes suivies à Aix
          </Link>
          .
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Vérifier la source officielle</h2>
        <p>
          Les horaires présentés dans Débusk proviennent des données de
          transport publiées pour le réseau d’Aix. En cas de doute ou de
          changement exceptionnel, consultez les fiches officielles.
        </p>
        <a
          href="https://www.lametropolemobilite.fr/plans-et-horaires/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouvrir les plans et horaires de La Métropole Mobilité
        </a>
      </section>
    </GuidePage>
  );
}
