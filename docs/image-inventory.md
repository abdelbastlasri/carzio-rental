# Carzio content image inventory

Last updated: 2026-11-11

This is the image map for every editorial photograph on the site: the home
slideshow, the home location cards, the "Explore Agadir" carousel, and the
**Blog**, **News** and **FAQ**. Blog, News and FAQ assignments live in one place
in the code (`src/content/media.ts`); the other sections point at their files
directly.

## Source rules in force

* Editorial photographs come from the owner-supplied folders `new fotos`,
  `news blog`, `New image` and `inspiration`. Where those folders held no
  photograph that genuinely illustrated a topic — or where a photo was weak,
  mismatched or AI-generated — the derivative was replaced with a genuine,
  properly licensed Wikimedia Commons file. Commons files are recorded in
  `src/data/photoCredits.ts` and in this inventory as an internal provenance
  record; the site does not publish a photo-credits page.
* Carzio-owned derivatives carry the Carzio emblem (bottom-right, 220 px wide,
  0.55 opacity). Wikimedia Commons photographs are **never** branded or
  watermarked.
* The six home **location cards** and the three **Explore Agadir** slides use the
  original project photographs in `public/images/` (`agadir-airport.jpg`,
  `marrakech-airport.jpg`, `essaouira-airport.jpg`, `taghazout-beach.jpg`,
  `tamraght.jpg`, `casablanca-airport.jpg`, `cable-car.jpg`). They were left
  exactly as they were, as requested, and carry no added branding.
* The car-model cards in `public/images/fleet/` are **not** editorial
  photography. They are product images of specific models (see "Fleet images"
  below).
* The homepage "Surf & Sun" slide `/images/55.jpg` and the home slideshow are
  intentionally untouched by this round.

## Reuse and uniqueness

* Blog, News and FAQ take 37 image slots. 25 derivatives come from the four
  owner folders and 12 are Wikimedia Commons files. Every slot has its own
  source photograph.
* The only deliberate reuse is the Blog "Insurance & excess" category, which
  shows the owner-requested family-pickup photograph also used on hero slide 6.
  No other Blog, News or FAQ slot repeats a source, and every served derivative
  is byte-unique (verified by SHA-256 after every build).
* The rest of the homepage, the location cards and the Explore carousel do not
  reuse any of these files.

## Home slideshow (6 derivatives)

| Slide | File | Source (`new fotos/…`) |
|---|---|---|
| Slide 1 — Surf & Sun | `/images/55.jpg` | unchanged |
| Slide 2 — Your Car in Agadir | `hero/new-slide-2.webp` | `Red Sandero Stepway at Agadir Marina.png` |
| Slide 3 — The Whole Crew, Sorted | `hero/new-slide-3.webp` | `Sunny Family Holiday Departure.png` |
| Slide 4 — Bordeaux → Agadir | `hero/new-slide-4.webp` | `WhatsApp Image 2026-11-08 at 19.10.44.jpeg` |
| Slide 5 — Land. Collect. Drive. | `hero/new-slide-5.webp` | `WhatsApp Image 2026-11-08 at 19.10.44 (3).jpeg` |
| Slide 6 — Ready When You Are | `hero/new-slide-6.webp` | `Carzio Family Pickup at Agadir Airport.png` |
| Slide 7 — Agadir pickup point | `hero/new-slide-7.webp` | `Carzio Fleet at Agadir Airport.png` |

Slide 3 is titled "The Whole Crew, Sorted" / "Family Car": the photograph does
not show a Dacia Jogger, so the copy stays model-neutral.

## Home location cards (6 originals, unchanged)

| Card | File | Source |
|---|---|---|
| Agadir — Al Massira | `/images/agadir-airport.jpg` | original project photograph |
| Marrakech — Menara | `/images/marrakech-airport.jpg` | original project photograph |
| Essaouira — Mogador | `/images/essaouira-airport.jpg` | original project photograph |
| Taghazout | `/images/taghazout-beach.jpg` | original project photograph |
| Tamraght | `/images/tamraght.jpg` | original project photograph |
| Casablanca — Mohammed V | `/images/casablanca-airport.jpg` | original project photograph |

