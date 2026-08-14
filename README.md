# Débusk — site

Site public de présentation de Débusk, construit avec Next.js, React et
vinext pour OpenAI Sites.

## Contenu

- page d’accueil et navigation dans `app/page.tsx`
- carrousel tactile des écrans de l’application dans `app/AppShowcase.tsx`
- formulaire de contact dans `app/ContactDialog.tsx`
- informations, confidentialité et sources dans `app/informations/page.tsx`
- styles responsives dans `app/globals.css`
- captures utilisées par le carrousel dans `public/app-screens/`

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
```

`npm test` produit le build de déploiement puis vérifie le rendu des pages et
les fonctions essentielles du site.
