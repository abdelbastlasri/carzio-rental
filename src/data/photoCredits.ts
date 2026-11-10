export interface PhotoCredit {
  /** Path under /images/journal/ used on the site. */
  file: string;
  /** Original Wikimedia Commons file name. */
  title: string;
  author: string;
  license: string;
  source: string;
}

/**
 * Third-party photographs published on the site.
 *
 * Only files from these three Carzio-owned folders are used for Blog, News and
 * FAQ imagery: `news blog`, `New image` and `inspiration`. Every photograph
 * that comes from outside those folders is listed here with its author and its
 * licence, as required by the terms of use of each file.
 */
export const photoCredits: PhotoCredit[] = [
  {
    file: 'blog-cat-conditions.webp',
    title: 'Safe kids teach car seat installation 120623-F-HJ874-0019.jpg',
    author: 'Airman 1st Class Krystal Wright',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Safe_kids_teach_car_seat_installation_120623-F-HJ874-0019.jpg',
  },
  {
    file: 'blog-post-age-permis.webp',
    title: 'Mom checks on the kids (52083043949).jpg',
    author: 'Oregon Department of Transportation',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Mom_checks_on_the_kids_(52083043949).jpg',
  },
  {
    file: 'news-cat-conduite-maroc.webp',
    title: 'A7 motorway in Morocco.jpg',
    author: 'Makary',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco.JPG',
  },
  {
    file: 'news-cat-securite-regles.webp',
    title: 'Road signs Agadir 2020.jpg',
    author: 'Abdeaitali',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Road_signs_Agadir_2020.jpg',
  },
  {
    file: 'news-cat-villes-visites.webp',
    title: 'Agadir bay.jpg',
    author: 'AJSPARK4444',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Agadir_bay.jpg',
  },
  {
    file: 'news-cat-road-trips.webp',
    title: 'Taghazout 2.jpg',
    author: 'AJSPARK4444',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Taghazout_2.jpg',
  },
  {
    file: 'news-cat-flotte-modeles.webp',
    title: 'Toyota Aygo Mid 2018 Apple Carplay Integration.jpg',
    author: 'Butterhimmel',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Toyota_Aygo_Mid_2018_Apple_Carplay_Integration.jpg',
  },
  {
    file: 'news-cat-budget-conseils.webp',
    title: 'Highway morocco pay checkpoint.jpg',
    author: "Ministère de l'Équipement et du Transport",
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Highway_morocco_pay_checkpoint.jpg',
  },
  {
    file: 'news-post-conduire-au-maroc.webp',
    title: 'R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg',
    author: 'Timothy A. Gonsalves',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:R212_MZouda_Shishawa_Morocco_Oct25_A7CR_08374.jpg',
  },
  {
    file: 'news-post-securite-routiere.webp',
    title: 'Road signs pedestrians Agadir 2020.jpg',
    author: 'Abdeaitali',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Road_signs_pedestrians_Agadir_2020.jpg',
  },
  {
    file: 'news-post-gps-ecran-tactile.webp',
    title: '2023 Volkswagen ID.4 running wireless CarPlay.jpg',
    author: 'Sunnyboy122',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:2023_Volkswagen_ID.4_running_wireless_CarPlay.jpg',
  },
  {
    file: 'news-post-evenements-saisons.webp',
    title: 'Agadir Beach Sunset (Summer time).jpg',
    author: 'Hatim.laajini',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Agadir_Beach_Sunset_(Summer_time).jpg',
  },
  {
    file: 'news-post-livraison-aeroport.webp',
    title: 'Agadir Airport 2020.jpg',
    author: 'Abdeaitali',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Agadir_Airport_2020.jpg',
  },
  {
    file: 'news-post-road-trips.webp',
    title: 'Red car morocco Marina Agadir.jpg',
    author: 'MustaSensei',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Red_car_morocco_Marina_Agadir.jpg',
  },
  {
    file: 'news-post-agadir-marrakech-essaouira.webp',
    title: 'Skala du Port, Essaouira 01.jpg',
    author: 'Adam Harangozó',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Skala_du_Port,_Essaouira_01.jpg',
  },
  {
    file: 'faq-cat-conditions.webp',
    title: 'Happy, safe kids (52081770862).jpg',
    author: 'Oregon Department of Transportation',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Happy,_safe_kids_(52081770862).jpg',
  },
  {
    file: 'faq-cat-conduite-maroc.webp',
    title: 'A7 motorway in Morocco 2.jpg',
    author: 'Makary',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco_2.JPG',
  },
];
