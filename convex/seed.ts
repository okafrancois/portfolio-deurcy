import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

const DEFAULT_SETTINGS = {
  key: "main",
  accent: "#f5c518",
  bgTone: "warm-black" as const,
  grain: true,
  logoMain: "D3",
  logoAccent: "Vision",
  logoSuffix: "Prod",
  siteTitle: "D3VisionProd — Portfolio",
  metaDescription:
    "Vidéaste freelance — captation, photo, post-production, écriture. Production vidéo cinématographique pour marques, mariages et créateurs.",
  heroEyebrow: "Studio créatif · Vidéo & image · Depuis 2021",
  heroBgWord: "vision in motion",
  heroTitleLine1: "Les vidéos",
  heroTitleLine2: "fades ne",
  heroTitleEm: "vendent rien.",
  heroSignatureName: "Dercy",
  heroDescription:
    "Je crée des contenus visuels cinématographiques — captation, photo, écriture, post-production — qui captivent votre audience et transforment votre message en expérience inoubliable.",
  heroPrimaryCta: "Voir mes projets",
  heroSecondaryCta: "Demander un devis",
  workTitleLine1: "Travaux",
  workTitleEm: "récents.",
  workIntro:
    "Une sélection de projets qui ont marqué et transformé la vision de mes clients. Chaque film, chaque image, pensé et tourné sur-mesure.",
  workCta: "Discuter d'un projet",
  servicesTitleLine1: "Cinq façons de",
  servicesTitleLine2: "donner vie à",
  servicesTitleEm: "votre vision.",
  processTitleLine1: "Du brief au master",
  processTitleEm: "final.",
  avisTitleLine1: "Ce que disent mes",
  avisTitleEm: "clients.",
  avisRating: "★★★★★   5.0 / 5 · 30+ AVIS",
  aboutTitleLine1: "Je crée des images",
  aboutTitleEm: "qui marquent.",
  aboutBody1:
    "Vidéaste indépendant, je travaille avec des marques, des entrepreneurs et des particuliers qui veulent sortir du flot des contenus génériques.",
  aboutBody2:
    "Mon approche : du temps avec vous, une écriture précise, une captation cinéma, une post-production qui peaufine chaque détail. Je m'occupe aussi de l'écriture de scénarios, de la production exécutive et de l'adaptation pour les réseaux sociaux — vous avez un seul interlocuteur, du brief au master.",
  aboutPortraitLabel: "Dercy · Réalisateur",
  aboutMiniGrid: [
    { k: "5+ ans", v: "d'expérience cinéma & image" },
    { k: "FR & 🌍", v: "France et international" },
    { k: "Solo / équipe", v: "selon l'ampleur du projet" },
    { k: "RED · Sony · Drone", v: "matériel pro, livré" },
  ],
  faqTitleLine1: "Avant de se",
  faqTitleEm: "parler.",
  contactTitleLine1: "Prêt à créer quelque chose",
  contactTitleEm: "d'exceptionnel ?",
  contactEmail: "D3visionprod@gmail.com",
  contactPhone: "07 51 95 74 65",
  contactSocialHandle: "@d3_visionprod",
  contactSocialUrl: "#",
  contactReplyNotice:
    "Réponse sous 24h ouvrées. Pour les projets urgents, mentionnez-le dans votre message — on s'organise.",
  contactQuoteTypes: [
    "Captation Vidéo",
    "Photographie",
    "Mariage",
    "Interview",
    "Réseaux sociaux",
    "Autre",
  ],
  contactBudgets: ["< 2k", "2–5k", "5–10k", "10–25k", "25k+"],
  footerWordmark1: "D3Vision",
  footerWordmark2: "Prod.",
  footerTagline:
    "Production vidéo premium et direction artistique. Transformons votre vision en images inoubliables.",
  footerCopy: "© 2026 D3VISIONPROD — TOUS DROITS RÉSERVÉS",
  footerLocation: "BASÉ EN FRANCE · DISPONIBLE WORLDWIDE",
};

