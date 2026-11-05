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
    image: '/images/journal/coastal-road.jpg',
    imageAlt: { fr: "Route côtière du Maroc le long de l'Atlantique", en: "Morocco’s coastal road along the Atlantic" },
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
    image: '/images/journal/seatbelt.jpg',
    imageAlt: { fr: "Ceinture de sécurité bouclée", en: "Buckling a seatbelt" },
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
    image: '/images/journal/car-inspection.jpg',
    imageAlt: { fr: "Moteur d'une voiture rouge en cours d'inspection", en: "Red car engine during a mechanical inspection" },
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
    image: '/images/journal/moroccan-passport.jpg',
    imageAlt: { fr: "Passeport marocain", en: "Moroccan passport" },
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
    image: '/images/journal/agadir-airport-terminal.jpg',
    imageAlt: { fr: "Terminal de l’aéroport Agadir Al Massira", en: "Agadir Al Massira airport terminal" },
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
    image: '/images/journal/marrakech-medina.jpg',
    imageAlt: { fr: "Fabricant de lampes dans la médina de Marrakech", en: "Lamp maker in the Marrakech medina" },
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
    image: '/images/journal/paradise-valley.jpg',
    imageAlt: { fr: "Souk de palmiers de la vallée du Paradis au Maroc", en: "Palm oasis in Morocco’s Paradise Valley" },
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
    image: '/images/journal/child-seat.jpg',
    imageAlt: { fr: "Siège auto Inglesina Marco Polo pour enfant", en: "Inglesina Marco Polo child car seat" },
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
    image: '/images/journal/dashboard.jpg',
    imageAlt: { fr: "Tableau de bord d’une Mercedes-Benz C250", en: "Mercedes-Benz C250 dashboard" },
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
    image: '/images/journal/agadir-beach.jpg',
    imageAlt: { fr: "Plage d’Agadir au crépuscule", en: "Agadir beach at dusk" },
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
    image: '/images/journal/moroccan-dirham.jpg',
    imageAlt: { fr: "Billets en dirhams marocains", en: "Moroccan dirham banknotes" },
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
