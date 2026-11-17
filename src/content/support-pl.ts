import type { SupportKey, SupportPageContent } from './support';

export const pl: Record<SupportKey, SupportPageContent> = {
  automatic: {
    key: 'automatic',
    slug: 'wynajem-automat-agadir',
    title: 'Wynajem samochodu automatycznego w Agadirze | Carzio',
    description:
      'Wynajmij samochód automatyczny w Agadirze z Carzio: nowe modele, nieograniczony przebieg, 0 MAD kaucji, bezpłatny odbiór na lotnisku i bezpłatna anulacja do 24 h.',
    h1: 'Wynajem samochodu automatycznego w Agadirze',
    intro:
      'Jeśli wolisz nie prowadzić samochodu z manualną skrzynią biegów, Carzio ma modele automatyczne na lotnisku Agadir Al Massira. Wybierz samochód, prześlij daty i odbierz go w hali przylotów.',
    sections: [
      {
        title: 'Modele automatyczne we flocie',
        paragraphs: [
          'Wybór automatów obejmuje Dacię Sandero Stepway, Renault Clio 5, Hyundai i10 BVA, Dacię Duster BVA i Volkswagen T-Roc. Dostępność zależy od Twoich dat.',
          'Każdy samochód jest nowy, sprawdzony przed wydaniem i ma klimatyzację, nieograniczony przebieg oraz ubezpieczenie standardowe.',
        ],
      },
      {
        title: 'Cena i warunki',
        paragraphs: [
          'Cena za dzień jest widoczna na karcie każdego samochodu. Minimalny okres wynajmu to 72 godziny, rozliczane w blokach po 24 godziny; rozpoczęty dzień liczy się jako pełny dzień.',
          'Nie pobieramy kaucji i nie blokujemy środków na karcie. Płatność następuje przy wydaniu kluczyków. Bezpłatna anulacja jest możliwa do 24 godzin przed odbiorem.',
        ],
      },
      {
        title: 'Odbiór na lotnisku w Agadirze',
        paragraphs: [
          'Nasz zespół wita Cię w hali przylotów lotniska Agadir Al Massira. Prześlij numer lotu, abyśmy mogli śledzić Twój przylot, również w przypadku opóźnienia.',
          'Kierowca musi mieć co najmniej 23 lata i posiadać prawo jazdy od co najmniej 4 lat. Zabierz paszport lub dowód tożsamości oraz kartę bankową do płatności.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy samochody automatyczne są droższe?',
        a: 'Cena za dzień zależy od modelu i sezonu. Każda karta samochodu pokazuje aktualną cenę przed wysłaniem zapytania.',
      },
      {
        q: 'Czy mogę wybrać dokładny model automatyczny?',
        a: 'Możesz poprosić o konkretny model. Jeśli nie jest dostępny w Twoich terminach, potwierdzamy równoważny samochód automatyczny przed przyjęciem rezerwacji.',
      },
      {
        q: 'Czy odbiór na lotnisku jest wliczony?',
        a: 'Tak. Odbiór i zwrot na lotnisku Agadir Al Massira są wliczone w cenę.',
      },
      {
        q: 'Jaka kaucja jest wymagana?',
        a: '0 MAD. Nie blokujemy środków na Twojej karcie.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'renault-clio-5', 'hyundai-i10-bva', 'dacia-duster-bva', 'vw-troc-automatic'],
    image: '/images/fleet/dacia-sandero-stepway.webp',
    imageAlt: 'Automatyczna Dacia Sandero Stepway do wynajęcia na lotnisku w Agadirze',
  },
  suv: {
    key: 'suv',
    slug: 'wynajem-suv-agadir',
    title: 'Wynajem SUV-a w Agadirze | Carzio',
    description:
      'Wynajmij SUV-a w Agadirze z Carzio: Dacia Duster, Jogger, Kia Sportage i Hyundai Tucson, nieograniczony przebieg, 0 MAD kaucji i odbiór na lotnisku.',
    h1: 'Wynajem SUV-a w Agadirze',
    intro:
      'SUV daje więcej miejsca na bagaż, rodzinne wyjazdy i drogi wokół Agadiru, Taghazout oraz doliny Souss. Carzio oferuje kilka modeli SUV i crossover.',
    sections: [
      {
        title: 'Modele SUV i rodzinne',
        paragraphs: [
          'Flota obejmuje Dacię Duster, 7-miejscową Dacię Jogger, Kię Sportage i Hyundaia Tucson. Część modeli jest automatyczna, część manualna.',
          'To praktyczne samochody drogowe, a nie pojazdy 4x4. W przypadku górskich dróg gruntowych lub tras pustynnych podaj nam swój plan podróży, abyśmy potwierdzili, który samochód jest odpowiedni.',
        ],
      },
      {
        title: 'Miejsce na bagaż i pasażerów',
        paragraphs: [
          'Jogger mieści do 7 pasażerów i ma pojemny bagażnik. Duster, Sportage i Tucson to 5-miejscowe SUV-y z miejscem na walizki i sprzęt plażowy.',
          'Foteliki dla dzieci i podkładki są bezpłatne na życzenie, w zależności od dostępności.',
        ],
      },
      {
        title: 'Rezerwacja i odbiór',
        paragraphs: [
          'Odbiór odbywa się na lotnisku Agadir Al Massira lub w naszym biurze przy MAG N2, Agadir Airport. Minimalny okres wynajmu to 72 godziny.',
          'Cena obejmuje nieograniczony przebieg i ubezpieczenie standardowe. Ubezpieczenie pełne jest opcjonalne i widoczne przed potwierdzeniem.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy potrzebuję 4x4, aby dojechać do Taghazout lub Paradise Valley?',
        a: 'Główne drogi są asfaltowe. Standardowy SUV wystarczy do normalnej jazdy; daj nam znać, jeśli planujesz zjazd z asfaltu.',
      },
      {
        q: 'Ile walizek zmieści się w Joggerze?',
        a: 'Jogger ma duży bagażnik i do 7 miejsc. Miejsce zależy od liczby wykorzystanych siedzeń; podaj nam swój bagaż, a potwierdzimy.',
      },
      {
        q: 'Czy SUV jest dostępny z automatyczną skrzynią biegów?',
        a: 'Tak, Dacia Duster BVA i inne modele automatyczne są dostępne w zależności od Twoich dat.',
      },
      {
        q: 'Czy kaucja za SUV-a jest inna?',
        a: 'Nie. Kaucja wynosi 0 MAD dla całej floty, bez blokady karty.',
      },
    ],
    carIds: ['dacia-duster-bva', 'dacia-duster-manual', 'dacia-jogger', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Dacia Jogger SUV do wynajęcia w Agadirze',
  },
  'zero-deposit': {
    key: 'zero-deposit',
    slug: 'wynajem-bez-kaucji-maroko',
    title: 'Wynajem samochodu bez kaucji w Maroku | Carzio',
    description:
      'Wynajmij samochód w Agadirze z kaucją 0 MAD, bez blokady karty i z płatnością przy wydaniu kluczyków. Bezpłatna anulacja do 24 h i odbiór na lotnisku w cenie.',
    h1: 'Wynajem samochodu bez kaucji 0 MAD',
    intro:
      'Kaucja to często najbardziej stresujący element wynajmu. W Carzio nie ma kaucji ani blokady na Twojej karcie bankowej. Cenę wynajmu płacisz przy wydaniu kluczyków.',
    sections: [
      {
        title: 'Jak działa kaucja 0 MAD',
        paragraphs: [
          'Przy rezerwacji nie pobieramy ani nie rezerwujemy żadnej kwoty na Twojej karcie. Akceptujemy karty debetowe oraz kredytowe, więc Twój limit pozostaje dostępny przez całą podróż.',
          'Kwota płacona przy wydaniu kluczyków to cena wynajmu. Ubezpieczenie standardowe jest wliczone; ubezpieczenie pełne jest opcjonalne.',
        ],
      },
      {
        title: 'Anulacja i minimalny okres wynajmu',
        paragraphs: [
          'Możesz anulować bezpłatnie do 24 godzin przed odbiorem. Minimalny okres wynajmu to 72 godziny, rozliczane w blokach po 24 godziny.',
          'Rezerwacja jest potwierdzana e-mailem po sprawdzeniu rzeczywistej dostępności. Nigdy nie jest potwierdzana automatycznie.',
        ],
      },
      {
        title: 'Dokumenty i wiek kierowcy',
        paragraphs: [
          'Główny kierowca musi mieć co najmniej 23 lata i posiadać prawo jazdy od co najmniej 4 lat. Zabierz paszport lub dowód tożsamości oraz kartę bankową do płatności.',
          'Drugiego kierowcę można dodać bezpłatnie na tych samych warunkach. Foteliki dla niemowląt i podkładki są bezpłatne na życzenie.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy naprawdę nie ma kaucji?',
        a: 'Tak. Kaucja wynosi 0 MAD i nie blokujemy środków na Twojej karcie.',
      },
      {
        q: 'Czy mogę zapłacić kartą debetową?',
        a: 'Tak. Karty debetowe i kredytowe są akceptowane przy płatności przy wydaniu kluczyków.',
      },
      {
        q: 'Czy kaucja 0 MAD oznacza, że ubezpieczenie jest wliczone?',
        a: 'Ubezpieczenie standardowe jest wliczone w cenę wynajmu. Ubezpieczenie pełne jest opcjonalne i widoczne przed potwierdzeniem.',
      },
      {
        q: 'Co się dzieje, jeśli anuluję?',
        a: 'Anulacja jest bezpłatna do 24 godzin przed odbiorem. Skontaktuj się z nami e-mailem lub przez WhatsApp.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/hero/carzio-pickup.webp',
    imageAlt: 'Wydanie kluczyków Carzio bez kaucji',
  },
  'one-way-marrakech': {
    key: 'one-way-marrakech',
    slug: 'wynajem-jednokierunkowy-agadir-marrakech',
    title: 'Wynajem samochodu w jedną stronę Agadir – Marrakesz | Carzio',
    description:
      'Wynajmij samochód w Agadirze i zwróć go w Marrakeszu z Carzio. Dostawa na lotnisko Marrakesz-Menara kosztuje 80 € za kurs i jest potwierdzana przed rezerwacją.',
    h1: 'Wynajem samochodu w jedną stronę z Agadiru do Marrakeszu',
    intro:
      'Możesz odebrać samochód w Agadirze i zwrócić go w Marrakeszu. Oszczędzasz wtedy jazdę powrotną i możesz kontynuować podróż z lotniska Marrakesz-Menara lub z miasta.',
    sections: [
      {
        title: 'Jak działa wynajem w jedną stronę',
        paragraphs: [
          'Podaj nam datę odbioru w Agadirze i datę zwrotu w Marrakeszu. Sprawdzamy dostępność i potwierdzamy warunki wynajmu w jedną stronę przed przyjęciem rezerwacji.',
          'Dostawa lub odbiór w Marrakeszu kosztuje 80 € za kurs. Dokładna kwota jest potwierdzana na piśmie przed płatnością.',
        ],
      },
      {
        title: 'Trasa Agadir – Marrakesz',
        paragraphs: [
          'Odległość to około 250 km, a jazda autostradą trwa zwykle około 3 godzin. Zaplanuj przerwę i sprawdź poziom paliwa przed wyjazdem z Agadiru.',
          'Minimalny okres wynajmu to 72 godziny. Samochód trzeba zwrócić w ustalonym miejscu i czasie w Marrakeszu.',
        ],
      },
      {
        title: 'Co jest wliczone',
        paragraphs: [
          'Wynajem obejmuje nieograniczony przebieg i ubezpieczenie standardowe. Opłata za dostawę w jedną stronę jest doliczana do ceny wynajmu.',
          'Ubezpieczenie pełne jest opcjonalne. Kierowca musi mieć co najmniej 23 lata i posiadać prawo jazdy od co najmniej 4 lat.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy mogę zwrócić samochód na lotnisku w Marrakeszu?',
        a: 'Tak, zwrot na lotnisku Marrakesz-Menara jest możliwy na życzenie. Opłata za dostawę wynosi 80 € za kurs.',
      },
      {
        q: 'Czy opłata w jedną stronę jest naliczana za dzień?',
        a: 'Nie. To stała opłata za kurs, potwierdzana przed rezerwacją.',
      },
      {
        q: 'Czy mogę zrobić trasę odwrotną, z Marrakeszu do Agadiru?',
        a: 'Tak, na życzenie. Prześlij nam swoje daty, a potwierdzimy dostępność i opłatę.',
      },
      {
        q: 'Ile trwa jazda?',
        a: 'Około 3 godziny autostradą, w zależności od ruchu i przerw.',
      },
    ],
    carIds: ['dacia-logan', 'renault-clio-5', 'dacia-duster-manual', 'dacia-jogger'],
    image: '/images/journal/news-post-agadir-marrakech-essaouira.webp',
    imageAlt: 'Trasa z Agadiru do Marrakeszu',
  },
  essaouira: {
    key: 'essaouira',
    slug: 'wynajem-samochodu-agadir-essaouira',
    title: 'Wynajem samochodu Agadir – Essaouira | Carzio',
    description:
      'Wynajmij samochód w Agadirze i pojedź do Essaouiry z Carzio: nieograniczony przebieg, 0 MAD kaucji, ubezpieczenie standardowe i dostawa wyceniana przed rezerwacją.',
    h1: 'Wynajem samochodu z Agadiru do Essaouiry',
    intro:
      'Essaouira leży około 175 km na północ od Agadiru, wzdłuż wybrzeża Atlantyku. Samochód z wypożyczalni pozwala wyruszyć w swoim tempie i zatrzymać się w wioskach po drodze.',
    sections: [
      {
        title: 'Jazda z Agadiru do Essaouiry',
        paragraphs: [
          'Jazda trwa zwykle około 3 godzin, w zależności od trasy i postojów. Droga nadmorska jest malownicza, ale wolniejsza niż autostrada.',
          'Sprawdź poziom paliwa przed wyjazdem i zaplanuj przerwę w Taghazout, Tamraght lub w jednym z małych miasteczek na wybrzeżu.',
        ],
      },
      {
        title: 'Odbiór i zwrot w Essaouirze',
        paragraphs: [
          'Odbiór odbywa się na lotnisku Agadir Al Massira lub w naszym biurze. Dostawa i odbiór w Essaouirze są dostępne na życzenie i wyceniane przed rezerwacją.',
          'Warunki wynajmu w jedną stronę lub dostawy są potwierdzane na piśmie przed płatnością. Nie publikujemy stałej opłaty za Essaouirę, ponieważ zależy ona od dat i samochodu.',
        ],
      },
      {
        title: 'Warunki wynajmu',
        paragraphs: [
          'Minimalny okres wynajmu to 72 godziny, z nieograniczonym przebiegiem i ubezpieczeniem standardowym w cenie. Kaucja wynosi 0 MAD.',
          'Ubezpieczenie pełne jest opcjonalne. Kierowca musi mieć co najmniej 23 lata i posiadać prawo jazdy od co najmniej 4 lat.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy dostawa do Essaouiry jest bezpłatna?',
        a: 'Nie. Dostawa i odbiór w Essaouirze są wyceniane przed rezerwacją, w zależności od dat i samochodu.',
      },
      {
        q: 'Czy mogę zatrzymać samochód na podróż w obie strony?',
        a: 'Tak. Możesz odebrać go w Agadirze, pojechać do Essaouiry i zwrócić go w Agadirze. Obowiązuje normalna cena za dzień.',
      },
      {
        q: 'Ile trwa jazda?',
        a: 'Około 3 godzin, w zależności od trasy i postojów.',
      },
      {
        q: 'Czy droga jest odpowiednia dla zwykłego samochodu?',
        a: 'Tak. Główne drogi są asfaltowe. Daj nam znać, jeśli planujesz nieutwardzone drogi.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/journal/essaouira-port.webp',
    imageAlt: 'Nadmorska droga między Agadirem a Essaouirą',
  },
  'taghazout-tamraght': {
    key: 'taghazout-tamraght',
    slug: 'wynajem-samochodu-taghazout-tamraght',
    title: 'Wynajem samochodu Taghazout i Tamraght | Carzio',
    description:
      'Wynajmij samochód do Taghazout i Tamraght z Carzio: odbiór na lotnisku w Agadirze, 0 MAD kaucji, nieograniczony przebieg i dostawa wyceniana przed rezerwacją.',
    h1: 'Wynajem samochodu do Taghazout i Tamraght',
    intro:
      'Taghazout i Tamraght to dwie surfingowe wioski na północ od Agadiru. Samochód daje swobodę dotarcia na plaże, do kawiarni i na drogi wzdłuż wybrzeża bez polegania na transferze.',
    sections: [
      {
        title: 'Z lotniska w Agadirze do Taghazout lub Tamraght',
        paragraphs: [
          'Taghazout leży około 19 km od Agadiru, zwykle 30–40 minut samochodem. Tamraght jest oddalony o około 14 km, zwykle o 25 minut.',
          'Samochód możesz odebrać na lotnisku Agadir Al Massira lub w naszym biurze. Dostawa do Taghazout lub Tamraght jest dostępna na życzenie i wyceniana przed rezerwacją.',
        ],
      },
      {
        title: 'Wyjazdy surfingowe i bagaż',
        paragraphs: [
          'Daj nam znać, jeśli podróżujesz z deskami surfingowymi lub dodatkowym bagażem, abyśmy potwierdzili odpowiedni samochód. Dacia Jogger i SUV-y oferują więcej miejsca.',
          'Foteliki dla dzieci i podkładki są bezpłatne na życzenie, w zależności od dostępności.',
        ],
      },
      {
        title: 'Warunki',
        paragraphs: [
          'Minimalny okres wynajmu to 72 godziny, z nieograniczonym przebiegiem, ubezpieczeniem standardowym i kaucją 0 MAD.',
          'Bezpłatna anulacja jest możliwa do 24 godzin przed odbiorem. Kierowca musi mieć co najmniej 23 lata i posiadać prawo jazdy od co najmniej 4 lat.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy możecie dostarczyć samochód do mojego surf campu?',
        a: 'Dostawa do Taghazout lub Tamraght jest dostępna na życzenie. Prześlij adres i daty; potwierdzimy warunki przed rezerwacją.',
      },
      {
        q: 'Jak daleko jest z Taghazout do lotniska w Agadirze?',
        a: 'Około 19 km, zwykle 30–40 minut samochodem.',
      },
      {
        q: 'Który samochód najlepiej sprawdzi się z deskami surfingowymi?',
        a: 'Jogger i SUV-y mają więcej miejsca. Podaj długość desek i liczbę pasażerów, abyśmy mogli potwierdzić.',
      },
      {
        q: 'Czy w Taghazout łatwo zaparkować?',
        a: 'Parking w centrum wioski jest ograniczony, szczególnie w wysokim sezonie. Korzystaj z oznaczonych miejsc i nie blokuj dróg dojazdowych.',
      },
    ],
    carIds: ['dacia-sandero-stepway', 'dacia-jogger', 'dacia-duster-manual', 'kia-sportage'],
    image: '/images/taghazout-beach.webp',
    imageAlt: 'Plaża w Taghazout niedaleko Agadiru',
  },
  family: {
    key: 'family',
    slug: 'wynajem-samochodu-rodzinnego-agadir',
    title: 'Wynajem samochodu rodzinnego w Agadirze | Carzio',
    description:
      'Wynajmij samochód rodzinny w Agadirze z Carzio: 7-miejscowa Dacia Jogger, przestronne SUV-y, bezpłatne foteliki dla dzieci na życzenie, 0 MAD kaucji i odbiór na lotnisku.',
    h1: 'Wynajem samochodu rodzinnego w Agadirze',
    intro:
      'Rodzinna podróż wymaga miejsca dla pasażerów, bagażu i fotelików dla dzieci. Carzio oferuje 7-miejscowego Joggera i kilka SUV-ów, które ułatwiają odbiór na lotnisku i jednodniowe wycieczki.',
    sections: [
      {
        title: 'Samochody dla rodzin',
        paragraphs: [
          'Dacia Jogger mieści do 7 pasażerów i ma pojemny bagażnik. Dacia Duster, Kia Sportage i Hyundai Tucson oferują 5 miejsc z większą przestrzenią bagażową niż mały hatchback.',
          'Podaj nam liczbę dorosłych, dzieci i walizek, abyśmy mogli polecić odpowiedni model.',
        ],
      },
      {
        title: 'Foteliki i bagaż',
        paragraphs: [
          'Foteliki dla niemowląt i podkładki są bezpłatne na życzenie, w zależności od dostępności. Prześlij wiek i wagę dziecka, abyśmy zapewnili odpowiedni fotelik.',
          'Jogger to najlepszy wybór dla 6 lub 7 pasażerów. Dla 4 lub 5 pasażerów zwykle wystarczy SUV.',
        ],
      },
      {
        title: 'Odbiór na lotnisku i warunki',
        paragraphs: [
          'Spotykamy się z Tobą na lotnisku Agadir Al Massira i pomagamy zamontować foteliki. Minimalny okres wynajmu to 72 godziny.',
          'Cena obejmuje nieograniczony przebieg i ubezpieczenie standardowe. Kaucja wynosi 0 MAD, a anulacja jest bezpłatna do 24 godzin przed odbiorem.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Który samochód mieści 7 osób?',
        a: 'Dacia Jogger mieści do 7 pasażerów, w zależności od konfiguracji siedzeń i bagażu.',
      },
      {
        q: 'Czy foteliki dla dzieci są bezpłatne?',
        a: 'Tak, foteliki dla niemowląt i podkładki są bezpłatne na życzenie, w zależności od dostępności.',
      },
      {
        q: 'Czy możecie zamontować fotelik na lotnisku?',
        a: 'Tak. Nasz zespół może pomóc go zamontować podczas wydania samochodu na lotnisku Agadir Al Massira.',
      },
      {
        q: 'Czy jest wystarczająco miejsca na walizki?',
        a: 'To zależy od liczby pasażerów. Prześlij nam informacje o bagażu, a potwierdzimy najlepszy samochód.',
      },
    ],
    carIds: ['dacia-jogger', 'dacia-duster-manual', 'kia-sportage', 'hyundai-tucson'],
    image: '/images/fleet/dacia-jogger.webp',
    imageAlt: 'Siedmiomiejscowa Dacia Jogger do wynajmu rodzinnego w Agadirze',
  },
  'child-seat': {
    key: 'child-seat',
    slug: 'wynajem-fotelika-dla-dziecka-agadir',
    title: 'Wynajem samochodu z fotelikiem dla dziecka w Agadirze | Carzio',
    description:
      'Wynajmij samochód w Agadirze z bezpłatnym fotelikiem dla dziecka lub podkładką na życzenie. Carzio zapewnia foteliki, pomaga w montażu i oferuje odbiór na lotnisku.',
    h1: 'Wynajem samochodu z fotelikiem dla dziecka w Agadirze',
    intro:
      'Podróż z niemowlęciem lub małym dzieckiem jest łatwiejsza, gdy fotelik jest już w samochodzie. Carzio zapewnia foteliki dla niemowląt i podkładki bezpłatnie na życzenie, w zależności od dostępności.',
    sections: [
      {
        title: 'Foteliki dla niemowląt i podkładki',
        paragraphs: [
          'Podaj wiek i wagę dziecka w swoim zapytaniu. Zapewnimy odpowiedni fotelik lub podkładkę i potwierdzimy go przed rezerwacją.',
          'Foteliki są bezpłatne. Są dostępne w ograniczonej liczbie, dlatego poproś o nie jak najwcześniej, szczególnie w lipcu i sierpniu.',
        ],
      },
      {
        title: 'Montaż na lotnisku',
        paragraphs: [
          'Nasz zespół może pomóc zamontować fotelik podczas wydania samochodu na lotnisku Agadir Al Massira. Zapytaj nas, jeśli nie jesteś pewien, jak fotelik pasuje.',
          'Sprawdź, czy fotelik jest prawidłowo przymocowany, zanim ruszysz, i dopasuj pasy do dziecka.',
        ],
      },
      {
        title: 'Wybór odpowiedniego samochodu',
        paragraphs: [
          'Kompaktowy samochód wystarczy dla jednego lub dwojga dzieci. W przypadku trójki dzieci lub dużego wózka wybierz SUV-a lub 7-miejscowego Joggera.',
          'Minimalny okres wynajmu to 72 godziny, z nieograniczonym przebiegiem, ubezpieczeniem standardowym i kaucją 0 MAD.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Czy fotelik dla dziecka jest naprawdę bezpłatny?',
        a: 'Tak. Foteliki dla niemowląt i podkładki są bezpłatne na życzenie, w zależności od dostępności.',
      },
      {
        q: 'Jak wybrać odpowiedni fotelik?',
        a: 'Prześlij wiek i wagę dziecka. Potwierdzimy odpowiedni fotelik lub podkładkę.',
      },
      {
        q: 'Czy mogę przywieźć własny fotelik?',
        a: 'Tak. Możesz korzystać z własnego fotelika. Daj nam znać, abyśmy nie rezerwowali go niepotrzebnie.',
      },
      {
        q: 'Czy zapewniacie foteliki dla noworodków?',
        a: 'Podaj wiek i wagę dziecka; potwierdzimy, czy odpowiedni fotelik jest dostępny w Twoich terminach.',
      },
    ],
    carIds: ['dacia-sandero-streetway', 'renault-clio-5', 'dacia-jogger', 'dacia-duster-manual'],
    image: '/images/hero/agadir-airport-arrival.webp',
    imageAlt: 'Wydanie samochodu Carzio z fotelikiem dla dziecka na lotnisku',
  },
};
