/**
 * Single source of truth for the photography used by the Blog, News and FAQ.
 *
 * Every entry records the derivative that is served, the alt text for each
 * language, and where the underlying photograph came from. Sources are either
 * Carzio-owned photographs (owner folders: `news blog`, `New image`,
 * `inspiration`) or Wikimedia Commons files with a documented licence.
 *
 * The full provenance table lives in `docs/image-inventory.md`.
 */

export type MediaLang = 'fr' | 'en' | 'de' | 'es' | 'pl';

export interface MediaEntry {
  /** Served derivative, relative to /images/journal/. */
  file: string;
  /** Alt text per language. Meaningful images always carry a description. */
  alt: Partial<Record<MediaLang, string>>;
  /** Where the original photograph comes from. */
  source: 'news blog' | 'New image' | 'inspiration' | 'Wikimedia Commons';
}

export interface BlogCategoryMedia extends MediaEntry {
  alt: { fr: string; en: string };
}

const J = (file: string) => `/images/journal/${file}`;

/* ------------------------------------------------------------------ BLOG */

export const blogCategoryMedia: Record<string, BlogCategoryMedia> = {
  reservation: {
    file: 'blog-cat-reservation.webp',
    source: 'inspiration',
    alt: {
      fr: 'La page de réservation Carzio avec une voiture et les prix en dirhams',
      en: 'The Carzio booking page with a car and prices in dirhams',
    },
  },
  assurance: {
    file: 'blog-cat-assurance.webp',
    source: 'news blog',
    alt: {
      fr: 'Une Dacia Sandero Stepway blanche inspectée dans un parking souterrain',
      en: 'A white Dacia Sandero Stepway inspected in an underground car park',
    },
  },
  conditions: {
    file: 'blog-cat-conditions.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Installation d'une ceinture de sécurité et d'un siège enfant dans une voiture",
      en: 'Fitting a seat belt and a child seat in a car',
    },
  },
};

export const blogPostMedia: Record<string, BlogCategoryMedia> = {
  'age-permis-conducteurs-location-maroc': {
    file: 'blog-post-age-permis.webp',
    source: 'news blog',
    alt: {
      fr: "Le client reçoit sa carte et ses clés Carzio devant la voiture, à l'aéroport d'Agadir",
      en: 'The customer receives the Carzio card and keys in front of the car at Agadir airport',
    },
  },
  'assurance-location-voiture-maroc': {
    file: 'blog-post-assurance.webp',
    source: 'inspiration',
    alt: {
      fr: 'Une Dacia blanche, portes et coffre ouverts, contrôlée avant la remise des clés',
      en: 'A white Dacia with its doors and boot open, checked before the keys are handed over',
    },
  },
  'reserver-voiture-agadir-guide': {
    file: 'blog-post-reserver.webp',
    source: 'news blog',
    alt: {
      fr: "Une voiture de location garée devant le terminal de l'aéroport d'Agadir Al Massira",
      en: 'A rental car parked in front of the Agadir Al Massira airport terminal',
    },
  },
};

/* ----------------------------------------------------------------- NEWS */

