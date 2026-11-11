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
 * Third-party photographs used on the site.
 *
 * Blog, News, FAQ, About and fleet imagery is mostly Carzio-owned. When the
 * owner folders held no photograph that genuinely illustrated a topic, a
 * Wikimedia Commons file was used instead. Every such file is listed here with
 * its author and licence, as required by the terms of use of each photograph.
 *
 * This file is an internal provenance record; the site does not publish a
 * separate photo-credits page.
 */
export const photoCredits: PhotoCredit[] = [
  {
    imagePath: '/images/journal/news-cat-conduite-maroc.webp',
    title: 'A7 motorway in Morocco.JPG',
    author: 'Makary',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco.JPG',
  },
  {
    imagePath: '/images/journal/faq-cat-conduite-maroc.webp',
    title: 'A7 motorway in Morocco 2.JPG',
    author: 'Makary',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco_2.JPG',
  },
  {
    imagePath: '/images/journal/news-post-conduire-au-maroc.webp',
    title: 'R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg',
    author: 'Timothy A. Gonsalves',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:R212_MZouda_Shishawa_Morocco_Oct25_A7CR_08374.jpg',
  },
  {
    imagePath: '/images/journal/news-cat-securite-regles.webp',
    title: 'Road signs Agadir 2020.jpg',
    author: 'Abdeaitali',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Road_signs_Agadir_2020.jpg',
  },
  {
    imagePath: '/images/journal/news-post-securite-routiere.webp',
    title: 'Road signs pedestrians Agadir 2020.jpg',
    author: 'Abdeaitali',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Road_signs_pedestrians_Agadir_2020.jpg',
  },
  {
    imagePath: '/images/journal/news-post-road-trips.webp',
    title: 'Vue panoramique de la plage " TAGHAZOUT".jpg',
    author: 'Mouad aguenaou',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Vue_panoramique_de_la_plage_%22_TAGHAZOUT%22.jpg',
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
