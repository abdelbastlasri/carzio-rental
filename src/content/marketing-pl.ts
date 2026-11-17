import type { PartnersContent, CompareContent, OffersContent } from './marketing';

const plPartners: PartnersContent = {
  slug: 'partners',
  title: 'Zostań partnerem Carzio | Wynajem samochodów Agadir Lotnisko',
  description:
    'Surf campy, hotele, firmy transferowe i biura podróży: zaoferuj gościom samochód czekający na lotnisku Agadir Al Massira, z kaucją 0 MAD i bezpłatną anulacją do 24 h.',
  h1: 'Zaoferuj swoim gościom samochód na lotnisku w Agadirze',
  intro:
    'Carzio to lokalna wypożyczalnia samochodów z siedzibą na lotnisku Agadir Al Massira. Współpracujemy z surf campami, małymi hotelami, firmami transferowymi i biurami podróży, które chcą zaproponować swoim gościom prostą i niezawodną opcję wynajmu samochodu.',
  sections: [
    {
      title: 'Lokalny partner na lotnisku',
      paragraphs: [
        'Twoi goście lądują na lotnisku Agadir Al Massira i odbierają samochód w hali przylotów. Nasz zespół mówi po francusku, angielsku, niemiecku, hiszpańsku i polsku, a biuro jest otwarte 24/7.',
        'Wynajem obejmuje nieograniczony przebieg, ubezpieczenie standardowe i kaucję 0 MAD. Płatność następuje przy wydaniu kluczyków, a anulacja jest bezpłatna do 24 godzin przed odbiorem.',
      ],
    },
    {
      title: 'Co możemy zaoferować Twoim gościom',
      paragraphs: [
        'Możemy przygotować dedykowany link do rezerwacji dla Twojego obiektu, nadać priorytet odbiorowi w godzinach szczytu przylotów i zapewnić bezpłatny fotelik dla dziecka lub podkładkę na życzenie.',
        'Dokładny przywilej partnerski jest potwierdzany na piśmie przed rozpoczęciem współpracy. Nie obiecujemy prowizji w gotówce, chyba że została uzgodniona i podpisana z właścicielem.',
      ],
    },
    {
      title: 'Jak zacząć',
      paragraphs: [
        'Prześlij nam nazwę swojego obiektu lub agencji, miasto, języki, w których mówisz, oraz rodzaj gości, których przyjmujesz. Odpowiemy prostą propozycją i dedykowanym linkiem.',
        'Nie ma opłaty za wdrożenie ani wymogu wyłączności. Możesz nadal polecać innego dostawcę, jeśli Carzio nie pasuje do Twoich gości.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Czy wypłacacie prowizję partnerom?',
      a: 'Prowizja jest omawiana indywidualnie i potwierdzana wyłącznie na piśmie. Nie publikujemy stałej stawki prowizji.',
    },
    {
      q: 'Czy możecie nadać priorytet odbioru dla naszych gości?',
      a: 'Tak, priorytetowy odbiór można zorganizować dla partnerów, w zależności od godzin lotów i dostępności.',
    },
    {
      q: 'Czy zapewniacie dedykowany link do rezerwacji?',
      a: 'Tak. Możemy utworzyć śledzony link, aby Ty i Twoi goście trafili na właściwą stronę.',
    },
    {
      q: 'W jakich językach mówi Wasz zespół?',
      a: 'Francuski, angielski, niemiecki, hiszpański i polski, a także marokański arabski.',
    },
  ],
  audience: ['Surf campy w Taghazout i Tamraght', 'Riady i małe hotele w Agadirze', 'Firmy transferów lotniskowych', 'Biura podróży w Europie'],
  perks: ['Bezpłatny fotelik dla dziecka na życzenie', 'Priorytetowy odbiór w godzinach szczytu', 'Dedykowany link do rezerwacji', 'Lokalne wsparcie 24/7'],
};

const plCompare: CompareContent = {
  slug: 'compare',
  title: 'Carzio a międzynarodowe platformy wynajmu samochodów | Agadir',
  description:
    'Porównaj bezpośrednią rezerwację w Carzio na lotnisku w Agadirze z międzynarodową platformą wynajmu: kaucja, anulacja, odbiór na lotnisku, płatność i wsparcie.',
  h1: 'Carzio a międzynarodowe platformy wynajmu',
  intro:
    'Międzynarodowe platformy mogą pokazać wiele samochodów, ale sam wynajem obsługuje lokalna wypożyczalnia. Oto co się zmienia, gdy rezerwujesz bezpośrednio w Carzio na lotnisku Agadir Al Massira.',
  rows: [
    { label: 'Z kim rezerwujesz', carzio: 'Carzio, lokalna wypożyczalnia z siedzibą na lotnisku w Agadirze', platform: 'Pośrednik; wypożyczalnia jest przydzielana później' },
    { label: 'Kaucja', carzio: '0 MAD, bez blokady karty', platform: 'Zależy od wypożyczalni i taryfy' },
    { label: 'Anulacja', carzio: 'Bezpłatna do 24 h przed odbiorem', platform: 'Zależy od taryfy i platformy' },
    { label: 'Odbiór na lotnisku', carzio: 'Spotkanie w hali przylotów, bezpłatnie', platform: 'Zależy od wypożyczalni; możliwy transfer lub stanowisko' },
    { label: 'Płatność', carzio: 'Przy wydaniu kluczyków', platform: 'Często przedpłata online lub płatność przy stanowisku' },
    { label: 'Wsparcie', carzio: 'Lokalny zespół na lotnisku, 24/7', platform: 'Call center, a następnie lokalna wypożyczalnia' },
    { label: 'Cena', carzio: 'Wyświetlana za samochód i za dzień', platform: 'Zależy od opłat, ubezpieczeń i dodatków doliczanych przy płatności' },
  ],
  faqs: [
    {
      q: 'Czy rezerwacja bezpośrednia jest zawsze tańsza?',
      a: 'Nie zawsze. Platforma może pokazać niższą cenę wywoławczą i doliczyć dodatki później. Porównaj cenę całkowitą, kaucję i warunki anulacji.',
    },
    {
      q: 'Dlaczego kaucja wynosi 0 MAD?',
      a: 'Carzio nie blokuje środków na Twojej karcie. Cenę wynajmu płacisz przy wydaniu kluczyków.',
    },
    {
      q: 'Czy mogę anulować rezerwację bezpośrednią?',
      a: 'Tak, bezpłatnie do 24 godzin przed odbiorem.',
    },
    {
      q: 'Czy dostanę ten sam samochód co na platformie?',
      a: 'W Carzio wybierasz model lub równoważny. Potwierdzenie określa samochód lub kategorię zastępczą przed płatnością.',
    },
  ],
};

const plOffers: OffersContent = {
  slug: 'offers',
  title: 'Sezonowe oferty wynajmu samochodu w Agadirze | Carzio',
  description:
    'Sezonowe oferty Carzio w Agadirze: Boże Narodzenie, Wielkanoc i lato. Bezpłatny fotelik dla dziecka, dodatkowy dzień i kaucja 0 MAD, w zależności od dostępności i potwierdzenia.',
  h1: 'Sezonowe oferty wynajmu samochodu w Agadirze',
  intro:
    'Nasze oferty sezonowe są proste i potwierdzane przed rezerwacją. Są uzależnione od dostępności i nie zawsze można je łączyć z inną promocją.',
  offers: [
    {
      id: 'christmas-2026',
      period: 'Boże Narodzenie 2026',
      title: '10% zniżki na wynajem od 5 dni',
      description:
        'Zarezerwuj samochód na 5 dni lub więcej w okresie świąt Bożego Narodzenia i poproś o ofertę 10%. Zniżka jest stosowana do ceny wynajmu przed potwierdzeniem.',
      conditions: ['Minimum 5 rozliczonych dni', 'W zależności od dostępności', 'Poproś o ofertę przed rezerwacją', 'Nie można łączyć z inną promocją'],
    },
    {
      id: 'easter-2027',
      period: 'Wielkanoc 2027',
      title: 'Bezpłatny fotelik dla dziecka + kaucja 0 MAD',
      description:
        'Podróżujesz z dziećmi? Poproś o bezpłatny fotelik dla niemowlęcia lub podkładkę i zachowaj standardową kaucję 0 MAD. Fotelik jest uzależniony od dostępności.',
      conditions: ['Jeden fotelik lub podkładka na wynajem', 'W zależności od dostępności', 'Poproś o fotelik przed rezerwacją', 'Kaucja 0 MAD obowiązuje dla całej floty'],
    },
    {
      id: 'summer-2027',
      period: 'Lato 2027',
      title: 'Bezpłatny dodatkowy dzień przy 7 lub więcej dniach',
      description:
        'Wynajmij samochód na 7 rozliczonych dni lub więcej latem i poproś o dodatkowy dzień bezpłatnie. Dodatkowy dzień jest dodawany do okresu wynajmu, w zależności od dostępności.',
      conditions: ['Minimum 7 rozliczonych dni', 'W zależności od dostępności', 'Poproś o ofertę przed rezerwacją', 'Dodatkowego dnia nie można wymienić na gotówkę'],
    },
  ],
  faqs: [
    {
      q: 'Czy oferty są automatyczne?',
      a: 'Nie. Poproś o ofertę przy wysyłaniu rezerwacji. Potwierdzamy ją na piśmie przed płatnością.',
    },
    {
      q: 'Czy mogę połączyć dwie oferty?',
      a: 'Zwykle nie. Zapytaj nas przed rezerwacją, a potwierdzimy, co jest możliwe w Twoich terminach.',
    },
    {
      q: 'Czy oferty są dostępne na wszystkie samochody?',
      a: 'Zależą od dostępności i terminów wynajmu. Potwierdzamy samochód i ofertę przed przyjęciem rezerwacji.',
    },
    {
      q: 'Czy kaucja nadal wynosi 0 MAD przy ofercie?',
      a: 'Tak, standardowa kaucja 0 MAD obowiązuje, chyba że konkretna oferta stanowi inaczej.',
    },
  ],
};

export const pl: { partners: PartnersContent; compare: CompareContent; offers: OffersContent } = {
  partners: plPartners,
  compare: plCompare,
  offers: plOffers,
};
