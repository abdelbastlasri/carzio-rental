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
    image: '/images/journal/news-driving-morocco.webp',
    imageAlt: { fr: "Voiture Carzio avec des voyageurs", en: "Carzio car with travellers" },
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
    image: '/images/journal/news-road-signs.webp',
    imageAlt: { fr: "Kia Sportage blanc de la flotte Carzio", en: "White Kia Sportage from the Carzio fleet" },
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
    image: '/images/journal/carzio-inspection-pair.webp',
    imageAlt: { fr: "Deux voitures inspectées sur le parking de l'aéroport", en: "Two cars inspected in the airport car park" },
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
    image: '/images/journal/carzio-documents-airport.webp',
    imageAlt: { fr: "Voyageur avec sa voiture de location à l'aéroport d'Agadir", en: "Traveller with a rental car at Agadir airport" },
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
    image: '/images/journal/carzio-airport-fleet.webp',
    imageAlt: { fr: "Voitures de location devant le terminal Agadir Al Massira", en: "Rental cars in front of Agadir Al Massira terminal" },
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
    image: '/images/journal/news-taghazout-night.webp',
    imageAlt: { fr: "Taghazout illuminée en bord de mer", en: "Taghazout lit up by the sea" },
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
    image: '/images/journal/news-tamraght-coast.webp',
    imageAlt: { fr: "Côte de Tamraght près d'Agadir", en: "Tamraght coast near Agadir" },
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
    image: '/images/journal/carzio-luggage-cars.webp',
    imageAlt: { fr: "Deux voitures avec coffres ouverts pour les bagages", en: "Two cars with open boots for luggage" },
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
    image: '/images/journal/touchscreen-carplay.webp',
    imageAlt: { fr: "Écran tactile Apple CarPlay dans une voiture", en: "Apple CarPlay touchscreen inside a car" },
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
    image: '/images/journal/carzio-junior-pro.webp',
    imageAlt: { fr: "Affiche Junior Pro Taghazout Bay 2026", en: "Junior Pro Taghazout Bay 2026 poster" },
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
    image: '/images/fleet/dacia-sandero-streetway.webp',
    imageAlt: { fr: "Dacia Sandero Streetway, modèle économique", en: "Dacia Sandero Streetway, an economical model" },
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
