import { topicGuides } from "./topic-guide-data";

export const featuredGuideLinks = [
  {
    href: "/guide-rentree-bus-aix-en-provence",
    label: "Rentrée 2026–2027",
    title: "Préparer les trajets de rentrée de votre enfant",
    description:
      "La checklist familiale : abonnement, ligne, arrêt, horaires et premier trajet.",
  },
  {
    href: "/horaires-bus-aix-en-provence",
    label: "Horaires",
    title: "Consulter les horaires de bus à Aix",
    description:
      "Départs, favoris, perturbations et différence entre horaire théorique et suivi partagé.",
  },
  {
    href: "/itineraire-bus-aix-en-provence",
    label: "Itinéraires",
    title: "Trouver un itinéraire de bus",
    description:
      "Comparez les trajets et visualisez chaque étape avant de partir.",
  },
  {
    href: "/lignes-bus-aix-en-provence",
    label: "Lignes",
    title: "Les lignes de bus suivies par Débusk",
    description:
      "Réseau urbain, lignes scolaires et liaisons utiles autour d’Aix-en-Provence.",
  },
  {
    href: "/abonnement-bus-scolaire-aix-en-provence",
    label: "Abonnement scolaire",
    title: "S’inscrire pour la rentrée 2026–2027",
    description:
      "Conditions, justificatifs, démarches officielles et vérifications avant septembre.",
  },
] as const;

export const topicGuideLinks = topicGuides.map((guide) => ({
  href: `/${guide.slug}`,
  label: guide.label,
  title: guide.title,
  description: guide.description,
  category: guide.category,
}));

export const applicationGuideLink = {
  href: "/application-bus-aix-en-provence",
  label: "L’application",
  title: "Découvrir Débusk en images",
  description:
    "Sept écrans réels pour comprendre les horaires, itinéraires, favoris et contributions.",
} as const;

export const guideLinks = [
  ...featuredGuideLinks,
  applicationGuideLink,
  ...topicGuideLinks,
];

export const guideGroups = [
  {
    title: "Les essentiels",
    description: "Horaires, itinéraires, lignes, abonnement et préparation de la rentrée.",
    links: [...featuredGuideLinks, applicationGuideLink],
  },
  ...([
    "Rentrée et famille",
    "Grands trajets",
    "Services du réseau",
    "Quartiers et communes",
  ] as const).map((category) => ({
    title: category,
    description:
      category === "Rentrée et famille"
        ? "Des informations concrètes pour les parents et les élèves."
        : category === "Grands trajets"
          ? "Aix–Marseille, gare TGV et aéroport, avec le périmètre réel de l’app."
          : category === "Services du réseau"
            ? "Perturbations, transport à la demande, boutique et acteurs officiels."
            : "Les lignes réellement utiles selon votre point de départ autour d’Aix.",
    links: topicGuideLinks.filter((guide) => guide.category === category),
  })),
];
