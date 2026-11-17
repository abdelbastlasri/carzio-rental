import type { FaqCategory } from './faq';

export const nlFaqCategories: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Boeking & betaling',
    short: 'Boeken, wijzigen, annuleren, betalen.',
    description:
      'Hoe een boeking bij Carzio werkt: online aanvraag, bevestiging, betaling bij de sleuteloverdracht en gratis annuleren tot 24 uur vóór het ophalen.',
    entries: [
      {
        q: 'Hoe boek ik een auto bij Carzio?',
        a: 'Kies uw data en ophaallocatie op de website, selecteer een model en verstuur de aanvraag. We controleren de beschikbaarheid en antwoorden binnen 24 uur per e-mail of WhatsApp. Er is geen online betaling nodig.',
      },
      {
        q: 'Moet ik online betalen of een borg achterlaten?',
        a: 'Nee. Er is geen online betaling, geen borg en geen reservering op uw kaart. U betaalt bij de sleuteloverdracht, met een bankkaart, ook met een debetkaart.',
      },
      {
        q: 'Hoe ver van tevoren moet ik boeken?',
        a: 'Een tot twee weken van tevoren is comfortabel, zeker in juli en augustus. Een last-minute boeking blijft mogelijk: we antwoorden binnen 24 uur met de werkelijke beschikbaarheid.',
      },
      {
        q: 'Kan ik mijn boeking wijzigen of annuleren?',
        a: 'Ja. Annuleren is gratis tot 24 uur vóór het ophalen. Een wijziging van data of auto is mogelijk, afhankelijk van de beschikbaarheid, zonder kosten.',
      },
      {
        q: 'Wat is de minimale huurperiode?',
        a: 'Drie dagen, dus 72 uur. De huur wordt gefactureerd in blokken van 24 uur: elke begonnen dag wordt aangerekend, ook als u de auto eerder op de dag terugbrengt.',
      },
      {
        q: 'Wat gebeurt er nadat ik het formulier heb verstuurd?',
        a: 'We controleren de beschikbaarheid van de auto en sturen u een bevestiging per e-mail. Een kopie gaat naar contact@carzio.ma. Ziet u niets? Controleer uw spam of schrijf ons op WhatsApp: +212 680 318003.',
      },
    ],
    image: '/images/journal/faq-cat-reservation.webp',
    imageAlt: "Auto's op een rij op de parkeerplaats van de luchthaven van Agadir",
  },
  {
    slug: 'conditions',
    title: 'Leeftijd, rijbewijs & bestuurders',
    short: 'Wie mag rijden, en met welke documenten.',
    description:
      'Voorwaarden om een auto van Carzio te huren en te besturen: minimaal 23 jaar, rijbewijs al 4 jaar, gratis tweede bestuurder, gratis kinderstoel en geaccepteerde documenten.',
    entries: [
      {
        q: 'Hoe oud moet ik zijn om een auto te huren?',
        a: "Minimaal 23 jaar en een rijbewijs dat u al minstens 4 jaar in uw bezit hebt, voor alle auto's in de vloot. Er is geen toeslag voor jonge bestuurders.",
      },
      {
        q: 'Kan ik een tweede bestuurder toevoegen?',
        a: 'Ja, dat is gratis. De tweede bestuurder moet aan dezelfde voorwaarden voldoen: minimaal 23 jaar en al 4 jaar in het bezit van een rijbewijs. Het rijbewijs wordt bij het ophalen getoond.',
      },
      {
        q: 'Welke documenten moet ik voorleggen?',
        a: 'Een geldig rijbewijs, een identiteitskaart of paspoort en een bankkaart voor de betaling. Er is geen borg en geen reservering op uw kaart nodig.',
      },
      {
        q: 'Wordt een buitenlands rijbewijs geaccepteerd?',
        a: 'Ja. Het rijbewijs moet leesbaar zijn en indien nodig vergezeld van een internationaal rijbewijs of een vertaling. Bij twijfel stuurt u vóór de boeking een foto van uw rijbewijs via WhatsApp.',
      },
      {
        q: 'Kan ik huren met een voorlopig rijbewijs?',
        a: "Nee. Het rijbewijs moet al minstens 4 jaar in uw bezit zijn, ongeacht de leeftijd van de bestuurder. Deze regel geldt voor alle auto's.",
      },
      {
        q: 'Moet ik betalen voor de kinderstoel en zitverhoger?',
        a: 'Nee, ze zijn gratis op aanvraag, afhankelijk van de beschikbaarheid. Vermeld de leeftijd van uw kind bij de speciale verzoeken bij het boeken, dan plaatsen we de juiste stoel.',
      },
    ],
    image: '/images/journal/faq-cat-conditions.webp',
    imageAlt: "Een bestuurder voor de huurauto's op de luchthaven van Agadir",
  },
  {
    slug: 'assurance',
    title: 'Verzekering & eigen risico',
    short: 'Wat is gedekt, en hoe u naar 0 MAD gaat bij schade.',
    description:
      'Standaardverzekering inbegrepen, en volledige verzekering (eigen risico 0 MAD) beschikbaar vanaf 5 huurdagen.',
    entries: [
      {
        q: 'Is de verzekering inbegrepen in de prijs?',
        a: 'Ja. De standaardverzekering is inbegrepen in elk tarief. Ze dekt de carrosserie van de auto, de ruiten, de banden en de buitenspiegels.',
      },
      {
        q: 'Wat gebeurt er bij schade met de standaardverzekering?',
        a: 'Bij gedekte schade blijft een eigen risico voor uw rekening. Het bedrag van dat eigen risico staat in het contract dat u bij de sleuteloverdracht ondertekent.',
      },
      {
        q: 'Wat is de volledige verzekering?',
        a: 'Dat is de optie die u kunt kiezen vanaf 5 huurdagen. Ze brengt het eigen risico terug naar 0 MAD: bij gedekte schade blijft er niets voor uw rekening. De toeslag (10 € of 15 € per dag, afhankelijk van het tarief van de auto) wordt altijd vóór de bevestiging getoond.',
      },
      {
        q: 'Vanaf wanneer kan ik de volledige verzekering nemen?',
        a: 'Alleen vanaf 5 huurdagen, dus 120 uur. Ze is nooit standaard aangevinkt en wordt automatisch verwijderd als de huurperiode onder 5 dagen zakt.',
      },
      {
        q: 'Wat dekt de standaardverzekering precies?',
        a: 'Schade aan de auto, ruiten, banden en buitenspiegels, binnen de grenzen van het contract. De uitsluitingen en het eventuele eigen risico staan in het contract dat u bij het ophalen ontvangt.',
      },
      {
        q: 'Wat moet ik doen bij schade of een ongeval?',
        a: 'Beveilig de auto en de personen, bel indien nodig de politie op 190 en neem contact op met Carzio op +212 680 318003. Verlaat de plaats niet en laat de auto niet herstellen zonder onze toestemming.',
      },
    ],
    image: '/images/journal/faq-cat-assurance.webp',
    imageAlt: 'Een witte Kia Sportage uit de Carzio-vloot op de luchthaven van Agadir',
  },
  {
    slug: 'carburant-livraison',
    title: 'Brandstof, kilometers & levering',
    short: 'Tankregel, kilometers, luchthaven en terugbrengen.',
    description:
      'Tankbeleid op hetzelfde niveau, onbeperkte kilometers, gratis levering op de luchthaven Agadir Al Massira, 80 € per rit in Marrakech en Casablanca, op aanvraag in Taghazout, Tamraght en Essaouira.',
    entries: [
      {
        q: 'Wat is het tankbeleid?',
        a: 'U krijgt de auto met een bepaald brandstofniveau en moet hem met hetzelfde niveau terugbrengen. Tank net vóór het terugbrengen om kosten voor bijvullen te vermijden.',
      },
      {
        q: 'Zijn de kilometers beperkt?',
        a: "Nee. Al onze auto's worden verhuurd met onbeperkte kilometers, zonder toeslag bij het terugbrengen.",
      },
      {
        q: 'Waar kunnen jullie de auto leveren?',
        a: 'Gratis levering op de luchthaven Agadir Al Massira. Marrakech en Casablanca: 80 € per rit. Taghazout, Tamraght en Essaouira: op aanvraag, met een prijs die vóór de boeking wordt bevestigd.',
      },
      {
        q: 'Is de levering op de luchthaven gratis?',
        a: 'Ja, op de luchthaven Agadir Al Massira. Geef ons uw vluchtnummer: we volgen de landing en ontvangen u bij de uitgang.',
      },
      {
        q: 'Kan ik de auto in een andere stad terugbrengen?',
        a: 'Dat is in bepaalde gevallen mogelijk, maar moet vóór de boeking worden bevestigd. Afhankelijk van de stad en de afstand kunnen er kosten voor het terugbrengen gelden.',
      },
      {
        q: 'Wat gebeurt er als ik de auto te laat terugbreng?',
        a: 'Elk begonnen blok van 24 uur wordt aangerekend. Laat het ons zo vroeg mogelijk weten via WhatsApp: we zoeken samen met de volgende klant naar een oplossing.',
      },
    ],
    image: '/images/journal/faq-cat-carburant-livraison.webp',
    imageAlt: 'Een Afriquia-tankstation in Marokko, met de pompen onder een luifel',
  },
  {
    slug: 'conduite-maroc',
    title: 'Rijden in Marokko',
    short: 'Rijrichting, gordel, tol, noodgevallen.',
    description:
      'De basis om rustig in Marokko te rijden: rechts rijden, gordel verplicht, alcohol verboden, tol, parkeren in Agadir en het noodnummer 190.',
    entries: [
      {
        q: 'Aan welke kant rijdt men in Marokko?',
        a: 'Rechts, zoals in de meeste Europese landen. Rotondes neemt u tegen de klok in.',
      },
      {
        q: 'Is de gordel verplicht?',
        a: 'Ja, voor- en achterin. Kinderen moeten in een stoel of zitverhoger zitten die bij hun leeftijd past.',
      },
      {
        q: 'Mag ik alcohol drinken voor het rijden?',
        a: 'Nee. Rijden onder invloed is verboden in Marokko. Rijd nooit na alcoholgebruik, ook niet in kleine hoeveelheden.',
      },
      {
        q: 'Zijn er tolwegen?',
        a: 'Ja, op sommige snelwegen. Neem contant geld in dirham mee: niet alle tolpoorten accepteren een kaart.',
      },
      {
        q: 'Waar kan ik parkeren in Agadir?',
        a: "Er zijn betaalde parkeerplaatsen in het centrum en bij het strand. Laat geen spullen zichtbaar in de auto achter en parkeer 's nachts op een verlichte plaats.",
      },
      {
        q: 'Welk nummer bel ik in geval van nood?',
        a: 'De politie op 190. Bel bij een ongeval of probleem met de auto ook Carzio op +212 680 318003, bereikbaar via WhatsApp.',
      },
    ],
    image: '/images/journal/faq-cat-conduite-maroc.webp',
    imageAlt: 'Een Marokkaanse autosnelweg door een landschap van rode rotsen',
  },
];
