export interface NewsCategoryCopy {
  name: string;
  description: string;
}

export interface NewsCategory {
  slug: string;
  image: string;
  imageAlt: { fr: string; en: string };
  fr: NewsCategoryCopy;
  en: NewsCategoryCopy;
}

/**
 * Eleven news topics mapped from the competitor news index we analysed.
 * Categories stay in this order on the hub; only those with a published
 * article are linked, so no visitor lands on an empty page.
 */
export const newsCategories: NewsCategory[] = [
  {
    slug: 'conduite-maroc',
    image: '/images/journal/carzio-car-1.jpg',
    imageAlt: { fr: "Voiture Carzio sur la route près d’Agadir", en: "Carzio car on the road near Agadir" },
    fr: {
      name: 'Conduire au Maroc',
      description:
        'Routes, carburant, péages et habitudes locales pour conduire sereinement autour d’Agadir.',
    },
    en: {
      name: 'Driving in Morocco',
      description:
        'Roads, fuel, tolls and local habits for driving calmly around Agadir and beyond.',
    },
  },
  {
    slug: 'securite-regles',
    image: '/images/journal/carzio-car-3.jpg',
    imageAlt: { fr: "Voiture Carzio contrôlée avant le départ", en: "Carzio car checked before departure" },
    fr: {
      name: 'Sécurité & règles',
      description:
        'Vitesses, contrôles, stationnement et bons réflexes en cas d’incident sur la route.',
    },
    en: {
      name: 'Safety & rules',
      description:
        'Speed limits, checks, parking and the right reflexes if something happens on the road.',
    },
  },
  {
    slug: 'assurance-caution',
    image: '/images/journal/carzio-car-wash.jpg',
    imageAlt: { fr: "Voiture Carzio lavée et préparée avant la location", en: "Carzio car washed and prepared before rental" },
    fr: {
      name: 'Assurance & caution',
      description:
        'Assurance standard incluse, franchise et assurance complète expliquées simplement.',
    },
    en: {
      name: 'Insurance & deposit',
      description:
        'Standard insurance included, excess and full insurance explained without jargon.',
    },
  },
  {
    slug: 'reservation-documents',
    image: '/images/journal/carzio-car-2.jpg',
    imageAlt: { fr: "Voiture Carzio prête pour la remise des clés", en: "Carzio car ready for key handover" },
    fr: {
      name: 'Réservation & documents',
      description:
        'Demande en ligne, documents à présenter, paiement et annulation avant le départ.',
    },
    en: {
      name: 'Booking & paperwork',
      description:
        'Online request, documents to bring, payment and cancellation before pickup.',
    },
  },
  {
    slug: 'aeroports-livraison',
    image: '/images/journal/carzio-airport-agadir.jpg',
    imageAlt: { fr: "Signalétique de l’aéroport Agadir Al Massira", en: "Agadir Al Massira airport signage" },
    fr: {
      name: 'Aéroports & livraison',
      description:
        'Prise en charge à Agadir Al Massira, livraison en ville et tarifs par destination.',
    },
    en: {
      name: 'Airports & pickup',
      description:
        'Pickup at Agadir Al Massira, city delivery and pricing by destination.',
    },
  },
  {
    slug: 'villes-visites',
    image: '/images/journal/carzio-airport-bordeaux.jpg',
    imageAlt: { fr: "Vol vers Agadir au départ de l’aéroport de Bordeaux", en: "Flight to Agadir from Bordeaux airport" },
    fr: {
      name: 'Villes & visites',
      description:
        'Agadir, Marrakech, Casablanca et Essaouira : quoi voir et comment se déplacer.',
    },
    en: {
      name: 'Cities & sightseeing',
      description:
        'Agadir, Marrakech, Casablanca and Essaouira: what to see and how to get around.',
    },
  },
  {
    slug: 'road-trips',
    image: '/images/journal/carzio-winter-routes.jpg',
    imageAlt: { fr: "Nouvelles liaisons hivernales vers Agadir", en: "New winter routes to Agadir" },
    fr: {
      name: 'Road trips & itinéraires',
      description:
        'Boucles courtes depuis Agadir, étapes côtières et idées de week-end en voiture.',
    },
    en: {
      name: 'Road trips & itineraries',
      description:
        'Short loops from Agadir, coastal stops and weekend ideas by car.',
    },
  },
  {
    slug: 'voyage-famille',
    image: '/images/journal/carzio-car-4.jpg',
    imageAlt: { fr: "Voiture Carzio adaptée aux voyages en famille", en: "Carzio car suited to family trips" },
    fr: {
      name: 'Voyage en famille',
      description:
        'Sièges enfants, bagages, deuxième conducteur et choix du véhicule avec des enfants.',
    },
    en: {
      name: 'Family travel',
      description:
        'Child seats, luggage, second driver and choosing a car when travelling with children.',
    },
  },
  {
    slug: 'flotte-modeles',
    image: '/images/journal/carzio-car-5.jpg',
    imageAlt: { fr: "Voiture de la flotte Carzio à Agadir", en: "Carzio fleet car in Agadir" },
    fr: {
      name: 'Flotte & modèles',
      description:
        'Équipements réels des voitures Carzio : GPS, écran tactile, boîte automatique.',
    },
    en: {
      name: 'Fleet & models',
      description:
        'What each Carzio car actually has: GPS, touchscreen, automatic gearbox.',
    },
  },
  {
    slug: 'evenements',
    image: '/images/journal/carzio-milan-route.jpg',
    imageAlt: { fr: "Nouvelle liaison directe Milan – Agadir", en: "New direct Milan–Agadir route" },
    fr: {
      name: 'Événements & saisons',
      description:
        'Périodes chargées, vacances scolaires et grands rendez-vous à Agadir et au Maroc.',
    },
    en: {
      name: 'Events & seasons',
      description:
        'Busy periods, school holidays and major dates in Agadir and across Morocco.',
    },
  },
  {
    slug: 'budget-conseils',
    image: '/images/dacia-logan.png',
    imageAlt: { fr: "Dacia Logan de la flotte Carzio", en: "Dacia Logan from the Carzio fleet" },
    fr: {
      name: 'Budget & conseils',
      description:
        'Ce qui est inclus dans le prix, les extras gratuits et les faux frais à éviter.',
    },
    en: {
      name: 'Budget & practical tips',
      description:
        'What the price includes, the free extras and the avoidable costs.',
    },
  },
];

export function findNewsCategory(slug: string): NewsCategory | undefined {
  return newsCategories.find((category) => category.slug === slug);
}

export function getNewsCategoryCopy(
  slug: string,
  lang: 'fr' | 'en',
): NewsCategoryCopy {
  return findNewsCategory(slug)?.[lang] ?? { name: slug, description: '' };
}
