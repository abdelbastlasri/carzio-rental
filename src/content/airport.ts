export type AirportLang = 'en' | 'fr' | 'de' | 'es' | 'pl';

export interface AirportFaq {
  q: string;
  a: string;
}

export interface AirportStep {
  title: string;
  text: string;
}

export interface AirportPageContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  cta: string;
  trust: string[];
  stepsTitle: string;
  steps: AirportStep[];
  pickupTitle: string;
  pickupText: string;
  priceTitle: string;
  priceText: string;
  insuranceTitle: string;
  insuranceText: string;
  faqTitle: string;
  faqs: AirportFaq[];
  mapTitle: string;
  mapText: string;
  directions: string;
  fleetTitle: string;
  fleetSubtitle: string;
  whatsappText: string;
}

const en: AirportPageContent = {
  slug: 'car-rental-agadir-airport',
  title: 'Car Rental at Agadir Airport (Al Massira) | Carzio',
  description:
    'Rent a car at Agadir Al Massira Airport with Carzio: meet & greet at arrivals, 0 MAD deposit, free cancellation 24h, automatic and SUV cars, 24/7 local support.',
  h1: 'Car Rental at Agadir Airport (Al Massira)',
  intro:
    'Your car is waiting at Agadir Al Massira Airport. Carzio is a local agency based at the terminal: meet our team at arrivals, complete the paperwork and drive away. Clear prices, 0 MAD deposit and free cancellation up to 24 hours before pickup.',
  cta: 'Check availability',
  trust: ['Meet & greet at arrivals', '0 MAD deposit', 'Free cancellation 24h', '24/7 local support'],
  stepsTitle: 'How airport pickup works',
  steps: [
    {
      title: 'Send your booking request',
      text: 'Tell us your flight number, arrival date and car. We confirm availability by email or WhatsApp.',
    },
    {
      title: 'Meet us at arrivals',
      text: 'Our team waits for you in the arrivals hall with your name. No shuttle, no counter queue.',
    },
    {
      title: 'Check the car and drive',
      text: 'We inspect the car together, explain insurance and hand over the keys. Payment at key handover.',
    },
  ],
  pickupTitle: 'Pickup at Agadir Al Massira (AGA)',
  pickupText:
    'Our desk is at MAG N2, Agadir Airport. If your flight is delayed, send us a message on WhatsApp and we adjust the pickup time.',
  priceTitle: 'Clear prices, no surprises',
  priceText:
    'The price you see includes unlimited mileage, standard insurance, airport pickup and the second driver. Full Risk insurance is optional and shown before you confirm.',
  insuranceTitle: 'Insurance and deposit',
  insuranceText:
    'Standard insurance is included. Full Risk reduces the excess to 0 MAD from 5 billed days. No card hold and no security deposit: you pay at key handover.',
  faqTitle: 'Airport car rental FAQ',
  faqs: [
    {
      q: 'Where do I meet the Carzio team?',
      a: 'In the arrivals hall of Agadir Al Massira Airport. Send your flight number and we will track your arrival.',
    },
    {
      q: 'Is airport pickup free?',
      a: 'Yes. Pickup and return at Agadir Al Massira Airport are free.',
    },
    {
      q: 'How much is the deposit?',
      a: '0 MAD. We do not block money on your card.',
    },
    {
      q: 'Can I pick up the car late at night?',
      a: 'Yes, we are available 24/7 at the airport. Give us your flight number so we can plan.',
    },
    {
      q: 'What documents do I need?',
      a: 'Passport or ID, a driving licence held for at least 4 years, and a bank card for payment at key handover.',
    },
    {
      q: 'Can I return the car in another city?',
      a: 'One-way rental is available on request. Marrakech and Casablanca have a delivery fee; Taghazout, Tamraght and Essaouira are quoted before booking.',
    },
  ],
  mapTitle: 'Find us at Agadir Airport',
  mapText: 'MAG N2, Agadir Al Massira Airport, 80000 Agadir, Morocco. Open 24/7.',
  directions: 'Open in Google Maps',
  fleetTitle: 'Choose your car',
  fleetSubtitle: 'Economy, automatic, family and SUV cars available at the airport.',
  whatsappText: 'Need help? Message us on WhatsApp.',
};

