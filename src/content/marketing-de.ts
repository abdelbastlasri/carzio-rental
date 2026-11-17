import type { PartnersContent, CompareContent, OffersContent } from './marketing';

export const de: { partners: PartnersContent; compare: CompareContent; offers: OffersContent } = {
  partners: {
    slug: 'partners',
    title: 'Partner von Carzio werden | Mietwagen Flughafen Agadir',
    description:
      'Surfcamps, Hotels, Transferunternehmen und Reiseagenturen: Bieten Sie Ihren Gästen ein Auto, das am Flughafen Agadir Al Massira auf sie wartet – mit 0 MAD Kaution und kostenloser Stornierung bis 24 Stunden vorher.',
    h1: 'Bieten Sie Ihren Gästen ein Auto am Flughafen Agadir',
    intro:
      'Carzio ist eine lokale Mietwagenagentur am Flughafen Agadir Al Massira. Wir arbeiten mit Surfcamps, kleinen Hotels, Transferunternehmen und Reiseagenturen zusammen, die ihren Gästen eine einfache und zuverlässige Automiete bieten möchten.',
    sections: [
      {
        title: 'Ein lokaler Partner am Flughafen',
        paragraphs: [
          'Ihre Gäste landen am Flughafen Agadir Al Massira und holen ihr Auto bei der Ankunft ab. Unser Team spricht Französisch, Englisch, Deutsch, Spanisch und Polnisch, und die Agentur ist rund um die Uhr geöffnet.',
          'Die Miete umfasst unbegrenzte Kilometer, die Standardversicherung und 0 MAD Kaution. Die Zahlung erfolgt bei der Schlüsselübergabe, und die Stornierung ist bis 24 Stunden vor der Abholung kostenlos.',
        ],
      },
      {
        title: 'Was wir Ihren Gästen bieten können',
        paragraphs: [
          'Wir können einen eigenen Buchungslink für Ihre Unterkunft vorbereiten, die Abholung zu Stoßzeiten bei der Ankunft priorisieren und auf Anfrage einen kostenlosen Kindersitz oder eine Sitzerhöhung bereitstellen.',
          'Der genaue Partnervorteil wird vor dem Start schriftlich bestätigt. Wir versprechen keine Barprovision, solange sie nicht mit dem Inhaber vereinbart und unterschrieben wurde.',
        ],
      },
      {
        title: 'So starten Sie',
        paragraphs: [
          'Senden Sie uns den Namen Ihrer Unterkunft oder Agentur, die Stadt, die Sprachen, die Sie sprechen, und die Art der Gäste, die Sie empfangen. Wir antworten mit einem einfachen Vorschlag und einem eigenen Link.',
          'Es gibt keine Einrichtungsgebühr und keine Exklusivitätsverpflichtung. Sie bleiben frei, einen anderen Anbieter zu empfehlen, wenn Carzio nicht zu Ihren Gästen passt.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Zahlen Sie Partnern eine Provision?',
        a: 'Die Provision wird von Fall zu Fall besprochen und nur schriftlich bestätigt. Wir veröffentlichen keine feste Provisionsrate.',
      },
      {
        q: 'Können Sie die Abholung für unsere Gäste priorisieren?',
        a: 'Ja, für Partner kann eine priorisierte Abholung organisiert werden, abhängig von Flugzeiten und Verfügbarkeit.',
      },
      {
        q: 'Bieten Sie einen eigenen Buchungslink an?',
        a: 'Ja. Wir können einen nachverfolgbaren Link erstellen, damit Sie und Ihre Gäste die richtige Seite erreichen.',
      },
      {
        q: 'Welche Sprachen spricht Ihr Team?',
        a: 'Französisch, Englisch, Deutsch, Spanisch und Polnisch sowie marokkanisches Arabisch.',
      },
    ],
    audience: [
      'Surfcamps in Taghazout und Tamraght',
      'Riads und kleine Hotels in Agadir',
      'Flughafen-Transferunternehmen',
      'Reiseagenturen in Europa',
    ],
    perks: [
      'Kostenloser Kindersitz auf Anfrage',
      'Priorisierte Abholung zu Stoßzeiten',
      'Eigener Buchungslink',
      'Lokaler Support rund um die Uhr',
    ],
  },
  compare: {
    slug: 'compare',
    title: 'Carzio vs. internationale Mietwagenplattformen | Agadir',
    description:
      'Vergleichen Sie die Direktbuchung bei Carzio am Flughafen Agadir mit einer internationalen Mietwagenplattform: Kaution, Stornierung, Übergabe am Flughafen, Zahlung und Support.',
    h1: 'Carzio vs. internationale Mietwagenplattformen',
    intro:
      'Internationale Plattformen zeigen oft viele Autos, aber die Miete wird von einer lokalen Agentur abgewickelt. Hier erfahren Sie, was sich ändert, wenn Sie direkt bei Carzio am Flughafen Agadir Al Massira buchen.',
    rows: [
      {
        label: 'Bei wem Sie buchen',
        carzio: 'Carzio, eine lokale Agentur am Flughafen Agadir',
        platform: 'Ein Vermittler; das Mietwagenunternehmen wird später zugewiesen',
      },
      { label: 'Kaution', carzio: '0 MAD, keine Kreditkartenblockung', platform: 'Hängt vom Mietwagenunternehmen und Tarif ab' },
      {
        label: 'Stornierung',
        carzio: 'Kostenlos bis 24 Stunden vor der Abholung',
        platform: 'Hängt vom Tarif und der Plattform ab',
      },
      {
        label: 'Übergabe am Flughafen',
        carzio: 'Persönlicher Empfang bei der Ankunft, kostenlos',
        platform: 'Hängt vom Mietwagenunternehmen ab; Shuttle oder Schalter möglich',
      },
      { label: 'Zahlung', carzio: 'Bei der Schlüsselübergabe', platform: 'Oft online im Voraus oder am Schalter' },
      {
        label: 'Support',
        carzio: 'Lokales Team am Flughafen, rund um die Uhr',
        platform: 'Callcenter, danach das lokale Mietwagenunternehmen',
      },
      {
        label: 'Preis',
        carzio: 'Pro Auto und pro Tag ausgewiesen',
        platform: 'Hängt von Gebühren, Versicherungen und Extras ab, die an der Kasse hinzukommen',
      },
    ],
    faqs: [
      {
        q: 'Ist die Direktbuchung immer günstiger?',
        a: 'Nicht immer. Eine Plattform kann einen niedrigeren Lockpreis anzeigen und später Extras hinzufügen. Vergleichen Sie den Gesamtpreis, die Kaution und die Stornobedingungen.',
      },
      {
        q: 'Warum beträgt die Kaution 0 MAD?',
        a: 'Carzio blockiert kein Geld auf Ihrer Karte. Sie zahlen den Mietpreis bei der Schlüsselübergabe.',
      },
      {
        q: 'Kann ich eine Direktbuchung stornieren?',
        a: 'Ja, kostenlos bis 24 Stunden vor der Abholung.',
      },
      {
        q: 'Bekomme ich dasselbe Auto wie auf der Plattform?',
        a: 'Bei Carzio wählen Sie ein Modell oder ein gleichwertiges Fahrzeug. Die Bestätigung nennt das Auto oder die Ersatzkategorie, bevor Sie zahlen.',
      },
    ],
  },
  offers: {
    slug: 'offers',
    title: 'Saisonale Mietwagenangebote in Agadir | Carzio',
    description:
      'Saisonale Angebote von Carzio für Agadir: Weihnachten, Ostern und Sommer. Kostenloser Kindersitz, ein zusätzlicher Tag und 0 MAD Kaution, abhängig von Verfügbarkeit und Bestätigung.',
    h1: 'Saisonale Mietwagenangebote in Agadir',
    intro:
      'Unsere saisonalen Angebote sind einfach und werden vor Ihrer Buchung bestätigt. Sie unterliegen der Verfügbarkeit und können nicht immer mit einer anderen Aktion kombiniert werden.',
    offers: [
      {
        id: 'christmas-2026',
        period: 'Weihnachten 2026',
        title: '10 % Rabatt ab 5 Miettagen',
        description:
          'Buchen Sie ein Auto für 5 Tage oder mehr über die Weihnachtszeit und fragen Sie das 10-%-Angebot an. Der Rabatt wird vor der Bestätigung auf den Mietpreis angewendet.',
        conditions: [
          'Mindestens 5 berechnete Tage',
          'Abhängig von der Verfügbarkeit',
          'Angebot vor der Buchung anfragen',
          'Nicht mit einer anderen Aktion kombinierbar',
        ],
      },
      {
        id: 'easter-2027',
        period: 'Ostern 2027',
        title: 'Kostenloser Kindersitz + 0 MAD Kaution',
        description:
          'Sie reisen mit Kindern? Fragen Sie einen kostenlosen Babysitz oder eine Sitzerhöhung an und behalten Sie die übliche Kaution von 0 MAD. Der Sitz unterliegt der Verfügbarkeit.',
        conditions: [
          'Ein Kindersitz oder eine Sitzerhöhung pro Miete',
          'Abhängig von der Verfügbarkeit',
          'Sitz vor der Buchung anfragen',
          'Die 0-MAD-Kaution gilt für die gesamte Flotte',
        ],
      },
      {
        id: 'summer-2027',
        period: 'Sommer 2027',
        title: 'Kostenloser Zusatztag ab 7 Miettagen',
        description:
          'Mieten Sie im Sommer 7 berechnete Tage oder mehr und fragen Sie einen kostenlosen zusätzlichen Tag an. Der zusätzliche Tag wird dem Mietzeitraum hinzugefügt, abhängig von der Verfügbarkeit.',
        conditions: [
          'Mindestens 7 berechnete Tage',
          'Abhängig von der Verfügbarkeit',
          'Angebot vor der Buchung anfragen',
          'Der zusätzliche Tag kann nicht in Bargeld umgewandelt werden',
        ],
      },
    ],
    faqs: [
      {
        q: 'Sind die Angebote automatisch?',
        a: 'Nein. Fragen Sie das Angebot bei Ihrer Buchungsanfrage an. Wir bestätigen es schriftlich, bevor Sie zahlen.',
      },
      {
        q: 'Kann ich zwei Angebote kombinieren?',
        a: 'In der Regel nicht. Fragen Sie uns vor der Buchung, und wir bestätigen, was für Ihre Daten möglich ist.',
      },
      {
        q: 'Sind die Angebote für jedes Auto verfügbar?',
        a: 'Sie hängen von der Verfügbarkeit und den Mietdaten ab. Wir bestätigen das Auto und das Angebot, bevor wir die Buchung annehmen.',
      },
      {
        q: 'Bleibt die Kaution mit einem Angebot bei 0 MAD?',
        a: 'Ja, die übliche Kaution von 0 MAD gilt, sofern ein bestimmtes Angebot nichts anderes sagt.',
      },
    ],
  },
};
