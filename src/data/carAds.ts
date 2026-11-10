export interface CarAd {
  pitch: string;
  bullets: string[];
}

export type CarAdLang = 'fr' | 'en' | 'de' | 'es' | 'pl';

/**
 * Conversion copy for each car, shown under its title in the booking form and
 * on fleet cards. Original Carzio wording — no external text is copied.
 * Claims stay inside the published offer: unlimited km, standard insurance
 * included, 0 MAD deposit, free cancellation up to 24 h, delivery free at
 * Agadir (airport + agency) and €80 per trip at Marrakech and Casablanca.
 * 24/7 service applies only at Agadir Al Massira airport.
 */
const fr: Record<string, CarAd> = {
  'dacia-sandero-stepway': {
    pitch:
      "Besoin d'une voiture fiable à Agadir au meilleur prix ? La Stepway offre l'équilibre parfait entre confort, espace et facilité, idéale en couple, en famille ou en voyage d'affaires.",
    bullets: [
      'Bons tarifs pour nos clients',
      'Boîte automatique, très simple à conduire',
      '5 sièges et coffre pratique pour la plage',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'dacia-sandero-streetway': {
    pitch:
      "Vous cherchez le meilleur prix sans compromis ? La Streetway est votre alliée : sobre, pratique et moderne, la citadine idéale pour la corniche, le port et les souks.",
    bullets: [
      'Bons tarifs pour nos clients',
      'Économique à la pompe',
      'Faible encombrement, se gare partout',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'dacia-logan': {
    pitch:
      "Cap sur Paradise Valley, Taghazout ou Essaouira sans souci ? Notre Logan offre un coffre de 4 valises et la sérénité des longs trajets.",
    bullets: [
      'Bons tarifs pour nos clients',
      'Coffre extra-large, 4 valises',
      'Kilométrage illimité sur tout le trajet',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'hyundai-i10-bva': {
    pitch:
      "Le meilleur choix pour deux en ville. L'i10 combine boîte automatique, gabarit compact et efficacité — du souk au port, de la corniche aux parkings serrés.",
    bullets: [
      'Bons tarifs pour nos clients',
      'Automatique et ultra-compacte',
      'Écran tactile intégré',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'peugeot-208': {
    pitch:
      "Envie de conduire avec style au meilleur prix ? La 208 : look affirmé, GPS intégré et écran tactile — idéale à deux, vers la plage ou en road trip côtier.",
    bullets: [
      'Bons tarifs pour nos clients',
      'GPS intégré et écran tactile',
      'Look affirmé, conduite vive',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'renault-clio-5': {
    pitch:
      "La citadine moderne sans compromis : automatique, écran tactile et 5 sièges confortables — idéale d'Agadir à Tamraght sans sacrifier le confort.",
    bullets: [
      'Bons tarifs pour nos clients',
      'Automatique et écran tactile',
      '5 sièges confortables',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'dacia-duster-bva': {
    pitch:
      "Pistes, montagne ou côte atlantique ? Le Duster répond présent : SUV robuste à boîte automatique, GPS intégré et écran tactile. Pensé pour l'aventure, docile en ville.",
    bullets: [
      'Bons tarifs pour nos clients',
      'SUV robuste, boîte automatique',
      'GPS intégré et écran tactile',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'dacia-duster-manual': {
    pitch:
      "Un SUV polyvalent et confortable, le Dacia Duster est parfait pour les trajets en ville et les aventures en plein air. Profitez d'un espace généreux, d'un excellent confort de route et d'une praticité idéale pour explorer le Maroc. Idéal pour les couples, les familles et les petits groupes.",
    bullets: [
      'Bons tarifs pour nos clients',
      'SUV 5 places, boîte manuelle',
      'Coffre généreux pour les bagages',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'dacia-jogger': {
    pitch:
      "La voiture 7 places la plus maligne pour les familles et les amis : espace XXL pour les bagages, kilométrage illimité et confort royal.",
    bullets: [
      'Bons tarifs pour nos clients',
      '7 sièges réels',
      'Coffre XXL, tout rentre',
      "Livraison gratuite à l'aéroport d'Agadir et à l'agence",
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'kia-sportage': {
    pitch:
      "Le SUV familial complet : GPS, écran tactile, boîte automatique et un habitacle généreux — parfait pour la route Agadir–Marrakech, l'Atlas ou la côte.",
    bullets: [
      'Bons tarifs pour nos clients',
      'GPS, écran tactile et boîte auto',
      '5 sièges spacieux',
      'Marrakech et Casablanca : 80 € par trajet',
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'vw-troc-automatic': {
    pitch:
      "Style premium et technologie : boîte automatique, GPS et écran tactile — le SUV compact malin pour les séjours pro comme les week-ends loisirs.",
    bullets: [
      'Bons tarifs pour nos clients',
      'GPS, écran tactile et boîte auto',
      'Comportement précis et sûr',
      'Marrakech et Casablanca : 80 € par trajet',
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'hyundai-tucson': {
    pitch:
      "La valeur sûre : GPS, écran tactile, boîte automatique et sécurité éprouvée — l'équilibre parfait pour votre famille au Maroc.",
    bullets: [
      'Bons tarifs pour nos clients',
      'GPS, écran tactile et boîte auto',
      'Sécurité, fiabilité, caractère',
      'Marrakech et Casablanca : 80 € par trajet',
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
  'volkswagen-touareg': {
    pitch:
      "L'ultime expérience : luxe, performance et technologie — GPS, écran tactile et boîte automatique, 5 sièges premium pour les voyageurs sans compromis.",
    bullets: [
      'Bons tarifs pour nos clients',
      'GPS, écran tactile et boîte auto',
      '5 sièges luxos, confort premium',
      'Marrakech et Casablanca : 80 € par trajet',
      "Service 24/7 uniquement à l'aéroport Agadir Al Massira",
    ],
  },
};

const en: Record<string, CarAd> = {
  'dacia-sandero-stepway': {
    pitch:
      'Need a reliable car for your Agadir stay? The Stepway delivers the perfect balance of comfort, space and simplicity — ideal for couples, families or a work trip.',
    bullets: [
      'Good prices for our clients',
      'Automatic and easy to drive',
      '5 seats, practical boot',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'dacia-sandero-streetway': {
    pitch:
      'Want the best price without compromise? The Streetway is your ally: economical, practical and modern — the perfect city car for the seafront, the port and the souks.',
    bullets: [
      'Good prices for our clients',
      'Fuel-efficient',
      'Compact, parks anywhere',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'dacia-logan': {
    pitch:
      'Bound for Paradise Valley, Taghazout or Essaouira? Our Logan gives you a 4-suitcase trunk and peace of mind on longer drives.',
    bullets: [
      'Good prices for our clients',
      '4-suitcase extra-large boot',
      'Unlimited mileage on every trip',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'hyundai-i10-bva': {
    pitch:
      'The best pick for two in the city. The i10 blends an automatic gearbox, a compact body and efficiency — souk to port, seafront to tight parking spots.',
    bullets: [
      'Good prices for our clients',
      'Automatic and ultra-compact',
      'Built-in touchscreen',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'peugeot-208': {
    pitch:
      'Want to drive in style at the right price? The 208: bold look, built-in GPS and touchscreen — perfect for two heading to the beach or a coastal road trip.',
    bullets: [
      'Good prices for our clients',
      'Built-in GPS and touchscreen',
      'Bold look, lively drive',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'renault-clio-5': {
    pitch:
      'The modern city car without compromise: automatic, touchscreen and 5 comfortable seats — perfect from Agadir to Tamraght without sacrificing comfort.',
    bullets: [
      'Good prices for our clients',
      'Automatic and touchscreen',
      '5 comfortable seats',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'dacia-duster-bva': {
    pitch:
      'Tracks, mountains or the Atlantic coast? The Duster delivers: rugged automatic SUV, built-in GPS and touchscreen. Built for adventure, easy in town too.',
    bullets: [
      'Good prices for our clients',
      'Rugged automatic SUV',
      'Built-in GPS and touchscreen',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'dacia-duster-manual': {
    pitch:
      'A versatile and comfortable SUV, the Dacia Duster is perfect for city drives and outdoor adventures. Enjoy generous space, excellent road comfort, and practicality for exploring Morocco. Ideal for couples, families, and small groups.',
    bullets: [
      'Good prices for our clients',
      'Five-seat manual SUV',
      'Generous boot for luggage',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'dacia-jogger': {
    pitch:
      'The cleverest 7-seater for big families and groups: XXL space for luggage, unlimited mileage and first-rate comfort.',
    bullets: [
      'Good prices for our clients',
      '7 real seats',
      'XXL boot — everything fits',
      'Free delivery at Agadir airport & agency',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'kia-sportage': {
    pitch:
      "The complete family SUV: GPS, touchscreen, automatic gearbox and generous room — perfect for the Agadir–Marrakech drive, the Atlas or the coast.",
    bullets: [
      'Good prices for our clients',
      'GPS, touchscreen and automatic',
      '5 spacious seats',
      'Marrakech & Casablanca: €80 per trip',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'vw-troc-automatic': {
    pitch:
      'Premium style and tech: automatic, GPS and touchscreen — the smart compact SUV for business trips and leisure weekends alike.',
    bullets: [
      'Good prices for our clients',
      'GPS, touchscreen and automatic',
      'Precise, secure handling',
      'Marrakech & Casablanca: €80 per trip',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'hyundai-tucson': {
    pitch:
      "The proven choice: GPS, touchscreen, automatic gearbox and proven safety — the perfect balance for your family in Morocco.",
    bullets: [
      'Good prices for our clients',
      'GPS, touchscreen and automatic',
      'Safety, reliability, character',
      'Marrakech & Casablanca: €80 per trip',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
  'volkswagen-touareg': {
    pitch:
      'The ultimate experience: luxury, performance and technology — GPS, touchscreen and automatic, 5 premium seats for travellers who never compromise.',
    bullets: [
      'Good prices for our clients',
      'GPS, touchscreen and automatic',
      '5 luxury seats, premium ride',
      'Marrakech & Casablanca: €80 per trip',
      '24/7 service only at Agadir Al Massira airport',
    ],
  },
};

const de: Record<string, CarAd> = {
  'dacia-sandero-stepway': {
    pitch:
      'Sie brauchen ein zuverlässiges Auto für Ihren Agadir-Urlaub? Der Stepway bietet die perfekte Balance aus Komfort, Platz und Einfachheit — ideal für Paare, Familien und Geschäftsreisen.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Automatik, kinderleicht zu fahren',
      '5 Sitze, praktischer Kofferraum',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      "24/7 Service nur am Flughafen Agadir Al Massira",
    ],
  },
  'dacia-sandero-streetway': {
    pitch:
      'Bestpreis ohne Kompromisse? Der Streetway ist Ihr Verbündeter: sparsam, praktisch, modern — der perfekte Stadtflitzer für Strandpromenade, Hafen und Souks.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Spritsparend',
      'Kompakt, parkt überall',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'dacia-logan': {
    pitch:
      'Ab nach Paradise Valley, Taghazout oder Essaouira? Unser Logan bietet Stauraum für 4 Koffer und ein Gefühl von Ruhe auf langen Fahrten.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Extra großer Kofferraum, 4 Koffer',
      'Unbegrenzte Kilometer auf jeder Fahrt',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'hyundai-i10-bva': {
    pitch:
      'Die beste Wahl für zwei in der Stadt. Der i10 vereint Automatik, kompaktes Format und Effizienz — vom Souk zum Hafen, Strandpromenade bis zum engen Parkplatz.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Automatik und ultrakompakt',
      'Integrierter Touchscreen',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'peugeot-208': {
    pitch:
      'Stilvoll fahren zum fairen Preis? Die 208: auffälliger Look, integriertes GPS und Touchscreen — perfekt zu zweit Richtung Strand oder Küstenausflug.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Integriertes GPS und Touchscreen',
      'Auffälliger Look, agiles Fahren',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'renault-clio-5': {
    pitch:
      'Das moderne Stadtauto ohne Kompromisse: Automatik, Touchscreen und 5 bequeme Sitze — ideal von Agadir nach Tamraght ohne Komfortverlust.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Automatik und Touchscreen',
      '5 bequeme Sitze',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'dacia-duster-bva': {
    pitch:
      'Pisten, Berge oder Atlantikküste? Der Duster liefert: robustes Automatik-SUV, integriertes GPS und Touchscreen. Gebaut fürs Abenteuer, alltagstauglich in der Stadt.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Robustes Automatik-SUV',
      'Integriertes GPS und Touchscreen',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'dacia-duster-manual': {
    pitch:
      'Ein vielseitiger und komfortabler SUV: der Dacia Duster ist perfekt für Stadt-Fahrten und Outdoor-Abenteuer. Genießen Sie großzügigen Platz, hervorragenden Fahrkomfort und Praktikabilität für die Erkundung Marokkos. Ideal für Paare, Familien und kleine Gruppen.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'Fünf-Sitzer-SUV mit Schaltgetriebe',
      'Großzügiger Kofferraum für Gepäck',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'dacia-jogger': {
    pitch:
      'Das cleverste 7-Sitzer für große Familien und Gruppen: XL-Gepäckraum, unbegrenzte Kilometer und exzellenter Komfort.',
    bullets: [
      'Gute Preise für unsere Kunden',
      '7 echte Sitze',
      'XXL-Kofferraum — alles passt rein',
      'Kostenlose Lieferung am Flughafen Agadir & in der Agentur',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'kia-sportage': {
    pitch:
      'Der komplette Familien-SUV: GPS, Touchscreen, Automatik und großzügiger Innenraum — perfekt für die Fahrt Agadir–Marrakesch, den Atlas oder die Küste.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'GPS, Touchscreen und Automatik',
      '5 geräumige Sitze',
      'Marrakesch & Casablanca: 80 € pro Strecke',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'vw-troc-automatic': {
    pitch:
      'Premium-Design und Technik: Automatik, GPS und Touchscreen — das smarte Kompakt-SUV für Geschäftsreisen und Freizeitwochenenden.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'GPS, Touchscreen und Automatik',
      'Präzises, sicheres Handling',
      'Marrakesch & Casablanca: 80 € pro Strecke',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'hyundai-tucson': {
    pitch:
      'Die bewährte Wahl: GPS, Touchscreen, Automatik und bewährte Sicherheit — die perfekte Balance für Ihre Familie in Marokko.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'GPS, Touchscreen und Automatik',
      'Sicherheit, Zuverlässigkeit, Charakter',
      'Marrakesch & Casablanca: 80 € pro Strecke',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
  'volkswagen-touareg': {
    pitch:
      'Das unübertroffene Erlebnis: Luxus, Leistung und Technologie — GPS, Touchscreen und Automatik, 5 Premium-Sitze für Reisende ohne Kompromisse.',
    bullets: [
      'Gute Preise für unsere Kunden',
      'GPS, Touchscreen und Automatik',
      '5 Luxus-Sitze, gehobener Fahrkomfort',
      'Marrakesch & Casablanca: 80 € pro Strecke',
      '24/7 Service nur am Flughafen Agadir Al Massira',
    ],
  },
};

const es: Record<string, CarAd> = {
  'dacia-sandero-stepway': {
    pitch:
      '¿Necesitas un coche fiable para tu estancia en Agadir? El Stepway ofrece el equilibrio perfecto entre comodidad, espacio e sencillez — ideal para parejas, familias o viajes de negocios.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'Automático y fácil de conducir',
      '5 asientos y maletero práctico',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'dacia-sandero-streetway': {
    pitch:
      '¿Buscas el mejor precio sin compromisos? El Streetway es tu aliado: económico, práctico y moderno — el urbano perfecto para el paseo marítimo, el puerto y los zocos.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'Bajo consumo',
      'Compacto, aparca en cualquier sitio',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'dacia-logan': {
    pitch:
      '¿Rumbo a Paradise Valley, Taghazout o Essaouira? Nuestro Logan te da espacio para 4 maletas y tranquilidad en los trayectos largos.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'Maletero extra grande, 4 maletas',
      'Kilometraje ilimitado en cada viaje',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'hyundai-i10-bva': {
    pitch:
      'La mejor elección para dos en la ciudad. El i10 combina cambio automático, formato compacto y eficiencia — del zoco al puerto, del paseo marítimo al aparcamiento difícil.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'Automático y ultra compacto',
      'Pantalla táctil integrada',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'peugeot-208': {
    pitch:
      '¿Ganas de conducir con estilo al mejor precio? El 208: look atrevido, GPS integrado y pantalla táctil — perfecto para dos, hacia la playa o escapada por la costa.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'GPS integrado y pantalla táctil',
      'Look atrevido, conducción ágil',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'renault-clio-5': {
    pitch:
      'El urbano moderno sin compromisos: automático, pantalla táctil y 5 asientos cómodos — ideal de Agadir a Tamraght sin sacrificar el confort.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'Automático y pantalla táctil',
      '5 asientos cómodos',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'dacia-duster-bva': {
    pitch:
      '¿Pistas, montaña o costa atlántica? El Duster responde: SUV robusto automático, GPS integrado y pantalla táctil. Hecho para la aventura, cómodo en la ciudad.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'SUV robusto, automático',
      'GPS integrado y pantalla táctil',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'dacia-duster-manual': {
    pitch:
      'Un SUV versátil y cómodo, el Dacia Duster es perfecto para trayectos urbanos y aventuras al aire libre. Disfruta de un espacio generoso, una excelente comodidad en carretera y practicidad para explorar Marruecos. Ideal para parejas, familias y grupos pequeños.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'SUV de cinco plazas, cambio manual',
      'Maletero amplio para el equipaje',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'dacia-jogger': {
    pitch:
      'El 7 plazas más inteligente para familias y grupos: espacio XXL para el equipaje, kilometraje ilimitado y confort sobresaliente.',
    bullets: [
      'Buenos precios para nuestros clientes',
      '7 plazas reales',
      'Maletero XXL — cabe todo',
      'Entrega gratuita en el aeropuerto de Agadir y en la agencia',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'kia-sportage': {
    pitch:
      'El SUV familiar completo: GPS, pantalla táctil, cambio automático y habitáculo generoso — perfecto para el trayecto Agadir–Marrakech, el Atlas o la costa.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'GPS, pantalla táctil y automático',
      '5 asientos amplios',
      'Marrakech y Casablanca: 80 € por trayecto',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'vw-troc-automatic': {
    pitch:
      'Estilo premium y tecnología: automático, GPS y pantalla táctil — el SUV compacto inteligente para viajes de negocios y fines de semana.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'GPS, pantalla táctil y automático',
      'Comportamiento preciso y seguro',
      'Marrakech y Casablanca: 80 € por trayecto',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'hyundai-tucson': {
    pitch:
      'La opción probada: GPS, pantalla táctil, automático y seguridad probada — el equilibrio perfecto para tu familia en Marruecos.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'GPS, pantalla táctil y automático',
      'Seguridad, fiabilidad, carácter',
      'Marrakech y Casablanca: 80 € por trayecto',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
  'volkswagen-touareg': {
    pitch:
      'La experiencia definitiva: lujo, rendimiento y tecnología — GPS, pantalla táctil y automático, 5 plazas premium para viajeros sin compromisos.',
    bullets: [
      'Buenos precios para nuestros clientes',
      'GPS, pantalla táctil y automático',
      '5 plazas de lujo, confort premium',
      'Marrakech y Casablanca: 80 € por trayecto',
      'Servicio 24/7 solo en el aeropuerto Agadir Al Massira',
    ],
  },
};

const pl: Record<string, CarAd> = {
  'dacia-sandero-stepway': {
    pitch:
      'Potrzebujesz niezawodnego samochodu na pobyt w Agadirze? Stepway to idealny balans między komfortem, przestrzenią i prostotą — dla par, rodzin i podróży służbowych.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Automat, łatwy w prowadzeniu',
      '5 miejsc i praktyczny bagażnik',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'dacia-sandero-streetway': {
    pitch:
      'Szukasz najlepszej ceny bez kompromisów? Streetway to Twój sprzymierzeniec: ekonomiczny, praktyczny, nowoczesny — idealny do jazdy po promenadzie, porcie i soukach.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Oszczędność paliwa',
      'Kompaktowy, parkuje wszędzie',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'dacia-logan': {
    pitch:
      'Jedziesz do Paradise Valley, Taghazout czy Essaouiry? Nasz Logan pomieści 4 walizki i daje spokój na dłuższych trasach.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Bardzo duży bagażnik, 4 walizki',
      'Nielimitowany przebieg na każdy przejazd',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'hyundai-i10-bva': {
    pitch:
      'Najlepszy wybór dla dwóch osób w mieście. I10 łączy automat, kompaktowe wymiary i wydajność — od souka po port, od promenady po ciasne miejsca.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Automat i ultra kompaktowy rozmiar',
      'Wbudowany ekran dotykowy',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'peugeot-208': {
    pitch:
      'Chcesz jeździć stylowo w uczciwej cenie? 208: odważny wygląd, wbudowane GPS i ekran dotykowy — idealna dla dwojga na plażę lub wycieczkę wybrzeżem.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Wbudowane GPS i ekran dotykowy',
      'Odważny styl, dynamiczna jazda',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'renault-clio-5': {
    pitch:
      'Nowoczesny miejski bez kompromisów: automat, ekran dotykowy i 5 wygodnych miejsc — idealny od Agadiru do Tamraghtu bez rezygnacji z komfortu.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Automat i ekran dotykowy',
      '5 wygodnych miejsc',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'dacia-duster-bva': {
    pitch:
      'Piste, góry czy atlantyckie wybrzeże? Duster dostarczy: solidny automat SUV, wbudowane GPS i ekran dotykowy. Stworzony do przygody, wygodny w mieście.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Solidny automat SUV',
      'Wbudowane GPS i ekran dotykowy',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'dacia-duster-manual': {
    pitch:
      'Wszechstronny i komfortowy SUV — Dacia Duster idealnie sprawdza się w miejskich podróżach i przygodach na świeżym powietrzu. Ciesz się przestronnym wnętrzem, doskonałym komfortem jazdy i praktycznością podczas odkrywania Maroka. Idealny dla par, rodzin i małych grup.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'Pięciomiejscowy SUV z manualną skrzynią',
      'Pojemny bagażnik na bagaże',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'dacia-jogger': {
    pitch:
      'Najmądrzejszy 7-miejscowy dla dużych rodzin i grup: XXL przestrzeń na bagaż, nielimitowany przebieg i pierwszorzędny komfort.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      '7 prawdziwych miejsc',
      'XXL bagażnik — wszystko się zmieści',
      'Bezpłatna dostawa na lotnisko Agadir i do agencji',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'kia-sportage': {
    pitch:
      'Kompletny rodzinny SUV: GPS, ekran dotykowy, automat i przestronne wnętrze — idealny na trasę Agadir–Marrakesz, Atlas czy wybrzeże.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'GPS, ekran dotykowy i automat',
      '5 przestronnych miejsc',
      'Marrakesz i Casablanca: 80 € za przejazd',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'vw-troc-automatic': {
    pitch:
      'Premium styl i technika: automat, GPS i ekran dotykowy — inteligentny kompaktowy SUV na biznes i weekendy.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'GPS, ekran dotykowy i automat',
      'Precyzyjne, bezpieczne prowadzenie',
      'Marrakesz i Casablanca: 80 € za przejazd',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'hyundai-tucson': {
    pitch:
      'Sprawdzony wybór: GPS, ekran dotykowy, automat i sprawdzona bezpieczeństwo — idealna równowaga dla Twojej rodziny w Maroku.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'GPS, ekran dotykowy i automat',
      'Bezpieczeństwo, niezawodność, charakter',
      'Marrakesz i Casablanca: 80 € za przejazd',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
  'volkswagen-touareg': {
    pitch:
      'Kwintesencja luksusu: luksus, osiągi i technologia — GPS, ekran dotykowy i automat, 5 premium miejsc dla wymagających podróżnych.',
    bullets: [
      'Dobre ceny dla naszych klientów',
      'GPS, ekran dotykowy i automat',
      '5 luksusowych miejsc, premium komfort',
      'Marrakesz i Casablanca: 80 € za przejazd',
      'Serwis 24/7 tylko na lotnisku Agadir Al Massira',
    ],
  },
};

export const carAds: Record<string, Record<CarAdLang, CarAd>> = {
  'dacia-sandero-stepway': { fr: fr['dacia-sandero-stepway'], en: en['dacia-sandero-stepway'], de: de['dacia-sandero-stepway'], es: es['dacia-sandero-stepway'], pl: pl['dacia-sandero-stepway'] },
  'dacia-sandero-streetway': { fr: fr['dacia-sandero-streetway'], en: en['dacia-sandero-streetway'], de: de['dacia-sandero-streetway'], es: es['dacia-sandero-streetway'], pl: pl['dacia-sandero-streetway'] },
  'dacia-logan': { fr: fr['dacia-logan'], en: en['dacia-logan'], de: de['dacia-logan'], es: es['dacia-logan'], pl: pl['dacia-logan'] },
  'hyundai-i10-bva': { fr: fr['hyundai-i10-bva'], en: en['hyundai-i10-bva'], de: de['hyundai-i10-bva'], es: es['hyundai-i10-bva'], pl: pl['hyundai-i10-bva'] },
  'peugeot-208': { fr: fr['peugeot-208'], en: en['peugeot-208'], de: de['peugeot-208'], es: es['peugeot-208'], pl: pl['peugeot-208'] },
  'renault-clio-5': { fr: fr['renault-clio-5'], en: en['renault-clio-5'], de: de['renault-clio-5'], es: es['renault-clio-5'], pl: pl['renault-clio-5'] },
  'dacia-duster-bva': { fr: fr['dacia-duster-bva'], en: en['dacia-duster-bva'], de: de['dacia-duster-bva'], es: es['dacia-duster-bva'], pl: pl['dacia-duster-bva'] },
  'dacia-duster-manual': { fr: fr['dacia-duster-manual'], en: en['dacia-duster-manual'], de: de['dacia-duster-manual'], es: es['dacia-duster-manual'], pl: pl['dacia-duster-manual'] },
  'dacia-jogger': { fr: fr['dacia-jogger'], en: en['dacia-jogger'], de: de['dacia-jogger'], es: es['dacia-jogger'], pl: pl['dacia-jogger'] },
  'kia-sportage': { fr: fr['kia-sportage'], en: en['kia-sportage'], de: de['kia-sportage'], es: es['kia-sportage'], pl: pl['kia-sportage'] },
  'vw-troc-automatic': { fr: fr['vw-troc-automatic'], en: en['vw-troc-automatic'], de: de['vw-troc-automatic'], es: es['vw-troc-automatic'], pl: pl['vw-troc-automatic'] },
  'hyundai-tucson': { fr: fr['hyundai-tucson'], en: en['hyundai-tucson'], de: de['hyundai-tucson'], es: es['hyundai-tucson'], pl: pl['hyundai-tucson'] },
  'volkswagen-touareg': { fr: fr['volkswagen-touareg'], en: en['volkswagen-touareg'], de: de['volkswagen-touareg'], es: es['volkswagen-touareg'], pl: pl['volkswagen-touareg'] },
};

export function getCarAd(id: string, lang: string): CarAd | undefined {
  const key: CarAdLang = lang.startsWith('fr') ? 'fr' : lang.startsWith('de') ? 'de' : lang.startsWith('es') ? 'es' : lang.startsWith('pl') ? 'pl' : 'en';
  return carAds[id]?.[key] ?? carAds[id]?.en;
}
