import type { Lang } from '../lib/i18nRouting';
import { de } from './marketing-de';
import { es } from './marketing-es';
import { pl } from './marketing-pl';
import { nl } from './marketing-nl';

export interface MarketingSection {
  title: string;
  paragraphs: string[];
}

export interface MarketingFaq {
  q: string;
  a: string;
}

export interface PartnersContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: MarketingSection[];
  faqs: MarketingFaq[];
  audience: string[];
  perks: string[];
}

export interface CompareContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  rows: { label: string; carzio: string; platform: string }[];
  faqs: MarketingFaq[];
}

export interface SeasonalOffer {
  id: string;
  period: string;
  title: string;
  description: string;
  conditions: string[];
}

export interface OffersContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  offers: SeasonalOffer[];
  faqs: MarketingFaq[];
}

const enPartners: PartnersContent = {
  slug: 'partners',
  title: 'Partner with Carzio | Car Rental Agadir Airport',
  description:
    'Surf camps, hotels, transfer companies and travel agencies: offer your guests a car waiting at Agadir Al Massira Airport, with 0 MAD deposit and free cancellation 24 h.',
  h1: 'Offer your guests a car at Agadir Airport',
  intro:
    'Carzio is a local car rental agency based at Agadir Al Massira Airport. We work with surf camps, small hotels, transfer companies and travel agencies who want a simple, reliable car option for their guests.',
  sections: [
    {
      title: 'A local partner at the airport',
      paragraphs: [
        'Your guests land at Agadir Al Massira and collect their car at arrivals. Our team speaks French, English, German, Spanish and Polish, and the agency is open 24/7.',
        'The rental includes unlimited mileage, standard insurance and 0 MAD deposit. Payment is made at key handover, and cancellation is free up to 24 hours before pickup.',
      ],
    },
    {
      title: 'What we can offer your guests',
      paragraphs: [
        'We can prepare a dedicated booking link for your property, prioritise pickup at busy arrival times and provide a free child seat or booster on request.',
        'The exact partner perk is confirmed in writing before we start. We do not promise cash commission unless it has been agreed and signed with the owner.',
      ],
    },
    {
      title: 'How to start',
      paragraphs: [
        'Send us your property or agency name, the city, the languages you speak and the type of guests you receive. We will reply with a simple proposal and a dedicated link.',
        'There is no setup fee and no exclusivity requirement. You stay free to recommend another provider if Carzio does not fit your guests.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Do you pay commission to partners?',
      a: 'Commission is discussed case by case and only confirmed in writing. We do not advertise a public commission rate.',
    },
    {
      q: 'Can you prioritise pickup for our guests?',
      a: 'Yes, priority pickup can be arranged for partners, subject to flight times and availability.',
    },
    {
      q: 'Do you provide a dedicated booking link?',
      a: 'Yes. We can create a tracked link so you and your guests reach the right page.',
    },
    {
      q: 'Which languages does your team speak?',
      a: 'French, English, German, Spanish and Polish, plus Moroccan Arabic.',
    },
  ],
  audience: ['Surf camps in Taghazout and Tamraght', 'Riads and small hotels in Agadir', 'Airport transfer companies', 'Travel agencies in Europe'],
  perks: ['Free child seat on request', 'Priority pickup at busy times', 'Dedicated booking link', 'Local support 24/7'],
};

const frPartners: PartnersContent = {
  slug: 'partners',
  title: 'Devenir partenaire Carzio | Location de voiture Agadir Aéroport',
  description:
    'Surf camps, hôtels, sociétés de transfert et agences de voyage : offrez à vos clients une voiture qui les attend à l’aéroport Agadir Al Massira, 0 MAD de caution et annulation gratuite 24 h.',
  h1: 'Offrez une voiture à vos clients à l’aéroport d’Agadir',
  intro:
    'Carzio est une agence locale de location de voitures basée à l’aéroport Agadir Al Massira. Nous travaillons avec des surf camps, de petits hôtels, des sociétés de transfert et des agences de voyage qui cherchent une solution simple et fiable pour leurs clients.',
  sections: [
    {
      title: 'Un partenaire local à l’aéroport',
      paragraphs: [
        'Vos clients atterrissent à Agadir Al Massira et récupèrent leur voiture à l’arrivée. Notre équipe parle français, anglais, allemand, espagnol et polonais, et l’agence est ouverte 24h/24.',
        'La location comprend le kilométrage illimité, l’assurance standard et 0 MAD de caution. Le paiement se fait à la remise des clés et l’annulation est gratuite jusqu’à 24 h avant la prise en charge.',
      ],
    },
    {
      title: 'Ce que nous pouvons offrir à vos clients',
      paragraphs: [
        'Nous pouvons préparer un lien de réservation dédié à votre établissement, prioriser la prise en charge aux heures d’arrivée chargées et fournir un siège enfant ou un rehausseur gratuit sur demande.',
        'L’avantage partenaire exact est confirmé par écrit avant le démarrage. Nous ne promettons pas de commission en espèces sans accord signé avec le propriétaire.',
      ],
    },
    {
      title: 'Comment démarrer',
      paragraphs: [
        'Envoyez-nous le nom de votre établissement ou agence, la ville, les langues parlées et le type de clients que vous recevez. Nous répondrons avec une proposition simple et un lien dédié.',
        'Il n’y a pas de frais d’installation ni d’exclusivité. Vous restez libre de recommander un autre prestataire si Carzio ne convient pas à vos clients.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Versez-vous une commission aux partenaires ?',
      a: 'La commission est discutée au cas par cas et confirmée uniquement par écrit. Nous n’affichons pas de taux public.',
    },
    {
      q: 'Pouvez-vous prioriser la prise en charge de nos clients ?',
      a: 'Oui, la priorité de prise en charge peut être organisée pour les partenaires, selon les horaires de vol et la disponibilité.',
    },
    {
      q: 'Fournissez-vous un lien de réservation dédié ?',
      a: 'Oui. Nous pouvons créer un lien suivi pour que vous et vos clients arriviez sur la bonne page.',
    },
    {
      q: 'Quelles langues parle votre équipe ?',
      a: 'Français, anglais, allemand, espagnol et polonais, ainsi que l’arabe marocain.',
    },
  ],
  audience: ['Surf camps à Taghazout et Tamraght', 'Riads et petits hôtels à Agadir', 'Sociétés de transfert aéroport', 'Agences de voyage en Europe'],
  perks: ['Siège enfant gratuit sur demande', 'Priorité de prise en charge aux heures chargées', 'Lien de réservation dédié', 'Assistance locale 24h/24'],
};

const enCompare: CompareContent = {
  slug: 'compare',
  title: 'Carzio vs International Car Rental Platforms | Agadir',
  description:
    'Compare booking direct with Carzio at Agadir Airport and an international rental platform: deposit, cancellation, airport handover, payment and support.',
  h1: 'Carzio vs international rental platforms',
  intro:
    'International platforms can show many cars, but the rental itself is handled by a local agency. Here is what changes when you book direct with Carzio at Agadir Al Massira Airport.',
  rows: [
    { label: 'Who you book with', carzio: 'Carzio, a local agency based at Agadir Airport', platform: 'An intermediary; the rental company is assigned later' },
    { label: 'Security deposit', carzio: '0 MAD, no card hold', platform: 'Depends on the rental company and the rate' },
    { label: 'Cancellation', carzio: 'Free up to 24 h before pickup', platform: 'Depends on the rate and the platform' },
    { label: 'Airport handover', carzio: 'Meet and greet at arrivals, free', platform: 'Depends on the rental company; shuttle or counter possible' },
    { label: 'Payment', carzio: 'At key handover', platform: 'Often prepaid online or at the counter' },
    { label: 'Support', carzio: 'Local team at the airport, 24/7', platform: 'Call centre, then the local rental company' },
    { label: 'Price', carzio: 'Displayed per car and per day', platform: 'Depends on fees, insurance and extras added at checkout' },
  ],
  faqs: [
    {
      q: 'Is booking direct always cheaper?',
      a: 'Not always. A platform can show a lower headline price and add extras later. Compare the total price, the deposit and the cancellation terms.',
    },
    {
      q: 'Why is the deposit 0 MAD?',
      a: 'Carzio does not block money on your card. You pay the rental price at key handover.',
    },
    {
      q: 'Can I cancel a direct booking?',
      a: 'Yes, free of charge up to 24 hours before pickup.',
    },
    {
      q: 'Do I get the same car as on the platform?',
      a: 'With Carzio you choose a model or an equivalent. The confirmation states the car or the replacement category before you pay.',
    },
  ],
};

const frCompare: CompareContent = {
  slug: 'compare',
  title: 'Carzio vs plateformes internationales | Agadir',
  description:
    'Comparez la réservation directe chez Carzio à l’aéroport d’Agadir avec une plateforme internationale : caution, annulation, accueil, paiement et assistance.',
  h1: 'Carzio vs les plateformes de location internationales',
  intro:
    'Les plateformes internationales affichent beaucoup de voitures, mais la location est assurée par une agence locale. Voici ce qui change quand vous réservez directement chez Carzio à l’aéroport Agadir Al Massira.',
  rows: [
    { label: 'Avec qui vous réservez', carzio: 'Carzio, agence locale basée à l’aéroport d’Agadir', platform: 'Un intermédiaire ; le loueur est attribué plus tard' },
    { label: 'Caution', carzio: '0 MAD, aucun blocage de carte', platform: 'Dépend du loueur et du tarif' },
    { label: 'Annulation', carzio: 'Gratuite jusqu’à 24 h avant la prise en charge', platform: 'Dépend du tarif et de la plateforme' },
    { label: 'Accueil à l’aéroport', carzio: 'Accueil à l’arrivée, gratuit', platform: 'Dépend du loueur ; navette ou comptoir possible' },
    { label: 'Paiement', carzio: 'À la remise des clés', platform: 'Souvent prépayé en ligne ou au comptoir' },
    { label: 'Assistance', carzio: 'Équipe locale à l’aéroport, 24h/24', platform: 'Centre d’appel, puis le loueur local' },
    { label: 'Prix', carzio: 'Affiché par voiture et par jour', platform: 'Dépend des frais, assurances et options ajoutés au paiement' },
  ],
  faqs: [
    {
      q: 'Réserver en direct est-il toujours moins cher ?',
      a: 'Pas toujours. Une plateforme peut afficher un prix d’appel plus bas et ajouter des options ensuite. Comparez le prix total, la caution et les conditions d’annulation.',
    },
    {
      q: 'Pourquoi la caution est-elle de 0 MAD ?',
      a: 'Carzio ne bloque pas d’argent sur votre carte. Vous payez le prix de la location à la remise des clés.',
    },
    {
      q: 'Puis-je annuler une réservation directe ?',
      a: 'Oui, gratuitement jusqu’à 24 h avant la prise en charge.',
    },
    {
      q: 'Ai-je la même voiture que sur la plateforme ?',
      a: 'Chez Carzio, vous choisissez un modèle ou un équivalent. La confirmation précise la voiture ou la catégorie de remplacement avant le paiement.',
    },
  ],
};

const enOffers: OffersContent = {
  slug: 'offers',
  title: 'Seasonal Car Rental Offers in Agadir | Carzio',
  description:
    'Carzio seasonal offers for Agadir: Christmas, Easter and summer. Free child seat, extra day and 0 MAD deposit, subject to availability and confirmation.',
  h1: 'Seasonal car rental offers in Agadir',
  intro:
    'Our seasonal offers are simple and confirmed before you book. They are subject to availability and cannot always be combined with another promotion.',
  offers: [
    {
      id: 'christmas-2026',
      period: 'Christmas 2026',
      title: '10% off rentals of 5 days or more',
      description:
        'Book a car for 5 days or more over the Christmas period and request the 10% offer. The discount is applied to the rental price before confirmation.',
      conditions: ['Minimum 5 billed days', 'Subject to availability', 'Request the offer before booking', 'Cannot be combined with another promotion'],
    },
    {
      id: 'easter-2027',
      period: 'Easter 2027',
      title: 'Free child seat + 0 MAD deposit',
      description:
        'Travelling with children? Request a free baby seat or booster and keep the standard 0 MAD deposit. The seat is subject to availability.',
      conditions: ['One child seat or booster per rental', 'Subject to availability', 'Request the seat before booking', '0 MAD deposit applies to the whole fleet'],
    },
    {
      id: 'summer-2027',
      period: 'Summer 2027',
      title: 'Free extra day on 7+ days',
      description:
        'Rent for 7 billed days or more in summer and request an extra day free. The extra day is added to the rental period, subject to availability.',
      conditions: ['Minimum 7 billed days', 'Subject to availability', 'Request the offer before booking', 'The extra day cannot be exchanged for cash'],
    },
  ],
  faqs: [
    {
      q: 'Are the offers automatic?',
      a: 'No. Request the offer when you send your booking. We confirm it in writing before you pay.',
    },
    {
      q: 'Can I combine two offers?',
      a: 'Usually not. Ask us before booking and we will confirm what is possible for your dates.',
    },
    {
      q: 'Are the offers available on every car?',
      a: 'They depend on availability and the rental dates. We confirm the car and the offer before accepting the booking.',
    },
    {
      q: 'Is the deposit still 0 MAD with an offer?',
      a: 'Yes, the standard 0 MAD deposit applies unless a specific offer says otherwise.',
    },
  ],
};

const frOffers: OffersContent = {
  slug: 'offers',
  title: 'Offres saisonnières de location de voiture à Agadir | Carzio',
  description:
    'Offres saisonnières Carzio à Agadir : Noël, Pâques et été. Siège enfant offert, jour supplémentaire et 0 MAD de caution, selon disponibilité et confirmation.',
  h1: 'Offres saisonnières de location de voiture à Agadir',
  intro:
    'Nos offres saisonnières sont simples et confirmées avant la réservation. Elles sont soumises à disponibilité et ne peuvent pas toujours être cumulées avec une autre promotion.',
  offers: [
    {
      id: 'christmas-2026',
      period: 'Noël 2026',
      title: '10 % de remise dès 5 jours',
      description:
        'Réservez une voiture pour 5 jours ou plus pendant la période de Noël et demandez l’offre de 10 %. La remise est appliquée au prix de la location avant confirmation.',
      conditions: ['Minimum 5 jours facturés', 'Selon disponibilité', 'Demander l’offre avant la réservation', 'Non cumulable avec une autre promotion'],
    },
    {
      id: 'easter-2027',
      period: 'Pâques 2027',
      title: 'Siège enfant offert + 0 MAD de caution',
      description:
        'Vous voyagez avec des enfants ? Demandez un siège bébé ou un rehausseur gratuit et conservez la caution standard de 0 MAD. Le siège est soumis à disponibilité.',
      conditions: ['Un siège ou rehausseur par location', 'Selon disponibilité', 'Demander le siège avant la réservation', 'Caution 0 MAD sur toute la flotte'],
    },
    {
      id: 'summer-2027',
      period: 'Été 2027',
      title: 'Un jour offert dès 7 jours',
      description:
        'Louez 7 jours facturés ou plus en été et demandez un jour supplémentaire gratuit. Le jour est ajouté à la période de location, selon disponibilité.',
      conditions: ['Minimum 7 jours facturés', 'Selon disponibilité', 'Demander l’offre avant la réservation', 'Le jour offert n’est pas échangeable contre de l’argent'],
    },
  ],
  faqs: [
    {
      q: 'Les offres sont-elles automatiques ?',
      a: 'Non. Demandez l’offre au moment de votre demande de réservation. Nous la confirmons par écrit avant le paiement.',
    },
    {
      q: 'Puis-je cumuler deux offres ?',
      a: 'En général non. Demandez-nous avant la réservation et nous confirmerons ce qui est possible à vos dates.',
    },
    {
      q: 'Les offres sont-elles valables sur toutes les voitures ?',
      a: 'Elles dépendent de la disponibilité et des dates. Nous confirmons la voiture et l’offre avant d’accepter la réservation.',
    },
    {
      q: 'La caution reste-t-elle à 0 MAD avec une offre ?',
      a: 'Oui, la caution standard de 0 MAD s’applique sauf mention contraire dans une offre spécifique.',
    },
  ],
};

type MarketingPage = { partners: PartnersContent; compare: CompareContent; offers: OffersContent };

const PAGES: Partial<Record<Lang, MarketingPage>> = {
  en: { partners: enPartners, compare: enCompare, offers: enOffers },
  fr: { partners: frPartners, compare: frCompare, offers: frOffers },
  de,
  es,
  pl,
  nl,
};

export function marketingLanguages(): Lang[] {
  return Object.keys(PAGES) as Lang[];
}

export function getPartnersPage(lang: string): PartnersContent {
  return (PAGES[lang.slice(0, 2) as Lang] || PAGES.en!).partners;
}

export function getComparePage(lang: string): CompareContent {
  return (PAGES[lang.slice(0, 2) as Lang] || PAGES.en!).compare;
}

export function getOffersPage(lang: string): OffersContent {
  return (PAGES[lang.slice(0, 2) as Lang] || PAGES.en!).offers;
}
