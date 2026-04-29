# D3VisionProd — Portfolio

Portfolio vidéaste · Next.js 16 · Convex · Tailwind v4 · Resend.

Tout le contenu (hero, projets, services, témoignages, process, FAQ, contact, footer, branding) est éditable depuis un espace admin protégé par mot de passe.

## Première mise en route

### 1. Installer les dépendances
```bash
npm install
```

### 2. Initialiser Convex (interactif)
```bash
npx convex dev
```
Cette commande te demande de te connecter, crée un projet Convex et écrit `NEXT_PUBLIC_CONVEX_URL` + `CONVEX_DEPLOYMENT` dans `.env.local`. Garde-la qui tourne en arrière-plan : elle resynchronise les fichiers `convex/*.ts` à chaque modif.

> Au premier run, les fichiers de `convex/_generated/` sont des stubs : `convex dev` les remplace par les versions générées avec types complets.

### 3. Configurer les variables d'environnement
Copie `.env.example` vers `.env.local` et remplis :
- `ADMIN_PASSWORD` — mot de passe d'accès à `/admin`
- `ADMIN_SESSION_SECRET` — clé de signature du cookie de session (32+ caractères aléatoires)
- `ADMIN_TOKEN` — token partagé entre Next et Convex (32+ caractères aléatoires)
- `RESEND_API_KEY` + `OWNER_EMAIL` — pour recevoir les demandes de devis par email (optionnel)

Puis, côté Convex, pose la même valeur d'`ADMIN_TOKEN` :
```bash
npx convex env set ADMIN_TOKEN <même valeur que .env.local>
```

### 4. Lancer le dev
```bash
npm run dev
# en parallèle :
npx convex dev
```

### 5. Initialiser le contenu
- Va sur [http://localhost:3000/login](http://localhost:3000/login) avec ton mot de passe.
- Sur le dashboard admin, clique sur « Initialiser le contenu » : ça insère le contenu par défaut du design (hero, projets, services, témoignages, etc.).
- Recharge la page d'accueil — tout le contenu est en place.

## Structure

```
convex/                    # backend Convex
├── schema.ts              # tables (settings, marquee, stats, services, projects, testimonials, processSteps, faq, quoteRequests)
├── content.ts             # queries publiques + mutations admin (validées par token)
├── quotes.ts              # créer / lister / changer le statut d'une demande de devis
├── seed.ts                # mutation seedAll (idempotente)
└── auth.ts                # requireAdmin(token)

src/
├── app/
│   ├── page.tsx           # site public (RSC, fetch Convex côté serveur)
│   ├── layout.tsx         # fonts, grain, variables CSS dynamiques
│   ├── globals.css        # tokens du design (--bg, --accent, --ink…) + utilities (.btn, .display, .reveal, …)
│   ├── login/             # page de connexion admin
│   ├── admin/             # toutes les pages CRUD
│   └── api/
│       ├── login, logout
│       ├── quote          # POST formulaire devis → Convex + email Resend
│       └── admin/[entity] # CRUD passe-plat, vérifie le cookie puis appelle Convex
├── components/
│   ├── site/              # composants du site public
│   └── admin/             # composants admin
├── lib/
│   ├── auth.ts            # cookie HMAC SHA-256 (Web Crypto)
│   ├── convex-server.ts   # ConvexHttpClient pour RSC + routes API
│   └── content.ts         # fetchSiteContent() — query parallèle de toutes les collections
└── proxy.ts               # protège /admin/* et /api/admin/* (cookie requis, redirige /login sinon)
```

## Espace admin

- `/admin` — Devis reçus (lus / traités / supprimés)
- `/admin/settings` — Branding (couleur, logo), titres de chaque section, infos contact, footer, etc.
- `/admin/marquee`, `/stats`, `/services`, `/projects`, `/testimonials`, `/process`, `/faq` — CRUD par entité avec champ `order` pour le tri.

## Déploiement

- Front : Vercel (`vercel deploy`)
- Backend : Convex (`npx convex deploy`)
- Variables prod à poser : les 4 d'admin/Resend côté Vercel, et `npx convex env set ADMIN_TOKEN ...` côté prod Convex

## Inspiration / source

Design exporté depuis Claude Design (`Q6Zw_n9ZKzgf4MbxQqQEVQ`). Voir le bundle original pour les screenshots de référence.
