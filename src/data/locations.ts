import { Location } from '../types';

export const locations: Location[] = [
  {
    id: 'agadir',
    name: 'Agadir Airport - Al Massira',
    airport: 'Agadir',
    mapUrl: 'https://www.google.com/maps?q=Agadir+Airport+Al+Massira',
  },
  {
    id: 'marrakech',
    name: 'Marrakech Airport - Al Manara',
    airport: 'Marrakech',
    mapUrl: 'https://www.google.com/maps?q=Marrakech+Airport+Al+Manara',
  },
  {
    id: 'essaouira',
    name: 'Essaouira Airport - Mogador',
    airport: 'Essaouira',
    mapUrl: 'https://www.google.com/maps?q=Essaouira+Airport+Mogador',
  },
  {
    id: 'taghazout',
    name: 'Taghazout',
    airport: 'Taghazout',
    mapUrl: 'https://www.google.com/maps?q=Taghazout',
  },
];

export const locationImages: Record<string, string> = {
  agadir: '/images/agadir-airport.jpg',
  marrakech: '/images/marrakech-airport.jpg',
  essaouira: '/images/essaouira-airport.jpg',
  taghazout: '/images/taghazout-beach.jpg',
};
