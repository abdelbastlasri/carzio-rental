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
    image: '/images/journal/carzio-car-2.jpg',
    imageAlt: { fr: "Voiture Carzio prête pour la remise des clés à Agadir", en: "Carzio car ready for key handover in Agadir" },
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
    image: '/images/journal/carzio-car-wash.jpg',
    imageAlt: { fr: "Voiture Carzio lavée et contrôlée avant la location", en: "Carzio car washed and checked before rental" },
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
    image: '/images/dacia-sandero.jpg',
    imageAlt: { fr: "Dacia Sandero de la flotte Carzio", en: "Dacia Sandero from the Carzio fleet" },
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
