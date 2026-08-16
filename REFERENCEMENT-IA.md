# Référencement de Débusk dans les moteurs et assistants IA

État de la stratégie au 16 août 2026.

## Objectif réaliste

Rendre Débusk accessible, identifiable et suffisamment fiable pour pouvoir être cité lorsqu’un utilisateur demande une application de bus à Aix-en-Provence.

### Ce qui est garanti

- Autoriser un robot permet au moteur concerné de visiter le site.
- Une page indexée, accessible et autorisée à produire un extrait peut devenir une source d’une réponse IA.
- Search Console et Bing Webmaster Tools permettent de contrôler une partie de cette éligibilité et de mesurer certaines apparitions.

### Ce qui n’est pas garanti

- Aucun réglage ne peut obliger ChatGPT, Gemini, Perplexity ou Copilot à recommander Débusk.
- L’autorisation d’un robot, un sitemap, Schema.org, IndexNow ou `llms.txt` ne garantit ni l’indexation, ni une citation, ni une première position.
- Autoriser un robot d’entraînement ne produit pas une recommandation immédiate dans un assistant.
- Il ne faut pas utiliser de faux avis, de mentions achetées non déclarées ou de texte caché demandant à une IA de recommander Débusk.

## Blocage prioritaire

Les boutons du site pointent encore vers des **pages de recherche** App Store et Google Play. Les URL directes des fiches Débusk manquent.

À faire dès leur disponibilité :

1. remplacer les deux URL de recherche par les fiches directes ;
2. relier ces URL à l’entité `MobileApplication` avec `downloadUrl`, `installUrl` ou `offers.url` ;
3. ajouter uniquement les profils officiels réellement créés dans `sameAs` ;
4. ne jamais inventer une URL de store, une note ou un nombre d’avis.

Sans fiche directe et installable, les moteurs ont plus de difficulté à confirmer que Débusk est une application réelle et disponible.

## P0 — à faire maintenant

### 1. Autoriser et contrôler les robots

Le `robots.txt` actuel autorise `User-agent: *` sur `/` : cela couvre déjà les robots ci-dessous. Des groupes explicites sont facultatifs et n’améliorent pas le classement ; ils servent seulement à rendre l’intention plus lisible. Vérifier également que Vercel ou un pare-feu ne bloque pas leurs plages IP officielles.

| Robot | Usage | Décision Débusk |
| --- | --- | --- |
| `OAI-SearchBot` | Sources de ChatGPT Search | Autoriser |
| `GPTBot` | Entraînement futur OpenAI, séparé de Search | Autoriser seulement si cette utilisation est acceptée |
| `ChatGPT-User` | Consultation déclenchée par un utilisateur | Ne détermine pas l’éligibilité à Search |
| `PerplexityBot` | Index et citations Perplexity | Autoriser |
| `Perplexity-User` | Consultation déclenchée par un utilisateur | Laisser accessible |
| `Googlebot` | Google Search, AI Overviews et AI Mode | Autoriser |
| `Google-Extended` | Entraînement et grounding de certains services Gemini ; aucun effet sur le classement Google Search | Autoriser seulement si cette utilisation est acceptée |
| `Bingbot` | Bing et expériences alimentées par son index, dont Copilot | Autoriser |

Décision actuelle : afin de maximiser l’accessibilité demandée pour Débusk,
le wildcard autorise aussi `GPTBot` et `ClaudeBot`. Cela vaut consentement au
crawl d’entraînement correspondant, mais ne procure aucun bonus de classement
et ne garantit aucune recommandation future.

Ne pas ajouter `noindex`, `nosnippet`, `noarchive` ou `nocache` aux pages publiques à faire citer. Ces directives peuvent empêcher ou limiter leur utilisation dans les résultats et réponses IA.

