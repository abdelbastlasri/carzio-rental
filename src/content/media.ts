/**
 * Single source of truth for the photography used by the Blog, News and FAQ.
 *
 * Every entry records the derivative that is served, the alt text for each
 * language, and where the underlying photograph came from. Most of the imagery
 * comes from the owner-supplied `new fotos`, `news blog`, `New image` and
 * `inspiration` folders; weak, mismatched or AI-generated scenes were replaced
 * with genuine Wikimedia Commons photographs. Every Commons file is recorded in
 * `src/data/photoCredits.ts` and in `docs/image-inventory.md`.
 *
 * Every one of the 37 editorial slots has its own source photograph. The only
 * deliberate exception is the Blog "Insurance & excess" category, which reuses
 * the owner-requested family-pickup photo already shown on hero slide 6. The
 * rest of the homepage, the location cards and the Explore carousel do not
 * reuse any of these files.
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
  source: 'news blog' | 'New image' | 'inspiration' | 'new fotos' | 'Wikimedia Commons';
}

export interface BlogCategoryMedia extends MediaEntry {
  alt: { fr: string; en: string };
}

const J = (file: string) => `/images/journal/${file}`;

/* ------------------------------------------------------------------ BLOG */

export const blogCategoryMedia: Record<string, BlogCategoryMedia> = {
  reservation: {
    file: 'blog-cat-reservation.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet les clés à un couple devant le terminal de l'aéroport d'Agadir Al Massira",
      en: 'A Carzio agent hands the keys to a couple outside the Agadir Al Massira airport terminal',
    },
  },
  assurance: {
    file: 'blog-cat-assurance.webp',
    source: 'new fotos',
    alt: {
      fr: "Une famille heureuse récupère sa voiture de location à l'aéroport d'Agadir, devant un agent Carzio",
      en: 'A happy family collects its rental car at Agadir airport in front of a Carzio agent',
    },
  },
  conditions: {
    file: 'blog-cat-conditions.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet les documents de location à une famille au comptoir de l'aéroport",
      en: 'A Carzio agent hands the rental documents to a family at the airport desk',
    },
  },
};

export const blogPostMedia: Record<string, BlogCategoryMedia> = {
  'age-permis-conducteurs-location-maroc': {
    file: 'blog-post-age-permis.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet une carte-clé à un couple souriant au comptoir de l'aéroport",
      en: 'A Carzio agent hands a key card to a smiling couple at the airport desk',
    },
  },
  'assurance-location-voiture-maroc': {
    file: 'blog-post-assurance.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio contrôle une Dacia avant la remise des clés, au moment où l'assurance et la franchise sont expliquées",
      en: 'A Carzio agent checks a Dacia before handover, when insurance and excess cover are explained',
    },
  },
  'reserver-voiture-agadir-guide': {
    file: 'blog-post-reserver.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio accueille une famille avec enfants devant l'aéroport d'Agadir",
      en: 'A Carzio agent welcomes a family with children outside Agadir airport',
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
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Plusieurs cartes bancaires alignées sur une surface blanche',
      en: 'Several credit cards laid out on a white surface',
    },
  },
  'reservation-documents': {
    file: 'news-cat-reservation-documents.webp',
    source: 'new fotos',
    alt: {
      fr: "Un couple présente ses documents au comptoir Carzio de l'aéroport d'Agadir",
      en: 'A couple presents its documents at the Carzio desk at Agadir airport',
    },
  },
  'aeroports-livraison': {
    file: 'news-cat-aeroports-livraison.webp',
    source: 'new fotos',
    alt: {
      fr: "Le parking de l'aéroport d'Agadir Al Massira avec plusieurs voitures garées et la tour de contrôle en arrière-plan",
      en: 'The Agadir Al Massira airport car park with several parked cars and the control tower behind',
    },
  },
  'villes-visites': {
    file: 'news-cat-villes-visites.webp',
    source: 'new fotos',
    alt: {
      fr: 'Une Dacia Stepway rouge garée sur un quai, avec des bateaux de pêche bleus et des remparts en arrière-plan',
      en: 'A red Dacia Stepway parked on a quay, with blue fishing boats and ramparts behind',
    },
  },
  'road-trips': {
    file: 'news-cat-road-trips.webp',
    source: 'New image',
    alt: {
      fr: "Une Dacia Sandero Stepway à l'aéroport d'Agadir, avec une planche de surf et la liaison Bordeaux–Agadir",
      en: 'A Dacia Sandero Stepway at Agadir airport, with a surfboard and the Bordeaux–Agadir route',
    },
  },
  'voyage-famille': {
    file: 'news-cat-voyage-famille.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio présente une voiture blanche à une famille avec valises devant l'aéroport d'Agadir",
      en: 'A Carzio agent presents a white car to a family with suitcases outside Agadir airport',
    },
  },
  'flotte-modeles': {
    file: 'news-cat-flotte-modeles.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Une voiture rouge garée près du port de plaisance d'Agadir",
      en: 'A red car parked by the marina in Agadir',
    },
  },
  evenements: {
    file: 'news-cat-evenements.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Le soleil se couche sur la baie d'Agadir et sa plage",
      en: 'The sun setting over Agadir bay and its beach',
    },
  },
  'budget-conseils': {
    file: 'news-cat-budget-conseils.webp',
    source: 'new fotos',
    alt: {
      fr: "Une famille signe son contrat de location au comptoir Carzio de l'aéroport d'Agadir",
      en: 'A family signs its rental contract at the Carzio desk at Agadir airport',
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
      fr: "Passage piéton et circulation dans une rue d'Agadir",
      en: 'Pedestrian crossing and traffic on an Agadir street',
    },
  },
  'assurance-complete-cinq-jours': {
    file: 'news-post-assurance-complete.webp',
    source: 'inspiration',
    alt: {
      fr: "Des voitures de location Carzio alignées à l'aéroport d'Agadir, prêtes à être couvertes",
      en: 'Carzio rental cars lined up at Agadir airport, ready to be covered',
    },
  },
  'caution-zero-mad': {
    file: 'news-post-caution-zero-mad.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une main introduit une carte bancaire dans un terminal de paiement bleu',
      en: 'A hand inserts a bank card into a blue payment terminal',
    },
  },
  'gps-ecran-tactile-modeles': {
    file: 'news-post-gps-ecran-tactile.webp',
    source: 'new fotos',
    alt: {
      fr: "Une main utilise l'écran CarPlay du tableau de bord d'une voiture de location",
      en: "A hand uses the CarPlay screen on a rental car's dashboard",
    },
  },
  'evenements-saisons-agadir': {
    file: 'news-post-evenements-saisons.webp',
    source: 'new fotos',
    alt: {
      fr: "Une famille marche vers la plage avec sa valise au coucher du soleil, devant une voiture noire siglée Carzio",
      en: 'A family walks to the beach with its suitcase at sunset, past a black Carzio-badged car',
    },
  },
  'livraison-aeroport-agadir': {
    file: 'news-post-livraison-aeroport.webp',
    source: 'new fotos',
    alt: {
      fr: "Une voyageuse avec sa valise devant une voiture de location au coffre ouvert, à l'aéroport d'Agadir Al Massira",
      en: 'A traveller with a suitcase beside a rental car with its boot open at Agadir Al Massira airport',
    },
  },
  'louer-voiture-famille-maroc': {
    file: 'news-post-louer-voiture-famille.webp',
    source: 'New image',
    alt: {
      fr: "Une famille avec ses bagages devant une Dacia Sandero à l'aéroport d'Agadir",
      en: 'A family with their luggage in front of a Dacia Sandero at Agadir airport',
    },
  },
  'road-trips-depuis-agadir': {
    file: 'news-post-road-trips.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Vue panoramique sur la plage de Taghazout',
      en: 'Panoramic view over Taghazout beach',
    },
  },
  'agadir-marrakech-essaouira-voiture': {
    file: 'news-post-agadir-marrakech-essaouira.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: "Les remparts et la Skala du port d'Essaouira au bord de l'Atlantique",
      en: 'The ramparts and Skala du Port in Essaouira on the Atlantic',
    },
  },
  'budget-location-voiture-agadir': {
    file: 'news-post-budget-location.webp',
    source: 'new fotos',
    alt: {
      fr: "Un homme charge une Peugeot 208 argentée au coffre ouvert, devant une station de lavage de l'aéroport",
      en: 'A man loads a silver Peugeot 208 with its boot open, in front of an airport car-wash bay',
    },
  },
};

