export interface PhotoCredit {
  /** Served derivative, relative to the site root. */
  imagePath: string;
  /** Original Wikimedia Commons file name. */
  title: string;
  author: string;
  license: string;
  source: string;
}

/**
 * Third-party photographs published on the site.
 *
 * Blog, News, FAQ, About and fleet imagery is mostly Carzio-owned. When the
 * owner folders held no photograph that genuinely illustrated a topic, a
 * Wikimedia Commons file was used instead. Every such file is listed here with
 * its author and licence, as required by the terms of use of each photograph,
 * and rendered on `/credits`.
 */
export const photoCredits: PhotoCredit[] = [
  {
    imagePath: '/images/journal/blog-cat-assurance.webp',
    title: 'Car damage on fender observed in a parking lot.jpg',
    author: 'Shixart1985',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Car_damage_on_fender_observed_in_a_parking_lot.jpg',
  },
  {
    imagePath: '/images/journal/blog-post-assurance.webp',
    title: "Luxembourg, Carte internationale d'assurance automobile.jpg",
    author: 'GilPe',
    license: 'CC BY-SA 4.0',
    source: "https://commons.wikimedia.org/wiki/File:Luxembourg,_Carte_internationale_d%27assurance_automobile.jpg",
  },
  {
    imagePath: '/images/journal/news-cat-assurance-caution.webp',
    title: 'Credit-cards.jpg',
    author: 'Lotus Head',
    license: 'CC BY-SA 2.5',
    source: 'https://commons.wikimedia.org/wiki/File:Credit-cards.jpg',
  },
  {
    imagePath: '/images/journal/news-cat-flotte-modeles.webp',
    title: 'Red car morocco Marina Agadir.jpg',
    author: 'MustaSensei',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Red_car_morocco_Marina_Agadir.jpg',
  },
  {
    imagePath: '/images/journal/news-cat-evenements.webp',
    title: 'Agadir Beach Sunset (Summer time).jpg',
    author: 'Hatim.laajini',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Agadir_Beach_Sunset_(Summer_time).jpg',
  },
  {
    imagePath: '/images/journal/news-post-caution-zero-mad.webp',
    title: 'Paying with a Credit Card (28886645201).jpg',
    author: 'Hloom Templates',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Paying_with_a_Credit_Card_(28886645201).jpg',
  },
  {
    imagePath: '/images/journal/news-post-agadir-marrakech-essaouira.webp',
    title: 'Skala du Port, Essaouira 01.jpg',
    author: 'Adam Harangozó',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Skala_du_Port,_Essaouira_01.jpg',
  },
  {
    imagePath: '/images/journal/faq-cat-carburant-livraison.webp',
    title: 'Afriquia Station - Bouznika - October 2023.jpg',
    author: 'Anass Sedrati',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Afriquia_Station_-_Bouznika_-_October_2023.jpg',
  },
  {
    imagePath: '/images/about-new.webp',
    title: 'Agadir – Al Massira Airport 02.jpg',
    author: 'Werner100359',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Agadir_%E2%80%93_Al_Massira_Airport_02.jpg',
  },
  {
    imagePath: '/images/fleet/kia-sportage.webp',
    title: '2023 Kia Sportage (NQ5) in White, front left.jpg',
    author: 'Benespit',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:2023_Kia_Sportage_(NQ5)_in_White,_front_left.jpg',
  },
  {
    imagePath: '/images/fleet/vw-troc.webp',
    title: 'Volkswagen T-Roc (2021) 1X7A0330.jpg',
    author: 'Alexander Migl',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Volkswagen_T-Roc_(2021)_1X7A0330.jpg',
  },
];