const MARQUEE = [
  "Captation",
  "Photographie",
  "Post-production",
  "Écriture",
  "Réseaux sociaux",
  "Direction artistique",
];

const STATS = [
  { num: "47K+", label: "Vues générées en 1 semaine" },
  { num: "4.2×", label: "Engagement moyen vs standard" },
  { num: "60+", label: "Projets livrés" },
  { num: "100%", label: "Clients qui recommandent" },
];

const SERVICES = [
  {
    num: "01",
    title: "Captation Vidéo",
    sub: "Tournage & Direction Image",
    body: "Captation cinématographique pour marques, événements et créateurs. Cadrage, lumière et direction d'image au standard du cinéma.",
    bullets: [
      "Direction photo & cadrage",
      "Tournage multi-caméras",
      "Stabilisation, mouvements, drone",
      "Format vertical / horizontal / cinéma",
    ],
  },
  {
    num: "02",
    title: "Photographie",
    sub: "Image fixe & still de tournage",
    body: "Captation d'images photo qui complètent le récit vidéo. Portraits, lifestyle, produit et reportage événementiel.",
    bullets: [
      "Direction artistique du shoot",
      "Portraits & branding",
      "Reportage événementiel",
      "Retouche couleur & livraison",
    ],
  },
  {
    num: "03",
    title: "Pré & Post-Production",
    sub: "Du brief à la livraison finale",
    body: "Tout le pipeline créatif : préparation, tournage, montage, étalonnage, sound-design et adaptations multi-formats.",
    bullets: [
      "Repérage & plan de tournage",
      "Montage & rythme narratif",
      "Étalonnage cinéma (color)",
      "Sound design & mixage",
    ],
  },
  {
    num: "04",
    title: "Écriture & Production",
    sub: "Scénario, concept, production exécutive",
    body: "De l'idée au plateau. Écriture de scénarios, conception de concepts publicitaires et coordination de production.",
    bullets: [
      "Concepts & moodboards",
      "Scénarios & storyboards",
      "Casting & repérages",
      "Production exécutive",
    ],
  },
  {
    num: "05",
    title: "Réseaux Sociaux",
    sub: "Stratégie & déclinaisons sociales",
    body: "Adaptation cinéma → social. Reels, TikTok, formats verticaux découpés à partir des rushes pour maximiser la portée.",
    bullets: [
      "Stratégie éditoriale",
      "Reels & TikTok natifs",
      "Sous-titres & hooks",
      "Calendrier & déclinaisons",
    ],
  },
];

const PROJECTS = [
  {
    title: "Campagne Produit Luxe",
    client: "Maison de montres",
    category: "Contenu",
    year: "2025",
    duration: "2:34",
    blurb:
      "Production vidéo premium pour le lancement d'une collection de montres de luxe. Mise en scène cinématographique et direction artistique premium.",
    tag: "campaign",
  },
  {
    title: "Mariage Cinématographique",
    client: "Amélie & Thomas",
    category: "Mariage",
    year: "2025",
    duration: "18:42",
    blurb:
      "Reportage de mariage avec approche documentaire et esthétique cinéma. Captation émotionnelle, étalonnage feature-film.",
    tag: "wedding",
  },
  {
    title: "Interview Entrepreneur Tech",
    client: "TechStart Innovation",
    category: "Interviews",
    year: "2025",
    duration: "5:12",
    blurb:
      "Série d'interviews pour une startup tech. Mise en valeur de l'expertise et de l'authenticité des fondateurs.",
    tag: "interview",
  },
  {
    title: "Festival Annuel — Aftermovie",
    client: "Festival Lumières",
    category: "Événementiel",
    year: "2024",
    duration: "3:08",
    blurb:
      "Aftermovie d'un festival culturel. 47 000 vues en une semaine, équipe réactive et rendu spectaculaire.",
    tag: "event",
  },
  {
    title: "Série Lifestyle — Mode Éthique",
    client: "Mode Éthique Paris",
    category: "Contenu",
    year: "2025",
    duration: "1:46",
    blurb:
      "Série de capsules lifestyle pour une marque de mode éthique. Engagement client jamais atteint auparavant.",
    tag: "campaign",
  },
  {
    title: "Film Institutionnel",
    client: "Association culturelle",
    category: "Événementiel",
    year: "2024",
    duration: "6:20",
    blurb:
      "Film institutionnel qui a touché des milliers de personnes. Approche narrative et qualité cinématographique.",
    tag: "event",
  },
  {
    title: "Mini-Doc — Atelier d'art",
    client: "Atelier Renaud",
    category: "Interviews",
    year: "2024",
    duration: "8:54",
    blurb:
      "Documentaire court sur le quotidien d'une artisane d'art. Captation immersive et écriture sur-mesure.",
    tag: "interview",
  },
  {
    title: "Mariage Bohème — Toscane",
    client: "Léa & Marco",
    category: "Mariage",
    year: "2024",
    duration: "14:20",
    blurb:
      "Mariage en Toscane. Captation 4K, drone, et étalonnage qui sublime la lumière dorée du soir.",
    tag: "wedding",
  },
];