const fr: AirportPageContent = {
  slug: 'location-voiture-aeroport-agadir',
  title: "Location de voiture à l'aéroport d'Agadir | Carzio",
  description:
    "Louez une voiture à l'aéroport Agadir Al Massira avec Carzio : accueil à l'arrivée, 0 MAD de caution, annulation gratuite 24 h, voitures automatiques et SUV, assistance 24h/24.",
  h1: "Location de voiture à l'aéroport d'Agadir",
  intro:
    "Votre voiture vous attend à l'aéroport Agadir Al Massira. Carzio est une agence locale basée au terminal : notre équipe vous accueille à l'arrivée, on complète le dossier et vous partez. Prix clairs, 0 MAD de caution et annulation gratuite jusqu'à 24 h avant la prise en charge.",
  cta: 'Vérifier les disponibilités',
  trust: ["Accueil à l'arrivée", '0 MAD de caution', 'Annulation gratuite 24 h', 'Assistance 24h/24'],
  stepsTitle: 'Comment se passe la prise en charge',
  steps: [
    {
      title: 'Envoyez votre demande',
      text: 'Indiquez votre numéro de vol, la date d’arrivée et la voiture. Nous confirmons la disponibilité par e-mail ou WhatsApp.',
    },
    {
      title: 'Rendez-vous à l’arrivée',
      text: 'Notre équipe vous attend dans le hall avec votre nom. Pas de navette, pas de file au comptoir.',
    },
    {
      title: 'Vérifiez la voiture et partez',
      text: 'Nous faisons le tour de la voiture, expliquons l’assurance et remettons les clés. Paiement à la remise des clés.',
    },
  ],
  pickupTitle: 'Prise en charge à Agadir Al Massira (AGA)',
  pickupText:
    "Notre agence est à MAG N2, Aéroport d'Agadir. Si votre vol est retardé, écrivez-nous sur WhatsApp et nous adaptons l'heure.",
  priceTitle: 'Des prix clairs, sans surprise',
  priceText:
    "Le prix affiché inclut le kilométrage illimité, l'assurance standard, la prise en charge à l'aéroport et le deuxième conducteur. L'assurance tous risques est optionnelle et affichée avant confirmation.",
  insuranceTitle: 'Assurance et caution',
  insuranceText:
    "L'assurance standard est incluse. L'assurance tous risques réduit la franchise à 0 MAD à partir de 5 jours facturés. Aucun blocage de carte, aucune caution : vous payez à la remise des clés.",
  faqTitle: "FAQ location de voiture à l'aéroport",
  faqs: [
    {
      q: "Où rencontrer l'équipe Carzio ?",
      a: "Dans le hall d'arrivée de l'aéroport Agadir Al Massira. Envoyez votre numéro de vol et nous suivons votre arrivée.",
    },
    {
      q: "La prise en charge à l'aéroport est-elle gratuite ?",
      a: "Oui. La prise en charge et le retour à l'aéroport Agadir Al Massira sont gratuits.",
    },
    {
      q: 'Quel est le montant de la caution ?',
      a: "0 MAD. Nous ne bloquons pas d'argent sur votre carte.",
    },
    {
      q: 'Puis-je récupérer la voiture tard le soir ?',
      a: "Oui, nous sommes disponibles 24h/24 à l'aéroport. Donnez-nous votre numéro de vol.",
    },
    {
      q: 'Quels documents faut-il ?',
      a: "Passeport ou carte d'identité, permis de conduire depuis au moins 4 ans, et une carte bancaire pour le paiement à la remise des clés.",
    },
    {
      q: 'Puis-je rendre la voiture dans une autre ville ?',
      a: "La location aller simple est possible sur demande. Marrakech et Casablanca ont des frais de livraison ; Taghazout, Tamraght et Essaouira sont sur devis.",
    },
  ],
  mapTitle: "Nous trouver à l'aéroport d'Agadir",
  mapText: "MAG N2, Aéroport Agadir Al Massira, 80000 Agadir, Maroc. Ouvert 24h/24.",
  directions: 'Ouvrir dans Google Maps',
  fleetTitle: 'Choisissez votre voiture',
  fleetSubtitle: "Citadines, automatiques, familiales et SUV disponibles à l'aéroport.",
  whatsappText: "Besoin d'aide ? Écrivez-nous sur WhatsApp.",
};

