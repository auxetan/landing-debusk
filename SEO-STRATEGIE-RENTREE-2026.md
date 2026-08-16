# Stratégie SEO Débusk — rentrée 2026

Dernière mise à jour : 16 août 2026

## Objectif

Faire de Débusk la réponse locale la plus utile aux recherches de rentrée autour des bus à Aix-en-Provence, puis convertir cette audience en téléchargements de l’application.

La stratégie vise d’abord les intentions où Débusk apporte une vraie réponse : horaires, itinéraires, lignes, perturbations, transport scolaire et liaisons Aix–Marseille. Elle ne doit pas promettre ce que l’app ne couvre pas encore.

## Positionnement à conserver partout

- Débusk est une application indépendante et non officielle.
- Débusk consulte et présente des données de transport ; il ne vend pas les abonnements.
- Une position de bus communautaire n’est visible que lorsqu’un voyageur contribue.
- Les démarches, tarifs, réservations et décisions contractuelles relèvent des organismes officiels.
- La ligne A2 existe officiellement, mais le flux Débusk vérifié le 16 août 2026 ne contient aucune course A2. Ne pas faire de publicité promettant des horaires Aix TGV ou aéroport avant correction.
- Le transport à la demande ne se réserve pas dans Débusk.

## Architecture éditoriale

### Pages piliers

- Accueil : proposition de valeur et téléchargement.
- `/guides` : annuaire éditorial par besoin.
- `/guide-rentree-bus-aix-en-provence` : checklist parents.
- `/transport-scolaire-aix-en-provence` : lignes et secteurs scolaires.
- `/horaires-bus-aix-en-provence` : prochains départs.
- `/itineraire-bus-aix-en-provence` : calcul de trajet.
- `/lignes-bus-aix-en-provence` : annuaire du réseau couvert.
- `/abonnement-bus-scolaire-aix-en-provence` : démarche officielle.
- `/application-bus-aix-en-provence` : démonstration visuelle du produit.

### Grands trajets

- `/bus-aix-marseille` : comparaison L49, L50 et L51.
- `/ligne-49-aix-marseille-arenc` : corridor Arenc et calendrier de semaine.
- `/ligne-50-aix-marseille-saint-charles` : liaison entre les deux gares routières.
- `/ligne-51-aix-marseille-par-rn` : arrêts intermédiaires le long de la RN.
- `/bus-aix-aeroport-marseille-provence` : guide officiel A2 avec limite Débusk clairement affichée.
- `/bus-aix-gare-tgv` : trajet en deux parties et même limite A2.

Ces trois pages de lignes comportent des parcours, calendriers et usages distincts. Après analyse des requêtes dans Search Console, les enrichir avec les changements réels plutôt que créer des variantes clonées.

### Services du réseau

- `/perturbations-bus-aix-en-provence` : officiel contre communautaire.
- `/bus-a-la-demande-pays-aix` : secteurs et réservation officielle.
- `/keolis-aix-en-bus-metropole-mobilite` : explication factuelle des acteurs.
- `/boutique-bus-aix-office-tourisme` : point de vente officiel et préparation des justificatifs.

### Quartiers et communes

Les pages publiables possèdent chacune des lignes, terminus et dessertes scolaires distincts :

- La Duranne : 15, 18 et 8305.
- Les Milles : 14, 8301-4 et 8305.
- Puyricard–Couteron : 11, 12, 13, 8301 et 8303.
- Luynes : 11 et 8404.
- Venelles : 25, 8377 et 8379.
- Éguilles : 26 et secteur TAD officiel.
- Le Tholonet : 13 et 8405.
- Saint-Marc-Jaumegarde : 21.
- Célony : 22.

Ne pas multiplier les pages de villes ou d’arrêts en remplaçant seulement le nom. Google assimile ces variantes à des pages satellites lorsqu’elles sont essentiellement identiques et redirigent toutes vers le même téléchargement.

## Google Images

Les métadonnées EXIF ne sont pas un levier de classement documenté. Les champs IPTC et C2PA servent surtout aux crédits, licences et informations de provenance.

Priorités :

1. Utiliser de vraies captures de l’application en `<img>` ou via `next/image`, pas en simple image CSS.
2. Donner à chaque capture un nom de fichier descriptif et stable.
3. Écrire un texte alternatif naturel qui décrit précisément ce que montre l’écran.
4. Ajouter une légende visible et du texte pertinent autour de l’image.
5. Déclarer l’image principale dans les métadonnées Open Graph et les données structurées.
6. Inclure les images dans le sitemap.
7. Garder une taille suffisante, un format responsive et un poids raisonnable.

Ne jamais remplir un `alt` ou un champ EXIF d’une liste comme « Keolis Aix en Bus horaires abonnement bus scolaire ». Ce serait inutile pour l’utilisateur et assimilable à du bourrage de mots-clés.

## Marques : SEO naturel et Google Ads

« Acheter le référencement » signifie acheter des annonces Google Ads ; on ne peut pas acheter une première position naturelle.

Google autorise généralement une marque concurrente comme mot-clé, mais peut restreindre son utilisation visible dans l’annonce lorsqu’elle crée une confusion. En Europe, l’absence de lien économique doit être immédiatement compréhensible.

Règles Débusk :