Sources : [OpenAI Crawlers](https://developers.openai.com/api/docs/bots), [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended), [contrôles Bing](https://www.bing.com/webmasters/help/robots-meta-tags-and-attributes-that-bing-supports-5198d240).

### 2. Activer l’éligibilité IA dans Google Search Console

Dans la propriété de domaine `debusk.fr` :

1. ouvrir **Settings → Search generative AI** ;
2. vérifier **Include my site's links and content in Search generative AI features** ;
3. laisser les pages indexables et autorisées à produire des extraits ;
4. consulter le rapport **Generative AI performance** s’il est déjà disponible pour la propriété.

Ce réglage couvre notamment AI Overviews, AI Mode et certaines fonctions génératives de Discover. Il est activé par défaut, mais doit être vérifié.

Sources : [contrôle Search generative AI](https://support.google.com/webmasters/answer/16908024?hl=en), [rapport Generative AI performance](https://support.google.com/webmasters/answer/16984139?hl=en), [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).

### 3. Configurer Bing Webmaster Tools et IndexNow

1. importer la propriété depuis Google Search Console dans [Bing Webmaster Tools](https://www.bing.com/webmasters/) ;
2. soumettre `https://www.debusk.fr/sitemap.xml` ;
3. vérifier l’indexation des pages principales et l’accès de `Bingbot` ;
4. mettre en place IndexNow pour notifier seulement les URL ajoutées, mises à jour ou supprimées ;
5. ouvrir **AI Performance** pour suivre les citations, les pages citées et les requêtes de grounding dans Copilot et les autres surfaces prises en charge.

IndexNow accélère la découverte d’un changement ; une réponse HTTP réussie confirme la réception, pas l’indexation.

Sources : [Bing Webmaster Tools](https://blogs.bing.com/webmaster/June-2025/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility), [AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview), [IndexNow](https://www.indexnow.org/documentation), [sitemaps et recherche IA](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search).

### 4. Consolider l’entité Débusk

Après réception des URL directes des stores, relier dans le JSON-LD :

- le site `WebSite` ;
- l’éditeur `Organization` ;
- l’application `MobileApplication` ;
- le logo et les captures réelles ;
- les fiches App Store et Google Play ;
- l’adresse de contact et les profils officiels vérifiés.

Utiliser des `@id` stables et les mêmes nom, URL, logo et description partout. Les données structurées doivent reproduire le contenu visible. Elles clarifient l’entité et peuvent rendre l’application éligible à certains résultats enrichis, sans garantir une citation IA.

Sources : [structured data Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [structured data SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app).

## P1 — autorité et contenu citable

### Une page de référence sur l’application

Présenter une réponse courte et autonome, puis un tableau factuel :

> Débusk est une application mobile gratuite et indépendante pour consulter les horaires, itinéraires, lignes, perturbations et certaines positions communautaires des bus à Aix-en-Provence.

Préciser les plateformes, le prix, le besoin ou non d’un compte, la couverture exacte, la date des données, leurs sources et les limites connues. Garder ces informations à jour et visibles en HTML.

### Des preuves originales et datées

- publier un changelog de l’application ;
- expliquer qui édite Débusk et comment les données sont obtenues ;
- dater les vérifications de lignes et de couverture ;
- utiliser des titres explicites, des réponses courtes, des tableaux et de vraies FAQ ;
- citer les sources officielles de transport sans laisser croire à une affiliation.

Google et Bing recommandent du contenu original, précis, structuré, à jour et utile. Multiplier des pages presque identiques ou réécrire le même texte pour chaque formulation est contre-productif.

Sources : [guide Google pour la recherche générative](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [guide Microsoft pour les réponses IA](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers).

### Des mentions externes authentiques

Rechercher de vraies publications et de vrais liens depuis :

- la presse locale et les médias étudiants ;
- les associations de parents ou d’usagers ;
- les blogs et annuaires aixois de qualité ;
- les profils sociaux officiels ;
- la page GitHub du projet ;
- les avis authentiques des fiches App Store et Google Play.

Une mention doit décrire Débusk honnêtement et pointer vers le site ou la fiche du store. Ne jamais fabriquer une recommandation, un partenariat ou une affiliation avec Aix en Bus, Keolis ou La Métropole Mobilité. Google confirme que ses fonctions génératives peuvent exploiter ce qui est dit dans les blogs, vidéos et forums, mais déconseille explicitement les mentions artificielles.

Source : [guide Google pour la recherche générative](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## `llms.txt` : facultatif et expérimental

`llms.txt` est une convention émergente, pas un levier de classement garanti et pas un remplacement de `robots.txt` ou du sitemap.

- Google Search déclare ne pas l’utiliser pour Search, AI Overviews ou AI Mode : le fichier n’aide ni ne pénalise le classement.
- Lighthouse le considère comme facultatif pour orienter certains agents de navigation.
- OpenAI, Perplexity et Bing ne documentent aucun avantage de citation ou de classement pour un `llms.txt` publié par un site commercial.

Il peut être ajouté plus tard comme index concis des pages principales, à condition de le maintenir exact. Il reste moins prioritaire que les URL directes des stores, Bing Webmaster Tools, IndexNow et l’identité structurée.

Sources : [position de Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [audit Lighthouse facultatif](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

## Mesure hebdomadaire

Chaque semaine :

1. relever dans Bing **AI Performance** les citations, pages citées et grounding queries ;
2. relever dans Search Console les impressions du rapport génératif, s’il est disponible ;
3. contrôler l’indexation des pages prioritaires dans Google et Bing ;
4. surveiller les visites provenant de ChatGPT, Perplexity, Copilot, Bing et Gemini, ainsi que les passages des robots dans les journaux disponibles ;
5. tester dans des sessions neuves un même panel de questions, par exemple :
   - « Quelle application gratuite pour prendre le bus à Aix-en-Provence ? »
   - « Quelle app pour les horaires Aix en Bus ? »
   - « Quelle application pour préparer la ligne L50 entre Aix et Marseille ? »
   - « Application bus scolaire pour la rentrée à Aix-en-Provence »
6. noter la date, l’assistant, la présence de Débusk, la présence d’une citation et l’exactitude de la réponse ;
7. corriger les pages lorsque les données ou la couverture changent.

Une réponse isolée n’est pas une mesure fiable : les résultats varient selon la date, la localisation, le modèle et la formulation. L’indicateur pertinent est l’évolution des citations et mentions sur plusieurs semaines.
