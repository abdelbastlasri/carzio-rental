export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
  seats: number;
  doors: number;
  suitcases: number;
  transmission: string;
  ac: boolean;
  km: string;
  model: string;
  description: string;
  extras: Extra[];
}

export interface Extra {
  name: string;
  price: number;
  perDay: boolean;
}

export interface Location {
  id: string;
  name: string;
  airport: string;
  mapUrl: string;
}

export interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar: string;
}