const de: AirportPageContent = {
  slug: 'mietwagen-agadir-flughafen',
  title: 'Mietwagen am Flughafen Agadir (Al Massira) | Carzio',
  description:
    'Mietwagen am Flughafen Agadir Al Massira mit Carzio: Empfang in der Ankunftshalle, 0 MAD Kaution, kostenlose Stornierung 24 Std., Automatik und SUV, 24/7 vor Ort.',
  h1: 'Mietwagen am Flughafen Agadir',
  intro:
    'Ihr Auto wartet am Flughafen Agadir Al Massira. Carzio ist eine lokale Agentur direkt im Terminal: Wir empfangen Sie bei der Ankunft, erledigen die Formalitäten und Sie fahren los. Klare Preise, 0 MAD Kaution und kostenlose Stornierung bis 24 Stunden vor Abholung.',
  cta: 'Verfügbarkeit prüfen',
  trust: ['Empfang in der Ankunftshalle', '0 MAD Kaution', 'Kostenlose Stornierung 24 Std.', '24/7 vor Ort'],
  stepsTitle: 'So funktioniert die Abholung',
  steps: [
    {
      title: 'Buchungsanfrage senden',
      text: 'Nennen Sie Flugnummer, Ankunftsdatum und Wunschauto. Wir bestätigen die Verfügbarkeit per E-Mail oder WhatsApp.',
    },
    {
      title: 'In der Ankunftshalle treffen',
      text: 'Unser Team wartet mit Ihrem Namen in der Ankunftshalle. Kein Shuttle, keine Warteschlange am Schalter.',
    },
    {
      title: 'Auto prüfen und losfahren',
      text: 'Wir prüfen das Auto gemeinsam, erklären die Versicherung und übergeben die Schlüssel. Zahlung bei Schlüsselübergabe.',
    },
  ],
  pickupTitle: 'Abholung am Flughafen Agadir Al Massira (AGA)',
  pickupText:
    'Unsere Agentur ist im MAG N2, Flughafen Agadir. Bei Verspätung schreiben Sie uns auf WhatsApp; wir passen die Abholzeit an.',
  priceTitle: 'Klare Preise, keine Überraschungen',
  priceText:
    'Der Preis enthält unbegrenzte Kilometer, Standardversicherung, Flughafenabholung und den Zweitfahrer. Die Vollkasko-Versicherung ist optional und wird vor der Bestätigung angezeigt.',
  insuranceTitle: 'Versicherung und Kaution',
  insuranceText:
    'Die Standardversicherung ist inklusive. Vollkasko senkt die Selbstbeteiligung ab 5 berechneten Tagen auf 0 MAD. Keine Kartenblockung, keine Kaution: Zahlung bei Schlüsselübergabe.',
  faqTitle: 'FAQ Mietwagen am Flughafen',
  faqs: [
    {
      q: 'Wo treffe ich das Carzio-Team?',
      a: 'In der Ankunftshalle des Flughafens Agadir Al Massira. Senden Sie Ihre Flugnummer, wir verfolgen Ihre Ankunft.',
    },
    {
      q: 'Ist die Abholung am Flughafen kostenlos?',
      a: 'Ja. Abholung und Rückgabe am Flughafen Agadir Al Massira sind kostenlos.',
    },
    {
      q: 'Wie hoch ist die Kaution?',
      a: '0 MAD. Wir blockieren kein Geld auf Ihrer Karte.',
    },
    {
      q: 'Kann ich das Auto spät abends abholen?',
      a: 'Ja, wir sind 24/7 am Flughafen erreichbar. Nennen Sie uns Ihre Flugnummer.',
    },
    {
      q: 'Welche Dokumente brauche ich?',
      a: 'Reisepass oder Ausweis, Führerschein seit mindestens 4 Jahren und eine Bankkarte für die Zahlung bei Schlüsselübergabe.',
    },
    {
      q: 'Kann ich das Auto in einer anderen Stadt abgeben?',
      a: 'One-Way-Miete auf Anfrage. Marrakech und Casablanca kosten eine Liefergebühr; Taghazout, Tamraght und Essaouira auf Anfrage.',
    },
  ],
  mapTitle: 'So finden Sie uns am Flughafen Agadir',
  mapText: 'MAG N2, Flughafen Agadir Al Massira, 80000 Agadir, Marokko. 24/7 geöffnet.',
  directions: 'In Google Maps öffnen',
  fleetTitle: 'Wählen Sie Ihr Auto',
  fleetSubtitle: 'Kleinwagen, Automatik, Familienautos und SUVs am Flughafen.',
  whatsappText: 'Brauchen Sie Hilfe? Schreiben Sie uns auf WhatsApp.',
};