/* ------------------------------------------------------------------ FAQ */

export const faqCategoryMedia: Record<string, MediaEntry> = {
  reservation: {
    file: 'faq-cat-reservation.webp',
    source: 'news blog',
    alt: {
      fr: "Voitures alignées au parking de l'aéroport d'Agadir",
      en: 'Cars lined up in the car park at Agadir airport',
      de: 'Fahrzeuge auf dem Parkplatz am Flughafen Agadir',
      es: 'Coches aparcados en el aparcamiento del aeropuerto de Agadir',
      pl: 'Samochody zaparkowane na parkingu lotniska w Agadirze',
    },
  },
  conditions: {
    file: 'faq-cat-conditions.webp',
    source: 'inspiration',
    alt: {
      fr: "Un conducteur devant les voitures de location à l'aéroport d'Agadir",
      en: 'A driver in front of the rental cars at Agadir airport',
      de: 'Ein Fahrer vor den Mietwagen am Flughafen Agadir',
      es: 'Un conductor delante de los coches de alquiler en el aeropuerto de Agadir',
      pl: 'Kierowca przed samochodami na wynajem na lotnisku w Agadirze',
    },
  },
  assurance: {
    file: 'faq-cat-assurance.webp',
    source: 'inspiration',
    alt: {
      fr: "Une Kia Sportage blanche de la flotte Carzio à l'aéroport d'Agadir",
      en: 'A white Kia Sportage from the Carzio fleet at Agadir airport',
      de: 'Ein weißer Kia Sportage aus der Carzio-Flotte am Flughafen Agadir',
      es: 'Un Kia Sportage blanco de la flota Carzio en el aeropuerto de Agadir',
      pl: 'Biały Kia Sportage z floty Carzio na lotnisku w Agadirze',
    },
  },
  'carburant-livraison': {
    file: 'faq-cat-carburant-livraison.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une station-service Afriquia au Maroc, avec ses pompes sous un auvent',
      en: 'An Afriquia petrol station in Morocco, with its pumps under a canopy',
      de: 'Eine Afriquia-Tankstelle in Marokko mit Zapfsäulen unter einem Vordach',
      es: 'Una gasolinera Afriquia en Marruecos, con sus surtidores bajo una marquesina',
      pl: 'Stacja paliw Afriquia w Maroku, z dystrybutorami pod wiatą',
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
