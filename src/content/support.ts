import type { Lang } from '../lib/i18nRouting';
import { de } from './support-de';
import { es } from './support-es';
import { pl } from './support-pl';
import { nl } from './support-nl';

export interface SupportSection {
  title: string;
  paragraphs: string[];
}

export interface SupportFaq {
  q: string;
  a: string;
}

export interface SupportPageContent {
  key: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: SupportSection[];
  faqs: SupportFaq[];
  carIds: string[];
  image: string;
  imageAlt: string;
}

export const SUPPORT_KEYS = [
  'automatic',
  'suv',
  'zero-deposit',
  'one-way-marrakech',
  'essaouira',
  'taghazout-tamraght',
  'family',
  'child-seat',
] as const;

export type SupportKey = (typeof SUPPORT_KEYS)[number];

const en: Record<SupportKey, SupportPageContent> = {
  automatic: {
    key: 'automatic',
    slug: 'automatic-car-rental-agadir',
    title: 'Automatic Car Rental in Agadir | Carzio',
    description:
      'Rent an automatic car in Agadir with Carzio: recent models, unlimited mileage, 0 MAD deposit, free airport pickup and free cancellation up to 24 h.',
    h1: 'Automatic Car Rental in Agadir',
    intro:
      'If you prefer not to drive a manual car, Carzio has automatic models at Agadir Al Massira Airport. Choose your car, send your dates and collect it at arrivals.',
    sections: [
      {
        title: 'Automatic models in the fleet',
        paragraphs: [
          'The automatic selection includes the Dacia Sandero Stepway, Renault Clio 5, Hyundai i10 BVA, Dacia Duster BVA and Volkswagen T-Roc. Availability depends on your dates.',
          'Every car is recent, checked before handover and comes with air conditioning, unlimited mileage and standard insurance.',
        ],
      },
      {
        title: 'Price and conditions',
        paragraphs: [
          'The daily price is shown on each car card. The minimum rental is 72 hours, billed in 24-hour blocks; a started day counts as a full day.',
          'There is no security deposit and no card hold. You pay at key handover. Free cancellation is available up to 24 hours before pickup.',
        ],
      },
      {
        title: 'Pickup at Agadir Airport',
        paragraphs: [
          'Our team meets you in the arrivals hall of Agadir Al Massira Airport. Send your flight number so we can follow your arrival, including a delayed flight.',
          'The driver must be at least 23 years old and have held a licence for at least 4 years. Bring your passport or ID and a bank card for payment.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Are automatic cars more expensive?',
        a: 'The daily price depends on the model and the season. Each car card shows the current price before you send a request.',
      },
      {
        q: 'Can I choose the exact automatic model?',
        a: 'You can request a model. If it is unavailable on your dates, we confirm an equivalent automatic car before the booking is accepted.',
      },
      {
        q: 'Is airport pickup included?',
        a: 'Yes. Pickup and return at Agadir Al Massira Airport are included.',
      },
      {
        q: 'What deposit is required?',
        a: '0 MAD. We do not block money on your card.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'renault-clio-5', 'hyundai-i10-bva', 'dacia-duster-bva', 'vw-troc-automatic'],
    image: '/images/fleet/dacia-sandero-stepway.webp',
    imageAlt: 'Automatic Dacia Sandero Stepway available at Agadir airport',
  },
  suv: {
    key: 'suv',
    slug: 'suv-rental-agadir',
    title: 'SUV Rental in Agadir | Carzio',
    description:
      'Rent an SUV in Agadir with Carzio: Dacia Duster, Jogger, Kia Sportage and Hyundai Tucson, unlimited mileage, 0 MAD deposit and airport pickup.',
    h1: 'SUV Rental in Agadir',
    intro:
      'An SUV gives you more space for luggage, family trips and the roads around Agadir, Taghazout and the Souss valley. Carzio offers several SUV and crossover models.',
    sections: [
      {
        title: 'SUV and family models',
        paragraphs: [
          'The fleet includes the Dacia Duster, the 7-seat Dacia Jogger, the Kia Sportage and the Hyundai Tucson. Some models are automatic; others are manual.',
          'These are practical road cars, not 4x4 vehicles. For mountain tracks or desert routes, tell us your itinerary so we can confirm which car is suitable.',
        ],
      },
      {
        title: 'Space for luggage and passengers',
        paragraphs: [
          'The Jogger seats up to 7 passengers with a generous boot. The Duster, Sportage and Tucson are 5-seat SUVs with room for suitcases and beach gear.',
          'Child seats and boosters are free on request, subject to availability.',
        ],
      },
      {
        title: 'Booking and pickup',
        paragraphs: [
          'Pickup is at Agadir Al Massira Airport or at our agency at MAG N2, Agadir Airport. The minimum rental is 72 hours.',
          'The price includes unlimited mileage and standard insurance. Full Risk insurance is optional and shown before you confirm.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need a 4x4 for Taghazout or Paradise Valley?',
        a: 'The main roads are paved. A standard SUV is enough for normal driving; tell us if you plan to leave the tarmac.',
      },
      {
        q: 'How many suitcases fit in the Jogger?',
        a: 'The Jogger has a large boot and up to 7 seats. Space depends on how many seats you use; tell us your luggage and we will confirm.',
      },
      {
        q: 'Is an SUV available with automatic transmission?',
        a: 'Yes, the Dacia Duster BVA and other automatic models are available depending on your dates.',
      },
      {
        q: 'Is the deposit different for an SUV?',
        a: 'No. The deposit is 0 MAD for the fleet, with no card hold.',
      },
    ],
    carIds: ['dacia-duster-bva', 'dacia-duster-manual', 'dacia-jogger', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger SUV for rent in Agadir',
  },
  'zero-deposit': {
    key: 'zero-deposit',
    slug: 'car-rental-zero-deposit-morocco',
    title: 'Car Rental with 0 MAD Deposit in Morocco | Carzio',
    description:
      'Rent a car in Agadir with 0 MAD deposit, no card hold and payment at key handover. Free cancellation up to 24 h and airport pickup included.',
    h1: 'Car Rental with 0 MAD Deposit',
    intro:
      'The deposit is often the stressful part of a rental. At Carzio there is no security deposit and no hold on your bank card. You pay the rental price at key handover.',
    sections: [
      {
        title: 'How 0 MAD deposit works',
        paragraphs: [
          'No amount is charged or reserved on your card when you book. Debit cards are accepted as well as credit cards, so your spending limit stays available during the trip.',
          'The amount paid at handover is the rental price. Standard insurance is included; Full Risk insurance is optional.',
        ],
      },
      {
        title: 'Cancellation and minimum rental',
        paragraphs: [
          'You can cancel free of charge up to 24 hours before pickup. The minimum rental is 72 hours, billed in 24-hour blocks.',
          'A booking is confirmed by email after we check real availability. It is never confirmed automatically.',
        ],
      },
      {
        title: 'Documents and driver age',
        paragraphs: [
          'The main driver must be at least 23 years old and have held a driving licence for at least 4 years. Bring a passport or ID and a bank card for payment.',
          'A second driver can be added free of charge under the same conditions. Baby seats and boosters are free on request.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there really no deposit?',
        a: 'Yes. The deposit is 0 MAD and we do not block money on your card.',
      },
      {
        q: 'Can I pay with a debit card?',
        a: 'Yes. Debit and credit cards are accepted for payment at key handover.',
      },
      {
        q: 'Does 0 MAD deposit mean insurance is included?',
        a: 'Standard insurance is included in the rental price. Full Risk insurance is optional and shown before you confirm.',
      },
      {
        q: 'What happens if I cancel?',
        a: 'Cancellation is free up to 24 hours before pickup. Contact us by email or WhatsApp.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/hero/carzio-pickup.webp',
    imageAlt: 'Carzio key handover with no security deposit',
  },
  'one-way-marrakech': {
    key: 'one-way-marrakech',
    slug: 'one-way-car-rental-agadir-marrakech',
    title: 'One-Way Car Rental Agadir to Marrakech | Carzio',
    description:
      'Rent a car in Agadir and return it in Marrakech with Carzio. Delivery to Marrakech-Menara is 80 € per trip, confirmed before booking.',
    h1: 'One-Way Car Rental from Agadir to Marrakech',
    intro:
      'You can collect your car in Agadir and return it in Marrakech. This saves you the return drive and lets you continue your trip from Marrakech-Menara Airport or the city.',
    sections: [
      {
        title: 'How the one-way rental works',
        paragraphs: [
          'Tell us your pickup date in Agadir and your return date in Marrakech. We check availability and confirm the one-way conditions before accepting the booking.',
          'Delivery or collection in Marrakech is 80 € per trip. The exact amount is confirmed in writing before you pay.',
        ],
      },
      {
        title: 'The drive between Agadir and Marrakech',
        paragraphs: [
          'The distance is about 250 km and the drive usually takes around 3 hours by the motorway. Plan a break and check the fuel level before leaving Agadir.',
          'The minimum rental is 72 hours. The car must be returned at the agreed place and time in Marrakech.',
        ],
      },
      {
        title: 'What is included',
        paragraphs: [
          'The rental includes unlimited mileage and standard insurance. The one-way delivery fee is added to the rental price.',
          'Full Risk insurance is optional. The driver must be at least 23 years old and have held a licence for at least 4 years.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I return the car at Marrakech Airport?',
        a: 'Yes, return at Marrakech-Menara Airport is available on request. The delivery fee is 80 € per trip.',
      },
      {
        q: 'Is the one-way fee per day?',
        a: 'No. It is a fixed fee per trip, confirmed before booking.',
      },
      {
        q: 'Can I do the reverse route, Marrakech to Agadir?',
        a: 'Yes, on request. Send us your dates and we will confirm availability and the fee.',
      },
      {
        q: 'How long does the drive take?',
        a: 'About 3 hours by the motorway, depending on traffic and breaks.',
      },
    ],
    carIds: ['dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/journal/news-post-agadir-marrakech-essaouira.webp',
    imageAlt: 'Road trip from Agadir to Marrakech',
  },
  essaouira: {
    key: 'essaouira',
    slug: 'car-rental-agadir-essaouira',
    title: 'Car Rental Agadir to Essaouira | Carzio',
    description:
      'Rent a car in Agadir and drive to Essaouira with Carzio: unlimited mileage, 0 MAD deposit, standard insurance and delivery quoted before booking.',
    h1: 'Car Rental from Agadir to Essaouira',
    intro:
      'Essaouira is about 175 km north of Agadir, along the Atlantic coast. A rental car lets you leave on your own schedule and stop in the villages along the way.',
    sections: [
      {
        title: 'Driving from Agadir to Essaouira',
        paragraphs: [
          'The drive usually takes around 3 hours, depending on the route and the stops. The coastal road is scenic but slower than the motorway.',
          'Check the fuel level before leaving and plan a break in Taghazout, Tamraght or one of the small towns along the coast.',
        ],
      },
      {
        title: 'Pickup and return in Essaouira',
        paragraphs: [
          'Pickup is at Agadir Al Massira Airport or at our agency. Delivery and collection in Essaouira are available on request and quoted before booking.',
          'The one-way or delivery conditions are confirmed in writing before you pay. We do not publish a fixed Essaouira fee because it depends on the dates and the car.',
        ],
      },
      {
        title: 'Rental conditions',
        paragraphs: [
          'The minimum rental is 72 hours, with unlimited mileage and standard insurance included. The deposit is 0 MAD.',
          'Full Risk insurance is optional. The driver must be at least 23 years old and have held a licence for at least 4 years.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is delivery to Essaouira free?',
        a: 'No. Delivery and collection in Essaouira are quoted before booking, depending on the dates and the car.',
      },
      {
        q: 'Can I keep the car for a round trip?',
        a: 'Yes. You can pick it up in Agadir, drive to Essaouira and return it in Agadir. The normal daily price applies.',
      },
      {
        q: 'How long is the drive?',
        a: 'About 3 hours, depending on the route and the stops.',
      },
      {
        q: 'Is the road suitable for a standard car?',
        a: 'Yes. The main roads are paved. Tell us if you plan to take unpaved tracks.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/journal/essaouira-port.webp',
    imageAlt: 'Atlantic coast road between Agadir and Essaouira',
  },
  'taghazout-tamraght': {
    key: 'taghazout-tamraght',
    slug: 'car-rental-taghazout-tamraght',
    title: 'Car Rental Taghazout & Tamraght | Carzio',
    description:
      'Rent a car for Taghazout and Tamraght with Carzio: airport pickup in Agadir, 0 MAD deposit, unlimited mileage and delivery quoted before booking.',
    h1: 'Car Rental for Taghazout and Tamraght',
    intro:
      'Taghazout and Tamraght are two surf villages north of Agadir. A car gives you the freedom to reach the beaches, the cafés and the roads along the coast without depending on a shuttle.',
    sections: [
      {
        title: 'Agadir Airport to Taghazout or Tamraght',
        paragraphs: [
          'Taghazout is about 19 km from Agadir and usually 30 to 40 minutes by car. Tamraght is about 14 km away, usually 25 minutes.',
          'You can collect the car at Agadir Al Massira Airport or at our agency. Delivery to Taghazout or Tamraght is available on request and quoted before booking.',
        ],
      },
      {
        title: 'Surf trips and luggage',
        paragraphs: [
          'Tell us if you are travelling with surfboards or extra luggage so we can confirm the right car. The Dacia Jogger and the SUVs offer more space.',
          'Child seats and boosters are free on request, subject to availability.',
        ],
      },
      {
        title: 'Conditions',
        paragraphs: [
          'The minimum rental is 72 hours, with unlimited mileage, standard insurance and 0 MAD deposit.',
          'Free cancellation is available up to 24 hours before pickup. The driver must be at least 23 years old and have held a licence for at least 4 years.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you deliver the car to my surf camp?',
        a: 'Delivery to Taghazout or Tamraght is available on request. Send the address and dates; we confirm the conditions before booking.',
      },
      {
        q: 'How far is Taghazout from Agadir Airport?',
        a: 'About 19 km, usually 30 to 40 minutes by car.',
      },
      {
        q: 'Which car is best for surfboards?',
        a: 'The Jogger and the SUVs have more space. Tell us the board length and the number of passengers so we can confirm.',
      },
      {
        q: 'Is parking easy in Taghazout?',
        a: 'Parking is limited in the village centre, especially in high season. Use the marked spaces and avoid blocking access roads.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'dacia-jogger', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/taghazout-beach.webp',
    imageAlt: 'Taghazout beach near Agadir',
  },
  family: {
    key: 'family',
    slug: 'family-car-rental-agadir',
    title: 'Family Car Rental in Agadir | Carzio',
    description:
      'Rent a family car in Agadir with Carzio: 7-seat Dacia Jogger, spacious SUVs, free child seats on request, 0 MAD deposit and airport pickup.',
    h1: 'Family Car Rental in Agadir',
    intro:
      'A family trip needs space for passengers, luggage and child seats. Carzio offers a 7-seat Jogger and several SUVs that make airport pickup and day trips easier.',
    sections: [
      {
        title: 'Cars for families',
        paragraphs: [
          'The Dacia Jogger seats up to 7 passengers and has a generous boot. The Dacia Duster, Kia Sportage and Hyundai Tucson offer 5 seats with more luggage space than a small hatchback.',
          'Tell us how many adults, children and suitcases you have so we can recommend the right model.',
        ],
      },
      {
        title: 'Child seats and luggage',
        paragraphs: [
          'Baby seats and boosters are free on request, subject to availability. Send the child’s age and weight so we provide the right seat.',
          'The Jogger is the best choice for 6 or 7 passengers. For 4 or 5 passengers, an SUV is usually enough.',
        ],
      },
      {
        title: 'Airport pickup and conditions',
        paragraphs: [
          'We meet you at Agadir Al Massira Airport and help install the child seats. The minimum rental is 72 hours.',
          'The price includes unlimited mileage and standard insurance. The deposit is 0 MAD, and cancellation is free up to 24 hours before pickup.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which car seats 7 people?',
        a: 'The Dacia Jogger seats up to 7 passengers, depending on the seat configuration and luggage.',
      },
      {
        q: 'Are child seats free?',
        a: 'Yes, baby seats and boosters are free on request, subject to availability.',
      },
      {
        q: 'Can you install the child seat at the airport?',
        a: 'Yes. Our team can help install it during the handover at Agadir Al Massira Airport.',
      },
      {
        q: 'Is there enough room for suitcases?',
        a: 'It depends on the number of passengers. Send us your luggage details and we will confirm the best car.',
      },
    ],
    carIds: ['dacia-jogger', 'dacia-duster-manual', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Seven-seat Dacia Jogger for family rental in Agadir',
  },
  'child-seat': {
    key: 'child-seat',
    slug: 'car-rental-agadir-child-seat',
    title: 'Car Rental in Agadir with Child Seat | Carzio',
    description:
      'Rent a car in Agadir with a free child seat or booster on request. Carzio provides baby seats, helps with installation and offers airport pickup.',
    h1: 'Car Rental in Agadir with a Child Seat',
    intro:
      'Travelling with a baby or a young child is easier when the seat is already in the car. Carzio provides baby seats and boosters free of charge on request, subject to availability.',
    sections: [
      {
        title: 'Baby seats and boosters',
        paragraphs: [
          'Tell us the child’s age and weight when you send your request. We will provide the appropriate baby seat or booster and confirm it before the booking.',
          'The seats are free. They are subject to availability, so please request them as early as possible, especially in July and August.',
        ],
      },
      {
        title: 'Installation at the airport',
        paragraphs: [
          'Our team can help install the seat during the handover at Agadir Al Massira Airport. Ask us if you are not sure how the seat fits.',
          'Check that the seat is properly attached before you drive away, and adjust the harness to the child.',
        ],
      },
      {
        title: 'Choosing the right car',
        paragraphs: [
          'A compact car is enough for one or two children. For three children or a large stroller, choose an SUV or the 7-seat Jogger.',
          'The minimum rental is 72 hours, with unlimited mileage, standard insurance and 0 MAD deposit.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is the child seat really free?',
        a: 'Yes. Baby seats and boosters are free on request, subject to availability.',
      },
      {
        q: 'How do I choose the right seat?',
        a: 'Send the child’s age and weight. We will confirm the appropriate baby seat or booster.',
      },
      {
        q: 'Can I bring my own child seat?',
        a: 'Yes. You are welcome to use your own seat. Tell us so we do not reserve one unnecessarily.',
      },
      {
        q: 'Do you provide seats for newborns?',
        a: 'Tell us the baby’s age and weight; we will confirm whether a suitable seat is available for your dates.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-jogger', 'dacia-duster-manual'],
    image: '/images/hero/agadir-airport-arrival.webp',
    imageAlt: 'Carzio airport handover with a child seat',
  },
};

const fr: Record<SupportKey, SupportPageContent> = {
  automatic: {
    key: 'automatic',
    slug: 'location-voiture-automatique-agadir',
    title: 'Location de voiture automatique à Agadir | Carzio',
    description:
      'Louez une voiture automatique à Agadir avec Carzio : modèles récents, kilométrage illimité, 0 MAD de caution, accueil gratuit à l’aéroport et annulation gratuite 24 h.',
    h1: 'Location de voiture automatique à Agadir',
    intro:
      'Vous préférez ne pas conduire une voiture manuelle ? Carzio propose des modèles automatiques à l’aéroport Agadir Al Massira. Choisissez votre voiture, envoyez vos dates et récupérez-la à l’arrivée.',
    sections: [
      {
        title: 'Les modèles automatiques',
        paragraphs: [
          'La sélection automatique comprend la Dacia Sandero Stepway, la Renault Clio 5, la Hyundai i10 BVA, la Dacia Duster BVA et la Volkswagen T-Roc. La disponibilité dépend de vos dates.',
          'Chaque voiture est récente, contrôlée avant la remise et équipée de la climatisation, du kilométrage illimité et de l’assurance standard.',
        ],
      },
      {
        title: 'Prix et conditions',
        paragraphs: [
          'Le prix journalier est affiché sur chaque fiche voiture. La durée minimale est de 72 heures, facturées par blocs de 24 h ; un jour entamé compte comme un jour complet.',
          'Aucune caution et aucun blocage de carte. Le paiement se fait à la remise des clés. L’annulation est gratuite jusqu’à 24 h avant la prise en charge.',
        ],
      },
      {
        title: 'Prise en charge à l’aéroport d’Agadir',
        paragraphs: [
          'Notre équipe vous accueille dans le hall des arrivées de l’aéroport Agadir Al Massira. Envoyez votre numéro de vol pour que nous suivions votre arrivée, même en cas de retard.',
          'Le conducteur doit avoir au moins 23 ans et le permis depuis au moins 4 ans. Présentez votre passeport ou carte d’identité et une carte bancaire pour le paiement.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Les voitures automatiques sont-elles plus chères ?',
        a: 'Le prix journalier dépend du modèle et de la saison. Chaque fiche voiture affiche le prix actuel avant l’envoi de la demande.',
      },
      {
        q: 'Puis-je choisir le modèle exact ?',
        a: 'Vous pouvez demander un modèle. S’il n’est pas disponible à vos dates, nous confirmons une voiture automatique équivalente avant d’accepter la réservation.',
      },
      {
        q: 'La prise en charge à l’aéroport est-elle incluse ?',
        a: 'Oui. La prise en charge et le retour à l’aéroport Agadir Al Massira sont inclus.',
      },
      {
        q: 'Quelle caution faut-il ?',
        a: '0 MAD. Nous ne bloquons pas d’argent sur votre carte.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'renault-clio-5', 'hyundai-i10-bva', 'dacia-duster-bva', 'vw-troc-automatic'],
    image: '/images/fleet/dacia-sandero-stepway.webp',
    imageAlt: 'Dacia Sandero Stepway automatique à louer à Agadir',
  },
  suv: {
    key: 'suv',
    slug: 'location-suv-agadir',
    title: 'Location de SUV à Agadir | Carzio',
    description:
      'Louez un SUV à Agadir avec Carzio : Dacia Duster, Jogger, Kia Sportage et Hyundai Tucson, kilométrage illimité, 0 MAD de caution et accueil à l’aéroport.',
    h1: 'Location de SUV à Agadir',
    intro:
      'Un SUV offre plus d’espace pour les bagages, les voyages en famille et les routes autour d’Agadir, de Taghazout et de la vallée du Souss. Carzio propose plusieurs modèles SUV et crossover.',
    sections: [
      {
        title: 'Les modèles SUV et familiaux',
        paragraphs: [
          'La flotte comprend la Dacia Duster, la Dacia Jogger 7 places, la Kia Sportage et la Hyundai Tucson. Certains modèles sont automatiques, d’autres manuels.',
          'Ce sont des voitures de route pratiques, pas des 4x4. Pour les pistes de montagne ou le désert, indiquez-nous votre itinéraire afin que nous confirmions le véhicule adapté.',
        ],
      },
      {
        title: 'Espace pour les passagers et les bagages',
        paragraphs: [
          'La Jogger accueille jusqu’à 7 passagers avec un grand coffre. La Duster, la Sportage et la Tucson sont des SUV 5 places avec de la place pour les valises et le matériel de plage.',
          'Les sièges bébé et rehausseurs sont gratuits sur demande, selon disponibilité.',
        ],
      },
      {
        title: 'Réservation et prise en charge',
        paragraphs: [
          'La prise en charge se fait à l’aéroport Agadir Al Massira ou à notre agence de MAG N2, Agadir Airport. La durée minimale est de 72 heures.',
          'Le prix comprend le kilométrage illimité et l’assurance standard. L’assurance complète est optionnelle et affichée avant la confirmation.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Faut-il un 4x4 pour Taghazout ou Paradise Valley ?',
        a: 'Les routes principales sont goudronnées. Un SUV standard suffit pour une conduite normale ; dites-nous si vous prévoyez de quitter le goudron.',
      },
      {
        q: 'Combien de valises entrent dans la Jogger ?',
        a: 'La Jogger a un grand coffre et jusqu’à 7 places. L’espace dépend du nombre de sièges utilisés ; indiquez-nous vos bagages.',
      },
      {
        q: 'Un SUV automatique est-il disponible ?',
        a: 'Oui, la Dacia Duster BVA et d’autres modèles automatiques sont disponibles selon vos dates.',
      },
      {
        q: 'La caution est-elle plus élevée pour un SUV ?',
        a: 'Non. La caution est de 0 MAD pour toute la flotte, sans blocage de carte.',
      },
    ],
    carIds: ['dacia-duster-bva', 'dacia-duster-manual', 'dacia-jogger', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger SUV à louer à Agadir',
  },
  'zero-deposit': {
    key: 'zero-deposit',
    slug: 'location-voiture-zero-caution-maroc',
    title: 'Location de voiture sans caution au Maroc | Carzio',
    description:
      'Louez une voiture à Agadir avec 0 MAD de caution, sans blocage de carte et paiement à la remise des clés. Annulation gratuite 24 h et accueil aéroport inclus.',
    h1: 'Location de voiture avec 0 MAD de caution',
    intro:
      'La caution est souvent la partie stressante d’une location. Chez Carzio, il n’y a pas de caution et pas de blocage sur votre carte bancaire. Vous payez le prix de la location à la remise des clés.',
    sections: [
      {
        title: 'Comment fonctionne la caution 0 MAD',
        paragraphs: [
          'Aucun montant n’est débité ni réservé sur votre carte au moment de la réservation. Les cartes de débit sont acceptées comme les cartes de crédit, votre plafond reste donc disponible pendant le voyage.',
          'Le montant payé à la remise des clés est le prix de la location. L’assurance standard est incluse ; l’assurance complète est optionnelle.',
        ],
      },
      {
        title: 'Annulation et durée minimale',
        paragraphs: [
          'Vous pouvez annuler gratuitement jusqu’à 24 heures avant la prise en charge. La durée minimale est de 72 heures, facturées par blocs de 24 h.',
          'Une réservation est confirmée par e-mail après vérification de la disponibilité réelle. Elle n’est jamais confirmée automatiquement.',
        ],
      },
      {
        title: 'Documents et âge du conducteur',
        paragraphs: [
          'Le conducteur principal doit avoir au moins 23 ans et le permis depuis au moins 4 ans. Présentez un passeport ou une carte d’identité et une carte bancaire pour le paiement.',
          'Un deuxième conducteur peut être ajouté gratuitement aux mêmes conditions. Les sièges bébé et rehausseurs sont gratuits sur demande.',
        ],
      },
    ],
    faqs: [
      {
        q: 'N’y a-t-il vraiment aucune caution ?',
        a: 'Oui. La caution est de 0 MAD et nous ne bloquons pas d’argent sur votre carte.',
      },
      {
        q: 'Puis-je payer avec une carte de débit ?',
        a: 'Oui. Les cartes de débit et de crédit sont acceptées pour le paiement à la remise des clés.',
      },
      {
        q: 'La caution 0 MAD inclut-elle l’assurance ?',
        a: 'L’assurance standard est incluse dans le prix. L’assurance complète est optionnelle et affichée avant la confirmation.',
      },
      {
        q: 'Que se passe-t-il en cas d’annulation ?',
        a: 'L’annulation est gratuite jusqu’à 24 h avant la prise en charge. Contactez-nous par e-mail ou WhatsApp.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/hero/carzio-pickup.webp',
    imageAlt: 'Remise des clés Carzio sans caution',
  },
  'one-way-marrakech': {
    key: 'one-way-marrakech',
    slug: 'location-voiture-one-way-agadir-marrakech',
    title: 'Location one-way Agadir → Marrakech | Carzio',
    description:
      'Louez une voiture à Agadir et rendez-la à Marrakech avec Carzio. Livraison à Marrakech-Menara à 80 € par trajet, confirmée avant la réservation.',
    h1: 'Location one-way d’Agadir à Marrakech',
    intro:
      'Vous pouvez récupérer votre voiture à Agadir et la rendre à Marrakech. Cela vous évite le trajet retour et vous permet de continuer votre voyage depuis l’aéroport Marrakech-Menara ou la ville.',
    sections: [
      {
        title: 'Comment fonctionne la location one-way',
        paragraphs: [
          'Indiquez votre date de prise en charge à Agadir et votre date de retour à Marrakech. Nous vérifions la disponibilité et confirmons les conditions one-way avant d’accepter la réservation.',
          'La livraison ou la récupération à Marrakech est de 80 € par trajet. Le montant exact est confirmé par écrit avant le paiement.',
        ],
      },
      {
        title: 'Le trajet Agadir – Marrakech',
        paragraphs: [
          'La distance est d’environ 250 km et le trajet prend généralement environ 3 heures par l’autoroute. Prévoyez une pause et vérifiez le niveau de carburant avant de quitter Agadir.',
          'La durée minimale est de 72 heures. La voiture doit être rendue au lieu et à l’heure convenus à Marrakech.',
        ],
      },
      {
        title: 'Ce qui est inclus',
        paragraphs: [
          'La location comprend le kilométrage illimité et l’assurance standard. Les frais de livraison one-way s’ajoutent au prix de la location.',
          'L’assurance complète est optionnelle. Le conducteur doit avoir au moins 23 ans et le permis depuis au moins 4 ans.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Puis-je rendre la voiture à l’aéroport de Marrakech ?',
        a: 'Oui, le retour à l’aéroport Marrakech-Menara est possible sur demande. Les frais de livraison sont de 80 € par trajet.',
      },
      {
        q: 'Les frais one-way sont-ils par jour ?',
        a: 'Non. Il s’agit d’un forfait par trajet, confirmé avant la réservation.',
      },
      {
        q: 'Puis-je faire le trajet inverse, Marrakech vers Agadir ?',
        a: 'Oui, sur demande. Envoyez-nous vos dates et nous confirmerons la disponibilité et les frais.',
      },
      {
        q: 'Combien de temps dure le trajet ?',
        a: 'Environ 3 heures par l’autoroute, selon la circulation et les pauses.',
      },
    ],
    carIds: ['dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/journal/news-post-agadir-marrakech-essaouira.webp',
    imageAlt: 'Route entre Agadir et Marrakech',
  },
  essaouira: {
    key: 'essaouira',
    slug: 'location-voiture-agadir-essaouira',
    title: 'Location de voiture Agadir – Essaouira | Carzio',
    description:
      'Louez une voiture à Agadir et partez à Essaouira avec Carzio : kilométrage illimité, 0 MAD de caution, assurance standard et livraison sur devis.',
    h1: 'Location de voiture d’Agadir à Essaouira',
    intro:
      'Essaouira se trouve à environ 175 km au nord d’Agadir, le long de la côte atlantique. Une voiture de location vous permet de partir à votre rythme et de vous arrêter dans les villages.',
    sections: [
      {
        title: 'Le trajet Agadir – Essaouira',
        paragraphs: [
          'Le trajet prend généralement environ 3 heures, selon l’itinéraire et les pauses. La route côtière est panoramique mais plus lente que l’autoroute.',
          'Vérifiez le niveau de carburant avant de partir et prévoyez une pause à Taghazout, Tamraght ou dans une petite ville de la côte.',
        ],
      },
      {
        title: 'Prise en charge et retour à Essaouira',
        paragraphs: [
          'La prise en charge se fait à l’aéroport Agadir Al Massira ou à notre agence. La livraison et la récupération à Essaouira sont possibles sur demande et sur devis.',
          'Les conditions one-way ou de livraison sont confirmées par écrit avant le paiement. Nous ne publions pas de tarif fixe pour Essaouira car il dépend des dates et de la voiture.',
        ],
      },
      {
        title: 'Conditions de location',
        paragraphs: [
          'La durée minimale est de 72 heures, avec kilométrage illimité et assurance standard incluse. La caution est de 0 MAD.',
          'L’assurance complète est optionnelle. Le conducteur doit avoir au moins 23 ans et le permis depuis au moins 4 ans.',
        ],
      },
    ],
    faqs: [
      {
        q: 'La livraison à Essaouira est-elle gratuite ?',
        a: 'Non. La livraison et la récupération à Essaouira sont sur devis, selon les dates et la voiture.',
      },
      {
        q: 'Puis-je garder la voiture pour un aller-retour ?',
        a: 'Oui. Vous pouvez la prendre à Agadir, aller à Essaouira et la rendre à Agadir. Le prix journalier normal s’applique.',
      },
      {
        q: 'Combien de temps dure le trajet ?',
        a: 'Environ 3 heures, selon l’itinéraire et les pauses.',
      },
      {
        q: 'La route convient-elle à une voiture standard ?',
        a: 'Oui. Les routes principales sont goudronnées. Dites-nous si vous prévoyez des pistes non goudronnées.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/journal/essaouira-port.webp',
    imageAlt: 'Route côtière entre Agadir et Essaouira',
  },
  'taghazout-tamraght': {
    key: 'taghazout-tamraght',
    slug: 'location-voiture-taghazout-tamraght',
    title: 'Location de voiture Taghazout & Tamraght | Carzio',
    description:
      'Louez une voiture pour Taghazout et Tamraght avec Carzio : accueil à l’aéroport d’Agadir, 0 MAD de caution, kilométrage illimité et livraison sur devis.',
    h1: 'Location de voiture pour Taghazout et Tamraght',
    intro:
      'Taghazout et Tamraght sont deux villages de surf au nord d’Agadir. Une voiture vous donne la liberté de rejoindre les plages, les cafés et la côte sans dépendre d’une navette.',
    sections: [
      {
        title: 'De l’aéroport d’Agadir à Taghazout ou Tamraght',
        paragraphs: [
          'Taghazout est à environ 19 km d’Agadir, soit 30 à 40 minutes en voiture. Tamraght est à environ 14 km, soit 25 minutes.',
          'Vous pouvez récupérer la voiture à l’aéroport Agadir Al Massira ou à notre agence. La livraison à Taghazout ou Tamraght est possible sur demande et sur devis.',
        ],
      },
      {
        title: 'Voyages de surf et bagages',
        paragraphs: [
          'Dites-nous si vous voyagez avec des planches de surf ou des bagages supplémentaires afin que nous confirmions la voiture adaptée. La Dacia Jogger et les SUV offrent plus d’espace.',
          'Les sièges bébé et rehausseurs sont gratuits sur demande, selon disponibilité.',
        ],
      },
      {
        title: 'Conditions',
        paragraphs: [
          'La durée minimale est de 72 heures, avec kilométrage illimité, assurance standard et 0 MAD de caution.',
          'L’annulation est gratuite jusqu’à 24 h avant la prise en charge. Le conducteur doit avoir au moins 23 ans et le permis depuis au moins 4 ans.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Pouvez-vous livrer la voiture à mon surf camp ?',
        a: 'La livraison à Taghazout ou Tamraght est possible sur demande. Envoyez l’adresse et les dates ; nous confirmons les conditions avant la réservation.',
      },
      {
        q: 'Quelle est la distance entre Taghazout et l’aéroport ?',
        a: 'Environ 19 km, soit 30 à 40 minutes en voiture.',
      },
      {
        q: 'Quelle voiture convient pour les planches de surf ?',
        a: 'La Jogger et les SUV ont plus d’espace. Indiquez la longueur des planches et le nombre de passagers.',
      },
      {
        q: 'Est-il facile de se garer à Taghazout ?',
        a: 'Le stationnement est limité au centre du village, surtout en haute saison. Utilisez les places balisées et ne bloquez pas les accès.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'dacia-jogger', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/taghazout-beach.webp',
    imageAlt: 'Plage de Taghazout près d’Agadir',
  },
  family: {
    key: 'family',
    slug: 'location-voiture-famille-agadir',
    title: 'Location de voiture familiale à Agadir | Carzio',
    description:
      'Louez une voiture familiale à Agadir avec Carzio : Dacia Jogger 7 places, SUV spacieux, sièges enfant gratuits sur demande, 0 MAD de caution et accueil aéroport.',
    h1: 'Location de voiture familiale à Agadir',
    intro:
      'Un voyage en famille demande de l’espace pour les passagers, les bagages et les sièges enfant. Carzio propose une Jogger 7 places et plusieurs SUV pratiques.',
    sections: [
      {
        title: 'Des voitures pour les familles',
        paragraphs: [
          'La Dacia Jogger accueille jusqu’à 7 passagers avec un grand coffre. La Dacia Duster, la Kia Sportage et la Hyundai Tucson offrent 5 places avec plus d’espace à bagages qu’une petite citadine.',
          'Indiquez-nous le nombre d’adultes, d’enfants et de valises afin que nous recommandions le bon modèle.',
        ],
      },
      {
        title: 'Sièges enfant et bagages',
        paragraphs: [
          'Les sièges bébé et rehausseurs sont gratuits sur demande, selon disponibilité. Envoyez l’âge et le poids de l’enfant pour que nous fournissions le siège adapté.',
          'La Jogger est le meilleur choix pour 6 ou 7 passagers. Pour 4 ou 5 passagers, un SUV suffit généralement.',
        ],
      },
      {
        title: 'Accueil à l’aéroport et conditions',
        paragraphs: [
          'Nous vous accueillons à l’aéroport Agadir Al Massira et nous vous aidons à installer les sièges enfant. La durée minimale est de 72 heures.',
          'Le prix comprend le kilométrage illimité et l’assurance standard. La caution est de 0 MAD et l’annulation est gratuite jusqu’à 24 h avant la prise en charge.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Quelle voiture accueille 7 personnes ?',
        a: 'La Dacia Jogger accueille jusqu’à 7 passagers, selon la configuration des sièges et les bagages.',
      },
      {
        q: 'Les sièges enfant sont-ils gratuits ?',
        a: 'Oui, les sièges bébé et rehausseurs sont gratuits sur demande, selon disponibilité.',
      },
      {
        q: 'Pouvez-vous installer le siège à l’aéroport ?',
        a: 'Oui. Notre équipe peut vous aider à l’installer lors de la remise à l’aéroport Agadir Al Massira.',
      },
      {
        q: 'Y a-t-il assez de place pour les valises ?',
        a: 'Cela dépend du nombre de passagers. Envoyez-nous le détail des bagages et nous confirmerons la meilleure voiture.',
      },
    ],
    carIds: ['dacia-jogger', 'dacia-duster-manual', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger 7 places pour une location familiale à Agadir',
  },
  'child-seat': {
    key: 'child-seat',
    slug: 'location-voiture-siege-enfant-agadir',
    title: 'Location de voiture avec siège enfant à Agadir | Carzio',
    description:
      'Louez une voiture à Agadir avec un siège bébé ou un rehausseur gratuit sur demande. Carzio aide à l’installation et assure l’accueil à l’aéroport.',
    h1: 'Location de voiture avec siège enfant à Agadir',
    intro:
      'Voyager avec un bébé ou un jeune enfant est plus simple quand le siège est déjà dans la voiture. Carzio fournit des sièges bébé et des rehausseurs gratuitement sur demande, selon disponibilité.',
    sections: [
      {
        title: 'Sièges bébé et rehausseurs',
        paragraphs: [
          'Indiquez l’âge et le poids de l’enfant dans votre demande. Nous fournirons le siège bébé ou le rehausseur adapté et le confirmerons avant la réservation.',
          'Les sièges sont gratuits. Ils sont soumis à disponibilité : demandez-les le plus tôt possible, surtout en juillet et août.',
        ],
      },
      {
        title: 'Installation à l’aéroport',
        paragraphs: [
          'Notre équipe peut vous aider à installer le siège lors de la remise à l’aéroport Agadir Al Massira. Demandez-nous si vous n’êtes pas sûr du montage.',
          'Vérifiez que le siège est correctement fixé avant de partir et ajustez le harnais à l’enfant.',
        ],
      },
      {
        title: 'Choisir la bonne voiture',
        paragraphs: [
          'Une citadine suffit pour un ou deux enfants. Pour trois enfants ou une grande poussette, choisissez un SUV ou la Jogger 7 places.',
          'La durée minimale est de 72 heures, avec kilométrage illimité, assurance standard et 0 MAD de caution.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Le siège enfant est-il vraiment gratuit ?',
        a: 'Oui. Les sièges bébé et rehausseurs sont gratuits sur demande, selon disponibilité.',
      },
      {
        q: 'Comment choisir le bon siège ?',
        a: 'Envoyez l’âge et le poids de l’enfant. Nous confirmerons le siège bébé ou le rehausseur adapté.',
      },
      {
        q: 'Puis-je apporter mon propre siège ?',
        a: 'Oui. Vous pouvez utiliser votre propre siège. Dites-le-nous pour que nous n’en réservions pas un inutilement.',
      },
      {
        q: 'Fournissez-vous des sièges pour les nouveau-nés ?',
        a: 'Indiquez l’âge et le poids du bébé ; nous confirmerons si un siège adapté est disponible à vos dates.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-jogger', 'dacia-duster-manual'],
    image: '/images/hero/agadir-airport-arrival.webp',
    imageAlt: 'Remise d’une voiture Carzio avec siège enfant à l’aéroport',
  },
};

const PAGES: Partial<Record<Lang, Record<SupportKey, SupportPageContent>>> = { en, fr, de, es, pl, nl };

export function supportLanguages(): Lang[] {
  return Object.keys(PAGES) as Lang[];
}

export function getSupportPages(lang: string): SupportPageContent[] {
  const key = (lang.slice(0, 2) as Lang) || 'en';
  const source = PAGES[key] || en;
  return SUPPORT_KEYS.map((item) => source[item]);
}

export function getSupportPage(key: SupportKey, lang: string): SupportPageContent {
  const requested = (lang.slice(0, 2) as Lang) || 'en';
  const source = PAGES[requested] || en;
  return source[key] || en[key];
}

export function findSupportPageBySlug(slug: string, lang: string): SupportPageContent | undefined {
  return getSupportPages(lang).find((page) => page.slug === slug);
}

export function supportAlternatePaths(key: SupportKey): Partial<Record<Lang, string>> {
  const langs: Lang[] = ['en', 'fr', 'de', 'es', 'pl', 'nl'];
  const paths: Partial<Record<Lang, string>> = {};
  for (const lang of langs) {
    const page = getSupportPage(key, lang);
    paths[lang] = `/${lang}/${page.slug}`;
  }
  return paths;
}
