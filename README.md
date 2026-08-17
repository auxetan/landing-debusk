# [Débusk](https://www.debusk.fr) — application de bus à Aix-en-Provence

[Débusk](https://www.debusk.fr) est une application indépendante pour consulter
les horaires, préparer des itinéraires et retrouver les lignes de bus à
Aix-en-Provence. Son site public est construit avec Next.js et React. La
production est déployée sur Vercel depuis la branche `codex/landing-vercel` ;
vinext reste disponible pour le développement et les tests locaux.

- [Découvrir Débusk](https://www.debusk.fr)
- [Fonctions et couverture de l'application](https://www.debusk.fr/a-propos-debusk)
- [Guide du bus à Aix-en-Provence](https://www.debusk.fr/guide)

## Contenu

- page d’accueil et navigation dans `app/page.tsx`
- carrousel tactile des écrans de l’application dans `app/AppShowcase.tsx`
- formulaire de contact dans `app/ContactDialog.tsx`
- informations, confidentialité et sources dans `app/informations/page.tsx`
- guides SEO sur les horaires, itinéraires, lignes et transports scolaires
- métadonnées partagées, données structurées, `robots.txt` et sitemap
- styles responsives dans `app/globals.css`
- captures utilisées par le carrousel dans `public/app-screens/`
- feuille de route dans `SEO-STRATEGY.md`

Le site est public et ne contient aucun système de connexion ChatGPT.

## Développement

Node.js 22.13 ou plus récent est requis.

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run lint
npm test
npm run build:vercel
```

`npm test` produit le build de déploiement puis vérifie le rendu des pages et
les fonctions essentielles du site. `npm run build:vercel` reproduit le build
utilisé en production par Vercel.
