# Carzio content image inventory

Last updated: 2026-11-11

This is the image map for every editorial photograph on the site: the home
slideshow, the home location cards, the "Explore Agadir" carousel, and the
**Blog**, **News** and **FAQ**. Blog, News and FAQ assignments live in one place
in the code (`src/content/media.ts`); the other sections point at their files
directly.

## Source rules in force

* Every Blog, News and FAQ photograph comes from the owner-supplied folder
  `new fotos` (27 photographs). No other folder is used for that editorial
  imagery.
* All 27 photographs are Carzio-owned marketing visuals, so the Carzio emblem
  is applied to every derivative they produce (bottom-right, 220 px wide,
  0.55 opacity).
* The six home **location cards** and the three **Explore Agadir** slides use the
  original project photographs in `public/images/` (`agadir-airport.jpg`,
  `marrakech-airport.jpg`, `essaouira-airport.jpg`, `taghazout-beach.jpg`,
  `tamraght.jpg`, `casablanca-airport.jpg`, `cable-car.jpg`). They were left
  exactly as they were, as requested, and carry no added branding.
* The car-model cards in `public/images/fleet/` are **not** editorial
  photography. They are product images of specific models and are intentionally
  left unchanged (see "Fleet images" below).
* The homepage "Surf & Sun" slide `/images/55.jpg` and the About photograph
  `public/images/about-new.webp` are also intentionally unchanged.

## Reuse and uniqueness

* Blog, News and FAQ take 37 image slots and share a pool of **21** photographs
  (the six remaining `new fotos` scenes illustrate the homepage slideshow and
  are never reused elsewhere).
* No source photograph is used more than **twice**.
* **Blog** and **FAQ** each use seven distinct sources, and they share none with
  each other. The **News** page uses all 21 sources; because it has 23 slots,
  two sources must appear twice there (the driving and safety topics, whose
  category chip and article deliberately belong to the same subject).
* No photograph appears twice inside the Blog page or inside the FAQ page.
* The two repeated News sources are cropped differently (zoom 1.00 and 1.10)
  so the two cards do not read as the same picture. All 43 derivatives are
  byte-unique (verified by SHA-256 after every build).
* No photograph used in the homepage slideshow is reused in Blog, News or FAQ.

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

All files below live in `public/images/journal/` and are watermarked.

