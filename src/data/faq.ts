export interface FaqEntry {
  q: string;
  a: string;
}

export interface FaqCategory {
  slug: string;
  title: string;
  short: string;
  description: string;
  entries: FaqEntry[];
}

type FaqLang = 'fr' | 'en' | 'de' | 'es' | 'pl';

const fr: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Réservation & paiement',
    short: 'Réserver, modifier, annuler, payer.',
    description:
      "Comment fonctionne une réservation chez Carzio : demande en ligne, confirmation, paiement à la remise des clés et annulation gratuite jusqu'à 24 heures avant la prise en charge.",
    entries: [
      {
        q: 'Comment réserver une voiture chez Carzio ?',
        a: "Choisissez vos dates et votre lieu de prise en charge sur le site, sélectionnez un modèle, puis envoyez la demande. Nous vérifions la disponibilité et vous répondons par e-mail ou WhatsApp sous 24 heures. Aucun paiement n'est demandé en ligne.",
      },
      {
        q: 'Faut-il payer en ligne ou laisser une caution ?',
        a: "Non. Il n'y a aucun paiement en ligne, aucune caution et aucune empreinte de carte. Le paiement se fait à la remise des clés, par carte bancaire, y compris carte de débit.",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Une à deux semaines d'avance est confortable, surtout en juillet et en août. Une réservation de dernière minute reste possible : nous vous répondons sous 24 heures avec la disponibilité réelle.",
      },
      {
        q: 'Puis-je modifier ou annuler ma réservation ?',
        a: "Oui. L'annulation est gratuite jusqu'à 24 heures avant la prise en charge. Une modification de dates ou de véhicule est possible selon la disponibilité, sans frais.",
      },
      {
        q: 'Quelle est la durée minimale de location ?',
        a: "Trois jours, soit 72 heures. La location est facturée par blocs de 24 heures : tout jour commencé est dû, même si vous rendez la voiture plus tôt dans la journée.",
      },
      {
        q: "Que se passe-t-il après l'envoi du formulaire ?",
        a: "Nous contrôlons la disponibilité du véhicule et vous envoyons une confirmation par e-mail. Une copie est adressée à contact@carzio.ma. Si vous ne voyez rien, vérifiez vos spams ou écrivez-nous sur WhatsApp au +212 680 318003.",
      },
    ],
  },
  {
    slug: 'conditions',
    title: 'Âge, permis & conducteurs',
    short: 'Qui peut conduire, avec quels documents.',
    description:
      'Conditions pour louer et conduire une voiture Carzio : 23 ans minimum, permis détenu depuis 4 ans, deuxième conducteur gratuit, siège bébé offert et documents acceptés.',
    entries: [
      {
        q: 'Quel âge faut-il pour louer une voiture ?',
        a: "23 ans minimum et permis de conduire détenu depuis au moins 4 ans, pour tous les véhicules de la flotte. Aucun supplément jeune conducteur n'est appliqué.",
      },
      {
        q: 'Puis-je ajouter un deuxième conducteur ?',
        a: "Oui, c'est gratuit. Le deuxième conducteur doit remplir les mêmes conditions : 23 ans minimum et permis détenu depuis 4 ans. Il présente son permis à la prise en charge.",
      },
      {
        q: 'Quels documents faut-il présenter ?',
        a: "Un permis de conduire valide, une pièce d'identité ou un passeport, et une carte bancaire pour le paiement. Aucune caution ni empreinte de carte n'est demandée.",
      },
      {
        q: 'Un permis étranger est-il accepté ?',
        a: "Oui. Le permis doit être lisible et, si besoin, accompagné d'un permis international ou d'une traduction. En cas de doute, envoyez une photo de votre permis sur WhatsApp avant de réserver.",
      },
      {
        q: 'Puis-je louer avec un permis probatoire ?',
        a: "Non. Le permis doit être détenu depuis au moins 4 ans, quel que soit l'âge du conducteur. Cette règle s'applique à tous les véhicules.",
      },
      {
        q: 'Le siège bébé et le rehausseur sont-ils payants ?',
        a: "Non, ils sont gratuits. Indiquez l'âge de votre enfant dans les demandes spéciales au moment de la réservation, nous installons le siège adapté.",
      },
    ],
  },

  {
    slug: 'assurance',
    title: 'Assurance & franchise',
    short: 'Ce qui est couvert, et comment passer à 0 MAD en cas de dommage.',
    description:
      'Assurance standard incluse, et Assurance Complète (franchise 0 MAD) disponible à partir de 5 jours de location.',
    entries: [
      {
        q: "L'assurance est-elle incluse dans le prix ?",
        a: "Oui. L'assurance Standard est incluse dans chaque tarif. Elle couvre la structure du véhicule, les vitres, les pneus et les rétroviseurs.",
      },
      {
        q: "Que se passe-t-il en cas de dommage avec l'assurance Standard ?",
        a: "Une franchise est à votre charge en cas de dommage couvert. Le montant de cette franchise est indiqué dans le contrat que vous signez à la remise des clés.",
      },
      {
        q: "Qu'est-ce que l'Assurance Complète ?",
        a: "C'est l'option que vous pouvez choisir à partir de 5 jours de location. Elle ramène la franchise à 0 MAD : aucun montant ne reste à votre charge en cas de dommage couvert. Le supplément (10 € ou 15 € par jour selon le tarif du véhicule) est toujours affiché avant la confirmation.",
      },
      {
        q: "À partir de quand puis-je prendre l'Assurance Complète ?",
        a: "Uniquement à partir de 5 jours de location, soit 120 heures. Elle n'est jamais cochée par défaut et se retire automatiquement si la durée passe sous 5 jours.",
      },
      {
        q: "Que couvre exactement l'assurance standard ?",
        a: "Les dommages au véhicule, les vitres, les pneus et les rétroviseurs, dans les limites du contrat. Les exclusions et le montant éventuel de la franchise sont détaillés dans le contrat remis à la prise en charge.",
      },
      {
        q: 'Que faire en cas de dommage ou d’accident ?',
        a: "Sécurisez le véhicule et les personnes, appelez la police au 190 si nécessaire, puis prévenez Carzio au +212 680 318003. Ne quittez pas les lieux et ne faites pas réparer le véhicule sans notre accord.",
      },
    ],
  },

  {
    slug: 'carburant-livraison',
    title: 'Carburant, kilométrage & livraison',
    short: 'Plein, kilomètres, aéroport et retour.',
    description:
      "Politique carburant au même niveau, kilométrage illimité, livraison gratuite à l'aéroport Agadir Al Massira, 80 € à Marrakech et Casablanca, sur demande à Taghazout, Tamraght et Essaouira.",
    entries: [
      {
        q: 'Quelle est la politique carburant ?',
        a: 'Le véhicule est remis et doit être rendu au même niveau de carburant. Faites le plein juste avant le retour pour éviter les frais de remise à niveau.',
      },
      {
        q: 'Le kilométrage est-il limité ?',
        a: 'Non. Tous nos véhicules sont loués avec un kilométrage illimité, sans supplément au retour.',
      },
      {
        q: 'Où pouvez-vous livrer la voiture ?',
        a: "Livraison gratuite à l'aéroport Agadir Al Massira. Marrakech et Casablanca : 80 €. Taghazout, Tamraght et Essaouira : sur demande, avec un tarif confirmé avant la réservation.",
      },
      {
        q: "La livraison à l'aéroport est-elle gratuite ?",
        a: "Oui, à l'aéroport Agadir Al Massira. Indiquez votre numéro de vol : nous suivons l'atterrissage et vous accueillons à la sortie.",
      },
      {
        q: 'Puis-je rendre la voiture dans une autre ville ?',
        a: "C'est possible dans certains cas, mais doit être confirmé avant la réservation. Des frais de restitution peuvent s'appliquer selon la ville et la distance.",
      },
      {
        q: 'Que se passe-t-il si je rends la voiture en retard ?',
        a: "Tout bloc de 24 heures commencé est facturé. Prévenez-nous le plus tôt possible sur WhatsApp : nous cherchons une solution avec le client suivant.",
      },
    ],
  },
  {
    slug: 'conduite-maroc',
    title: 'Conduire au Maroc',
    short: 'Sens de circulation, ceinture, péages, urgences.',
    description:
      "Les bases pour conduire sereinement au Maroc : circulation à droite, ceinture obligatoire, alcool interdit, péages, stationnement à Agadir et numéro d'urgence 190.",
    entries: [
      {
        q: 'De quel côté conduit-on au Maroc ?',
        a: "À droite, comme dans la plupart des pays d'Europe. Les carrefours à sens giratoire se prennent dans le sens inverse des aiguilles d'une montre.",
      },
      {
        q: 'La ceinture est-elle obligatoire ?',
        a: "Oui, à l'avant comme à l'arrière. Les enfants doivent être installés dans un siège ou un rehausseur adapté à leur âge.",
      },
      {
        q: 'Puis-je boire de l’alcool avant de conduire ?',
        a: "Non. L'alcool au volant est interdit au Maroc. Ne conduisez jamais après avoir bu, même en petite quantité.",
      },
      {
        q: 'Y a-t-il des péages sur les routes ?',
        a: "Oui, sur certains axes rapides. Prévoyez des espèces en dirhams : toutes les barrières ne prennent pas la carte.",
      },
      {
        q: 'Où stationner à Agadir ?',
        a: "Des parkings payants existent en centre-ville et près de la plage. Ne laissez aucun objet visible dans l'habitacle et gardez le véhicule dans un endroit éclairé la nuit.",
      },
      {
        q: "Quel numéro appeler en cas d'urgence ?",
        a: "La police au 190. En cas d'accident ou de problème avec le véhicule, appelez également Carzio au +212 680 318003, disponible sur WhatsApp.",
      },
    ],
  },
];