export const newsCategoryMedia: Record<string, BlogCategoryMedia> = {
  'conduite-maroc': {
    file: 'news-cat-conduite-maroc.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Autoroute marocaine avec un panneau de direction bilingue',
      en: 'Moroccan motorway with a bilingual direction sign',
    },
  },
  'securite-regles': {
    file: 'news-cat-securite-regles.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Panneau de limitation à 40 km/h dans une rue d'Agadir",
      en: '40 km/h speed limit sign on an Agadir street',
    },
  },
  'assurance-caution': {
    file: 'news-cat-assurance-caution.webp',
    source: 'news blog',
    alt: {
      fr: 'Renault et Dacia Sandero Stepway garées à l’aéroport d’Agadir, prêtes à être récupérées',
      en: 'A Renault and a Dacia Sandero Stepway parked at Agadir airport, ready to be collected',
    },
  },
  'reservation-documents': {
    file: 'news-cat-reservation-documents.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Au comptoir, le client présente sa demande et ses documents',
      en: 'At the counter, the customer presents the request and the documents',
    },
  },
  'aeroports-livraison': {
    file: 'news-cat-aeroports-livraison.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Le terminal de l'aéroport d'Agadir Al Massira",
      en: 'The Agadir Al Massira airport terminal',
    },
  },
  'villes-visites': {
    file: 'news-cat-villes-visites.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Vue aérienne de la baie d’Agadir et de la ville',
      en: 'Aerial view of the bay of Agadir and the city',
    },
  },
  'road-trips': {
    file: 'news-cat-road-trips.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'La baie de Taghazout et ses montagnes, point de départ de la boucle côtière',
      en: 'The bay of Taghazout and its mountains, the start of the coastal loop',
    },
  },
  'voyage-famille': {
    file: 'news-cat-voyage-famille.webp',
    source: 'inspiration',
    alt: {
      fr: 'Affiche Carzio Junior Pro Taghazout Bay 2026 avec une Dacia Duster blanche',
      en: 'Carzio Junior Pro Taghazout Bay 2026 poster with a white Dacia Duster',
    },
  },
  'flotte-modeles': {
    file: 'news-cat-flotte-modeles.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Écran tactile de voiture avec navigation et CarPlay',
      en: 'Car touchscreen with navigation and CarPlay',
    },
  },
  evenements: {
    file: 'news-cat-evenements.webp',
    source: 'New image',
    alt: {
      fr: 'Affiche Carzio des nouvelles liaisons directes vers Agadir pour l’hiver',
      en: 'Carzio poster for the new direct winter routes to Agadir',
    },
  },
  'budget-conseils': {
    file: 'news-cat-budget-conseils.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Station de péage sur une autoroute au Maroc, vue aérienne',
      en: 'Toll plaza on a Moroccan motorway, seen from above',
    },
  },
};

export const newsPostMedia: Record<string, BlogCategoryMedia> = {
  'conduire-au-maroc-essentiel': {
    file: 'news-post-conduire-au-maroc.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Route nationale traversant une ville marocaine, avec circulation et palmiers',
      en: 'A national road crossing a Moroccan town, with traffic and palm trees',
    },
  },
  'securite-routiere-maroc-essentiel': {
    file: 'news-post-securite-routiere.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Passage piéton et circulation dans une rue d’Agadir',
      en: 'Pedestrian crossing and traffic on an Agadir street',
    },
  },
  'assurance-complete-cinq-jours': {
    file: 'news-post-assurance-complete.webp',
    source: 'New image',
    alt: {
      fr: 'Voitures de location alignées à l’aéroport d’Agadir, prêtes à être couvertes',
      en: 'Rental cars lined up at Agadir airport, ready to be covered',
    },
  },
  'caution-zero-mad': {
    file: 'news-post-caution-zero-mad.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une cliente règle en espèces et par carte, sans caution à déposer',
      en: 'A customer paying in cash and by card, with no deposit to leave',
    },
  },
  'gps-ecran-tactile-modeles': {
    file: 'news-post-gps-ecran-tactile.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Écran tactile de voiture affichant CarPlay sans fil',
      en: 'Car touchscreen running wireless CarPlay',
    },
  },
  'evenements-saisons-agadir': {
    file: 'news-post-evenements-saisons.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Coucher de soleil sur la plage d’Agadir',
      en: 'Sunset over Agadir beach',
    },
  },
  'livraison-aeroport-agadir': {
    file: 'news-post-livraison-aeroport.webp',
    source: 'inspiration',
    alt: {
      fr: "Les voitures de location alignées au parking de l'aéroport d'Agadir Al Massira",
      en: 'The rental cars lined up in the car park at Agadir Al Massira airport',
    },
  },
  'louer-voiture-famille-maroc': {
    file: 'news-post-louer-voiture-famille.webp',
    source: 'inspiration',
    alt: {
      fr: 'Une Dacia Duster avec la plaque CARZIO devant l’aéroport d’Agadir Al Massira',
      en: 'A Dacia Duster with a CARZIO plate at Agadir Al Massira airport',
    },
  },
  'road-trips-depuis-agadir': {
    file: 'news-post-road-trips.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une voiture rouge garée près de la marina d’Agadir',
      en: 'A red car parked near the Agadir marina',
    },
  },
  'agadir-marrakech-essaouira-voiture': {
    file: 'news-post-agadir-marrakech-essaouira.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Le port d’Essaouira et ses remparts',
      en: 'The port of Essaouira and its ramparts',
    },
  },
  'budget-location-voiture-agadir': {
    file: 'news-post-budget-location.webp',
    source: 'news blog',
    alt: {
      fr: 'Une Renault Clio grise, modèle économique de la flotte Carzio',
      en: 'A grey Renault Clio, an economical model in the Carzio fleet',
    },
  },
};