| Content | Image file | Source (`new fotos/…`) |
|---|---|---|
| Blog — hub hero | `blog-agadir-aerial.webp` | `Seaside Travel Planning in Agadir.png` |
| Blog — category "Réservation & paiement" | `blog-cat-reservation.webp` | `Car Rental Pickup at Agadir Airport.png` |
| Blog — category "Assurance & franchise" | `blog-cat-assurance.webp` | `WhatsApp Image 2026-11-08 at 19.10.47.jpeg` |
| Blog — category "Âge, permis & conduite" | `blog-cat-conditions.webp` | `Family Car Rental Pickup at Carzio Airport.png` |
| Blog — "Âge, permis et conducteurs" | `blog-post-age-permis.webp` | `Luxury Airport Car Rental Pickup.png` |
| Blog — "Assurance standard ou complète" | `blog-post-assurance.webp` | `Agadir Airport Car Rental Welcome.png` |
| Blog — "Réserver une voiture à Agadir" | `blog-post-reserver.webp` | `Agadir Airport Family Car Pickup.png` |
| News — hub hero / new routes | `carzio-new-routes.webp` | `WhatsApp Image 2026-11-05 at 16.24.24 (2).jpeg` |
| News — topic "Conduire au Maroc" | `news-cat-conduite-maroc.webp` | `Dacia Duster Coastal Dashboard Experience.png` |
| News — topic "Sécurité & règles" | `news-cat-securite-regles.webp` | `Carzio Car Rental Inspection at the Airport.png` |
| News — topic "Assurance & caution" | `news-cat-assurance-caution.webp` | `Agadir Airport Car Rental Welcome.png` |
| News — topic "Booking & paperwork" | `news-cat-reservation-documents.webp` | `Carzio Airport Rental Check-In.png` |
| News — topic "Airports & pickup" | `news-cat-aeroports-livraison.webp` | `WhatsApp Image 2026-11-05 at 16.24.25 (1).jpeg` |
| News — topic "Cities & sightseeing" | `news-cat-villes-visites.webp` | `Red Stepway by the Blue Harbor.png` |
| News — topic "Road trips & itineraries" | `news-cat-road-trips.webp` | `Seaside Travel Planning in Agadir.png` |
| News — topic "Family travel" | `news-cat-voyage-famille.webp` | `Carzio Family Pickup Agadir Airport.png` |
| News — topic "Fleet & models" | `news-cat-flotte-modeles.webp` | `WhatsApp Image 2026-11-05 at 16.24.24.jpeg` |
| News — topic "Events & seasons" | `news-cat-evenements.webp` | `WhatsApp Image 2026-11-08 at 19.10.47.jpeg` |
| News — topic "Budget & practical tips" | `news-cat-budget-conseils.webp` | `Carzio Family Car Rental Welcome.png` |
| News — "Conduire au Maroc : ce qu'il faut savoir" | `news-post-conduire-au-maroc.webp` | `Dacia Duster Coastal Dashboard Experience.png` |
| News — "Sécurité routière au Maroc" | `news-post-securite-routiere.webp` | `Carzio Car Rental Inspection at the Airport.png` |
| News — "Assurance complète dès 5 jours" | `news-post-assurance-complete.webp` | `Luxury Airport Car Rental Pickup.png` |
| News — "0 MAD de caution" | `news-post-caution-zero-mad.webp` | `Car Rental Pickup at Agadir Airport.png` |
| News — "GPS et écran tactile" | `news-post-gps-ecran-tactile.webp` | `Carzio CarPlay Dashboard Experience.png` |
| News — "Quand louer une voiture à Agadir" | `news-post-evenements-saisons.webp` | `Golden Hour Family Escape by the Coast.png` |
| News — "Livraison à l'aéroport Agadir Al Massira" | `news-post-livraison-aeroport.webp` | `WhatsApp Image 2026-11-05 at 16.33.41.jpeg` |
| News — "Louer une voiture en famille au Maroc" | `news-post-louer-voiture-famille.webp` | `Agadir Airport Family Car Pickup.png` |
| News — "Road trips depuis Agadir" | `news-post-road-trips.webp` | `WhatsApp Image 2026-11-08 at 19.04.24.jpeg` |
| News — "Agadir, Marrakech, Essaouira en voiture" | `news-post-agadir-marrakech-essaouira.webp` | `Family Car Rental Pickup at Carzio Airport.png` |
| News — "Budget location de voiture à Agadir" | `news-post-budget-location.webp` | `WhatsApp Image 2026-11-05 at 16.24.25.jpeg` |
| FAQ — hub hero | `faq-airport-assistance.webp` | `WhatsApp Image 2026-11-05 at 16.33.41.jpeg` |
| FAQ — hub secondary | `faq-agadir-terminal.webp` | `WhatsApp Image 2026-11-05 at 16.24.25 (1).jpeg` |
| FAQ — "Booking & payment" | `faq-cat-reservation.webp` | `Carzio Family Pickup Agadir Airport.png` |
| FAQ — "Age, licence & drivers" | `faq-cat-conditions.webp` | `Carzio Airport Rental Check-In.png` |
| FAQ — "Insurance & excess" | `faq-cat-assurance.webp` | `Carzio Family Car Rental Welcome.png` |
| FAQ — "Fuel, mileage & delivery" | `faq-cat-carburant-livraison.webp` | `WhatsApp Image 2026-11-05 at 16.24.25.jpeg` |
| FAQ — "Driving in Morocco" | `faq-cat-conduite-maroc.webp` | `Carzio CarPlay Dashboard Experience.png` |

## Photography note

The `new fotos` set is suspected to be AI-generated Carzio scene imagery (its
signage and branding are physically part of each scene). It is used as
marketing imagery only. Alt text describes what is visible and does not claim
that any depicted person is a real customer or that a depicted vehicle is a
specific real unit.

## Third-party photographs

None in the editorial set. The 16 Wikimedia Commons derivatives that were
previously listed here have all been replaced, and `src/data/photoCredits.ts`
still contains an empty array. The `/credits` page explains that no third-party
photograph is currently published.

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

These are **product photographs of specific car models** and are deliberately
left unchanged: substituting a scene photo would misrepresent the vehicle a
customer is booking.

**Every car faces the same way** (front three-quarter view pointing to the
left), so the grid reads as one series. The Hyundai i10 was the only card
pointing the other way and has been flipped horizontally; its registration
plate is blank, so no lettering was mirrored.

The **Kia Sportage** card uses `new kia/Modern White Kia SUV Studio Render.jpg`
(owner-authorised on 2026-11-10): the flat studio backdrop is flood-filled and
normalised to pure white, the car is placed at its natural resolution without
upscaling, and the plate carries no readable registration number.

The **Dacia Duster Manual 2026** card uses the owner-supplied cut-out
`new duster dacia/LikSts4h9HE8dJOOl0p6.jpg` (supplied by the owner on
2026-11-10). The RGBA cut-out is composited on a pure-white 1600×900 canvas at
its natural resolution, with the "DUSTER" plate and a natural ground shadow —
no upscaling, no background residue.

The remaining ten car cards use the vehicle photographs that already shipped
with the project (`public/images/*.jpg|png`), remixed onto pure white. They are
car photographs of the original project assets — they were not imported from an
unauthorised source and are not duplicated from the Blog, News or FAQ set.

## About

`public/images/about-new.webp` from
`new about foto/Carzio_ Drive with Confidence.png`, rendered in a 16:9 frame so
the full Carzio logo stays visible. Unchanged by this round.