const en: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Booking & payment',
    short: 'Book, change, cancel, pay.',
    description:
      'How a Carzio booking works: online request, confirmation, payment at key handover and free cancellation up to 24 hours before pickup.',
    entries: [
      {
        q: 'How do I book a car with Carzio?',
        a: 'Choose your dates and pickup location on the website, select a model, then send the request. We check availability and answer by email or WhatsApp within 24 hours. No online payment is required.',
      },
      {
        q: 'Do I have to pay online or leave a deposit?',
        a: 'No. There is no online payment, no deposit and no card hold. Payment is made at key handover, by bank card, including debit cards.',
      },
      {
        q: 'How far ahead should I book?',
        a: 'One to two weeks ahead is comfortable, especially in July and August. A last-minute booking is still possible: we answer within 24 hours with real availability.',
      },
      {
        q: 'Can I change or cancel my booking?',
        a: 'Yes. Cancellation is free up to 24 hours before pickup. A change of dates or vehicle is possible depending on availability, at no cost.',
      },
      {
        q: 'What is the minimum rental length?',
        a: 'Three days, i.e. 72 hours. Rentals are billed in 24-hour blocks: any started day is charged, even if you return the car earlier in the day.',
      },
      {
        q: 'What happens after I submit the form?',
        a: 'We check the vehicle’s availability and send a confirmation by email. A copy goes to contact@carzio.ma. If you do not see it, check your spam or message us on WhatsApp at +212 680 318003.',
      },
    ],
  },
  {
    slug: 'conditions',
    title: 'Age, licence & drivers',
    short: 'Who may drive, with what documents.',
    description:
      'Conditions to rent and drive a Carzio car: minimum 23, licence held for 4 years, free second driver, free baby seat and documents accepted.',
    entries: [
      {
        q: 'How old do I need to be to rent a car?',
        a: 'Minimum 23 with a driving licence held for at least 4 years, for every vehicle in the fleet. No young driver surcharge applies.',
      },
      {
        q: 'Can I add a second driver?',
        a: 'Yes, it is free. The second driver must meet the same conditions: minimum 23 and licence held for 4 years. They present their licence at pickup.',
      },
      {
        q: 'Which documents are required?',
        a: 'A valid driving licence, an ID card or passport, and a bank card for payment. No deposit and no card hold are required.',
      },
      {
        q: 'Is a foreign licence accepted?',
        a: 'Yes. The licence must be legible and, if needed, accompanied by an international licence or a translation. In doubt, send a picture of your licence on WhatsApp before booking.',
      },
      {
        q: 'Can I rent with a provisional licence?',
        a: 'No. The licence must have been held for at least 4 years, regardless of the driver’s age. This rule applies to all vehicles.',
      },
      {
        q: 'Are the baby seat and booster paid?',
        a: 'No, they are free. Tell us your child’s age in the special requests at booking time, we install the right seat.',
      },
    ],
  },

  {
    slug: 'assurance',
    title: 'Insurance & excess',
    short: 'What is covered, and how to drop to 0 in case of damage.',
    description:
      'Standard insurance included, and Full Insurance (0 excess) available from 5 days of rental.',
    entries: [
      {
        q: 'Is insurance included in the price?',
        a: 'Yes. Standard insurance is included in every rate. It covers the body of the vehicle, the windows, tyres and mirrors.',
      },
      {
        q: 'What happens in case of damage under Standard insurance?',
        a: 'An excess remains your responsibility in case of covered damage. The amount of that excess is stated in the contract you sign at key handover.',
      },
      {
        q: 'What is Full Insurance?',
        a: 'It is the option you may choose from 5 days of rental. It reduces the excess to 0: nothing remains your responsibility in case of covered damage. The surcharge (€10 or €15 per day depending on the vehicle rate) is always shown before confirmation.',
      },
      {
        q: 'From when can I take Full Insurance?',
        a: 'Only from 5 days of rental, i.e. 120 hours. It is never ticked by default and is automatically removed if the duration falls below 5 days.',
      },
      {
        q: 'What exactly does standard insurance cover?',
        a: 'Damage to the vehicle, windows, tyres and mirrors, within the limits of the contract. Exclusions and any excess are detailed in the contract handed over at pickup.',
      },
      {
        q: 'What should I do if the car is damaged or I have an accident?',
        a: 'Secure the vehicle and the people, call the police on 190 if necessary, then call Carzio on +212 680 318003. Do not leave the scene and do not have the vehicle repaired without our agreement.',
      },
    ],
  },

  {
    slug: 'carburant-livraison',
    title: 'Fuel, mileage & delivery',
    short: 'Fuel policy, unlimited mileage, airport delivery.',
    description:
      'Same-level fuel policy, unlimited mileage, free delivery at Agadir Al Massira airport, €80 at Marrakech and Casablanca, on request in Taghazout, Tamraght and Essaouira.',
    entries: [
      {
        q: 'What is the fuel policy?',
        a: 'The vehicle is handed over and must be returned with the same fuel level. Refuel just before the return to avoid top-up fees.',
      },
      {
        q: 'Is the mileage limited?',
        a: 'No. All our vehicles are rented with unlimited mileage, no surcharge on return.',
      },
      {
        q: 'Where can you deliver the car?',
        a: 'Free delivery at Agadir Al Massira airport. Marrakech and Casablanca: €80 per trip. Taghazout, Tamraght and Essaouira: on request, with a price confirmed before booking.',
      },
      {
        q: 'Is airport delivery free?',
        a: 'Yes, at Agadir Al Massira airport. Give us your flight number: we track the landing and welcome you at the exit.',
      },
      {
        q: 'Can I return the car in another city?',
        a: 'It is possible in some cases, but must be confirmed before booking. A return fee may apply depending on the city and the distance.',
      },
      {
        q: 'What happens if I return the car late?',
        a: 'Any started 24-hour block is billed. Warn us as early as possible on WhatsApp: we look for a solution with the next client.',
      },
    ],
  },
  {
    slug: 'conduite-maroc',
    title: 'Driving in Morocco',
    short: 'Side of the road, seatbelts, tolls, emergencies.',
    description:
      'The basics to drive calmly in Morocco: right-hand traffic, mandatory seatbelts, alcohol prohibited, tolls, parking in Agadir and emergency number 190.',
    entries: [
      {
        q: 'Which side of the road do you drive on in Morocco?',
        a: 'On the right, like in most European countries. Roundabouts are taken anti-clockwise.',
      },
      {
        q: 'Are seatbelts mandatory?',
        a: 'Yes, in the front as well as in the back. Children must be in a seat or booster adapted to their age.',
      },
      {
        q: 'Can I drink alcohol before driving?',
        a: 'No. Drink-driving is prohibited in Morocco. Never drive after drinking, even a little.',
      },
      {
        q: 'Are there tolls on the roads?',
        a: 'Yes, on some expressways. Carry Moroccan dirhams in cash: not all booths take cards.',
      },
      {
        q: 'Where can I park in Agadir?',
        a: 'There are paid car parks in the city centre and near the beach. Do not leave any belongings visible in the car and park in a lit place at night.',
      },
      {
        q: 'Which number to call in an emergency?',
        a: 'The police on 190. In the event of an accident or vehicle problem, also call Carzio on +212 680 318003, available on WhatsApp.',
      },
    ],
  },
];