## "Explore Agadir" carousel (3 originals, unchanged)

| Slide | File | Source |
|---|---|---|
| Tamraght Beach | `/images/tamraght.jpg` | original project photograph |
| Télécabine d'Agadir | `/images/cable-car.jpg` | original project photograph |
| Agadir Airport | `/images/agadir-airport.jpg` | original project photograph |

## Content to image map (37 derivatives)

All files below live in `public/images/journal/`. Carzio-owned derivatives are
watermarked; Wikimedia Commons derivatives are not.

| Content | Image file | Source |
|---|---|---|
| Blog — hub hero | `blog-agadir-aerial.webp` | `Seaside Travel Planning in Agadir.png` |
| Blog — category "Réservation & paiement" | `blog-cat-reservation.webp` | `Car Rental Pickup at Agadir Airport.png` |
| Blog — category "Assurance & franchise" | `blog-cat-assurance.webp` | `new fotos/Carzio Family Pickup at Agadir Airport.png` (also hero slide 6) |
| Blog — category "Âge, permis & conduite" | `blog-cat-conditions.webp` | `Family Car Rental Pickup at Carzio Airport.png` |
| Blog — "Âge, permis et conducteurs" | `blog-post-age-permis.webp` | `Luxury Airport Car Rental Pickup.png` |
| Blog — "Assurance standard ou complète" | `blog-post-assurance.webp` | `new fotos/Carzio Car Rental Inspection at the Airport.png` |
| Blog — "Réserver une voiture à Agadir" | `blog-post-reserver.webp` | `Agadir Airport Family Car Pickup.png` |
| News — hub hero / new routes | `carzio-new-routes.webp` | `WhatsApp Image 2026-11-05 at 16.24.24 (2).jpeg` |
| News — topic "Conduire au Maroc" | `news-cat-conduite-maroc.webp` | Commons — `A7 motorway in Morocco.JPG` |
| News — topic "Sécurité & règles" | `news-cat-securite-regles.webp` | Commons — `Road signs Agadir 2020.jpg` |
| News — topic "Assurance & caution" | `news-cat-assurance-caution.webp` | Commons — `Credit-cards.jpg` |
| News — topic "Booking & paperwork" | `news-cat-reservation-documents.webp` | `Carzio Airport Rental Check-In.png` |
| News — topic "Airports & pickup" | `news-cat-aeroports-livraison.webp` | `WhatsApp Image 2026-11-05 at 16.24.25 (1).jpeg` |
| News — topic "Cities & sightseeing" | `news-cat-villes-visites.webp` | `Red Stepway by the Blue Harbor.png` |
| News — topic "Road trips & itineraries" | `news-cat-road-trips.webp` | `New image/WhatsApp Image 2026-11-05 at 16.24.24.jpeg` |
| News — topic "Family travel" | `news-cat-voyage-famille.webp` | `Carzio Family Pickup Agadir Airport.png` |
| News — topic "Fleet & models" | `news-cat-flotte-modeles.webp` | Commons — `Red car morocco Marina Agadir.jpg` |
| News — topic "Events & seasons" | `news-cat-evenements.webp` | Commons — `Agadir Beach Sunset (Summer time).jpg` |
| News — topic "Budget & practical tips" | `news-cat-budget-conseils.webp` | `Carzio Family Car Rental Welcome.png` |
| News — "Conduire au Maroc : ce qu'il faut savoir" | `news-post-conduire-au-maroc.webp` | Commons — `R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg` |
| News — "Sécurité routière au Maroc" | `news-post-securite-routiere.webp` | Commons — `Road signs pedestrians Agadir 2020.jpg` |
| News — "Assurance complète dès 5 jours" | `news-post-assurance-complete.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.45 (3).jpeg` |
| News — "0 MAD de caution" | `news-post-caution-zero-mad.webp` | Commons — `Paying with a Credit Card (28886645201).jpg` |
| News — "GPS et écran tactile" | `news-post-gps-ecran-tactile.webp` | `Carzio CarPlay Dashboard Experience.png` |
| News — "Quand louer une voiture à Agadir" | `news-post-evenements-saisons.webp` | `Golden Hour Family Escape by the Coast.png` |
| News — "Livraison à l'aéroport Agadir Al Massira" | `news-post-livraison-aeroport.webp` | `WhatsApp Image 2026-11-05 at 16.33.41.jpeg` |
| News — "Louer une voiture en famille au Maroc" | `news-post-louer-voiture-famille.webp` | `New image/WhatsApp Image 2026-11-05 at 16.22.14 (3).jpeg` |
| News — "Road trips depuis Agadir" | `news-post-road-trips.webp` | Commons — `Vue panoramique de la plage " TAGHAZOUT".jpg` |
| News — "Agadir, Marrakech, Essaouira en voiture" | `news-post-agadir-marrakech-essaouira.webp` | Commons — `Skala du Port, Essaouira 01.jpg` |
| News — "Budget location de voiture à Agadir" | `news-post-budget-location.webp` | `WhatsApp Image 2026-11-05 at 16.24.25.jpeg` |
| FAQ — hub hero | `faq-airport-assistance.webp` | `news blog/Carzio at Agadir Airport.png` |
| FAQ — hub secondary | `faq-agadir-terminal.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.23.jpeg` |
| FAQ — "Booking & payment" | `faq-cat-reservation.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.24 (1).jpeg` |
| FAQ — "Age, licence & drivers" | `faq-cat-conditions.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.04.24.jpeg` |
| FAQ — "Insurance & excess" | `faq-cat-assurance.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.46 (7).jpeg` |
| FAQ — "Fuel, mileage & delivery" | `faq-cat-carburant-livraison.webp` | Commons — `Afriquia Station - Bouznika - October 2023.jpg` |
| FAQ — "Driving in Morocco" | `faq-cat-conduite-maroc.webp` | Commons — `A7 motorway in Morocco 2.JPG` |

