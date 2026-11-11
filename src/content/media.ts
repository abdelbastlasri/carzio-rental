/**
 * Single source of truth for the photography used by the Blog, News and FAQ.
 *
 * Every entry records the derivative that is served, the alt text for each
 * language, and where the underlying photograph came from. All of the imagery
 * in this file now comes from the owner-supplied `new fotos` folder; no
 * third-party photograph is published any more, so `src/data/photoCredits.ts`
 * is intentionally empty.
 *
 * Blog and FAQ never share a source, no page repeats a source internally (the
 * News hub has two unavoidable repeats because it has 23 slots for 21 photos),
 * and no source is used more than twice. The homepage, location cards and
 * Explore carousel do not reuse any of these files.
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
      fr: "Un SUV blanc garé dans le parking de l'aéroport, coffre et portière ouverts",
      en: 'A white SUV parked at the airport car park with its boot and door open',
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
      fr: "Un agent Carzio remet les clés à un couple au comptoir de l'aéroport d'Agadir Al Massira",
      en: 'A Carzio agent hands the keys to a couple at the Agadir Al Massira airport desk',
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
    source: 'new fotos',
    alt: {
      fr: "Le tableau de bord d'un Dacia Duster avec l'écran de navigation, sur une route côtière",
      en: 'The dashboard of a Dacia Duster with the navigation screen on a coastal road',
    },
  },
  'securite-regles': {
    file: 'news-cat-securite-regles.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio vérifie l'état d'un véhicule avec une checklist devant un couple",
      en: 'A Carzio agent checks a vehicle against a checklist in front of a couple',
    },
  },
  'assurance-caution': {
    file: 'news-cat-assurance-caution.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet les clés d'un véhicule à un couple à l'aéroport d'Agadir",
      en: 'A Carzio agent hands a vehicle key to a couple at Agadir airport',
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
    source: 'new fotos',
    alt: {
      fr: 'Un couple prépare un itinéraire à une terrasse face à la mer, carte et téléphone sur la table',
      en: 'A couple plans a route at a seaside terrace with a map and a phone on the table',
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
    source: 'new fotos',
    alt: {
      fr: 'Une voiture stationnée dans un parking couvert éclairé',
      en: 'A car parked in a lit indoor car park',
    },
  },
  evenements: {
    file: 'news-cat-evenements.webp',
    source: 'new fotos',
    alt: {
      fr: "Un SUV blanc garé dans le parking de l'aéroport, coffre et portière ouverts",
      en: 'A white SUV parked at the airport car park with its boot and door open',
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
    source: 'new fotos',
    alt: {
      fr: "Le tableau de bord d'un Dacia Duster avec l'écran de navigation allumé",
      en: 'The dashboard of a Dacia Duster with the navigation screen on',
    },
  },
  'securite-routiere-maroc-essentiel': {
    file: 'news-post-securite-routiere.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio inspecte le phare d'un véhicule avec une checklist, sous le regard d'un couple",
      en: 'A Carzio agent inspects a vehicle headlight against a checklist while a couple watches',
    },
  },
  'assurance-complete-cinq-jours': {
    file: 'news-post-assurance-complete.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet une carte-clé à un couple au comptoir de l'aéroport d'Agadir",
      en: 'A Carzio agent hands a key card to a couple at the Agadir airport desk',
    },
  },
  'caution-zero-mad': {
    file: 'news-post-caution-zero-mad.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet les clés à un couple devant le terminal de l'aéroport d'Agadir",
      en: 'A Carzio agent hands the keys to a couple outside the Agadir airport terminal',
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
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio accueille une famille avec enfants devant l'aéroport d'Agadir",
      en: 'A Carzio agent welcomes a family with children outside Agadir airport',
    },
  },
  'road-trips-depuis-agadir': {
    file: 'news-post-road-trips.webp',
    source: 'new fotos',
    alt: {
      fr: "Un couple avec sa valise sur le parking de l'aéroport d'Agadir au coucher du soleil, devant une Dacia Stepway grise",
      en: 'A couple with a suitcase in the Agadir airport car park at sunset, in front of a grey Dacia Stepway',
    },
  },
  'agadir-marrakech-essaouira-voiture': {
    file: 'news-post-agadir-marrakech-essaouira.webp',
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio remet les documents de location à une famille au comptoir de l'aéroport",
      en: 'A Carzio agent hands the rental documents to a family at the airport desk',
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
    source: 'new fotos',
    alt: {
      fr: "Un agent Carzio présente une voiture blanche à une famille avec valises devant l'aéroport d'Agadir",
      en: 'A Carzio agent presents a white car to a family with suitcases outside Agadir airport',
      de: 'Ein Carzio-Mitarbeiter präsentiert einer Familie mit Koffern vor dem Flughafen Agadir ein weißes Auto',
      es: 'Un agente de Carzio presenta un coche blanco a una familia con maletas frente al aeropuerto de Agadir',
      pl: 'Pracownik Carzio prezentuje rodzinie z walizkami biały samochód przed lotniskiem w Agadirze',
    },
  },
  conditions: {
    file: 'faq-cat-conditions.webp',
    source: 'new fotos',
    alt: {
      fr: "Un couple présente ses documents au comptoir Carzio de l'aéroport d'Agadir",
      en: 'A couple presents its documents at the Carzio desk at Agadir airport',
      de: 'Ein Paar legt seine Dokumente am Carzio-Schalter am Flughafen Agadir vor',
      es: 'Una pareja presenta sus documentos en el mostrador de Carzio en el aeropuerto de Agadir',
      pl: 'Para okazuje dokumenty przy stanowisku Carzio na lotnisku w Agadirze',
    },
  },
  assurance: {
    file: 'faq-cat-assurance.webp',
    source: 'new fotos',
    alt: {
      fr: "Une famille signe son contrat de location au comptoir Carzio de l'aéroport d'Agadir",
      en: 'A family signs its rental contract at the Carzio desk at Agadir airport',
      de: 'Eine Familie unterschreibt ihren Mietvertrag am Carzio-Schalter am Flughafen Agadir',
      es: 'Una familia firma su contrato de alquiler en el mostrador de Carzio en el aeropuerto de Agadir',
      pl: 'Rodzina podpisuje umowę najmu przy stanowisku Carzio na lotnisku w Agadirze',
    },
  },
  'carburant-livraison': {
    file: 'faq-cat-carburant-livraison.webp',
    source: 'new fotos',
    alt: {
      fr: "Des voitures au coffre ouvert devant une station de lavage du parking de l'aéroport d'Agadir",
      en: 'Cars with their boots open in front of a car-wash bay in the Agadir airport car park',
      de: 'Autos mit geöffnetem Kofferraum vor einer Waschanlage auf dem Parkplatz des Flughafens Agadir',
      es: 'Coches con el maletero abierto frente a una zona de lavado en el aparcamiento del aeropuerto de Agadir',
      pl: 'Samochody z otwartymi bagażnikami przed myjnią na parkingu lotniska w Agadirze',
    },
  },
  'conduite-maroc': {
    file: 'faq-cat-conduite-maroc.webp',
    source: 'new fotos',
    alt: {
      fr: "Une main utilise l'écran CarPlay du tableau de bord d'une voiture de location",
      en: "A hand uses the CarPlay screen on a rental car's dashboard",
      de: 'Eine Hand bedient den CarPlay-Bildschirm am Armaturenbrett eines Mietwagens',
      es: 'Una mano usa la pantalla CarPlay del salpicadero de un coche de alquiler',
      pl: 'Dłoń obsługuje ekran CarPlay na desce rozdzielczej wypożyczonego samochodu',
    },
  },
};

export function mediaImage(entry: MediaEntry | undefined, fallback?: string): string {
  return entry ? J(entry.file) : fallback || '';
}
