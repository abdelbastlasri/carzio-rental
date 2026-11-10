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
    source: 'news blog',
    alt: {
      fr: "Un client reçoit sa carte et ses clés Carzio à côté de sa voiture, à l'aéroport d'Agadir",
      en: 'A customer receives his Carzio card and keys beside his car at Agadir airport',
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
    source: 'news blog',
    alt: {
      fr: "Un client tient ses documents et sa carte Carzio à côté de sa voiture de location à l'aéroport d'Agadir",
      en: 'A customer holds his Carzio card and rental documents beside his hire car at Agadir airport',
    },
  },
};

export const blogPostMedia: Record<string, BlogCategoryMedia> = {
  'age-permis-conducteurs-location-maroc': {
    file: 'blog-post-age-permis.webp',
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Un contrôleur vérifie le véhicule et conseille le conducteur avant la location',
      en: 'An inspector checks the vehicle and advises the driver before the rental',
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
    source: 'inspiration',
    alt: {
      fr: 'La catégorie "Réservation & paiement" du site Carzio : demande en ligne, documents et prix',
      en: "The Carzio website's \"Booking & payment\" category: online request, documents and price",
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
    source: 'New image',
    alt: {
      fr: "Une famille avec enfant récupère sa voiture Carzio à l'aéroport d'Agadir, plaque CARZIO visible",
      en: 'A family with a child collects their Carzio car at Agadir airport, CARZIO plate visible',
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
    source: 'inspiration',
    alt: {
      fr: "Un client récupère sa voiture Carzio à l'aéroport d'Agadir, remise des clés sans caution",
      en: 'A customer collects his Carzio car at Agadir airport, keys handed over with no deposit',
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
    source: 'Wikimedia Commons',
    alt: {
      fr: 'Une famille chargeant ses bagages dans le coffre de sa voiture avant les vacances',
      en: 'A family loading their luggage into the car boot before the holiday',
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
    source: 'news blog',
    alt: {
      fr: "Le terminal de l'aéroport Agadir Al Massira, où Carzio effectue la prise en charge des clients",
      en: 'The Agadir Al Massira airport terminal, where Carzio meets customers for pickup',
      de: 'Das Terminal des Flughafens Agadir Al Massira, wo Carzio die Kunden abholt',
      es: 'La terminal del aeropuerto de Agadir Al Massira, donde Carzio recoge a los clientes',
      pl: 'Terminal lotniska Agadir Al Massira, gdzie Carzio odbiera klientów',
    },
  },
  conditions: {
    file: 'faq-cat-conditions.webp',
    source: 'inspiration',
    alt: {
      fr: "Un client choisit sa voiture de location sur le parking de l'aéroport d'Agadir, permis et documents en main",
      en: 'A customer chooses his rental car in the Agadir airport car park, licence and documents ready',
      de: 'Ein Kunde wählt sein Mietauto auf dem Parkplatz des Flughafens Agadir, Führerschein und Unterlagen bereit',
      es: 'Un cliente elige su coche de alquiler en el aparcamiento del aeropuerto de Agadir, con permiso y documentos listos',
      pl: 'Klient wybiera samochód na parkingu lotniska w Agadirze, z prawem jazdy i dokumentami gotowymi do odbioru',
    },
  },
  assurance: {
    file: 'faq-cat-assurance.webp',
    source: 'news blog',
    alt: {
      fr: "Une famille charge ses bagages dans sa voiture Carzio à l'aéroport d'Agadir, prête pour un voyage serein",
      en: 'A family loads their luggage into their Carzio car at Agadir airport, ready for a worry-free trip',
      de: 'Eine Familie lädt ihr Gepäck in ihr Carzio-Auto am Flughafen Agadir, bereit für eine sorgenfreie Reise',
      es: 'Una familia carga su equipaje en su coche Carzio en el aeropuerto de Agadir, lista para un viaje tranquilo',
      pl: 'Rodzina pakuje bagaże do samochodu Carzio na lotnisku w Agadirze, gotowa na bezstresową podróż',
    },
  },
  'carburant-livraison': {
    file: 'faq-cat-carburant-livraison.webp',
    source: 'inspiration',
    alt: {
      fr: "Une voiture Carzio et ses clients à l'aéroport d'Agadir Al Massira, avec un avion en arrière-plan",
      en: 'A Carzio car and its customers at Agadir Al Massira airport, with an aircraft overhead',
      de: 'Ein Carzio-Auto und seine Kunden am Flughafen Agadir Al Massira, mit einem Flugzeug im Hintergrund',
      es: 'Un coche Carzio y sus clientes en el aeropuerto de Agadir Al Massira, con un avión al fondo',
      pl: 'Samochód Carzio i jego klienci na lotnisku Agadir Al Massira, z samolotem w tle',
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
