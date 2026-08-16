# Stratégie SEO Débusk — rentrée 2026–2027

Mise à jour : 16 août 2026

## Objectif

Faire de Débusk la réponse locale utile lorsqu’une famille cherche à
Aix-en-Provence une application de bus, un horaire, une ligne, un itinéraire ou
une démarche liée au transport scolaire, puis transformer cette visite en
ouverture ou installation de l’application.

Le SEO seul ne peut pas garantir une première position avant septembre sur un
nouveau domaine. La stratégie associe donc :

1. une base technique parfaitement explorable ;
2. des pages locales qui répondent réellement aux questions ;
3. des liens et recommandations provenant d’acteurs aixois ;
4. une mesure du parcours recherche → application.

## Positionnement éditorial

> Débusk est l’application indépendante pour préparer ses trajets en bus à
> Aix-en-Provence : horaires théoriques issus des données transport,
> itinéraires, perturbations officielles et suivi communautaire lorsqu’un
> voyageur à bord contribue.

Toujours distinguer :

- l’horaire théorique publié pour le réseau ;
- la perturbation officielle ;
- la position communautaire, temporaire et non disponible pour tous les bus.

Ne jamais promettre la vente d’un abonnement, la localisation d’un enfant ou
la position permanente de chaque véhicule.

## Clusters de recherche prioritaires

| Cluster | Requêtes à couvrir | Destination actuelle |
| --- | --- | --- |
| Application | application bus Aix, appli horaires bus Aix | `/` |
| Rentrée | bus scolaire Aix, transport scolaire Aix, rentrée bus | `/guide-rentree-bus-aix-en-provence` |
| Horaires | horaires bus Aix, prochain bus Aix, horaire arrêt | `/horaires-bus-aix-en-provence` |
| Itinéraire | itinéraire bus Aix, trajet bus Aix | `/itineraire-bus-aix-en-provence` |
| Lignes | lignes bus Aix, ligne 6 Aix, lignes scolaires Aix | `/lignes-bus-aix-en-provence` |
| Abonnement | abonnement bus scolaire Aix, Pass scolaire 2026–2027 | `/abonnement-bus-scolaire-aix-en-provence` |

Les recherches nationales autour du « suivi de l’enfant » ne sont pas une
cible : elles ne correspondent pas au service rendu par Débusk.

## Calendrier de rentrée

### 16–18 août — publier la fondation

- Mettre en ligne les pages actuelles, leurs canonicals et leur maillage.
- Publier `robots.txt` et `sitemap.xml`.
- Soumettre le sitemap dans Search Console.
- Demander l’indexation uniquement des pages prioritaires.
- Remplacer les recherches App Store et Google Play par les URL exactes dès
  que les fiches Débusk sont disponibles.

### 17–24 août — capter la longue traîne scolaire

À partir des horaires officiels définitifs annoncés le 17 août, créer des
pages réellement distinctes pour les services scolaires présents dans les
données : séries 8301, 8303, 8305, 8377, 8379, 8404 et 8405.

Chaque page de ligne doit contenir au minimum :

- numéro, directions et établissements desservis ;
- arrêts dans chaque sens ;
- jours et période de circulation ;
- horaires valables et date de vérification ;
- source officielle ;
- perturbations et limites du suivi communautaire ;
- lien permettant d’ouvrir cette ligne dans Débusk ;
- liens vers l’abonnement, la commune et les lignes proches.

Priorité aux trajets liés à Sophie Germain, Nina Simone, Rocher du Dragon,
Arc de Meyran, Zola, Cézanne et Georges Duby, ainsi qu’à La Duranne, Les
Milles, Puyricard, Couteron, Venelles, Luynes et Le Tholonet.

Ne pas publier de pages minces construites uniquement en remplaçant un numéro
de ligne. Une page est indexable seulement si elle apporte des données et une
réponse propres au trajet.

### 25–31 août — autorité locale et conversion

