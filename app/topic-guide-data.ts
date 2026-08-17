export type TopicSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type TopicGuide = {
  slug: string;
  category: "Rentrée et famille" | "Grands trajets" | "Services du réseau" | "Quartiers et communes";
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageCaption: string;
  facts: readonly { label: string; value: string }[];
  sections: readonly TopicSection[];
  callout?: {
    label: string;
    title: string;
    text: string;
    tone?: "signal" | "green";
  };
  sources: readonly { label: string; href: string }[];
  related: readonly { href: string; label: string }[];
};

const officialSchedules = "https://www.lametropolemobilite.fr/plans-et-horaires/";
const officialSchool =
  "https://www.lametropolemobilite.fr/inscription-transports-scolaires/";

export const topicGuides: readonly TopicGuide[] = [
  {
    slug: "transport-scolaire-aix-en-provence",
    category: "Rentrée et famille",
    label: "Transport scolaire",
    title: "Transport scolaire à Aix-en-Provence : lignes et trajet de rentrée",
    description:
      "Lignes scolaires à Aix-en-Provence, secteurs desservis, abonnement et préparation du trajet pour la rentrée 2026-2027 avec Débusk.",
    eyebrow: "Transport scolaire · Aix-en-Provence",
    intro:
      "Un point de départ pour les familles : repérer la desserte de son secteur, distinguer ligne régulière et service scolaire, puis vérifier le trajet avant septembre.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt:
      "Écran Débusk permettant de choisir un bus favori pour un trajet scolaire à Aix-en-Provence",
    imageCaption:
      "Dans Débusk, un élève peut garder sa ligne et son arrêt habituels à portée de main.",
    facts: [
      { label: "Rentrée couverte", value: "2026–2027" },
      { label: "Séries scolaires intégrées", value: "8301, 8303, 8305, 8377, 8379, 8404, 8405" },
      { label: "Démarche d’abonnement", value: "Portail officiel de La Métropole Mobilité" },
    ],
    sections: [
      {
        title: "Quelles lignes scolaires sont présentes dans Débusk ?",
        paragraphs: [
          "Les données 2026–2027 intégrées à Débusk comprennent des dessertes spéciales pour Les Granettes, Puyricard–Couteron, Les Milles, La Duranne, Venelles, Luynes et Le Tholonet. Elles apparaissent sous des numéros des séries 8301, 8303, 8305, 8377, 8379, 8404 et 8405.",
          "Selon le domicile et l’établissement, le trajet peut aussi utiliser une ligne urbaine classique. La bonne méthode consiste donc à rechercher l’arrêt de départ et l’établissement, puis à contrôler le terminus et les jours de circulation.",
        ],
      },
      {
        title: "Les établissements et secteurs à rechercher",
        paragraphs: [
          "Les libellés du réseau font notamment apparaître les collèges Sophie Germain, Nina Simone et Rocher du Dragon, le lycée Georges Duby, ainsi que des dessertes vers Aix centre. Un même établissement peut avoir plusieurs services selon le quartier d’origine.",
        ],
        bullets: [
          "La Duranne et Les Milles : famille de lignes 8305.",
          "Puyricard et Couteron : familles 8301 et 8303.",
          "Venelles : familles 8377 et 8379.",
          "Luynes : famille 8404 ; Le Tholonet : famille 8405.",
        ],
      },
      {
        title: "Préparer le premier trajet sans stress",
        paragraphs: [
          "Faites un essai quelques jours avant la rentrée : rejoignez l’arrêt à pied, repérez le côté de la chaussée, notez le nom exact du terminus et prévoyez une solution si le bus est manqué. Ajoutez ensuite l’arrêt et la ligne aux favoris dans Débusk.",
          "Les horaires de rentrée peuvent évoluer. Débusk facilite la consultation, mais l’inscription et les règles d’accès relèvent de La Métropole Mobilité. Gardez la page officielle comme référence contractuelle.",
        ],
      },
    ],
    callout: {
      label: "À ne pas confondre",
      title: "Débusk ne vend pas l’abonnement scolaire.",
      text: "L’app sert à préparer et suivre le trajet. La création de la carte, le paiement et l’éligibilité sont gérés par le réseau officiel.",
      tone: "signal",
    },
    sources: [
      { label: "Inscription officielle aux transports scolaires", href: officialSchool },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/guide-rentree-bus-aix-en-provence", label: "Checklist de rentrée" },
      { href: "/abonnement-bus-scolaire-aix-en-provence", label: "Abonnement scolaire" },
      { href: "/lignes-bus-aix-en-provence", label: "Toutes les lignes" },
    ],
  },
  {
    slug: "bus-aix-marseille",
    category: "Grands trajets",
    label: "Aix ↔ Marseille",
    title: "Bus Aix–Marseille : comparer les lignes L49, L50 et L51",
    description:
      "Préparez un trajet en bus entre Aix-en-Provence et Marseille avec les lignes L49, L50 et L51 disponibles dans Débusk.",
    eyebrow: "Bus Aix–Marseille",
    intro:
      "Trois liaisons métropolitaines apparaissent dans Débusk. Voici comment choisir la bonne ligne, le bon sens et la correspondance adaptée à votre destination marseillaise.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt:
      "Écran de calcul d’itinéraire Débusk utilisé pour préparer un trajet en bus entre Aix et Marseille",
    imageCaption:
      "Le mode itinéraire détaille le départ, la ligne, les correspondances et l’arrivée.",
    facts: [
      { label: "Lignes intégrées", value: "L49, L50 et L51" },
      { label: "Réseau", value: "lecar · La Métropole Mobilité" },
      { label: "À vérifier", value: "Terminaux, jours et perturbations" },
    ],
    sections: [
      {
        title: "Quelle ligne choisir entre Aix et Marseille ?",
        paragraphs: [
          "La L50 est identifiée comme la liaison Aix–Marseille. La L51 relie également les deux villes par la route nationale, avec des arrêts intermédiaires différents. La L49 dessert Marseille Arenc et peut être pertinente si votre destination se situe au nord du centre marseillais.",
          "Le numéro seul ne suffit pas. Comparez l’arrêt de départ à Aix, le terminus affiché et le point d’arrivée à Marseille avant de valider votre trajet.",
        ],
      },
      {
        title: "Prévoir la suite du trajet à Marseille",
        paragraphs: [
          "Débusk couvre ces liaisons interurbaines, mais ne remplace pas l’ensemble du réseau RTM. Si votre destination exige métro, tramway ou bus marseillais, vérifiez la correspondance et le titre de transport nécessaire sur les services officiels.",
          "Aux heures chargées, gardez une marge pour la circulation routière. Consultez les perturbations avant le départ et vérifiez le retour, surtout en soirée ou le week-end.",
        ],
      },
      {
        title: "Utiliser Débusk pour ce trajet",
        paragraphs: [
          "Recherchez votre point de départ et votre destination, puis ouvrez la proposition qui utilise L49, L50 ou L51. Contrôlez le sens « Marseille » à l’aller et « Aix-en-Provence » au retour. Enregistrez ensuite la ligne ou l’arrêt le plus utilisé.",
          "Les données intégrées le 16 août 2026 comportent des courses actives sur les trois lignes. Une fiche officielle peut néanmoins être modifiée : le portail métropolitain reste la source de référence pour la tarification et les changements de service.",
        ],
      },
    ],
    callout: {
      label: "Correspondance",
      title: "Débusk ne couvre pas encore tout le réseau RTM.",
      text: "L’app aide pour L49, L50 et L51. Pour une correspondance marseillaise, complétez la vérification auprès de la RTM ou du calculateur métropolitain.",
      tone: "green",
    },
    sources: [
      {
        label: "Secteur lecar Métropole Aix–Marseille-Provence",
        href: "https://www.lametropolemobilite.fr/lecar-metropole/",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/itineraire-bus-aix-en-provence", label: "Calculer un itinéraire" },
      { href: "/horaires-bus-aix-en-provence", label: "Vérifier les départs" },
      { href: "/perturbations-bus-aix-en-provence", label: "Voir les perturbations" },
    ],
  },
  {
    slug: "ligne-49-aix-marseille-arenc",
    category: "Grands trajets",
    label: "Ligne L49",
    title: "Ligne L49 Aix–Marseille Arenc : parcours et jours de circulation",
    description:
      "Préparez la ligne L49 entre Aix-en-Provence, Bouffan et Marseille Arenc : parcours, jours de circulation, terminus et horaires dans Débusk.",
    eyebrow: "L49 · Aix–Marseille Arenc",
    intro:
      "La L49 dessert le corridor Aix–Marseille Arenc en semaine dans le calendrier actuellement intégré. Elle ne suit pas le même parcours ni les mêmes jours que L50 et L51.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt:
      "Écran de favoris Débusk pour enregistrer la ligne L49 entre Aix et Marseille Arenc",
    imageCaption:
      "Enregistrez la L49 et son sens pour retrouver les prochains départs vers Arenc ou Aix.",
    facts: [
      { label: "Ligne", value: "L49" },
      { label: "Corridor", value: "Aix / Bouffan ↔ Bougainville / Arenc Le Silo" },
      { label: "Calendrier intégré", value: "65 courses le mardi 1er septembre 2026 ; aucune le week-end" },
    ],
    sections: [
      {
        title: "À qui la ligne L49 peut-elle être utile ?",
        paragraphs: [
          "La L49 relie le secteur aixois à Marseille Arenc. Les séquences de données comprennent Bouffan, le centre ou la gare routière d’Aix et, selon la course, Plan d’Aillane ou le Pôle d’Activités, puis Bougainville et Arenc Le Silo.",
          "Elle peut être plus pertinente que Saint-Charles si votre destination se situe autour d’Arenc, du Silo ou de Bougainville. Comparez ensuite la marche ou la correspondance marseillaise nécessaire.",
        ],
      },
      {
        title: "Une ligne de semaine dans le calendrier actuel",
        paragraphs: [
          "Le jeu de données Débusk valable pour la rentrée comporte 65 courses L49 le mardi 1er septembre 2026 et aucune course le samedi ou le dimanche. Ce constat décrit la version intégrée, pas une garantie permanente de service.",
          "Si vous préparez un trajet de week-end, comparez L50 et L51. Pour un jour férié ou une période spéciale, consultez toujours la fiche officielle.",
        ],
      },
      {
        title: "Vérifier le bon sens dans Débusk",
        paragraphs: [
          "Choisissez « Marseille » ou Arenc à l’aller et « Aix-en-Provence » au retour. Contrôlez l’arrêt de montée, car toutes les variantes ne desservent pas nécessairement les mêmes points intermédiaires.",
          "Ajoutez le départ habituel aux favoris, puis ouvrez l’info trafic avant de partir. Débusk ne couvre pas l’intégralité des correspondances RTM après l’arrivée à Marseille.",
        ],
      },
    ],
    callout: {
      label: "Calendrier",
      title: "La L49 n’est pas une solution de week-end dans le flux actuel.",
      text: "Pour le samedi ou le dimanche, recherchez plutôt L50 ou L51 et confirmez la date sur la source officielle.",
      tone: "signal",
    },
    sources: [
      {
        label: "Annuaire officiel Métropole lecar",
        href: "https://www.plan.lametropolemobilite.fr/fr/plan-du-site/reseau/Metropole-lecar/C13",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/bus-aix-marseille", label: "Comparer les trois lignes" },
      { href: "/ligne-50-aix-marseille-saint-charles", label: "Voir la L50" },
      { href: "/ligne-51-aix-marseille-par-rn", label: "Voir la L51" },
    ],
  },
  {
    slug: "ligne-50-aix-marseille-saint-charles",
    category: "Grands trajets",
    label: "Ligne L50",
    title: "Ligne L50 Aix–Marseille Saint-Charles : trajet et horaires",
    description:
      "Préparez la ligne L50 entre la gare routière d’Aix et Marseille Saint-Charles : variantes, jours de circulation et prochains départs dans Débusk.",
    eyebrow: "L50 · Aix–Marseille Saint-Charles",
    intro:
      "La L50 relie directement les deux gares routières et circule en semaine comme le week-end dans le calendrier intégré à Débusk.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt:
      "Calcul d’itinéraire Débusk utilisant la ligne L50 entre Aix et Marseille Saint-Charles",
    imageCaption:
      "Vérifiez le départ gare routière d’Aix, le sens Marseille et l’éventuelle variante de parcours.",
    facts: [
      { label: "Ligne", value: "L50" },
      { label: "Terminus", value: "Gare routière d’Aix ↔ Marseille Saint-Charles" },
      { label: "Courses intégrées", value: "302 mardi · 189 samedi · 108 dimanche au début septembre 2026" },
    ],
    sections: [
      {
        title: "La liaison entre les deux centres",
        paragraphs: [
          "La L50 relie la gare routière d’Aix-en-Provence à la gare Saint-Charles de Marseille. Les données comprennent des variantes par Sous-Préfecture ou Beauvalle et, sur certaines courses, par Plan de Campagne.",
          "Consultez les arrêts de la course choisie plutôt que de supposer que chaque départ est strictement identique. Pour un train, ajoutez le temps de marche jusqu’au quai et une marge liée à la circulation.",
        ],
      },
      {
        title: "Une offre présente tous les jours",
        paragraphs: [
          "Dans le flux de rentrée vérifié, la L50 comporte 302 courses le mardi 1er septembre, 189 le samedi et 108 le dimanche. Ces nombres comptent les deux sens et décrivent le jeu de données, pas une fréquence garantie à toute heure.",
          "Recherchez une date et une heure précises dans Débusk. Les premiers et derniers départs, ainsi que les jours fériés, doivent aussi être confirmés sur la fiche officielle.",
        ],
      },
      {
        title: "Arriver à Saint-Charles, puis continuer",
        paragraphs: [
          "Saint-Charles permet de rejoindre les trains et le réseau urbain marseillais. Débusk couvre la L50, mais pas encore tout le métro, le tramway ou les bus RTM : préparez cette seconde partie avec le service officiel adapté.",
          "Pour le retour, vérifiez le sens Aix-en-Provence et le point de départ exact à la gare routière de Marseille.",
        ],
      },
    ],
    callout: {
      label: "Correspondance train",
      title: "Gardez une marge avant le départ ferroviaire.",
      text: "Une heure de passage théorique du car ne garantit pas la correspondance en cas d’aléa routier.",
      tone: "green",
    },
    sources: [
      {
        label: "Annuaire officiel Métropole lecar",
        href: "https://www.plan.lametropolemobilite.fr/fr/plan-du-site/reseau/Metropole-lecar/C13",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/bus-aix-marseille", label: "Comparer L49, L50 et L51" },
      { href: "/ligne-49-aix-marseille-arenc", label: "Voir la L49 vers Arenc" },
      { href: "/ligne-51-aix-marseille-par-rn", label: "Voir la L51 par RN" },
    ],
  },
  {
    slug: "ligne-51-aix-marseille-par-rn",
    category: "Grands trajets",
    label: "Ligne L51",
    title: "Ligne L51 Aix–Marseille par RN : arrêts et horaires",
    description:
      "Préparez la ligne L51 entre Aix et Marseille par la route nationale : Luynes, Bouc-Bel-Air, Plan de Campagne, Septèmes et Saint-Charles.",
    eyebrow: "L51 · Aix–Marseille par RN",
    intro:
      "La L51 relie Aix à Marseille Saint-Charles en desservant plusieurs communes et pôles intermédiaires le long de la route nationale.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt:
      "Carte Débusk permettant de consulter la ligne L51 entre Aix et Marseille par la route nationale",
    imageCaption:
      "Le tracé de la L51 aide à confirmer les arrêts intermédiaires avant de choisir cette liaison.",
    facts: [
      { label: "Ligne", value: "L51" },
      { label: "Corridor", value: "Aix · Luynes · Bouc-Bel-Air · Plan de Campagne · Septèmes · Marseille" },
      { label: "Courses intégrées", value: "96 mardi · 61 samedi · 40 dimanche au début septembre 2026" },
    ],
    sections: [
      {
        title: "Les principaux secteurs desservis",
        paragraphs: [
          "Le parcours intégré dessert Aix, Pont-de-l’Arc ou Luynes, Bouc-Bel-Air, Plan de Campagne, Les Pennes-Mirabeau, Septèmes-les-Vallons et Marseille Saint-Charles selon les arrêts de la course.",
          "Cette desserte intermédiaire distingue la L51 de la L50. Elle peut éviter une correspondance si votre destination se trouve le long de la RN, mais elle n’est pas nécessairement le trajet le plus rapide entre les deux centres.",
        ],
      },
      {
        title: "Des courses en semaine et le week-end",
        paragraphs: [
          "Le jeu de données de rentrée contient 96 courses L51 le mardi 1er septembre, 61 le samedi et 40 le dimanche. Ces volumes couvrent les deux directions et peuvent être répartis de façon inégale dans la journée.",
          "Sélectionnez votre date réelle dans Débusk, puis vérifiez le premier ou dernier départ sur la fiche officielle si le trajet est critique.",
        ],
      },
      {
        title: "Choisir l’arrêt plutôt que le seul numéro",
        paragraphs: [
          "Ouvrez le détail de la course pour confirmer que l’arrêt intermédiaire voulu est bien desservi. À Plan de Campagne ou dans les communes traversées, le point de montée peut différer selon le sens.",
          "Consultez aussi les perturbations : des travaux routiers peuvent déplacer un arrêt ou modifier temporairement les horaires de la L51.",
        ],
      },
    ],
    callout: {
      label: "Trajet intermédiaire",
      title: "La L51 ne se résume pas à Aix–Saint-Charles.",
      text: "Son intérêt principal peut être Luynes, Bouc-Bel-Air, Plan de Campagne, Les Pennes-Mirabeau ou Septèmes.",
      tone: "green",
    },
    sources: [
      {
        label: "Annuaire officiel Métropole lecar",
        href: "https://www.plan.lametropolemobilite.fr/fr/plan-du-site/reseau/Metropole-lecar/C13",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/bus-aix-marseille", label: "Comparer les trois lignes" },
      { href: "/ligne-50-aix-marseille-saint-charles", label: "Voir la L50 directe" },
      { href: "/perturbations-bus-aix-en-provence", label: "Vérifier les travaux" },
    ],
  },
  {
    slug: "bus-aix-aeroport-marseille-provence",
    category: "Grands trajets",
    label: "Aix ↔ Aéroport",
    title: "Bus Aix–Aéroport Marseille Provence : préparer la ligne A2",
    description:
      "Guide de la ligne A2 entre Aix, la gare TGV et l’aéroport Marseille Provence, avec l’état actuel de sa disponibilité dans Débusk.",
    eyebrow: "Aix · Gare TGV · Aéroport",
    intro:
      "La navette officielle A2 relie Aix-en-Provence à l’aéroport via la gare TGV. Cette page explique le parcours et signale précisément ce que Débusk permet — ou non — aujourd’hui.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt:
      "Écran itinéraire de Débusk, à compléter avec la source officielle pour la navette A2 vers l’aéroport",
    imageCaption:
      "Le calculateur Débusk peut préparer les correspondances locales, mais les départs A2 ne sont pas encore disponibles dans l’app.",
    facts: [
      { label: "Ligne officielle", value: "A2" },
      { label: "Parcours", value: "Aix centre · Aix TGV · Aéroport" },
      { label: "État dans Débusk", value: "Route visible, aucun horaire A2 exploitable au 16 août 2026" },
    ],
    sections: [
      {
        title: "Le parcours officiel de la navette A2",
        paragraphs: [
          "La Métropole Mobilité présente la ligne A2 comme une liaison quotidienne entre la gare routière d’Aix-en-Provence, la gare d’Aix-en-Provence TGV et l’aéroport Marseille Provence. Le parcours peut également desservir Plan d’Aillane selon le sens et le service.",
          "Pour un vol ou un train, anticipez les aléas de circulation et vérifiez l’arrêt exact à la gare routière comme à l’aéroport. La gare routière de l’aéroport se trouve entre les terminaux T1 et T2 selon la page officielle.",
        ],
      },
      {
        title: "Ce qui est disponible dans Débusk aujourd’hui",
        paragraphs: [
          "La route A2 et les arrêts Gare Aix TGV et Aéroport Marseille Provence figurent dans le catalogue de données de l’app. Toutefois, le jeu de données embarqué vérifié le 16 août 2026 ne contient aucune course A2 : Débusk ne peut donc pas encore fournir un horaire ou un itinéraire A2 fiable.",
          "Nous publions cette limite pour éviter qu’un voyageur manque un départ. Pour planifier le tronçon Aix–TGV–aéroport, utilisez actuellement la fiche officielle. Débusk reste utile pour préparer l’accès en bus urbain jusqu’à la gare routière d’Aix.",
        ],
      },
      {
        title: "La checklist avant un départ vers Marignane",
        paragraphs: [
          "Contrôlez la date et l’heure sur le portail officiel, prévoyez une marge avant l’enregistrement ou le train, vérifiez le terminal, puis préparez le premier tronçon jusqu’à la gare routière d’Aix. Au retour, vérifiez aussi le dernier départ depuis l’aéroport.",
        ],
        bullets: [
          "Ne vous fiez pas à une ancienne capture d’écran ou fiche PDF.",
          "Vérifiez les perturbations le jour même.",
          "Confirmez le titre de transport et les conditions bagages auprès du réseau.",
        ],
      },
    ],
    callout: {
      label: "Transparence données",
      title: "Pas encore d’horaires A2 dans Débusk.",
      text: "La ligne est référencée, mais aucune course n’est exploitable dans le flux actuel. Cette page sera mise à jour dès que la couverture réelle sera rétablie.",
      tone: "signal",
    },
    sources: [
      {
        label: "Navettes officielles gares et aéroports",
        href: "https://www.lametropolemobilite.fr/navettes-gares-aeroports/",
      },
      { label: "Horaires officiels de la ligne A2", href: officialSchedules },
    ],
    related: [
      { href: "/bus-aix-gare-tgv", label: "Aller à la gare TGV" },
      { href: "/itineraire-bus-aix-en-provence", label: "Rejoindre la gare routière" },
      { href: "/perturbations-bus-aix-en-provence", label: "Vérifier les perturbations" },
    ],
  },
  {
    slug: "bus-aix-gare-tgv",
    category: "Grands trajets",
    label: "Aix ↔ Gare TGV",
    title: "Bus Aix–Gare TGV : préparer son trajet sans rater son train",
    description:
      "Comment rejoindre la gare Aix-en-Provence TGV en bus depuis Aix : ligne A2, Plan d’Aillane, marge de sécurité et état dans Débusk.",
    eyebrow: "Aix-en-Provence · Gare TGV",
    intro:
      "La gare TGV est hors du centre-ville. Voici comment préparer la navette, le bon arrêt et une marge de sécurité, avec une information transparente sur la couverture actuelle de Débusk.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt:
      "Calcul d’un trajet en bus dans Débusk avant une correspondance vers la gare Aix TGV",
    imageCaption:
      "Préparez d’abord le trajet urbain jusqu’à la gare routière, puis vérifiez la navette TGV sur la source officielle.",
    facts: [
      { label: "Liaison directe officielle", value: "A2 via Plan d’Aillane selon service" },
      { label: "Départ à Aix", value: "Gare routière" },
      { label: "Couverture Débusk", value: "Pas de courses A2 dans le flux actuel" },
    ],
    sections: [
      {
        title: "Ne pas confondre les deux gares d’Aix",
        paragraphs: [
          "La gare Aix-en-Provence Centre se trouve en ville et accueille les trains régionaux. La gare Aix-en-Provence TGV est située sur le plateau de l’Arbois, à plusieurs kilomètres du centre. Vérifiez toujours laquelle figure sur votre billet.",
          "La liaison officielle vers Aix TGV est assurée par la navette A2 au départ de la gare routière d’Aix. Selon le service, le trajet dessert Plan d’Aillane avant la gare TGV puis l’aéroport.",
        ],
      },
      {
        title: "Construire un trajet en deux parties",
        paragraphs: [
          "Dans Débusk, calculez le trajet urbain entre votre quartier et la gare routière d’Aix. Ajoutez ensuite séparément le temps d’attente et la navette officielle vers Aix TGV. Cette séparation évite de croire qu’un itinéraire incomplet couvre toute la correspondance.",
          "Le flux Débusk du 16 août 2026 contient l’arrêt et la route A2, mais aucune course A2. Pour l’horaire de la navette, consultez donc le réseau officiel jusqu’à la correction du flux.",
        ],
      },
      {
        title: "Quelle marge prévoir ?",
        paragraphs: [
          "Ajoutez une marge adaptée à votre billet, aux éventuels bagages et à la circulation. Vérifiez le quai de la navette, les perturbations du jour et le dernier départ au retour. Un départ théorique ne garantit pas une correspondance ferroviaire en cas d’embouteillage.",
        ],
      },
    ],
    callout: {
      label: "État du service dans l’app",
      title: "Vérifiez l’A2 sur le portail officiel.",
      text: "Débusk aide à rejoindre la gare routière d’Aix, mais ne doit pas encore être utilisé comme source d’horaire A2.",
      tone: "signal",
    },
    sources: [
      {
        label: "Navettes officielles gares et aéroports",
        href: "https://www.lametropolemobilite.fr/navettes-gares-aeroports/",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/bus-aix-aeroport-marseille-provence", label: "Continuer vers l’aéroport" },
      { href: "/itineraire-bus-aix-en-provence", label: "Trajet jusqu’à la gare routière" },
    ],
  },
  {
    slug: "bus-a-la-demande-pays-aix",
    category: "Services du réseau",
    label: "Bus à la demande",
    title: "Bus à la demande à Aix et au Pays d’Aix : secteurs et réservation",
    description:
      "Comprendre le bus à la demande à Aix et au Pays d’Aix : secteurs, réservation officielle et différence avec les horaires disponibles dans Débusk.",
    eyebrow: "Transport à la demande · Pays d’Aix",
    intro:
      "Le bus à la demande dessert sur réservation des zones non couvertes par les lignes régulières ou scolaires. Débusk explique le service, mais ne permet pas encore de le réserver.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt:
      "Carte des arrêts de bus dans Débusk, distincte du service officiel de bus à la demande",
    imageCaption:
      "Les lignes et arrêts réguliers apparaissent dans Débusk ; le transport à la demande se réserve sur le service officiel.",
    facts: [
      { label: "Deux périmètres", value: "Aix en Bus local et secteurs interurbains du Pays d’Aix" },
      { label: "Fonctionnement", value: "Uniquement sur réservation" },
      { label: "Dans Débusk", value: "Ni réservation ni horaires TAD actuellement" },
    ],
    sections: [
      {
        title: "Les neuf secteurs autour d’Aix",
        paragraphs: [
          "La Métropole Mobilité regroupe le service en neuf zones de proximité. Le trajet doit rester dans les conditions prévues pour le secteur et être réservé à l’avance sur les canaux officiels.",
        ],
        bullets: [
          "Haute Vallée de l’Arc : Peynier, Puyloubier, Rousset, Trets.",
          "Barrière du Cengle : Beaurecueil, Châteauneuf-le-Rouge, Saint-Antonin-sur-Bayon.",
          "Bassin Minier : Fuveau, Gardanne, Gréasque, Meyreuil, Mimet.",
          "Couronne Sud : Bouc-Bel-Air, Cabriès, Simiane-Collongue.",
          "Chaîne d’Éguilles : Coudoux, Éguilles, Ventabren.",
          "Trévaresse : Lambesc, Rognes, Saint-Cannat.",
          "Val de Durance Ouest : La Roque-d’Anthéron, Le Puy-Sainte-Réparade, Saint-Estève-Janson.",
          "Bassin de Pertuis : Pertuis et secteurs associés.",
          "Val de Durance Est : Jouques, Meyrargues, Peyrolles, Saint-Paul-lez-Durance.",
        ],
      },
      {
        title: "Le service local Aix en Bus",
        paragraphs: [
          "Un autre service à la demande complète le réseau urbain d’Aix-en-Provence, Venelles, Le Tholonet et Saint-Marc-Jaumegarde. Ses neuf secteurs locaux comprennent notamment Grand Saint-Jean, Venelles–Couteron, Aqueducs–Pinchinats, Célony, Granettes–Pey-Blanc, Bibémus–Les Sources, Roquefavour–La Duranne–Pôle d’Activités, Luynes et Martelly.",
          "Certains services urbains fonctionnent aussi partiellement sur réservation les dimanches et jours fériés. Les conditions et délais n’étant pas les mêmes que pour le TAD interurbain, commencez par identifier le réseau et le secteur sur la page officielle correspondante.",
        ],
      },
      {
        title: "Comment réserver le bus à la demande ?",
        paragraphs: [
          "La réservation s’effectue auprès de La Métropole Mobilité, par téléphone, sur son site ou via l’application officielle dédiée. Les horaires de prise en charge et les règles peuvent dépendre du secteur : confirmez-les au moment de réserver.",
          "Débusk ne transmet pas de réservation et son flux actuel n’intègre pas les courses TAD. Une recherche dans Débusk ne doit donc pas être interprétée comme une confirmation de prise en charge.",
        ],
      },
      {
        title: "Bus à la demande ou lebus+ à la demande ?",
        paragraphs: [
          "Le bus à la demande général dessert des zones de proximité sur réservation. Le service lebus+ à la demande est un dispositif accessible spécialisé, soumis à inscription et conditions. Ces deux offres ne doivent pas être confondues.",
        ],
      },
    ],
    callout: {
      label: "Réservation obligatoire",
      title: "Une recherche Débusk ne réserve aucun véhicule.",
      text: "Utilisez le site ou l’application officielle lebus à la demande-pam pour réserver et recevoir la confirmation.",
      tone: "green",
    },
    sources: [
      {
        label: "Bus à la demande interurbain autour d’Aix — source officielle",
        href: "https://www.lametropolemobilite.fr/lecar-aix/",
      },
      {
        label: "Bus à la demande du réseau Aix en Bus",
        href: "https://www.aixenbus.fr/fr/NOL-Le-Bus-a-la-demande.html",
      },
    ],
    related: [
      { href: "/lignes-bus-aix-en-provence", label: "Lignes régulières" },
      { href: "/itineraire-bus-aix-en-provence", label: "Calculer un trajet régulier" },
    ],
  },
  {
    slug: "perturbations-bus-aix-en-provence",
    category: "Services du réseau",
    label: "Perturbations",
    title: "Perturbations de bus à Aix-en-Provence : quoi vérifier avant de partir",
    description:
      "Consultez les perturbations de bus à Aix-en-Provence, distinguez l’information officielle du suivi communautaire et préparez un plan B.",
    eyebrow: "Info trafic bus · Aix-en-Provence",
    intro:
      "Travaux, arrêt déplacé, manifestation ou retard : Débusk regroupe l’information utile et distingue les alertes officielles de la position partagée par les voyageurs.",
    image: "/app-screens/perturbations-officielles.png",
    imageWidth: 768,
    imageHeight: 1676,
    imageAlt:
      "Écran Débusk affichant les perturbations officielles des lignes de bus à Aix-en-Provence",
    imageCaption:
      "Les perturbations officielles sont présentées séparément du suivi communautaire du bus.",
    facts: [
      { label: "À contrôler", value: "Ligne, sens, arrêt, date et plage horaire" },
      { label: "Deux informations", value: "Alerte officielle et contribution communautaire" },
      { label: "Bon réflexe", value: "Vérifier juste avant le départ" },
    ],
    sections: [
      {
        title: "Lire une perturbation correctement",
        paragraphs: [
          "Une alerte peut concerner un seul sens, quelques arrêts ou une plage horaire précise. Ouvrez le détail et vérifiez le numéro de ligne, le terminus, la date d’application et l’arrêt de report éventuel.",
          "Les travaux de voirie et événements peuvent déplacer temporairement un arrêt sans supprimer toute la ligne. Le nom de l’arrêt de report est alors plus utile qu’un simple statut « perturbé ».",
        ],
      },
      {
        title: "Officiel et communautaire : deux rôles différents",
        paragraphs: [
          "L’information officielle décrit une modification décidée ou publiée par l’exploitant. Le suivi communautaire de Débusk montre la progression d’un bus uniquement lorsqu’un voyageur choisit de contribuer pendant son trajet.",
          "L’absence de bus partagé sur la carte ne signifie pas que la course est supprimée. À l’inverse, une position communautaire ne remplace pas une consigne officielle concernant un arrêt ou une déviation.",
        ],
      },
      {
        title: "Préparer un plan B",
        paragraphs: [
          "Repérez un autre arrêt proche, une autre ligne ou un départ plus tôt. Pour un trajet scolaire, convenez à l’avance d’une personne à contacter et d’un lieu sûr si l’arrêt habituel n’est pas desservi.",
          "Enregistrez vos lignes favorites dans Débusk afin d’accéder plus vite aux informations qui concernent votre trajet quotidien.",
        ],
      },
    ],
    sources: [
      {
        label: "Informations trafic officielles",
        href: "https://www.lametropolemobilite.fr/",
      },
      { label: "Plans et horaires officiels", href: officialSchedules },
    ],
    related: [
      { href: "/horaires-bus-aix-en-provence", label: "Prochains départs" },
      { href: "/guide-rentree-bus-aix-en-provence", label: "Plan B pour la rentrée" },
    ],
  },
  {
    slug: "keolis-aix-en-bus-metropole-mobilite",
    category: "Services du réseau",
    label: "Qui fait quoi ?",
    title: "Keolis, Aix en Bus et La Métropole Mobilité : qui fait quoi ?",
    description:
      "Comprendre les rôles de Keolis Pays d’Aix, Aix en Bus, La Métropole Mobilité et Débusk, application indépendante et non officielle.",
    eyebrow: "Acteurs du réseau aixois",
    intro:
      "Ces noms apparaissent ensemble dans les recherches, mais ils ne désignent pas la même chose. Voici une explication claire des rôles — et de l’indépendance de Débusk.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt:
      "Écran d’accueil de l’application indépendante Débusk avec les arrêts de bus à Aix-en-Provence",
    imageCaption:
      "Débusk est une application indépendante : elle n’est ni le réseau Aix en Bus, ni Keolis, ni La Métropole Mobilité.",
    facts: [
      { label: "Autorité organisatrice", value: "Métropole Aix-Marseille-Provence" },
      { label: "Exploitant Aix en Bus", value: "Keolis Pays d’Aix pour la majorité du réseau" },
      { label: "Débusk", value: "Projet numérique indépendant et non officiel" },
    ],
    sections: [
      {
        title: "La Métropole Mobilité",
        paragraphs: [
          "La Métropole Aix-Marseille-Provence organise les transports publics métropolitains. Son portail La Métropole Mobilité publie les informations contractuelles : titres et tarifs, inscriptions scolaires, règles d’usage, plans, horaires et alertes de réseau.",
        ],
      },
      {
        title: "Aix en Bus et Keolis Pays d’Aix",
        paragraphs: [
          "Aix en Bus est le réseau urbain du secteur aixois. Le site officiel indique être édité par Keolis Pays d’Aix, qui exploite la majorité de ses lignes dans le cadre d’une délégation de service public. Certains services peuvent toutefois relever d’un autre opérateur : le nom du réseau et celui de l’entreprise ne sont donc pas interchangeables.",
          "Pour une réclamation sur une course, un objet perdu, un titre ou une décision officielle, contactez le réseau ou l’exploitant indiqué sur leurs canaux.",
        ],
      },
      {
        title: "À quoi sert Débusk ?",
        paragraphs: [
          "Débusk propose une lecture mobile des horaires, lignes, itinéraires et perturbations disponibles, complétée par un suivi communautaire volontaire lorsqu’un passager partage la progression de son bus.",
          "Débusk ne représente pas Keolis, Aix en Bus ou La Métropole Mobilité et ne prétend à aucun partenariat. Les marques citées sur cette page servent uniquement à expliquer le fonctionnement du réseau et orienter l’usager vers le bon interlocuteur.",
        ],
      },
    ],
    callout: {
      label: "Indépendance",
      title: "Débusk est une application non officielle.",
      text: "Aucun logo tiers n’est utilisé pour laisser croire à une affiliation. Pour une démarche contractuelle, utilisez toujours le service officiel concerné.",
      tone: "signal",
    },
    sources: [
      { label: "Site officiel Aix en Bus", href: "https://www.aixenbus.fr/" },
      { label: "Portail officiel La Métropole Mobilité", href: "https://www.lametropolemobilite.fr/" },
    ],
    related: [
      { href: "/boutique-bus-aix-office-tourisme", label: "Acheter un titre à Aix" },
      { href: "/informations#sources", label: "Sources et méthodologie Débusk" },
    ],
  },
  {
    slug: "boutique-bus-aix-office-tourisme",
    category: "Services du réseau",
    label: "Point de vente officiel",
    title: "Débusk n’est pas une boutique : acheter un titre de bus à Aix",
    description:
      "Débusk est une application indépendante et ne vend aucun titre. Retrouvez le point de vente officiel d’Aix et les démarches à vérifier.",
    eyebrow: "Application indépendante · point de vente officiel",
    intro:
      "Débusk est une application indépendante : elle ne vend, ne crée et ne recharge aucun titre de transport. Cette page vous aide à préparer votre visite à la Boutique La Métropole Mobilité, située dans l’Office de Tourisme d’Aix près de la Rotonde.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt:
      "Capture de l’application indépendante Débusk montrant des lignes favorites ; Débusk ne vend aucun titre de transport",
    imageCaption:
      "La Boutique La Métropole Mobilité gère les titres de transport. Débusk aide séparément à préparer les trajets.",
    facts: [
      { label: "Point de vente officiel", value: "Boutique La Métropole Mobilité" },
      { label: "Lieu", value: "Office de Tourisme d’Aix-en-Provence, Allées Provençales" },
      { label: "Rôle de Débusk", value: "Application indépendante ; aucune vente ni recharge" },
    ],
    sections: [
      {
        title: "Où se trouve le point de vente officiel ?",
        paragraphs: [
          "La Boutique La Métropole Mobilité est le point de vente officiel présenté par Aix en Bus. Elle est située à l’intérieur de l’Office de Tourisme d’Aix-en-Provence, sur les Allées Provençales, près des arrêts Rotonde et de la gare routière.",
          "Les horaires d’ouverture peuvent varier selon la saison, les jours fériés ou une situation exceptionnelle. Consultez la fiche officielle le jour du déplacement au lieu de vous fier à un ancien résultat de recherche.",
        ],
      },
      {
        title: "Quelles démarches préparer auprès du réseau ?",
        paragraphs: [
          "Selon votre demande, le réseau peut exiger une pièce d’identité, une photo, un justificatif de domicile, un certificat de scolarité ou une carte existante. Les conditions diffèrent entre création, renouvellement, abonnement scolaire et tarif spécifique.",
          "Vérifiez les pièces acceptées et votre éligibilité sur le service officiel avant de vous déplacer. Pour la rentrée, utilisez la démarche en ligne lorsqu’elle est proposée.",
        ],
      },
      {
        title: "Débusk intervient-il dans l’achat ?",
        paragraphs: [
          "Non. Débusk ne crée, ne vend, ne recharge et ne rembourse aucun titre de transport. L’achat, la carte et le service après-vente relèvent exclusivement du réseau officiel.",
          "Après avoir obtenu votre titre auprès du réseau, Débusk peut vous aider séparément à retrouver une ligne, un arrêt, un prochain départ et vos favoris.",
        ],
      },
    ],
    callout: {
      label: "Indépendance",
      title: "Débusk n’est pas la Boutique La Métropole Mobilité.",
      text: "L’achat, la recharge, le remboursement et les justificatifs relèvent du réseau officiel. Débusk fournit uniquement des informations et une application de trajets.",
      tone: "signal",
    },
    sources: [
      {
        label: "Boutique La Métropole Mobilité — fiche officielle Aix en Bus",
        href: "https://www.aixenbus.fr/fr/Y2z-Agence-commerciale.html",
      },
      { label: "Inscription scolaire officielle", href: officialSchool },
    ],
    related: [
      { href: "/abonnement-bus-scolaire-aix-en-provence", label: "Démarches scolaires" },
      { href: "/keolis-aix-en-bus-metropole-mobilite", label: "Comprendre les acteurs" },
    ],
  },
  {
    slug: "bus-la-duranne-aix-en-provence",
    category: "Quartiers et communes",
    label: "La Duranne",
    title: "Bus La Duranne–Aix-en-Provence : lignes 15, 18 et scolaires",
    description:
      "Lignes de bus entre La Duranne et Aix-en-Provence : lignes 15 et 18, dessertes scolaires 8305, arrêts et conseils de trajet.",
    eyebrow: "Bus La Duranne · Aix",
    intro:
      "La Duranne est reliée à Aix par les lignes 15 et 18, complétées par des services scolaires 8305. Repérez la bonne ligne selon votre arrêt et votre destination.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt: "Choix d’une ligne favorite dans Débusk pour un trajet entre La Duranne et Aix",
    imageCaption: "Enregistrez votre arrêt de La Duranne et le bon sens vers Aix pour le retrouver rapidement.",
    facts: [
      { label: "Lignes régulières", value: "15 et 18" },
      { label: "Scolaire", value: "Famille 8305" },
      { label: "Pôles utiles", value: "Europôle Arbois, Duranne École, gare routière" },
    ],
    sections: [
      {
        title: "Quelle ligne prendre depuis La Duranne ?",
        paragraphs: [
          "La ligne 15 relie le secteur Europôle Arbois–La Duranne à la gare routière d’Aix. La ligne 18 dessert Duranne École et rejoint également la gare routière. Le meilleur choix dépend de l’arrêt le plus proche et de l’heure de départ.",
          "Dans Débusk, recherchez votre arrêt précis plutôt que le seul nom du quartier, puis contrôlez le terminus « Gare routière » pour aller vers le centre.",
        ],
      },
      {
        title: "Dessertes scolaires 8305",
        paragraphs: [
          "La famille 8305 relie La Duranne et Les Milles à plusieurs établissements, notamment Sophie Germain, Arc de Meyran et des dessertes associées. Plusieurs variantes existent : le suffixe du numéro est donc important.",
          "Pour la rentrée, vérifiez le numéro complet, l’arrêt, les jours scolaires et le sens du retour. Ne supposez pas que tous les services 8305 suivent le même parcours.",
        ],
      },
      {
        title: "Préparer le retour",
        paragraphs: [
          "La gare routière concentre plusieurs départs. Vérifiez la zone de quai et le terminus affiché, puis gardez une marge en heure de pointe vers le pôle d’activités. Ajoutez l’arrêt d’aller et celui du retour séparément aux favoris.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/bus-les-milles-aix-en-provence", label: "Bus Les Milles" },
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
    ],
  },
  {
    slug: "bus-les-milles-aix-en-provence",
    category: "Quartiers et communes",
    label: "Les Milles",
    title: "Bus Les Milles–Aix-en-Provence : ligne 14 et scolaires 8301/8305",
    description:
      "Préparez un trajet en bus entre Les Milles et Aix-en-Provence : ligne 14, services scolaires 8301 et 8305, sens et favoris.",
    eyebrow: "Bus Les Milles · Aix",
    intro:
      "La ligne 14 dessert Les Milles, tandis que plusieurs services scolaires relient le secteur aux établissements aixois. Le numéro complet permet d’éviter les erreurs de parcours.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt: "Carte Débusk des arrêts pour préparer un trajet en bus entre Les Milles et Aix",
    imageCaption: "Repérez l’arrêt exact aux Milles avant de consulter les prochains passages.",
    facts: [
      { label: "Ligne régulière", value: "14" },
      { label: "Scolaire", value: "8301-4 et plusieurs services 8305" },
      { label: "Destination urbaine", value: "Aix via le parcours de la ligne 14" },
    ],
    sections: [
      {
        title: "La ligne régulière 14",
        paragraphs: [
          "La ligne 14 relie le centre commercial Les Milles au secteur Brossolette. Elle convient aux déplacements réguliers vers Aix, sous réserve de choisir le bon arrêt et le bon sens.",
          "Consultez le détail du tracé dans Débusk : le nom « Les Milles » couvre un secteur étendu et l’arrêt le plus proche peut changer nettement la durée totale.",
        ],
      },
      {
        title: "Les lignes scolaires du secteur",
        paragraphs: [
          "Le service 8301-4 dessert Les Milles–Le Serre. La famille 8305 comporte plusieurs variantes entre Les Milles, La Duranne et des établissements comme Sophie Germain ou Arc de Meyran.",
          "Notez le suffixe après 8305, le sens et le jour. Une ligne portant la même famille peut desservir un autre établissement ou ne circuler qu’aux horaires scolaires prévus.",
        ],
      },
      {
        title: "Créer ses favoris aller et retour",
        paragraphs: [
          "Enregistrez séparément l’arrêt vers Aix et celui du retour vers Les Milles. Contrôlez le terminus chaque matin : cela évite de choisir le passage de l’autre côté de la route ou une variante scolaire différente.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/bus-la-duranne-aix-en-provence", label: "Bus La Duranne" },
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
    ],
  },
  {
    slug: "bus-puyricard-couteron-aix",
    category: "Quartiers et communes",
    label: "Puyricard–Couteron",
    title: "Bus Puyricard, Couteron et Aix : lignes 11, 12, 13 et scolaires",
    description:
      "Lignes de bus entre Puyricard, Couteron et Aix-en-Provence : 11, 12, 13, services scolaires 8301/8303 et conseils de trajet.",
    eyebrow: "Bus Puyricard–Couteron · Aix",
    intro:
      "Trois lignes régulières et plusieurs dessertes scolaires maillent le nord d’Aix. Identifiez l’arrêt, le terminus et la variante scolaire avant de partir.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt: "Itinéraire Débusk pour un déplacement en bus entre Puyricard, Couteron et Aix",
    imageCaption: "Comparez les lignes 11, 12 et 13 selon votre point de départ exact.",
    facts: [
      { label: "Lignes régulières", value: "11, 12 et 13" },
      { label: "Scolaire", value: "Familles 8301 et 8303" },
      { label: "Repères", value: "Village Soleil, Couteron Église, Puyricard Centre" },
    ],
    sections: [
      {
        title: "Trois lignes, trois parcours utiles",
        paragraphs: [
          "La ligne 11 relie Village Soleil à Luynes Mail. La ligne 12 relie Couteron Église à la gare routière Mouret. La ligne 13 part de Puyricard Centre et traverse Aix vers Palette–Le Tholonet.",
          "Selon votre destination, une correspondance n’est pas toujours nécessaire : comparez le tracé complet et ne choisissez pas automatiquement la première ligne affichée.",
        ],
      },
      {
        title: "Les dessertes scolaires 8301 et 8303",
        paragraphs: [
          "Les données de rentrée comportent notamment des services Puyricard–Couteron et plusieurs variantes 8303 vers Silvacane, le centre d’Aix, Rocher du Dragon ou Nina Simone.",
          "Le suffixe distingue des parcours qui ne sont pas équivalents. Vérifiez le numéro complet sur l’aller et le retour, ainsi que le nom officiel de l’arrêt.",
        ],
      },
      {
        title: "Bien rechercher son arrêt",
        paragraphs: [
          "Puyricard et Couteron couvrent plusieurs hameaux. Utilisez la carte de Débusk pour repérer l’arrêt réellement accessible à pied, puis testez la recherche à l’heure scolaire ou professionnelle prévue.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/bus-luynes-aix-en-provence", label: "Bus Luynes" },
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
    ],
  },
  {
    slug: "bus-luynes-aix-en-provence",
    category: "Quartiers et communes",
    label: "Luynes",
    title: "Bus Luynes–Aix-en-Provence : ligne 11 et scolaires 8404",
    description:
      "Bus entre Luynes et Aix-en-Provence : ligne 11, services scolaires 8404, lycée Georges Duby, sens et préparation du trajet.",
    eyebrow: "Bus Luynes · Aix",
    intro:
      "La ligne 11 dessert Luynes et la famille 8404 couvre des trajets scolaires vers Aix. Voici les vérifications utiles pour l’aller comme pour le retour.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt: "Favoris de lignes dans Débusk pour un trajet quotidien entre Luynes et Aix",
    imageCaption: "Gardez l’arrêt de Luynes et le départ de retour dans deux favoris distincts.",
    facts: [
      { label: "Ligne régulière", value: "11" },
      { label: "Scolaire", value: "8404-1 et 8404-2" },
      { label: "Établissement repère", value: "Lycée Georges Duby" },
    ],
    sections: [
      {
        title: "La ligne 11 à Luynes",
        paragraphs: [
          "La ligne 11 relie Luynes Mail à Village Soleil en traversant le territoire aixois. Contrôlez le terminus affiché pour distinguer le trajet vers Luynes du trajet vers le nord d’Aix.",
          "La circulation peut allonger le temps de parcours. Pour un rendez-vous ou une rentrée scolaire, choisissez un départ laissant une marge plutôt qu’une correspondance trop serrée.",
        ],
      },
      {
        title: "Les services scolaires 8404",
        paragraphs: [
          "Les variantes 8404-1 et 8404-2 assurent des dessertes entre Luynes et Aix centre selon les parcours scolaires prévus. Le lycée Georges Duby constitue un repère important du secteur.",
          "Vérifiez le numéro complet, l’établissement, le sens et les jours de circulation dans les données de rentrée avant le premier trajet.",
        ],
      },
      {
        title: "Le bon réflexe au retour",
        paragraphs: [
          "Repérez l’arrêt de départ à proximité de l’établissement avant la rentrée. Dans Débusk, ajoutez le favori du retour avec le terminus Luynes pour ne pas le confondre avec un départ vers une autre destination.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/bus-puyricard-couteron-aix", label: "Bus Puyricard–Couteron" },
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
    ],
  },
  {
    slug: "bus-venelles-aix-en-provence",
    category: "Quartiers et communes",
    label: "Venelles",
    title: "Bus Venelles–Aix-en-Provence : ligne 25 et scolaires 8377/8379",
    description:
      "Bus entre Venelles et Aix-en-Provence : ligne 25, services scolaires 8377 et 8379, gare routière et préparation du trajet.",
    eyebrow: "Bus Venelles · Aix",
    intro:
      "La ligne 25 relie Venelles à la gare routière d’Aix, complétée par plusieurs services scolaires. Le terminus et le suffixe de ligne sont essentiels.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt: "Carte Débusk des arrêts pour aller en bus de Venelles à Aix-en-Provence",
    imageCaption: "Consultez les arrêts de la ligne 25 et les services scolaires du secteur de Venelles.",
    facts: [
      { label: "Ligne régulière", value: "25" },
      { label: "Scolaire", value: "Familles 8377 et 8379" },
      { label: "Terminus aixois", value: "Gare routière Belges" },
    ],
    sections: [
      {
        title: "La ligne 25 entre Venelles et Aix",
        paragraphs: [
          "La ligne 25 relie Venelles à la gare routière Belges. À l’aller, vérifiez le sens Aix-en-Provence ; au retour, contrôlez le terminus Venelles et l’arrêt de montée à la gare routière.",
          "Ajoutez les deux arrêts aux favoris séparément. Le passage affiché dans le mauvais sens peut sembler proche mais ne vous emmènera pas vers la bonne commune.",
        ],
      },
      {
        title: "Des lignes scolaires avec plusieurs variantes",
        paragraphs: [
          "Les familles 8377 et 8379 comprennent plusieurs services entre Venelles, Aix et les établissements concernés, dont Nina Simone dans certains parcours. Les suffixes -1 à -5 distinguent des itinéraires ou horaires différents.",
          "Pour une rentrée, partez du numéro complet fourni par le réseau ou l’établissement, puis confirmez-le dans Débusk avec l’arrêt de domicile.",
        ],
      },
      {
        title: "Anticiper une perturbation",
        paragraphs: [
          "La liaison vers Aix peut être affectée par la circulation ou un arrêt déplacé. Consultez l’info trafic juste avant de partir et repérez un départ précédent pour les jours importants.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
      { href: "/perturbations-bus-aix-en-provence", label: "Perturbations" },
    ],
  },
  {
    slug: "bus-eguilles-aix-en-provence",
    category: "Quartiers et communes",
    label: "Éguilles",
    title: "Bus Éguilles–Aix-en-Provence : ligne 26 et bus à la demande",
    description:
      "Bus entre Éguilles et Aix-en-Provence : ligne 26, gare routière Mouret, secteur de bus à la demande et conseils de trajet.",
    eyebrow: "Bus Éguilles · Aix",
    intro:
      "La ligne 26 assure la liaison régulière vers Aix. Éguilles appartient aussi à un secteur officiel de bus à la demande, qui fonctionne sur réservation et n’est pas couvert par Débusk.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt: "Calcul d’itinéraire Débusk entre Éguilles et Aix-en-Provence avec la ligne 26",
    imageCaption: "Pour un trajet régulier, recherchez la ligne 26 et contrôlez le sens vers la gare routière Mouret.",
    facts: [
      { label: "Ligne régulière", value: "26" },
      { label: "Terminus aixois", value: "Gare routière Mouret" },
      { label: "TAD", value: "Secteur Chaîne d’Éguilles, sur réservation officielle" },
    ],
    sections: [
      {
        title: "La ligne 26 vers Aix",
        paragraphs: [
          "La ligne 26 relie Éguilles à la gare routière Mouret d’Aix-en-Provence. Dans Débusk, recherchez l’arrêt précis d’Éguilles et vérifiez le terminus avant de choisir le départ.",
          "Pour le retour, contrôlez la zone de départ à la gare routière et le sens Éguilles. En heure de pointe, prévoyez une marge liée à la circulation routière.",
        ],
      },
      {
        title: "Le bus à la demande du secteur",
        paragraphs: [
          "Éguilles fait partie du secteur 5 « Chaîne d’Éguilles » avec Coudoux et Ventabren. Ce service complète les lignes régulières dans les zones prévues, mais il nécessite une réservation auprès de La Métropole Mobilité.",
          "Débusk ne réserve pas ce véhicule et ne présente pas encore ses courses. Utilisez l’app pour la ligne 26 et les canaux officiels pour toute demande TAD.",
        ],
      },
      {
        title: "Choisir entre régulier et réservation",
        paragraphs: [
          "Commencez par vérifier si la ligne 26 et un arrêt accessible répondent au trajet. Si votre zone n’est pas desservie ou si le service officiel vous oriente vers le TAD, réservez selon les conditions du secteur.",
        ],
      },
    ],
    sources: [
      { label: "Plans et horaires officiels", href: officialSchedules },
      { label: "Bus à la demande officiel", href: "https://www.lametropolemobilite.fr/lecar-aix/" },
    ],
    related: [
      { href: "/bus-a-la-demande-pays-aix", label: "Comprendre le bus à la demande" },
      { href: "/horaires-bus-aix-en-provence", label: "Horaires réguliers" },
    ],
  },
  {
    slug: "bus-le-tholonet-aix-en-provence",
    category: "Quartiers et communes",
    label: "Le Tholonet",
    title: "Bus Le Tholonet–Aix-en-Provence : ligne 13 et scolaire 8405",
    description:
      "Bus entre Le Tholonet et Aix-en-Provence : ligne 13, service scolaire 8405, Palette et conseils pour le trajet quotidien.",
    eyebrow: "Bus Le Tholonet · Aix",
    intro:
      "La ligne 13 dessert Palette–Le Tholonet et traverse Aix jusqu’à Puyricard. Le service 8405 complète la desserte scolaire du secteur.",
    image: "/app-screens/favoris-choix-bus.png",
    imageWidth: 772,
    imageHeight: 1676,
    imageAlt: "Favori de ligne dans Débusk pour un trajet entre Le Tholonet et Aix-en-Provence",
    imageCaption: "La ligne 13 traverse Aix : vérifiez toujours le terminus avant de monter.",
    facts: [
      { label: "Ligne régulière", value: "13" },
      { label: "Scolaire", value: "8405-1" },
      { label: "Terminus du secteur", value: "Palette–Le Tholonet" },
    ],
    sections: [
      {
        title: "La ligne 13 traverse Aix du nord au sud-est",
        paragraphs: [
          "La ligne 13 relie Puyricard Centre à Palette–Le Tholonet. Pour rejoindre Aix depuis Le Tholonet, vérifiez le sens Puyricard ; pour rentrer, contrôlez le terminus Palette–Le Tholonet.",
          "Le long parcours rend le terminus particulièrement utile pour éviter une erreur de direction. Ouvrez le tracé et l’arrêt exact dans Débusk.",
        ],
      },
      {
        title: "La desserte scolaire 8405-1",
        paragraphs: [
          "Le service 8405-1 relie Le Tholonet et le secteur Arc de Meyran–Zola selon les horaires scolaires intégrés. Vérifiez les jours de circulation et l’arrêt du retour avant la rentrée.",
          "Une ligne scolaire peut ne pas circuler pendant les vacances ou selon le calendrier de l’établissement. La date choisie dans la recherche compte autant que l’heure.",
        ],
      },
      {
        title: "Créer un repère familial",
        paragraphs: [
          "Notez le nom exact de l’arrêt, le terminus et un départ de secours. Pour un enfant, faites une reconnaissance de l’arrêt de retour et convenez d’un plan en cas de perturbation.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/transport-scolaire-aix-en-provence", label: "Transport scolaire" },
      { href: "/bus-puyricard-couteron-aix", label: "L’autre extrémité de la ligne 13" },
    ],
  },
  {
    slug: "bus-saint-marc-jaumegarde-aix",
    category: "Quartiers et communes",
    label: "Saint-Marc-Jaumegarde",
    title: "Bus Saint-Marc-Jaumegarde–Aix : ligne 21 et arrêts",
    description:
      "Préparez un trajet en bus entre Saint-Marc-Jaumegarde et Aix-en-Provence avec la ligne 21 : sens, arrêts, horaires et favoris.",
    eyebrow: "Bus Saint-Marc-Jaumegarde · Aix",
    intro:
      "La ligne 21 relie Saint-Marc-Jaumegarde à Bellegarde. Voici comment repérer le bon arrêt et sécuriser l’aller comme le retour.",
    image: "/app-screens/main-screen.png",
    imageWidth: 778,
    imageHeight: 1672,
    imageAlt: "Carte Débusk des arrêts de la ligne 21 entre Saint-Marc-Jaumegarde et Aix",
    imageCaption: "La carte aide à distinguer les arrêts du secteur et leur sens de circulation.",
    facts: [
      { label: "Ligne", value: "21" },
      { label: "Parcours", value: "Saint-Marc-Jaumegarde ↔ Bellegarde" },
      { label: "Conseil", value: "Vérifier les deux sens et le dernier retour" },
    ],
    sections: [
      {
        title: "Prendre la ligne 21 vers Aix",
        paragraphs: [
          "La ligne 21 relie Saint-Marc-Jaumegarde au quartier Bellegarde à Aix-en-Provence. Sélectionnez l’arrêt le plus proche sur la carte, puis contrôlez le sens Bellegarde pour aller vers la ville.",
          "Les arrêts peuvent être éloignés les uns des autres. Intégrez le temps de marche réel et évitez une correspondance trop serrée.",
        ],
      },
      {
        title: "Organiser le retour",
        paragraphs: [
          "Pour rentrer, recherchez le terminus Saint-Marc-Jaumegarde. Vérifiez les horaires de fin de journée et enregistrez l’arrêt de retour : ce n’est pas nécessairement le même emplacement que celui de l’aller.",
          "En cas de perturbation, consultez l’arrêt de report officiel et prévoyez une personne à contacter si le trajet concerne un enfant.",
        ],
      },
      {
        title: "À quoi sert le suivi communautaire ?",
        paragraphs: [
          "Lorsqu’un passager contribue, Débusk peut afficher la progression partagée du bus. Si aucune position n’apparaît, la course n’est pas forcément supprimée : revenez à l’horaire et à l’info trafic officielle.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/horaires-bus-aix-en-provence", label: "Consulter les horaires" },
      { href: "/perturbations-bus-aix-en-provence", label: "Comprendre les perturbations" },
    ],
  },
  {
    slug: "bus-celony-aix-en-provence",
    category: "Quartiers et communes",
    label: "Célony",
    title: "Bus Célony–Aix-en-Provence : ligne 22 et trajet vers la Rotonde",
    description:
      "Préparez un trajet en bus entre Célony et Aix-en-Provence avec la ligne 22 : arrêts, terminus Rotonde Bonaparte et favoris.",
    eyebrow: "Bus Célony · Aix",
    intro:
      "La ligne 22 relie Célony École à Rotonde Bonaparte. Repérez le sens, l’arrêt et le départ de retour avant votre trajet.",
    image: "/app-screens/mode-itineraire.png",
    imageWidth: 774,
    imageHeight: 1666,
    imageAlt: "Itinéraire Débusk pour prendre la ligne 22 entre Célony et la Rotonde à Aix",
    imageCaption: "Le terminus Rotonde Bonaparte permet d’identifier le sens vers le centre d’Aix.",
    facts: [
      { label: "Ligne", value: "22" },
      { label: "Parcours", value: "Célony École ↔ Rotonde Bonaparte" },
      { label: "Destination", value: "Centre d’Aix et correspondances à la Rotonde" },
    ],
    sections: [
      {
        title: "Aller de Célony au centre d’Aix",
        paragraphs: [
          "La ligne 22 dessert Célony École et rejoint Rotonde Bonaparte. Pour l’aller vers le centre, vérifiez ce terminus dans Débusk et sélectionnez l’arrêt réellement accessible depuis votre adresse.",
          "À la Rotonde, plusieurs réseaux et arrêts se côtoient. Si vous poursuivez le trajet, repérez à l’avance le lieu exact de la correspondance.",
        ],
      },
      {
        title: "Retrouver le bon départ à la Rotonde",
        paragraphs: [
          "Pour le retour, recherchez le sens Célony École et contrôlez l’emplacement Rotonde Bonaparte. Ajoutez cet arrêt comme favori distinct afin d’afficher rapidement les prochains passages.",
          "Vérifiez aussi le dernier départ prévu et les éventuels arrêts déplacés les jours de manifestation ou de travaux au centre-ville.",
        ],
      },
      {
        title: "Horaire théorique et position partagée",
        paragraphs: [
          "L’horaire indique le passage planifié. La position communautaire n’apparaît que lorsqu’un voyageur contribue. Utilisez l’info trafic officielle pour confirmer une suppression ou une déviation.",
        ],
      },
    ],
    sources: [{ label: "Plans et horaires officiels", href: officialSchedules }],
    related: [
      { href: "/horaires-bus-aix-en-provence", label: "Consulter les horaires" },
      { href: "/itineraire-bus-aix-en-provence", label: "Préparer une correspondance" },
    ],
  },
];

export const topicGuideBySlug = new Map(
  topicGuides.map((guide) => [guide.slug, guide]),
);