const de: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Buchung & Zahlung',
    short: 'Buchen, ändern, stornieren, zahlen.',
    description:
      'So funktioniert eine Buchung bei Carzio: Online-Anfrage, Bestätigung, Zahlung bei Schlüsselübergabe und kostenlose Stornierung bis 24 Stunden vor Übernahme.',
    entries: [
      {
        q: 'Wie buche ich ein Auto bei Carzio?',
        a: 'Wählen Sie Ihre Daten und den Übernahmeort auf der Website, wählen Sie ein Modell und senden Sie die Anfrage ab. Wir prüfen die Verfügbarkeit und antworten innerhalb von 24 Stunden per E-Mail oder WhatsApp. Keine Online-Zahlung erforderlich.',
      },
      {
        q: 'Muss ich online zahlen oder eine Kaution hinterlegen?',
        a: 'Nein. Weder Online-Zahlung noch Kaution oder Kartensperre. Bezahlt wird bei der Schlüsselübergabe, per Bankkarte, auch mit Debitkarte.',
      },
      {
        q: 'Wie früh sollte ich buchen?',
        a: 'Ein bis zwei Wochen im Voraus sind bequem, vor allem im Juli und August. Eine Last-Minute-Buchung ist weiterhin möglich: Wir antworten innerhalb von 24 Stunden mit der echten Verfügbarkeit.',
      },
      {
        q: 'Kann ich meine Buchung ändern oder stornieren?',
        a: 'Ja. Kostenlose Stornierung bis 24 Stunden vor Übernahme. Eine Änderung von Termin oder Fahrzeug ist je nach Verfügbarkeit ohne Gebühren möglich.',
      },
      {
        q: 'Wie lange ist die Mindestmietdauer?',
        a: 'Drei Tage, das heißt 72 Stunden. Berechnet wird in 24-Stunden-Blöcken: Jeder begonnene Tag wird berechnet, auch wenn Sie das Auto früher zurückgeben.',
      },
      {
        q: 'Was passiert, nachdem ich das Formular abgeschickt habe?',
        a: 'Wir prüfen die Verfügbarkeit des Fahrzeugs und senden eine Bestätigung per E-Mail. Eine Kopie geht an contact@carzio.ma. Wenn nichts kommt, prüfen Sie Ihren Spam oder schreiben Sie uns auf WhatsApp: +212 680 318003.',
      },
    ],
  },
  {
    slug: 'conditions',
    title: 'Alter, Führerschein & Fahrer',
    short: 'Wer fahren darf und mit welchen Dokumenten.',
    description:
      'Voraussetzungen für die Miete und das Fahren bei Carzio: mindestens 23, seit 4 Jahren im Besitz des Führerscheins, zweiter Fahrer kostenlos, Babysitz gratis.',
    entries: [
      {
        q: 'Wie alt muss ich sein, um ein Auto zu mieten?',
        a: 'Mindestens 23 und Führerschein seit mindestens 4 Jahren, für alle Fahrzeuge der Flotte. Kein Jungfahrer-Zuschlag.',
      },
      {
        q: 'Kann ich einen zweiten Fahrer hinzufügen?',
        a: 'Ja, kostenlos. Der zweite Fahrer muss dieselben Bedingungen erfüllen: mindestens 23 und Führerschein seit 4 Jahren. Er zeigt seinen Führerschein bei der Übernahme.',
      },
      {
        q: 'Welche Dokumente brauche ich?',
        a: 'Einen gültigen Führerschein, einen Ausweis oder Reisepass sowie eine Bankkarte für die Zahlung. Keine Kaution, keine Kartensperre.',
      },
      {
        q: 'Wird ein ausländischer Führerschein akzeptiert?',
        a: 'Ja. Der Führerschein muss lesbar sein und bei Bedarf von einem internationalen Führerschein oder einer Übersetzung begleitet werden. Im Zweifel senden Sie ein Foto Ihres Führerscheins vorher auf WhatsApp.',
      },
      {
        q: 'Kann ich mit einem Führerschein auf Probe mieten?',
        a: 'Nein. Der Führerschein muss unabhängig vom Alter des Fahrers seit mindestens 4 Jahren besessen werden. Diese Regel gilt für alle Fahrzeuge.',
      },
      {
        q: 'Sind Baby- und Kindersitze kostenpflichtig?',
        a: 'Nein, sie sind kostenlos. Geben Sie das Alter Ihres Kindes in den Sonderwünschen bei der Buchung an, wir bauen den passenden Sitz ein.',
      },
    ],
  },

  {
    slug: 'assurance',
    title: 'Versicherung & Selbstbehalt',
    short: 'Was gedeckt ist, und wie Sie auf 0 kommen.',
    description:
      'Standardversicherung inklusive, und Vollkasko (0 Selbstbehalt) ab 5 Miettagen erhältlich.',
    entries: [
      {
        q: 'Ist die Versicherung im Preis enthalten?',
        a: 'Ja. Die Standardversicherung ist in jedem Tarif enthalten. Sie deckt die Karosserie, Scheiben, Reifen und Spiegel ab.',
      },
      {
        q: 'Was passiert bei einem Schaden mit der Standardversicherung?',
        a: 'Ein Selbstbehalt bleibt bei gedecktem Schaden zu Ihren Lasten. Die Höhe dieses Selbstbehalts steht in dem Vertrag, den Sie bei der Schlüsselübergabe unterschreiben.',
      },
      {
        q: 'Was ist die Vollkasko?',
        a: 'Eine Option, die Sie ab 5 Miettagen wählen können. Sie reduziert den Selbstbehalt auf 0: Nichts bleibt zu Ihren Lasten im Fall eines gedeckten Schadens. Der Aufpreis (10 € oder 15 € pro Tag je nach Fahrzeugtarif) wird immer vor der Bestätigung angezeigt.',
      },
      {
        q: 'Ab wann kann ich die Vollkasko nehmen?',
        a: 'Nur ab 5 Miettagen, also 120 Stunden. Sie ist niemals vorausgewählt und wird automatisch entfernt, wenn die Dauer unter 5 Tage fällt.',
      },
      {
        q: 'Was genau deckt die Standardversicherung ab?',
        a: 'Schäden am Fahrzeug, Scheiben, Reifen und Spiegel, innerhalb der Vertragsgrenzen. Ausschlüsse und ein eventueller Selbstbehalt sind im übergebenen Vertrag detailliert.',
      },
      {
        q: 'Was tun bei Schaden oder Unfall?',
        a: 'Sichern Sie Fahrzeug und Personen, rufen Sie bei Bedarf die Polizei unter 190 und informieren Sie Carzio unter +212 680 318003. Verlassen Sie den Unfallort nicht und lassen Sie das Fahrzeug nicht ohne unsere Zustimmung reparieren.',
      },
    ],
  },

  {
    slug: 'carburant-livraison',
    title: 'Kraftstoff, km & Lieferung',
    short: 'Tankregelung, unbegrenzte km, Flughafenlieferung.',
    description:
      'Gleichstand-Kraftstoffregelung, unbegrenzte Kilometer, kostenlose Lieferung am Flughafen Agadir Al Massira, 80 € in Marrakesch und Casablanca, auf Anfrage in Taghazout, Tamraght und Essaouira.',
    entries: [
      {
        q: 'Wie lautet die Kraftstoffregelung?',
        a: 'Das Fahrzeug wird mit einem bestimmten Tankstand übergeben und muss mit demselben Tankstand zurückgebracht werden. Tanken Sie kurz vor Rückgabe, um Nachfüllgebühren zu vermeiden.',
      },
      {
        q: 'Ist die Kilometerzahl begrenzt?',
        a: 'Nein. Alle unsere Fahrzeuge werden mit unbegrenzten Kilometern vermietet, ohne Aufpreis bei der Rückgabe.',
      },
      {
        q: 'Wo können Sie das Auto liefern?',
        a: 'Kostenlose Lieferung am Flughafen Agadir Al Massira. Marrakesch und Casablanca: 80 €. Taghazout, Tamraght und Essaouira: auf Anfrage, mit vor der Buchung bestätigtem Preis.',
      },
      {
        q: 'Ist die Flughafenlieferung kostenlos?',
        a: 'Ja, am Flughafen Agadir Al Massira. Geben Sie uns Ihre Flugnummer: Wir verfolgen die Landung und begrüßen Sie am Ausgang.',
      },
      {
        q: 'Kann ich das Auto in einer anderen Stadt zurückgeben?',
        a: 'In einigen Fällen ist das möglich, muss aber vor der Buchung bestätigt werden. Je nach Stadt und Entfernung kann eine Rückgabegebühr anfallen.',
      },
      {
        q: 'Was passiert, wenn ich das Auto zu spät zurückgebe?',
        a: 'Jeder begonnene 24-Stunden-Block wird berechnet. Informieren Sie uns so früh wie möglich auf WhatsApp: Wir suchen eine Lösung mit dem nächsten Kunden.',
      },
    ],
  },
  {
    slug: 'conduite-maroc',
    title: 'Fahren in Marokko',
    short: 'Fahrseite, Gurte, Maut, Notfälle.',
    description:
      'Die Grundlagen für sicheres Fahren in Marokko: Rechtsverkehr, Gurtspflicht, Alkoholverbot, Maut, Parken in Agadir und die Notfallnummer 190.',
    entries: [
      {
        q: 'Auf welcher Straßenseite fährt man in Marokko?',
        a: 'Rechts, wie in den meisten europäischen Ländern. Kreisverkehre werden gegen den Uhrzeigersinn genommen.',
      },
      {
        q: 'Ist der Sicherheitsgurt Pflicht?',
        a: 'Ja, vorne wie hinten. Kinder müssen in einem ihrem Alter entsprechenden Sitz oder Sitzerhöhung sitzen.',
      },
      {
        q: 'Darf ich vor dem Fahren Alkohol trinken?',
        a: 'Nein. Fahren unter Alkoholeinfluss ist in Marokko verboten. Fahren Sie nie nach Alkohol, selbst nicht in kleinen Mengen.',
      },
      {
        q: 'Gibt es Maut auf den Straßen?',
        a: 'Ja, auf einigen Schnellstraßen. Halten Sie Dirhams in bar bereit: Nicht alle Schranken akzeptieren Karten.',
      },
      {
        q: 'Wo kann ich in Agadir parken?',
        a: 'Es gibt bezahlte Parkplätze im Stadtzentrum und an der Strandpromenade. Lassen Sie keine Wertsachen offen im Fahrzeug und parken Sie nachts an beleuchteten Orten.',
      },
      {
        q: 'Welche Nummer rufe ich im Notfall an?',
        a: 'Die Polizei unter 190. Bei Unfall oder Fahrzeugproblem rufen Sie zusätzlich Carzio unter +212 680 318003 an, auch per WhatsApp erreichbar.',
      },
    ],
  },
];

