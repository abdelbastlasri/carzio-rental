# Content image inventory

Last updated: 2026-11-08

This file tracks the photographs used on the Blog, News and FAQ pages. No photograph is reused on more than one of those pages. The only exceptions are the brand logo and small interface icons.

## Legend

- **Source**: `owner` = owner-supplied photograph in `New image/`, `news blog/` or `inspiration/`; `project` = existing project asset under `public/images`; `internet` = third-party photograph downloaded into `public/images/journal`.
- **Processed**: every `public/images/journal/*.webp` and `public/images/fleet/*.webp` is 1600×900 WebP, 16:9, with the subject kept inside the frame.

## Internet photographs (3 only)

| File | Source title | Author | License | Used on |
|---|---|---|---|---|
| `public/images/journal/age-driving-licence.webp` | UK driving licence (Pexels photo 45113) | Dom J | Pexels License | Blog article: Age, licence and drivers |
| `public/images/journal/touchscreen-carplay.webp` | 2023 Volkswagen ID.4 running wireless CarPlay | Sunnyboy122 | CC0 | News category: Fleet & models |
| `public/images/journal/touchscreen-navigation.webp` | Toyota Aygo Mid 2018 Apple CarPlay integration | Butterhimmel | CC BY-SA 4.0 | News article: GPS and touchscreen |

## Owner-supplied photographs used

| Output file | Original source | Used on |
|---|---|---|
| `carzio-booking-pickup.webp` | `New image/16.22.14 (1).jpeg` | Blog article: Renting a car in Agadir |
| `carzio-wash-inspection.webp` | `news blog/16.24.24.jpeg` | Blog article: Standard or full insurance |
| `carzio-airport-jogger.webp` | `New image/16.22.14 (2).jpeg` | News article: Agadir Al Massira airport delivery |
| `carzio-documents-airport.webp` | `New image/16.22.14 (3).jpeg` | News category: Booking & paperwork |
| `carzio-airport-fleet.webp` | `New image/16.24.24 (2).jpeg` | News category: Airports & pickup |
| `carzio-new-routes.webp` | `New image/16.24.24.jpeg` | News hub hero |
| `carzio-inspection-pair.webp` | `news blog/16.24.24 (1).jpeg` | News category: Insurance & deposit |
| `news-family-group.webp` | `public/images/3.jpg` | News article: Full insurance from 5 days |
| `carzio-luggage-cars.webp` | `news blog/16.24.25.jpeg` | News category: Family travel |
| `carzio-boot-check.webp` | `inspiration/19.10.47.jpeg` | News article: Renting a car with children |
| `carzio-munich-route.webp` | `inspiration/19.10.45 (1).jpeg` | News article: When to rent a car in Agadir |
| `carzio-junior-pro.webp` | `inspiration/19.10.45.jpeg` | News category: Events & seasons |
| `carzio-driver-dacia.webp` | `inspiration/19.04.24.jpeg` | FAQ category: Age, licence & drivers |
| `faq-car-ready.webp` | `public/images/55.jpg` | FAQ category: Insurance & excess |
| `carzio-airport-peugeot.webp` | `news blog/16.24.25 (1).jpeg` | FAQ category: Fuel, mileage & delivery |

## Project assets used

| Output file | Original source | Used on |
|---|---|---|
| `blog-agadir-aerial.webp` | `public/images/agadir-oufella.jpg` | Blog hub hero |
| `blog-fleet-airport.webp` | `public/images/1.jpg` | Blog category: Booking & payment |
| `blog-insurance-inspection.webp` | `public/images/11.jpg` | Blog category: Insurance & excess |
| `blog-driver-map.webp` | `public/images/6.jpg` | Blog category: Age, licence & driving |
| `news-country-road.webp` | `public/images/5.jpg` | News category: Driving in Morocco |
| `news-headlight-safety.webp` | `public/images/4.jpg` | News category: Safety & rules |
| `news-taghazout-night.webp` | `public/images/Taghazout-by-night.jpg` | News category: Cities & sightseeing |
| `news-tamraght-coast.webp` | `public/images/tamraght.jpg` | News category: Road trips & itineraries |
| `news-family-group.webp` | `public/images/3.jpg` | News category: Family travel |
| `news-agadir-marina.webp` | `public/images/puerto-deportivo-agadir.jpg` | News article: Agadir, Marrakech, Essaouira |
| `news-desert-road.webp` | `public/images/111.jpg` | News article: Driving in Morocco |
| `news-duster-track.webp` | `public/images/7.jpg` | News article: Road safety in Morocco |
| `news-beach-convoy.webp` | `public/images/tamraght_beach.png` | News article: Road trips from Agadir |
| `news-key-handover.webp` | `public/images/2.jpg` | News article: 0 MAD deposit |
| `faq-rental-advisor.webp` | `public/images/about.jpg` | FAQ hub hero |
| `faq-agadir-terminal.webp` | `public/images/agadir-airport.jpg` | FAQ extra band |
| `faq-airport-assistance.webp` | `public/images/casablanca-airport.jpg` | FAQ hero |
| `faq-duster-sand.webp` | `public/images/66.jpg` | FAQ category: Driving in Morocco |

## Fleet images used in content

| Output file | Used on |
|---|---|
| `public/images/fleet/dacia-sandero-streetway.webp` | News category: Budget & practical tips |
| `public/images/fleet/hyundai-i10.webp` | News article: Car rental budget in Agadir |

The Blog model strip uses `dacia-sandero-stepway.webp`, `dacia-logan.webp`, `renault-clio-5.webp` and `peugeot-208.webp` from the same fleet set. These appear on the Blog page and the Our Cars page, which is allowed.

## Removed

- `public/images/journal/car-keys.jpg` deleted (Ferrari/BMW/Porsche keys, not relevant and misleading).
- All previous Wikimedia internet images removed from Blog/News/FAQ content except the three internet photographs listed above. Their credit entries were removed from `src/data/photoCredits.ts`.
- `public/images/journal/agadir-marina.jpg` is no longer used on Blog/News/FAQ; it remains available for other pages.
