export interface PhotoCredit {
  /** Path under /images/journal/ used on the site. */
  file: string;
  /** Original Wikimedia Commons / Pexels file name. */
  title: string;
  author: string;
  license: string;
  source: string;
}

export const photoCredits: PhotoCredit[] = [
  {
    file: 'age-driving-licence.webp',
    title: 'UK driving licence (Pexels photo 45113)',
    author: 'Dom J',
    license: 'Pexels License (free to use, attribution not required)',
    source: 'https://www.pexels.com/photo/uk-driving-license-45113/',
  },
  {
    file: 'touchscreen-carplay.webp',
    title: '2023 Volkswagen ID.4 running wireless CarPlay.jpg',
    author: 'Sunnyboy122',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:2023_Volkswagen_ID.4_running_wireless_CarPlay.jpg',
  },
  {
    file: 'touchscreen-navigation.webp',
    title: 'Toyota Aygo Mid 2018 Apple Carplay Integration.jpg',
    author: 'Butterhimmel',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Toyota_Aygo_Mid_2018_Apple_Carplay_Integration.jpg',
  },
];