- Faire référencer Débusk comme réutilisation sur transport.data.gouv.fr.
- Contacter les associations de parents et les établissements prioritaires
  avec un lien ou un QR code vers leur page utile.
- Proposer Débusk aux pages transport des communes couvertes et à l’office de
  tourisme d’Aix-en-Provence.
- Mettre à jour les anciens liens et publications « AixBus Live » puis créer
  des redirections permanentes si l’ancien domaine est contrôlé.
- Créer des liens profonds `ligne` et `arrêt` pour conserver le contexte entre
  Google, le site et l’application.

### 1er–11 septembre — piloter avec les recherches réelles

- Contrôler chaque matin les erreurs de couverture et les impressions dans
  Search Console.
- Regrouper les requêtes par `scolaire`, `abonnement`, `ligne`, `horaire`,
  `itinéraire` et `application`.
- Améliorer d’abord les pages qui obtiennent des impressions mais peu de clics.
- Corriger immédiatement toute ligne ou horaire modifié après la rentrée.
- Produire de nouvelles pages uniquement lorsqu’une question réelle ou les
  données du réseau justifient un contenu utile.

## Search Console

Après chaque déploiement important :

1. vérifier `https://www.debusk.fr/sitemap.xml` ;
2. soumettre `sitemap.xml` dans **Indexation → Sitemaps** ;
3. inspecter l’accueil et les pages rentrée, abonnement, horaires et lignes ;
4. demander une seule fois l’indexation de chaque URL modifiée ;
5. surveiller **Indexation des pages**, puis **Performances** après quelques
   jours ;
6. noter séparément les erreurs techniques, les pages explorées non indexées
   et les requêtes qui gagnent des impressions.

Répéter une demande d’indexation n’augmente ni sa priorité ni sa probabilité de
classement.

## Maillage cible

```text
Accueil
├── Guides
│   ├── Rentrée scolaire
│   ├── Abonnement scolaire
│   ├── Horaires
│   ├── Itinéraires
│   └── Lignes
├── Lignes scolaires
│   ├── Établissement
│   ├── Commune ou quartier
│   └── Arrêts
└── Télécharger / ouvrir Débusk
```

Les ancres doivent décrire la destination : « horaires de la ligne scolaire
8305-2 », et non « en savoir plus ».

## Mesure

Entonnoir principal :

```text
impression Google
→ clic vers une page Débusk
→ clic sur le CTA application
→ ouverture de la ligne ou de l’arrêt
→ ajout aux favoris
→ installation
→ retour à J+7
```

Indicateurs hebdomadaires :

- pages valides et indexées ;
- impressions, clics, position moyenne et CTR par cluster ;
- visiteurs organiques qui cliquent vers l’application ;
- lignes et arrêts consultés après un clic SEO ;
- favoris ajoutés, installations et rétention à sept jours ;
- nombre et qualité des domaines locaux qui citent Débusk.

Événements produit recommandés : `seo_landing_view`, `seo_app_cta_click`,
`app_deep_link_opened`, `line_viewed`, `stop_viewed`, `favorite_line_added`,
`favorite_stop_added`, `pwa_installed` et `first_itinerary_found`.

## Points bloquants à lever

1. Les badges stores pointent encore vers des recherches génériques : fournir
   les URL exactes des fiches Débusk ou un CTA d’installation PWA fiable.
2. Le site ne peut pas encore ouvrir directement une ligne ou un arrêt précis
   dans l’application.
3. Les anciennes mentions « AixBus Live » doivent transmettre leur autorité au
   nouveau domaine par des liens mis à jour et, si possible, des redirections
   301 maintenues au moins un an.
4. Les pages ligne/arrêt doivent être alimentées par les données officielles et
   régénérées seulement après validation des horaires de rentrée.

## Règle de publication

Chaque nouvelle page doit avoir un titre et un H1 uniques, une URL canonique,
une date de vérification visible, une source officielle, au moins un lien
entrant interne, une destination utile après lecture et un contenu qui reste
compréhensible sans exécuter JavaScript.