## Photography note

The `new fotos`, `news blog`, `New image` and `inspiration` sets are
owner-supplied Carzio scenes, some of them AI-generated with signage and
branding physically part of the scene. They are used as marketing imagery only,
and that conflict with reality is why the weakest topic matches were replaced
with documentary Commons photographs. Alt text describes what is visible and
does not claim that any depicted person is a real customer or that a depicted
vehicle is a specific real unit.

## Third-party photographs

Fifteen Wikimedia Commons photographs are currently published: twelve in the
Blog/News/FAQ set and three elsewhere (About and fleet). Each one is recorded in
`src/data/photoCredits.ts` with its author, licence and source link. The site
does not publish a photo-credits page; this inventory and `photoCredits.ts` are
the provenance record.

| Served derivative | Commons file | Author | Licence |
|---|---|---|---|
| `journal/news-cat-conduite-maroc.webp` | A7 motorway in Morocco.JPG | Makary | CC BY 3.0 |
| `journal/faq-cat-conduite-maroc.webp` | A7 motorway in Morocco 2.JPG | Makary | CC BY 3.0 |
| `journal/news-post-conduire-au-maroc.webp` | R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg | Timothy A. Gonsalves | CC BY-SA 4.0 |
| `journal/news-cat-securite-regles.webp` | Road signs Agadir 2020.jpg | Abdeaitali | CC BY-SA 4.0 |
| `journal/news-post-securite-routiere.webp` | Road signs pedestrians Agadir 2020.jpg | Abdeaitali | CC BY-SA 4.0 |
| `journal/news-post-road-trips.webp` | Vue panoramique de la plage " TAGHAZOUT".jpg | Mouad aguenaou | CC BY-SA 4.0 |
| `journal/news-cat-assurance-caution.webp` | Credit-cards.jpg | Lotus Head | CC BY-SA 2.5 |
| `journal/news-cat-flotte-modeles.webp` | Red car morocco Marina Agadir.jpg | MustaSensei | CC BY-SA 4.0 |
| `journal/news-cat-evenements.webp` | Agadir Beach Sunset (Summer time).jpg | Hatim.laajini | CC BY-SA 4.0 |
| `journal/news-post-caution-zero-mad.webp` | Paying with a Credit Card (28886645201).jpg | Hloom Templates | CC BY 2.0 |
| `journal/news-post-agadir-marrakech-essaouira.webp` | Skala du Port, Essaouira 01.jpg | Adam Harangozó | CC BY-SA 4.0 |
| `journal/faq-cat-carburant-livraison.webp` | Afriquia Station - Bouznika - October 2023.jpg | Anass Sedrati | CC BY-SA 4.0 |
| `about-new.webp` | Agadir – Al Massira Airport 02.jpg | Werner100359 | CC BY-SA 4.0 |
| `fleet/kia-sportage.webp` | 2023 Kia Sportage (NQ5) in White, front left.jpg | Benespit | CC BY-SA 4.0 |
| `fleet/vw-troc.webp` | Volkswagen T-Roc (2021) 1X7A0330.jpg | Alexander Migl | CC BY-SA 4.0 |