const es: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Reserva y pago',
    short: 'Reservar, cambiar, cancelar, pagar.',
    description:
      'Cómo funciona una reserva en Carzio: solicitud online, confirmación, pago en la entrega de llaves y cancelación gratuita hasta 24 horas antes de la recogida.',
    entries: [
      {
        q: '¿Cómo reservo un coche en Carzio?',
        a: 'Elija sus fechas y lugar de recogida en la web, seleccione un modelo y envíe la solicitud. Verificamos la disponibilidad y respondemos por email o WhatsApp en 24 horas. No se requiere pago online.',
      },
      {
        q: '¿Tengo que pagar online o dejar una fianza?',
        a: 'No. No hay pago online, ni fianza, ni bloqueo de tarjeta. El pago se realiza en la entrega de llaves, con tarjeta bancaria, incluidas tarjetas de débito.',
      },
      {
        q: '¿Con cuánta antelación debo reservar?',
        a: 'Una o dos semanas es cómodo, sobre todo en julio y agosto. Una reserva de última hora sigue siendo posible: respondemos en 24 horas con la disponibilidad real.',
      },
      {
        q: '¿Puedo modificar o cancelar mi reserva?',
        a: 'Sí. La cancelación es gratuita hasta 24 horas antes de la recogida. El cambio de fechas o vehículo es posible según la disponibilidad, sin coste.',
      },
      {
        q: '¿Cuál es la duración mínima de alquiler?',
        a: 'Tres días, o sea 72 horas. El alquiler se factura por bloques de 24 horas: cualquier día empezado se cobra, aunque devuelva el coche antes.',
      },
      {
        q: '¿Qué pasa tras enviar el formulario?',
        a: 'Comprobamos la disponibilidad del vehículo y le enviamos una confirmación por email. Una copia va a contact@carzio.ma. Si no la ve, revise su spam o escríbanos por WhatsApp al +212 680 318003.',
      },
    ],
  },
  {
    slug: 'conditions',
    title: 'Edad, carné y conductores',
    short: 'Quién puede conducir y con qué documentos.',
    description:
      'Condiciones para alquilar y conducir con Carzio: mínimo 23 años, carnet con 4 años de antigüedad, segundo conductor gratis, silla de bebé gratuita y documentos aceptados.',
    entries: [
      {
        q: '¿Qué edad hay que tener para alquilar?',
        a: 'Mínimo 23 años y carnet de conducir con al menos 4 años, para todos los vehículos de la flota. Sin suplemento de conductor joven.',
      },
      {
        q: '¿Puedo añadir un segundo conductor?',
        a: 'Sí, es gratis. El segundo conductor debe cumplir las mismas condiciones: mínimo 23 años y carnet con 4 años. Presenta su carnet en la recogida.',
      },
      {
        q: '¿Qué documentos hay que presentar?',
        a: 'Un carnet de conducir válido, un documento de identidad o pasaporte, y una tarjeta bancaria para el pago. Sin fianza, sin bloqueo de tarjeta.',
      },
      {
        q: '¿Se acepta un permiso extranjero?',
        a: 'Sí. El permiso debe ser legible y, si hace falta, acompañado de un permiso internacional o una traducción. En caso de duda, envíe una foto de su carnet por WhatsApp antes de reservar.',
      },
      {
        q: '¿Puedo alquilar con un permiso de conducir en prácticas?',
        a: 'No. El carnet debe tener al menos 4 años, independientemente de la edad del conductor. Esta regla se aplica a todos los vehículos.',
      },
      {
        q: '¿La silla bebé y el elevador son de pago?',
        a: 'No, son gratis. Indique la edad de su hijo en las solicitudes especiales al reservar, y le instalamos el asiento adecuado.',
      },
    ],
  },

  {
    slug: 'assurance',
    title: 'Seguro y franquicia',
    short: 'Qué está cubierto, y cómo llegar a 0 en caso de daño.',
    description:
      'Seguro Standard incluido, y seguro completo (franquicia 0) disponible a partir de 5 días de alquiler.',
    entries: [
      {
        q: '¿El seguro está incluido en el precio?',
        a: 'Sí. El seguro Standard está incluido en todas las tarifas. Cubre la carrocería del vehículo, los cristales, los neumáticos y los retrovisores.',
      },
      {
        q: '¿Qué ocurre en caso de daño con el seguro Standard?',
        a: 'Una franquicia queda a su cargo en caso de daño cubierto. El importe de esa franquicia figura en el contrato que firma en la entrega de llaves.',
      },
      {
        q: '¿Qué es el seguro completo?',
        a: 'La opción que puede elegir a partir de 5 días de alquiler. Reduce la franquicia a 0: nada queda a su cargo en caso de daño cubierto. El suplemento (10 € o 15 € al día según la tarifa del vehículo) siempre se muestra antes de la confirmación.',
      },
      {
        q: '¿Desde cuándo puedo contratar el seguro completo?',
        a: 'Solo a partir de 5 días de alquiler, es decir, 120 horas. Nunca viene preseleccionado y se retira automáticamente si la duración baja de 5 días.',
      },
      {
        q: '¿Qué cubre exactamente el seguro Standard?',
        a: 'Daños al vehículo, cristales, neumáticos y retrovisores, dentro de los límites del contrato. Las exclusiones y una posible franquicia se detallan en el contrato entregado en la recogida.',
      },
      {
        q: '¿Qué hago en caso de daño o accidente?',
        a: 'Ponga a salvo el vehículo y las personas, llame a la policía al 190 si es necesario y avise a Carzio al +212 680 318003. No abandone el lugar ni haga reparar el vehículo sin nuestro acuerdo.',
      },
    ],
  },

  {
    slug: 'carburant-livraison',
    title: 'Combustible, km y entrega',
    short: 'Política de combustible, km ilimitados, entrega en aeropuerto.',
    description:
      'Política de mismo nivel de combustible, kilometraje ilimitado, entrega gratuita en el aeropuerto de Agadir Al Massira, 80 € en Marrakech y Casablanca, bajo demanda en Taghazout, Tamraght y Essaouira.',
    entries: [
      {
        q: '¿Cuál es la política de combustible?',
        a: 'El vehículo se entrega y debe devolverse con el mismo nivel de combustible. Reposte justo antes de la devolución para evitar cargos por repostaje.',
      },
      {
        q: '¿El kilometraje está limitado?',
        a: 'No. Todos nuestros vehículos se alquilan con kilometraje ilimitado, sin suplemento a la devolución.',
      },
      {
        q: '¿Dónde podéis entregar el coche?',
        a: 'Entrega gratuita en el aeropuerto de Agadir Al Massira. Marrakech y Casablanca: 80 € por trayecto. Taghazout, Tamraght y Essaouira: bajo demanda, con un precio confirmado antes de la reserva.',
      },
      {
        q: '¿La entrega en el aeropuerto es gratuita?',
        a: 'Sí, en el aeropuerto de Agadir Al Massira. Indíquenos su número de vuelo: seguimos el aterrizaje y le recibimos a la salida.',
      },
      {
        q: '¿Puedo devolver el coche en otra ciudad?',
        a: 'Es posible en algunos casos, pero debe confirmarse antes de la reserva. Un coste de restitución puede aplicarse según la ciudad y la distancia.',
      },
      {
        q: '¿Qué pasa si devuelvo el coche tarde?',
        a: 'Se factura cada bloque de 24 horas iniciado. Avísenos lo antes posible por WhatsApp: buscamos una solución con el cliente siguiente.',
      },
    ],
  },
  {
    slug: 'conduite-maroc',
    title: 'Conducir en Marruecos',
    short: 'Sentido de circulación, cinturones, peajes, emergencias.',
    description:
      'Las bases para conducir con tranquilidad en Marruecos: circulación por la derecha, cinturón obligatorio, alcohol prohibido, peajes, aparcamiento en Agadir y número de emergencia 190.',
    entries: [
      {
        q: '¿Por qué lado se circula en Marruecos?',
        a: 'Por la derecha, como en la mayoría de países europeos. Las rotondas se toman en sentido contrario a las agujas del reloj.',
      },
      {
        q: '¿El cinturón es obligatorio?',
        a: 'Sí, delante y detrás. Los niños deben ir en una silla o elevador adaptado a su edad.',
      },
      {
        q: '¿Puedo beber alcohol antes de conducir?',
        a: 'No. El alcohol al volante está prohibido en Marruecos. Nunca conduzca tras haber bebido, ni siquiera una pequeña cantidad.',
      },
      {
        q: '¿Hay peajes en las carreteras?',
        a: 'Sí, en algunos ejes rápidos. Lleve dirhams en efectivo: no todas las barreras aceptan tarjeta.',
      },
      {
        q: '¿Dónde puedo aparcar en Agadir?',
        a: 'Hay parkings de pago en el centro y cerca de la playa. No deje objetos a la vista en el coche y apárquelo en un lugar iluminado de noche.',
      },
      {
        q: '¿Qué número llamo en caso de emergencia?',
        a: 'La policía al 190. En caso de accidente o problema con el vehículo, llame también a Carzio al +212 680 318003, disponible por WhatsApp.',
      },
    ],
  },
];