const TESTIMONIALS = [
  {
    name: "Sophie Mercier",
    role: "Directrice Marketing",
    company: "Luxe Parisien",
    quote:
      "Dercy a transformé notre vision en images exceptionnelles. Son approche cinématographique a donné à notre marque une dimension premium que nous recherchions. Les vidéos ont généré 3 fois plus d'engagement que nos précédentes campagnes.",
    initials: "SM",
  },
  {
    name: "Amélie & Thomas",
    role: "Mariés",
    company: "Cérémonie 2025",
    quote:
      "Notre film de mariage est une œuvre d'art. Dercy a su capturer chaque émotion, chaque moment précieux avec une sensibilité et un œil artistique incroyables. Nous revivons notre journée à chaque visionnage.",
    initials: "A&T",
  },
  {
    name: "Nadia Benali",
    role: "CEO",
    company: "Mode Éthique Paris",
    quote:
      "Dercy comprend parfaitement l'identité de marque et sait la traduire en images authentiques. Sa série lifestyle pour notre collection a été un véritable succès, avec un engagement client jamais atteint auparavant.",
    initials: "NB",
  },
  {
    name: "Marc Lefebvre",
    role: "Fondateur",
    company: "TechStart Innovation",
    quote:
      "Professionnalisme absolu et créativité sans limite. D3Vision Prod a capturé l'essence de notre startup avec des interviews qui humanisent vraiment notre équipe. Le résultat dépasse toutes nos attentes.",
    initials: "ML",
  },
  {
    name: "Festival Lumières",
    role: "Direction artistique",
    company: "Événement annuel",
    quote:
      "Nous avons fait appel à D3Vision Prod pour couvrir notre festival annuel. L'équipe a été réactive, professionnelle et le rendu final est spectaculaire. Les 47 000 vues en une semaine parlent d'elles-mêmes.",
    initials: "FL",
  },
  {
    name: "Association Culturelle",
    role: "Direction",
    company: "Institutionnel",
    quote:
      "Le film institutionnel réalisé par D3Vision Prod a touché des milliers de personnes. L'approche narrative et la qualité cinématographique ont permis de sensibiliser et mobiliser bien au-delà de nos espérances.",
    initials: "AC",
  },
];

const PROCESS = [
  {
    num: "01",
    label: "Brief & écoute",
    body:
      "On part de votre vision, vos objectifs business et votre ton. Pas de template — chaque projet a son propre langage.",
  },
  {
    num: "02",
    label: "Concept & écriture",
    body:
      "Moodboard, scénario, plan de tournage. On sécurise l'idée avant de tourner un seul plan.",
  },
  {
    num: "03",
    label: "Tournage",
    body:
      "Captation cinéma, équipe ou solo selon l'ampleur. Direction d'image rigoureuse, ambiance détendue.",
  },
  {
    num: "04",
    label: "Post-production",
    body:
      "Montage, étalonnage, sound design. Rendu final livré en autant de formats qu'il vous faut.",
  },
];

