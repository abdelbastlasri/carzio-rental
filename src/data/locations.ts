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
  {
    id: 'tamraght',
    name: 'Tamraght',
    airport: 'Tamraght',
    mapUrl: 'https://www.google.com/maps/place/Tamraght/@30.5121014,-9.687549,15z/data=!3m1!4b1!4m6!3m5!1s0xdb3b31f8b5a1be7:0xfdc27404a7bca26a!8m2!3d30.5110051!4d-9.6772967!16s%2Fg%2F120lq991?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
  },
];

export const locationImages: Record<string, string> = {
  agadir: '/images/agadir-airport.jpg',
  marrakech: '/images/marrakech-airport.jpg',
  essaouira: '/images/essaouira-airport.jpg',
  taghazout: '/images/taghazout-beach.jpg',
  tamraght: '/images/tamraght.jpg',
};