/* ------------------------------------------------------------------ FAQ */

export const faqCategoryMedia: Record<string, MediaEntry> = {
  reservation: {
    file: 'faq-cat-reservation.webp',
    source: 'inspiration',
    alt: {
      fr: "Une Kia Sportage blanche de la flotte Carzio au parking de l'aéroport d'Agadir",
      en: 'A white Kia Sportage from the Carzio fleet in the car park at Agadir airport',
      de: 'Fahrzeuge auf dem Parkplatz am Flughafen Agadir',
      es: 'Coches aparcados en el aparcamiento del aeropuerto de Agadir',
      pl: 'Samochody zaparkowane na parkingu lotniska w Agadirze',
    },
  },
  conditions: {
    file: 'faq-cat-conditions.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une carte de permis de conduire européenne',
      en: 'A European driving licence card',
      de: 'Ein Fahrer vor den Mietwagen am Flughafen Agadir',
      es: 'Un conductor delante de los coches de alquiler en el aeropuerto de Agadir',
      pl: 'Kierowca przed samochodami na wynajem na lotnisku w Agadirze',
    },
  },
  assurance: {
    file: 'faq-cat-assurance.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Un petit dommage sur le parafend d'une voiture, constaté sur un parking",
      en: "A small dent on a car's fender, noticed in a car park",
      de: 'Ein weißer Kia Sportage aus der Carzio-Flotte am Flughafen Agadir',
      es: 'Un Kia Sportage blanco de la flota Carzio en el aeropuerto de Agadir',
      pl: 'Biały Kia Sportage z floty Carzio na lotnisku w Agadirze',
    },
  },
  'carburant-livraison': {
    file: 'faq-cat-carburant-livraison.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une station-service Afriquia au Maroc',
      en: 'An Afriquia fuel station in Morocco',
      de: 'Reihen von Mietwagen, startklar am Flughafen Agadir',
      es: 'Filas de coches de alquiler listos para salir en el aeropuerto de Agadir',
      pl: 'Rzędy samochodów na wynajem gotowych do wyjazdu na lotnisku w Agadirze',
    },
  },
  'conduite-maroc': {
    file: 'faq-cat-conduite-maroc.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Autoroute marocaine qui traverse un paysage de montagnes rouges',
      en: 'Moroccan motorway crossing a red-rock landscape',
      de: 'Marokkanische Autobahn durch eine Landschaft roter Felsen',
      es: 'Autopista marroquí que atraviesa un paisaje de montañas rojas',
      pl: 'Marokańska autostrada przecinająca krajobraz czerwonych skał',
    },
  },
};

export function mediaImage(entry: MediaEntry | undefined, fallback?: string): string {
  return entry ? J(entry.file) : fallback || '';
}
