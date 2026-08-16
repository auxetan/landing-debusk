import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "../GuidePage";
import { createPageMetadata } from "../seo";

const path = "/lignes-bus-aix-en-provence";

export const metadata: Metadata = createPageMetadata({
  title: "Lignes de bus à Aix-en-Provence : réseau et scolaires",
  description:
    "Retrouvez les lignes de bus disponibles dans Débusk à Aix-en-Provence : Aixpress, lignes urbaines, mini, scolaires et liaisons métropolitaines.",
  path,
});

const regularLines = [
  ["A", "P+R Krypton ↔ Saint-Mitre"],
  ["3", "Val Saint-André ↔ Grande Bastide"],
  ["4", "Val Saint-André ↔ Pôle d’Activités"],
  ["5", "P+R Brunet ↔ Monclar"],
  ["6", "Parking 3 Bons Dieux ↔ Europe–Cézanne"],
  ["7", "P+R Brunet ↔ Hôpital de Provence"],
  ["8", "Margueride ↔ Val de l’Arc"],
  ["9", "Magnan ↔ Grande Bastide–CIAM"],
  ["10", "Pont de l’Arc–Mairie ↔ Pont des Corneilles"],
  ["11", "Village Soleil ↔ Luynes Mail"],
  ["12", "Couteron Église ↔ Gare routière Mouret"],
  ["13", "Puyricard Centre ↔ Palette–Le Tholonet"],
  ["14", "Brossolette ↔ Centre commercial Les Milles"],
  ["15", "Europôle Arbois–Duranne ↔ Gare routière"],
  ["16", "Montaiguet ↔ Rotonde Narvik"],
  ["17", "P+R Plan d’Aillane ↔ Corsy"],
  ["18", "Duranne École ↔ Gare routière"],
  ["21", "Saint-Marc-Jaumegarde ↔ Bellegarde"],
  ["22", "Célony École ↔ Rotonde Bonaparte"],
  ["23", "Bellegarde ↔ Parc Rigaud"],
  ["24", "Gare routière Belges ↔ Grand Saint-Jean"],
  ["25", "Venelles ↔ Gare routière Belges"],
  ["26", "Éguilles ↔ Gare routière Mouret"],
] as const;

const miniLines = [
  ["M1", "Cité du Livre ↔ La Torse–Val Saint-André"],
  ["M2", "Cité universitaire ↔ Rotonde–Hôpital Tamaris"],
  ["M3", "Chevalière–Beauvallon ↔ Piscine Yves Blanc"],
] as const;

export default function BusLinesPage() {
  return (
    <GuidePage
      path={path}
      eyebrow="Lignes bus Aix-en-Provence"
      title="Les lignes de bus disponibles dans Débusk"
      intro="Le réseau urbain, les dessertes scolaires et plusieurs liaisons métropolitaines réunis dans une même application."
    >
      <section>
        <h2>Les lignes urbaines d’Aix-en-Provence</h2>
        <p>
          Cette liste reflète les données de réseau intégrées à Débusk et
          vérifiées le 16 août 2026. Un changement de rentrée peut modifier un
          terminus, un parcours ou un horaire : ouvrez la ligne dans
          l’application pour consulter les informations à jour.
        </p>
        <div className="line-directory">
          {regularLines.map(([number, route]) => (
            <div className="line-directory-item" key={number}>
              <strong>{number}</strong>
              <span>{route}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Lignes mini du centre et des quartiers proches</h2>
        <div className="line-directory line-directory-small">
          {miniLines.map(([number, route]) => (
            <div className="line-directory-item" key={number}>
              <strong>{number}</strong>
              <span>{route}</span>
            </div>
          ))}
        </div>
      </section>

      <aside className="guide-callout guide-callout-signal">
        <p className="guide-callout-label">Rentrée scolaire</p>
        <h2>Débusk intègre aussi les dessertes spéciales scolaires.</h2>
        <p>
          Les familles peuvent rechercher les services des secteurs Les
          Granettes, Puyricard–Couteron, Les Milles, La Duranne, Venelles,
          Luynes et Le Tholonet, notamment les séries 8301, 8303, 8305, 8377,
          8379, 8404 et 8405.
        </p>
        <Link href="/guide-rentree-bus-aix-en-provence">
          Préparer la rentrée en bus <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <section>
        <h2>Liaisons métropolitaines utiles</h2>
        <p>
          Les données disponibles couvrent les lignes L49, L50 et L51 entre
          Aix et Marseille. La route A2 vers la gare TGV et l’aéroport figure
          dans le catalogue, mais le flux vérifié le 16 août 2026 ne contient
          aucune course A2 exploitable : ses horaires ne sont donc pas encore
          consultables de façon fiable dans Débusk.
        </p>
        <p>
          La tarification et le périmètre d’un abonnement peuvent différer du
          réseau urbain. Vérifiez toujours le titre nécessaire auprès de La
          Métropole Mobilité et consultez notre{" "}
          <Link href="/bus-aix-aeroport-marseille-provence">guide A2</Link>{" "}
          pour préparer ce trajet sans confondre service officiel et couverture
          de l’app.
        </p>
      </section>

      <section>
        <h2>Retrouver le bon sens de circulation</h2>
        <p>
          Le numéro de ligne ne suffit pas : contrôlez le terminus affiché. Par
          exemple, la ligne 25 peut être prise vers Venelles ou vers la gare
          routière Belges. Dans Débusk, le tracé et les arrêts permettent de
          confirmer le sens avant de monter.
        </p>
        <p>
          Une fois la ligne identifiée, consultez ses{" "}
          <Link href="/horaires-bus-aix-en-provence">prochains horaires</Link>{" "}
          ou lancez un{" "}
          <Link href="/itineraire-bus-aix-en-provence">
            calcul d’itinéraire
          </Link>{" "}
          complet.
        </p>
      </section>

      <section className="guide-source-box">
        <h2>Plans et fiches de lignes officiels</h2>
        <p>
          Pour télécharger une fiche PDF, confirmer une modification ou
          consulter une information contractuelle, utilisez le portail du
          réseau.
        </p>
        <a
          href="https://www.lametropolemobilite.fr/plans-et-horaires/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulter les plans et horaires officiels
        </a>
      </section>
    </GuidePage>
  );
}