const pl: FaqCategory[] = [
  {
    slug: 'reservation',
    title: 'Rezerwacja i płatność',
    short: 'Rezerwuj, zmieniaj, anuluj, płać.',
    description:
      'Jak wygląda rezerwacja w Carzio: zgłoszenie online, potwierdzenie, płatność przy wydaniu kluczyków i bezpłatne anulowanie do 24 godzin przed odbiorem.',
    entries: [
      {
        q: 'Jak zarezerwować samochód w Carzio?',
        a: 'Wybierz daty i miejsce odbioru na stronie, wybierz model i wyślij zgłoszenie. Sprawdzamy dostępność i odpowiadamy e-mailem lub przez WhatsApp w 24 godziny. Płatność online nie jest wymagana.',
      },
      {
        q: 'Czy muszę płacić online lub zostawić kaucję?',
        a: 'Nie. Nie ma płatności online, kaucji ani blokady karty. Płatność odbywa się przy wydaniu kluczyków, kartą bankową, w tym kartą debetową.',
      },
      {
        q: 'Z jakim wyprzedzeniem trzeba rezerwować?',
        a: 'Tydzień lub dwa tygodnie wyprzedzenia jest komfortowe, zwłaszcza w lipcu i sierpniu. Rezerwacja w ostatniej chwili też jest możliwa: odpowiadamy w 24 godziny z realną dostępnością.',
      },
      {
        q: 'Czy mogę zmienić lub anulować rezerwację?',
        a: 'Tak. Anulowanie jest bezpłatne do 24 godzin przed odbiorem. Zmiana terminu lub auta jest możliwa w zależności od dostępności, bez opłat.',
      },
      {
        q: 'Jaka jest minimalna długość wynajmu?',
        a: 'Trzy dni, czyli 72 godziny. Wynajem rozliczany jest blokami 24-godzinnymi: każdy rozpoczęty dzień jest płatny, nawet jeśli oddasz auto wcześniej.',
      },
      {
        q: 'Co się dzieje po wysłaniu formularza?',
        a: 'Sprawdzamy dostępność auta i wysyłamy potwierdzenie e-mailem. Kopia trafia na contact@carzio.ma. Jeśli nic nie widzisz, sprawdź spam albo napisz do nas przez WhatsApp: +212 680 318003.',
      },
    ],
  },
  {
    slug: 'conditions',
    title: 'Wiek, prawo jazdy i kierowcy',
    short: 'Kto może prowadzić i z jakimi dokumentami.',
    description:
      'Warunki wynajmu i jazdy w Carzio: minimum 23 lata, prawo jazdy od 4 lat, drugi kierowca bezpłatnie, fotelik gratis i akceptowane dokumenty.',
    entries: [
      {
        q: 'Ile trzeba mieć lat, żeby wynająć?',
        a: 'Minimum 23 lata i prawo jazdy od minimum 4 lat, dla wszystkich aut we flocie. Bez dopłaty dla młodych kierowców.',
      },
      {
        q: 'Czy mogę dodać drugiego kierowcę?',
        a: 'Tak, jest to bezpłatne. Drugi kierowca musi spełniać te same warunki: minimum 23 lata i prawo jazdy od 4 lat. Okazuje prawo jazdy przy odbiorze.',
      },
      {
        q: 'Jakie dokumenty są wymagane?',
        a: 'Ważne prawo jazdy, dokument tożsamości lub paszport oraz karta bankowa do płatności. Bez kaucji, bez blokady karty.',
      },
      {
        q: 'Czy akceptujecie zagraniczne prawo jazdy?',
        a: 'Tak. Prawo jazdy musi być czytelne i, w razie potrzeby, opatrzone międzynarodowym prawem jazdy lub tłumaczeniem. W razie wątpliwości prześlij zdjęcie prawa jazdy przez WhatsApp jeszcze przed rezerwacją.',
      },
      {
        q: 'Czy mogę wynająć na młode prawo jazdy?',
        a: 'Nie. Prawo jazdy musi być posiadane od minimum 4 lat, niezależnie od wieku kierowcy. Ta zasada obowiązuje wszystkie auta.',
      },
      {
        q: 'Czy fotelik i podkładka są płatne?',
        a: 'Nie, są bezpłatne. Podaj wiek dziecka w życzeniach specjalnych przy rezerwacji, zamontujemy właściwy fotelik.',
      },
    ],
  },

  {
    slug: 'assurance',
    title: 'Ubezpieczenie i franczyza',
    short: 'Co jest objęte, i jak zejść do 0 przy szkodzie.',
    description:
      'Ubezpieczenie Standard w cenie, oraz pełne ubezpieczenie (franczyza 0) od 5 dni wynajmu.',
    entries: [
      {
        q: 'Czy ubezpieczenie jest wliczone w cenę?',
        a: 'Tak. Ubezpieczenie Standard jest wliczone w każdą taryfę. Obejmuje karoserię pojazdu, szyby, opony i lusterka.',
      },
      {
        q: 'Co się dzieje w razie szkody przy ubezpieczeniu Standard?',
        a: 'Franczyza obciąża Ciebie w razie objętej szkody. Wysokość tej franczyzy jest podana w umowie podpisanej przy przekazaniu kluczy.',
      },
      {
        q: 'Czym jest ubezpieczenie Full Risk?',
        a: 'To opcja, którą możesz wybrać od 5 dni wynajmu. Redukuje franczyzę do 0: nic nie pozostaje w Twojej gestii w razie objętej szkody. Dopłata (10 € lub 15 € dziennie w zależności od taryfy pojazdu) jest zawsze pokazana przed potwierdzeniem.',
      },
      {
        q: 'Od kiedy mogę wykupić ubezpieczenie pełne?',
        a: 'Tylko od 5 dni wynajmu, czyli 120 godzin. Opcja nigdy nie jest zaznaczona automatycznie i odznacza się, gdy czas wynajmu spada poniżej 5 dni.',
      },
      {
        q: 'Co dokładnie obejmuje ubezpieczenie Standard?',
        a: 'Szkody pojazdu, szyby, opony i lusterka, w granicach umowy. Wyłączenia i ewentualna franczyza są szczegółowo opisane w umowie wręczanej przy odbiorze.',
      },
      {
        q: 'Co zrobić w razie szkody albo wypadku?',
        a: 'Zabezpiecz pojazd i ludzi, w razie potrzeby dzwoń na policję pod numer 190, a potem powiadom Carzio pod +212 680 318003. Nie oddalaj się z miejsca i nie oddawaj pojazdu do naprawy bez naszej zgody.',
      },
    ],
  },

  {
    slug: 'carburant-livraison',
    title: 'Paliwo, kilometry i dostawa',
    short: 'Polityka paliwowa, nielimitowany przebieg, dostawa na lotnisko.',
    description:
      'Polityka tego samego poziomu paliwa, nielimitowany przebieg, bezpłatna dostawa na lotnisko Agadir Al Massira, 80 € w Marrakeszu i Casablance, na życzenie w Taghazout, Tamraght i Essaouirze.',
    entries: [
      {
        q: 'Jaka jest polityka paliwowa?',
        a: 'Pojazd wydawany jest i powinien zostać oddany z tym samym poziomem paliwa. Zatankuj tuż przed oddaniem, aby uniknąć opłat za uzupełnienie.',
      },
      {
        q: 'Czy przebieg jest ograniczony?',
        a: 'Nie. Wszystkie nasze auta są wynajmowane z nielimitowanym przebiegiem, bez dopłaty przy zwrocie.',
      },
      {
        q: 'Gdzie możecie dostarczyć auto?',
        a: 'Bezpłatna dostawa na lotnisko Agadir Al Massira. Marrakesz i Casablanca: 80 € za przejazd. Taghazout, Tamraght i Essaouira: na życzenie, z ceną potwierdzoną przed rezerwacją.',
      },
      {
        q: 'Czy dostawa na lotnisko jest bezpłatna?',
        a: 'Tak, na lotnisku Agadir Al Massira. Podaj numer lotu: śledzimy lądowanie i czekamy na Ciebie przy wyjściu.',
      },
      {
        q: 'Czy mogę oddać auto w innym mieście?',
        a: 'W niektórych przypadkach to możliwe, ale należy potwierdzić przed rezerwacją. Może obowiązywać opłata zwrotu, w zależności od miasta i odległości.',
      },
      {
        q: 'Co się stanie, jeśli oddam auto za późno?',
        a: 'Każdy rozpoczęty blok 24-godzinny jest naliczany. Ostrzeż nas jak najwcześniej przez WhatsApp: szukamy rozwiązania z kolejnym klientem.',
      },
    ],
  },
  {
    slug: 'conduite-maroc',
    title: 'Jazda w Maroku',
    short: 'Strona ruchu, pasy, opłaty, sytuacje awaryjne.',
    description:
      'Podstawy spokojnej jazdy w Maroku: ruch prawą stroną, obowiązkowe pasy, alkohol zakazany, opłaty za autostrady, parkowanie w Agadirze i numer alarmowy 190.',
    entries: [
      {
        q: 'Po której stronie jeździ się w Maroku?',
        a: 'Po prawej, jak w większości krajów Europy. Ronda zjeźdza się przeciwnie do ruchu wskazówek zegara.',
      },
      {
        q: 'Czy pasy bezpieczeństwa są obowiązkowe?',
        a: 'Tak, z przodu i z tyłu. Dzieci należy przewozić w foteliku lub podstawce odpowiedniej do wieku.',
      },
      {
        q: 'Czy mogę pić alkohol przed jazdą?',
        a: 'Nie. Jazda pod wpływem alkoholu jest w Maroku zabroniona. Nigdy nie jedź po alkoholu, nawet w małych ilościach.',
      },
      {
        q: 'Czy są opłaty za autostrady?',
        a: 'Tak, na niektórych szybkich trasach. Miej przy sobie dirhamy w gotówce: nie wszystkie bramki przyjmują karty.',
      },
      {
        q: 'Gdzie można zaparkować w Agadirze?',
        a: 'Są płatne parkingi w centrum i przy plaży. Nie zostawiaj wartościowych rzeczy na widoku i parkuj w oświetlonym miejscu w nocy.',
      },
      {
        q: 'Pod jaki numer zadzwonić w sytuacji awaryjnej?',
        a: 'Na policję pod 190. W razie wypadku lub problemu z pojazdem zadzwoń też do Carzio pod +212 680 318003, dostępny przez WhatsApp.',
      },
    ],
  },
];

const CATS: Record<FaqLang, FaqCategory[]> = { fr, en, de, es, pl };

export function getFaqCategories(lang: string): FaqCategory[] {
  const key = (lang.slice(0, 2) || 'en') as FaqLang;
  return CATS[key] || CATS.en;
}

export function findFaqCategory(slug: string, lang: string): FaqCategory | undefined {
  return getFaqCategories(lang).find((category) => category.slug === slug);
}
