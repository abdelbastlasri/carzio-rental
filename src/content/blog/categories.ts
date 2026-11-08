export interface BlogCategoryCopy {
  name: string;
  description: string;
}

export interface BlogCategory {
  slug: string;
  image: string;
  imageAlt: { fr: string; en: string };
  fr: BlogCategoryCopy;
  en: BlogCategoryCopy;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: 'reservation',
    image: '/images/journal/carzio-grey-fleet-side.webp',
    imageAlt: { fr: "Flotte de location à l'aéroport d'Agadir", en: "Rental fleet at Agadir airport" },
    fr: {
      name: 'Réservation & paiement',
      description:
        "Comment réserver, quels documents prévoir, comment fonctionne le paiement et ce qui est inclus dans le prix.",
    },
    en: {
      name: 'Booking & payment',
      description:
        'How to book, which documents to bring, how payment works and what is included in the price.',
    },
  },
  {
    slug: 'assurance',
    image: '/images/journal/carzio-grey-fleet-airport.webp',
    imageAlt: { fr: "Voitures inspectées avant la location", en: "Cars inspected before rental" },
    fr: {
      name: 'Assurance & franchise',
      description:
        "Assurance standard incluse, franchise selon le tarif journalier et assurance complète à 0 MAD dès 5 jours.",
    },
    en: {
      name: 'Insurance & excess',
      description:
        'Standard insurance included, excess by daily rate and full insurance with 0 MAD excess from 5 days.',
    },
  },
  {
    slug: 'conditions',
    image: '/images/journal/carzio-grey-fleet-vertical.webp',
    imageAlt: { fr: "Véhicules disponibles pour la location", en: "Vehicles available for rental" },
    fr: {
      name: 'Âge, permis & conduite',
      description:
        "Conditions pour louer et conduire au Maroc : âge minimum, permis, deuxième conducteur et siège bébé.",
    },
    en: {
      name: 'Age, licence & driving',
      description:
        'Requirements to rent and drive in Morocco: minimum age, licence, second driver and child seats.',
    },
  },
];

export function findBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.slug === slug);
}

export function getCategoryCopy(
  slug: string,
  lang: 'fr' | 'en',
): BlogCategoryCopy {
  const category = findBlogCategory(slug);
  if (!category) return { name: slug, description: '' };
  return category[lang];
}