const es: AirportPageContent = {
  slug: 'alquiler-coche-aeropuerto-agadir',
  title: 'Alquiler de coche en el aeropuerto de Agadir | Carzio',
  description:
    'Alquila un coche en el aeropuerto Agadir Al Massira con Carzio: recogida en llegadas, 0 MAD de depósito, cancelación gratuita 24 h, automáticos y SUV, asistencia 24/7.',
  h1: 'Alquiler de coche en el aeropuerto de Agadir',
  intro:
    'Tu coche te espera en el aeropuerto Agadir Al Massira. Carzio es una agencia local en la terminal: te recibimos en llegadas, completamos el papeleo y te vas conduciendo. Precios claros, 0 MAD de depósito y cancelación gratuita hasta 24 horas antes de la recogida.',
  cta: 'Consultar disponibilidad',
  trust: ['Recogida en llegadas', '0 MAD de depósito', 'Cancelación gratuita 24 h', 'Asistencia 24/7'],
  stepsTitle: 'Cómo funciona la recogida',
  steps: [
    {
      title: 'Envía tu solicitud',
      text: 'Indica tu número de vuelo, fecha de llegada y coche. Confirmamos disponibilidad por email o WhatsApp.',
    },
    {
      title: 'Nos vemos en llegadas',
      text: 'Nuestro equipo te espera en la sala de llegadas con tu nombre. Sin lanzadera ni cola en el mostrador.',
    },
    {
      title: 'Revisa el coche y conduce',
      text: 'Revisamos el coche juntos, explicamos el seguro y entregamos las llaves. Pago al entregar las llaves.',
    },
  ],
  pickupTitle: 'Recogida en Agadir Al Massira (AGA)',
  pickupText:
    'Nuestra agencia está en MAG N2, Aeropuerto de Agadir. Si tu vuelo se retrasa, escríbenos por WhatsApp y ajustamos la hora.',
  priceTitle: 'Precios claros, sin sorpresas',
  priceText:
    'El precio incluye kilómetros ilimitados, seguro estándar, recogida en el aeropuerto y segundo conductor. El seguro a todo riesgo es opcional y se muestra antes de confirmar.',
  insuranceTitle: 'Seguro y depósito',
  insuranceText:
    'El seguro estándar está incluido. El seguro a todo riesgo reduce la franquicia a 0 MAD desde 5 días facturados. Sin bloqueo de tarjeta y sin depósito: pagas al entregar las llaves.',
  faqTitle: 'FAQ alquiler de coche en el aeropuerto',
  faqs: [
    {
      q: '¿Dónde encuentro al equipo de Carzio?',
      a: 'En la sala de llegadas del aeropuerto Agadir Al Massira. Envía tu número de vuelo y seguimos tu llegada.',
    },
    {
      q: '¿La recogida en el aeropuerto es gratuita?',
      a: 'Sí. La recogida y devolución en el aeropuerto Agadir Al Massira son gratuitas.',
    },
    {
      q: '¿Cuánto es el depósito?',
      a: '0 MAD. No bloqueamos dinero en tu tarjeta.',
    },
    {
      q: '¿Puedo recoger el coche por la noche?',
      a: 'Sí, estamos disponibles 24/7 en el aeropuerto. Danos tu número de vuelo.',
    },
    {
      q: '¿Qué documentos necesito?',
      a: 'Pasaporte o DNI, permiso de conducir con al menos 4 años y tarjeta bancaria para pagar al entregar las llaves.',
    },
    {
      q: '¿Puedo devolver el coche en otra ciudad?',
      a: 'Alquiler de solo ida bajo petición. Marrakech y Casablanca tienen tarifa de entrega; Taghazout, Tamraght y Essaouira se cotizan antes de reservar.',
    },
  ],
  mapTitle: 'Encuéntranos en el aeropuerto de Agadir',
  mapText: 'MAG N2, Aeropuerto Agadir Al Massira, 80000 Agadir, Marruecos. Abierto 24/7.',
  directions: 'Abrir en Google Maps',
  fleetTitle: 'Elige tu coche',
  fleetSubtitle: 'Económicos, automáticos, familiares y SUV disponibles en el aeropuerto.',
  whatsappText: '¿Necesitas ayuda? Escríbenos por WhatsApp.',
};

