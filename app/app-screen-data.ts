import { absoluteUrl } from "./seo";

export type AppScreen = Readonly<{
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
}>;

export const appScreens = [
  {
    src: "/app-screens/main-screen.png",
    width: 778,
    height: 1672,
    title: "Les bus autour de vous",
    caption:
      "Repérez les lignes sur la carte d’Aix-en-Provence et accédez aux prochains départs.",
    alt: "Carte Débusk affichant les lignes de bus autour du centre d’Aix-en-Provence",
  },
  {
    src: "/app-screens/favoris-choix-bus.png",
    width: 772,
    height: 1676,
    title: "Vos départs en un coup d’œil",
    caption:
      "Retrouvez vos arrêts favoris, vos lignes et les prochains bus à proximité.",
    alt: "Écran Débusk des prochains départs, des arrêts favoris et des lignes enregistrées",
  },
  {
    src: "/app-screens/perturbations-officielles.png",
    width: 768,
    height: 1676,
    title: "Les infos officielles",
    caption:
      "Consultez les perturbations publiées par Aix en Bus, ligne par ligne.",
    alt: "Liste Débusk des perturbations officielles Aix en Bus avec les lignes et arrêts concernés",
  },
  {
    src: "/app-screens/mode-itineraire.png",
    width: 774,
    height: 1666,
    title: "Votre trajet, étape par étape",
    caption:
      "Visualisez le tracé, la durée et chaque étape avant de démarrer.",
    alt: "Itinéraire Débusk du Stade Carcassonne à la Rotonde avec durée et étapes",
  },
  {
    src: "/app-screens/mode-conduite.png",
    width: 770,
    height: 1674,
    title: "À bord, suivez le trajet",
    caption:
      "Le mode conduite affiche la ligne, le parcours et le prochain arrêt. Le suivi volontaire permet aussi aux autres voyageurs de voir le bus progresser.",
    alt: "Mode conduite Débusk suivant la ligne 25 vers Aix-en-Provence sur la carte",
  },
  {
    src: "/app-screens/contribution-communautaire.png",
    width: 776,
    height: 1666,
    title: "Prévenez la communauté",
    caption:
      "Signalez rapidement un retard, un bus complet ou un incident sur le réseau.",
    alt: "Menu Débusk de signalement d’un retard, d’un bus complet ou d’un incident",
  },
  {
    src: "/app-screens/progression-communautaire.png",
    width: 772,
    height: 1674,
    title: "Vos contributions comptent",
    caption:
      "Suivez vos points, vos validations et votre progression dans la communauté.",
    alt: "Écran Mes prouesses de Débusk avec niveau, points et contributions communautaires",
  },
] as const satisfies readonly AppScreen[];

export const appScreenImageUrls = appScreens.map((screen) =>
  absoluteUrl(screen.src),
);

export const appScreenImageObjects: Array<Record<string, unknown>> =
  appScreens.map((screen) => {
    const contentUrl = absoluteUrl(screen.src);

    return {
      "@type": "ImageObject",
      "@id": contentUrl + "#image",
      name: screen.title,
      caption: screen.caption,
      description: screen.alt,
      contentUrl,
      url: contentUrl,
      encodingFormat: "image/png",
      width: screen.width,
      height: screen.height,
      inLanguage: "fr-FR",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: {
        "@type": "MobileApplication",
        name: "Débusk",
        url: absoluteUrl("/"),
      },
    };
  });

export const appScreenStructuredData = {
  "@context": "https://schema.org",
  "@graph": appScreenImageObjects,
};