const FAQ = [
  {
    q: "Combien coûte une vidéo ?",
    a: "Chaque projet est unique. Une capsule sociale démarre vers 800 €, un film de mariage autour de 1 800 €, une campagne marque sur devis selon ampleur, équipe et durée. Je propose toujours un devis détaillé après brief.",
  },
  {
    q: "Quels sont vos délais ?",
    a: "En général : 2–4 semaines entre le brief et le tournage, puis 2–3 semaines de post-production. Les urgences sont possibles avec un supplément express, on en parle au brief.",
  },
  {
    q: "Travaillez-vous seul ou en équipe ?",
    a: "Les deux. Pour les capsules sociales et interviews, je tourne souvent en solo (caméra + son + lumière). Pour les campagnes plus ambitieuses, je m'entoure d'une équipe testée — chef op, assistant, étalonneur.",
  },
  {
    q: "Vous déplacez-vous ?",
    a: "Oui, partout en France et à l'étranger. Les frais de déplacement sont devisés à part, en toute transparence.",
  },
  {
    q: "Qui possède les rushes ?",
    a: "Vous recevez les masters finaux dans les formats convenus. Les rushes bruts restent chez moi pour archive ; je peux les livrer en supplément si besoin.",
  },
];

export const seedAll = mutation({
  args: { token: v.string(), reset: v.optional(v.boolean()) },
  handler: async (ctx, { token, reset }) => {
    requireAdmin(token);

    if (reset) {
      const tables = [
        "settings",
        "marquee",
        "stats",
        "services",
        "projects",
        "testimonials",
        "processSteps",
        "faq",
      ] as const;
      for (const t of tables) {
        const all = await ctx.db.query(t).collect();
        for (const d of all) await ctx.db.delete(d._id);
      }
    }

    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();
    if (!existing) await ctx.db.insert("settings", DEFAULT_SETTINGS);

    const ensureEmpty = async (
      table:
        | "marquee"
        | "stats"
        | "services"
        | "projects"
        | "testimonials"
        | "processSteps"
        | "faq",
    ) => {
      const any = await ctx.db.query(table).first();
      return any === null;
    };

    if (await ensureEmpty("marquee")) {
      for (let i = 0; i < MARQUEE.length; i++) {
        await ctx.db.insert("marquee", { text: MARQUEE[i], order: i });
      }
    }
    if (await ensureEmpty("stats")) {
      for (let i = 0; i < STATS.length; i++) {
        await ctx.db.insert("stats", { ...STATS[i], order: i });
      }
    }
    if (await ensureEmpty("services")) {
      for (let i = 0; i < SERVICES.length; i++) {
        await ctx.db.insert("services", { ...SERVICES[i], order: i });
      }
    }
    if (await ensureEmpty("projects")) {
      for (let i = 0; i < PROJECTS.length; i++) {
        await ctx.db.insert("projects", { ...PROJECTS[i], order: i });
      }
    }
    if (await ensureEmpty("testimonials")) {
      for (let i = 0; i < TESTIMONIALS.length; i++) {
        await ctx.db.insert("testimonials", { ...TESTIMONIALS[i], order: i });
      }
    }
    if (await ensureEmpty("processSteps")) {
      for (let i = 0; i < PROCESS.length; i++) {
        await ctx.db.insert("processSteps", { ...PROCESS[i], order: i });
      }
    }
    if (await ensureEmpty("faq")) {
      for (let i = 0; i < FAQ.length; i++) {
        await ctx.db.insert("faq", { ...FAQ[i], order: i });
      }
    }

    return { ok: true };
  },
});