const pl: AirportPageContent = {
  slug: 'wynajem-samochodu-agadir-lotnisko',
  title: 'Wynajem samochodu na lotnisku w Agadirze | Carzio',
  description:
    'Wynajmij samochód na lotnisku Agadir Al Massira z Carzio: odbiór w hali przylotów, 0 MAD kaucji, bezpłatna anulacja 24 godz., automaty i SUV-y, wsparcie 24/7.',
  h1: 'Wynajem samochodu na lotnisku w Agadirze',
  intro:
    'Twój samochód czeka na lotnisku Agadir Al Massira. Carzio to lokalna agencja w terminalu: witamy w hali przylotów, dopełniamy formalności i odjeżdżasz. Przejrzyste ceny, 0 MAD kaucji i bezpłatna anulacja do 24 godzin przed odbiorem.',
  cta: 'Sprawdź dostępność',
  trust: ['Odbiór w hali przylotów', '0 MAD kaucji', 'Bezpłatna anulacja 24 godz.', 'Wsparcie 24/7'],
  stepsTitle: 'Jak wygląda odbiór',
  steps: [
    {
      title: 'Wyślij zgłoszenie',
      text: 'Podaj numer lotu, datę przylotu i samochód. Potwierdzimy dostępność e-mailem lub przez WhatsApp.',
    },
    {
      title: 'Spotkaj nas w hali przylotów',
      text: 'Nasz zespół czeka z Twoim nazwiskiem. Bez busa i bez kolejki do stanowiska.',
    },
    {
      title: 'Sprawdź auto i jedź',
      text: 'Wspólnie sprawdzamy samochód, wyjaśniamy ubezpieczenie i przekazujemy kluczyki. Płatność przy przekazaniu kluczyków.',
    },
  ],
  pickupTitle: 'Odbiór na lotnisku Agadir Al Massira (AGA)',
  pickupText:
    'Nasza agencja znajduje się w MAG N2, lotnisko Agadir. Jeśli lot jest opóźniony, napisz na WhatsApp, a dostosujemy godzinę.',
  priceTitle: 'Przejrzyste ceny, bez niespodzianek',
  priceText:
    'Cena obejmuje nielimitowane kilometry, standardowe ubezpieczenie, odbiór na lotnisku i drugiego kierowcę. Ubezpieczenie pełne jest opcjonalne i widoczne przed potwierdzeniem.',
  insuranceTitle: 'Ubezpieczenie i kaucja',
  insuranceText:
    'Standardowe ubezpieczenie jest w cenie. Ubezpieczenie pełne obniża udział własny do 0 MAD od 5 rozliczonych dni. Bez blokady karty i bez kaucji: płacisz przy przekazaniu kluczyków.',
  faqTitle: 'FAQ wynajem auta na lotnisku',
  faqs: [
    {
      q: 'Gdzie spotkam zespół Carzio?',
      a: 'W hali przylotów lotniska Agadir Al Massira. Wyślij numer lotu, a będziemy śledzić przylot.',
    },
    {
      q: 'Czy odbiór na lotnisku jest bezpłatny?',
      a: 'Tak. Odbiór i zwrot na lotnisku Agadir Al Massira są bezpłatne.',
    },
    {
      q: 'Ile wynosi kaucja?',
      a: '0 MAD. Nie blokujemy pieniędzy na karcie.',
    },
    {
      q: 'Czy mogę odebrać auto późnym wieczorem?',
      a: 'Tak, jesteśmy dostępni 24/7 na lotnisku. Podaj numer lotu.',
    },
    {
      q: 'Jakie dokumenty są potrzebne?',
      a: 'Paszport lub dowód, prawo jazdy od co najmniej 4 lat i karta bankowa do płatności przy przekazaniu kluczyków.',
    },
    {
      q: 'Czy mogę zwrócić auto w innym mieście?',
      a: 'Wynajem one-way na życzenie. Marrakesz i Casablanca mają opłatę za dostawę; Taghazout, Tamraght i Essaouira wyceniane przed rezerwacją.',
    },
  ],
  mapTitle: 'Znajdź nas na lotnisku w Agadirze',
  mapText: 'MAG N2, lotnisko Agadir Al Massira, 80000 Agadir, Maroko. Otwarte 24/7.',
  directions: 'Otwórz w Google Maps',
  fleetTitle: 'Wybierz samochód',
  fleetSubtitle: 'Ekonomiczne, automatyczne, rodzinne i SUV-y dostępne na lotnisku.',
  whatsappText: 'Potrzebujesz pomocy? Napisz na WhatsApp.',
};

export const airportPages: Record<AirportLang, AirportPageContent> = { en, fr, de, es, pl };

export function getAirportPage(language: string): AirportPageContent {
  const lang = (language.split('-')[0] || 'en') as AirportLang;
  return airportPages[lang] ?? airportPages.en;
}

export function airportAlternatePaths(): Record<AirportLang, string> {
  return {
    en: `/${airportPages.en.slug}`,
    fr: `/${airportPages.fr.slug}`,
    de: `/${airportPages.de.slug}`,
    es: `/${airportPages.es.slug}`,
    pl: `/${airportPages.pl.slug}`,
  };
}