None of these derivatives carries the Carzio emblem, a watermark or any added
branding. Provenance copies of several sources are kept in `docs/media-sources/`.

The location-card and Explore photographs are the project's original
`public/images/` assets. They are not stock photographs imported for the
editorial set and were never listed in `photoCredits.ts`.

## Removed assignments

The 46 older derivatives that previously illustrated Blog, News and FAQ (for
example `carzio-airport-fleet`, `news-key-handover`, `faq-rental-advisor`,
`touchscreen-carplay`) were deleted in an earlier round. The nine derivatives
`locations/*.webp` and `explore/*.webp` that briefly replaced the location
cards and the Explore carousel were deleted in this round; those sections now
point at the original JPGs again.

The original JPG/PNG library in `public/images` is untouched: it holds material
shared with other pages and the original location/Explore photographs. Those
files are not referenced by the Blog/News/FAQ map.

## Fleet images

All car-card images are 16:9 WebP on a pure white background, trimmed and
enlarged inside the frame:

`dacia-sandero-stepway.webp`, `dacia-sandero-streetway.webp`, `dacia-logan.webp`,
`dacia-duster-automatic-2025.webp`, `dacia-duster-manual-2026.webp`,
`dacia-jogger.webp`, `renault-clio-5.webp`, `peugeot-208.webp`,
`hyundai-i10.webp`, `vw-troc.webp`, `kia-sportage.webp`, `hyundai-tucson.webp`.

These are **product photographs of the specific car models** on offer: the
photograph must match the vehicle a customer is booking. Kia Sportage and
VW T-Roc were re-sourced from Commons because their previous files were
AI-generated or showed the wrong model.

**Every car faces the same way** (front three-quarter view pointing to the
left), so the grid reads as one series. The Hyundai i10 was the only card
pointing the other way and has been flipped horizontally; its registration
plate is blank, so no lettering was mirrored.

The **Kia Sportage** and **VW T-Roc** cards now use genuine Commons photographs
(Benespit, CC BY-SA 4.0 and Alexander Migl, CC BY-SA 4.0). The cars were cut out
with `rembg`, composited on a pure-white 1600×900 canvas at natural resolution
with a soft ground shadow, and carry no watermark. The previous studio render
(AI-generated, C2PA-flagged) and the mismatched Touareg photograph are no longer
used.

The **Dacia Duster Manual 2026** card uses the owner-supplied cut-out
`new duster dacia/LikSts4h9HE8dJOOl0p6.jpg` (supplied by the owner on
2026-11-10). The RGBA cut-out is composited on a pure-white 1600×900 canvas at
its natural resolution, with the "DUSTER" plate and a natural ground shadow —
no upscaling, no background residue.

The remaining nine car cards use the vehicle photographs that already shipped
with the project (`public/images/*.jpg|png`), remixed onto pure white. They are
car photographs of the original project assets — they were not imported from an
unauthorised source and are not duplicated from the Blog, News or FAQ set.

## About

`public/images/about-new.webp` now uses the genuine Commons photograph
`Agadir – Al Massira Airport 02.jpg` by Werner100359 (CC BY-SA 4.0), cropped to
16:9 at 1600×900. The previous AI-generated scene from
`new about foto/Carzio_ Drive with Confidence.png` was replaced, and the new
derivative carries no watermark. The photo depicts the airport terminal that
the About page describes.