- Le nom affiché de l’annonceur reste toujours « Débusk ».
- Ne jamais reprendre un logo Keolis, Aix en Bus, La Métropole Mobilité ou Office de Tourisme sans autorisation.
- Ne jamais écrire « application officielle », « partenaire » ou « l’app Aix en Bus ».
- La page d’arrivée affiche au-dessus de la ligne de flottaison : « Application indépendante et non officielle ».
- Les marques ne sont citées dans le contenu naturel que pour informer et orienter, avec des sources.

### Campagne Google Ads à préparer, mais pas à lancer sans budget validé

Groupes de mots-clés de départ :

- Horaires : `[horaires bus aix]`, `[horaire bus aix en provence]`, `[prochain bus aix]`.
- Application : `[application bus aix]`, `[appli bus aix en provence]`, `[aix en bus application]`.
- Rentrée : `[bus scolaire aix]`, `[ligne scolaire aix]`, `[horaire bus scolaire aix]`.
- Itinéraire : `[itineraire bus aix]`, `[trajet bus aix en provence]`.
- Aix–Marseille : `[bus aix marseille]`, `[ligne 50 aix marseille]`, `[ligne 51 aix marseille]`.

À exclure au lancement : `emploi`, `recrutement`, `salaire`, `stage`, `contact keolis`, `siège`, `appel d’offres`, ainsi que les communes ou réseaux non couverts.

Ne pas acheter les intentions aéroport/TGV tant que les courses A2 ne sont pas exploitables dans Débusk.

Exemple d’annonce prudente :

> **Horaires de bus à Aix** — Itinéraires, arrêts et prochains passages dans Débusk. Application indépendante pour mieux préparer les trajets.

Page d’arrivée recommandée : `/application-bus-aix-en-provence`, avec liens profonds vers la rentrée, les horaires et Aix–Marseille.

## Acquisition de liens locaux

Les liens doivent venir de ressources réellement utiles, pas d’achats de liens artificiels.

Priorités de prospection :

- Office de Tourisme d’Aix : proposer l’ajout éditorial de Débusk dans une page existante « se déplacer » ou « applications utiles ».
- Associations de parents d’élèves : partager le guide de rentrée, pas seulement la page de téléchargement.
- Établissements et BDE : proposer la page du secteur concerné après validation factuelle des lignes.
- Médias locaux et newsletters de quartier : raconter l’utilité communautaire du projet et la couverture de rentrée.
- Associations étudiantes d’Aix et Marseille : mettre en avant L49/L50/L51 et signaler clairement la limite RTM.

Un lien payé doit être qualifié `rel="sponsored"` ou `nofollow`. Ne pas acheter de liens « dofollow » ou de faux articles partenaires.

## Search Console après chaque publication

1. Soumettre `https://www.debusk.fr/sitemap.xml` une seule fois.
2. Inspecter en priorité l’accueil, `/guides`, le guide de rentrée, le hub scolaire, la page application et Aix–Marseille.
3. Demander l’indexation de ces pages piliers seulement ; Google découvrira les pages liées via le sitemap et le maillage interne.
4. Contrôler chaque semaine : pages indexées, requêtes, impressions, clics, CTR et position moyenne.
5. Repérer les requêtes qui obtiennent beaucoup d’impressions mais peu de clics, puis améliorer titre et description sans changer l’URL.
6. Fusionner ou supprimer une page si elle ne fournit pas de valeur unique et cannibalise une page pilier.

Le message « URL was added to a priority crawl queue » signifie seulement que la demande a été prise en compte. La répéter ne l’accélère pas et ne garantit pas l’indexation.

## Mesure du succès

Indicateurs SEO hebdomadaires :

- nombre de pages valides indexées ;
- impressions non liées à la marque Débusk ;
- clics sur les requêtes rentrée, scolaire, horaires, itinéraire et Aix–Marseille ;
- CTR par page ;
- requêtes nouvelles par quartier ou établissement ;
- erreurs d’exploration et Core Web Vitals.

Indicateurs produit à connecter ensuite :

- clics App Store et Google Play par page d’entrée ;
- taux clic vers store / session SEO ;
- installation attribuée lorsque les stores et le consentement le permettent ;
- coût par clic et coût par installation pour Google Ads.

## Calendrier

### 16–23 août

- Publier les clusters techniques et éditoriaux actuels.
- Soumettre le sitemap.
- Corriger le flux A2 avant toute promesse aéroport/TGV.
- Vérifier les titres, images, liens et rendus mobiles.

### 24–31 août

- Obtenir une validation terrain des principales lignes scolaires.
- Contacter associations de parents, établissements et ressources touristiques locales.
- Préparer la campagne Ads, sans l’activer avant validation du budget et du suivi des conversions.

### 1er–13 septembre

- Mettre à jour immédiatement toute modification officielle de rentrée.
- Publier seulement les pages établissements qui disposent de données uniques et vérifiées.
- Activer un test Ads plafonné si le budget, les mentions et le suivi sont prêts.

### Après la rentrée

- Consolider selon les requêtes réelles de Search Console.
- Mettre à jour les contenus plutôt que créer systématiquement de nouvelles URL.
- Développer les pages de lignes qui démontrent une demande et une couverture fiable.

## Sources de doctrine SEO et publicitaire

- [Google Images — bonnes pratiques](https://developers.google.com/search/docs/appearance/google-images)
- [Google — métadonnées et licences d’image](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Google — sitemaps d’images](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Google — règles antispam](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Ads — marques](https://support.google.com/adspolicy/answer/6118?hl=fr)
- [CJUE — Google France, C-236/08 à C-238/08](https://infocuria.curia.europa.eu/tabs/affair?lang=fr&publishedId=C-236%2F08)
