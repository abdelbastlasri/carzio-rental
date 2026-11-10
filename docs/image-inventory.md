# Carzio content image inventory

Last updated: 2026-11-10

This is the image map used by the **Blog**, **News** and **FAQ**. The mapping
itself lives in one place in the code: `src/content/media.ts`. Category and
article front-matter no longer carry an `image:` line, so a photograph can only
be assigned in one place.

## Source rules in force

* Blog, News and FAQ photography comes **only** from the three authorised owner
  folders: `news blog`, `New image` and `inspiration`.
* `public/images` is **not** an authorised source for these three sections. Every
  derivative that used to come from there has been removed and replaced.
* When the authorised folders hold no photograph that genuinely illustrates a
  given article, a **Wikimedia Commons** photograph is used instead, with its
  author and licence recorded in `src/data/photoCredits.ts` and published on
  `/credits`.
* The Carzio emblem is applied **only** to Carzio-owned photographs that carry
  no branding of their own. It is never applied to third-party photographs.

## Content to image map (33 photographs, each used once)

| Content | Image file | Source | Watermark |
|---|---|---|---|
| Blog — category "Réservation & paiement" | `blog-cat-reservation.webp` | `news blog/Carzio at Agadir Airport.png` | no |
| Blog — category "Assurance & franchise" | `blog-cat-assurance.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.24.jpeg` | yes |
| Blog — category "Âge, permis & conduite" | `blog-cat-conditions.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.25.jpeg` | yes |
| Blog — "Âge, permis et conducteurs : qui peut louer une voiture au Maroc ?" | `blog-post-age-permis.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.44 (2).jpeg` | yes |
| Blog — "Assurance standard ou complète : que faut-il choisir ?" | `blog-post-assurance.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.47.jpeg` | yes |
| Blog — "Réserver une voiture à Agadir : le guide complet" | `blog-post-reserver.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.00.13.jpeg` | no |
| News — topic "Conduire au Maroc" | `news-cat-conduite-maroc.webp` | Wikimedia Commons — File:A7 motorway in Morocco.JPG | no |
| News — topic "Sécurité & règles" | `news-cat-securite-regles.webp` | Wikimedia Commons — File:Road signs Agadir 2020.jpg | no |
| News — topic "Assurance & caution" | `news-cat-assurance-caution.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.24 (2).jpeg` | yes |
| News — topic "Booking & paperwork" | `news-cat-reservation-documents.webp` | `New image/WhatsApp Image 2026-11-05 at 16.24.24 (1).jpeg` | no |
| News — topic "Airports & pickup" | `news-cat-aeroports-livraison.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.45 (1).jpeg` | no |
| News — topic "Cities & sightseeing" | `news-cat-villes-visites.webp` | Wikimedia Commons — File:Agadir bay.jpg | no |
| News — topic "Road trips & itineraries" | `news-cat-road-trips.webp` | `New image/WhatsApp Image 2026-11-05 at 16.22.14.jpeg` | yes |
| News — topic "Family travel" | `news-cat-voyage-famille.webp` | `New image/WhatsApp Image 2026-11-05 at 16.22.14 (3).jpeg` | yes |
| News — topic "Fleet & models" | `news-cat-flotte-modeles.webp` | Wikimedia Commons — File:Toyota Aygo Mid 2018 Apple Carplay Integration.jpg | no |
| News — topic "Events & seasons" | `news-cat-evenements.webp` | `New image/WhatsApp Image 2026-11-05 at 16.24.24.jpeg` | no |
| News — topic "Budget & practical tips" | `news-cat-budget-conseils.webp` | Wikimedia Commons — File:Highway morocco pay checkpoint.jpg | no |
| News — "Conduire au Maroc : ce qu’il faut savoir avant de louer" | `news-post-conduire-au-maroc.webp` | Wikimedia Commons — File:R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg | no |
| News — "Sécurité routière au Maroc : les règles essentielles" | `news-post-securite-routiere.webp` | Wikimedia Commons — File:Road signs pedestrians Agadir 2020.jpg | no |
| News — "Assurance complète dès 5 jours : comment ça marche" | `news-post-assurance-complete.webp` | `New image/WhatsApp Image 2026-11-05 at 16.24.24 (2).jpeg` | yes |
| News — "0 MAD de caution : comment se passe le paiement" | `news-post-caution-zero-mad.webp` | `New image/WhatsApp Image 2026-11-05 at 16.22.14 (1).jpeg` | yes |
| News — "GPS et écran tactile : quels modèles Carzio en sont équipés" | `news-post-gps-ecran-tactile.webp` | Wikimedia Commons — File:2023 Volkswagen ID.4 running wireless CarPlay.jpg | no |
| News — "Quand louer une voiture à Agadir : saisons, vacances et affluence" | `news-post-evenements-saisons.webp` | Wikimedia Commons — File:Agadir Beach Sunset (Summer time).jpg | no |
| News — "Livraison à l’aéroport Agadir Al Massira : ce qui est gratuit" | `news-post-livraison-aeroport.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.23.jpeg` | yes |
| News — "Louer une voiture en famille au Maroc : nos conseils" | `news-post-louer-voiture-famille.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.45.jpeg` | no |
| News — "Road trips depuis Agadir : 3 itinéraires à faire en voiture" | `news-post-road-trips.webp` | Wikimedia Commons — File:Vue panoramique de la plage %22 TAGHAZOUT%22.jpg | no |
| News — "Agadir, Marrakech, Essaouira : visiter en voiture" | `news-post-agadir-marrakech-essaouira.webp` | Wikimedia Commons — File:Skala du Port, Essaouira 01.jpg | no |
| News — "Budget location de voiture à Agadir : ce qui est inclus" | `news-post-budget-location.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.25 (1).jpeg` | yes |
| FAQ — "Booking & payment" | `faq-cat-reservation.webp` | `news blog/WhatsApp Image 2026-11-05 at 16.24.24 (1).jpeg` | yes |
| FAQ — "Age, licence & drivers" | `faq-cat-conditions.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.04.24.jpeg` | yes |
| FAQ — "Insurance & excess" | `faq-cat-assurance.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.46 (7).jpeg` | yes |
| FAQ — "Fuel, mileage & delivery" | `faq-cat-carburant-livraison.webp` | `inspiration/WhatsApp Image 2026-11-08 at 19.10.45 (3).jpeg` | yes |
| FAQ — "Driving in Morocco" | `faq-cat-conduite-maroc.webp` | Wikimedia Commons — File:A7 motorway in Morocco 2.JPG | no |

## Third-party photographs (Wikimedia Commons)

| File | Original | Author | Licence | Source page |
|---|---|---|---|---|
| `news-cat-conduite-maroc.webp` | A7 motorway in Morocco.JPG | Makary | CC BY 3.0 | https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco.JPG |
| `faq-cat-conduite-maroc.webp` | A7 motorway in Morocco 2.JPG | Makary | CC BY 3.0 | https://commons.wikimedia.org/wiki/File:A7_motorway_in_Morocco_2.JPG |
| `news-cat-securite-regles.webp` | Road signs Agadir 2020.jpg | Abdeaitali | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Road_signs_Agadir_2020.jpg |
| `news-post-securite-routiere.webp` | Road signs pedestrians Agadir 2020.jpg | Abdeaitali | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Road_signs_pedestrians_Agadir_2020.jpg |
| `news-post-conduire-au-maroc.webp` | R212 MZouda Shishawa Morocco Oct25 A7CR 08374.jpg | Timothy A. Gonsalves | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:R212_MZouda_Shishawa_Morocco_Oct25_A7CR_08374.jpg |
| `news-cat-villes-visites.webp` | Agadir bay.jpg | AJSPARK4444 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Agadir_bay.jpg |
| `news-cat-flotte-modeles.webp` | Toyota Aygo Mid 2018 Apple Carplay Integration.jpg | Butterhimmel | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Toyota_Aygo_Mid_2018_Apple_Carplay_Integration.jpg |
| `news-post-gps-ecran-tactile.webp` | 2023 Volkswagen ID.4 running wireless CarPlay.jpg | Sunnyboy122 | CC0 | https://commons.wikimedia.org/wiki/File:2023_Volkswagen_ID.4_running_wireless_CarPlay.jpg |
| `news-cat-budget-conseils.webp` | Highway morocco pay checkpoint.jpg | Ministère de l'Équipement et du Transport | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Highway_morocco_pay_checkpoint.jpg |
| `news-post-evenements-saisons.webp` | Agadir Beach Sunset (Summer time).jpg | Hatim.laajini | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Agadir_Beach_Sunset_(Summer_time).jpg |
| `news-post-road-trips.webp` | Vue panoramique de la plage " TAGHAZOUT".jpg | Mouad aguenaou | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Vue_panoramique_de_la_plage_%22_TAGHAZOUT%22.jpg |
| `news-post-agadir-marrakech-essaouira.webp` | Skala du Port, Essaouira 01.jpg | Adam Harangozó | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Skala_du_Port,_Essaouira_01.jpg |

The downloaded originals are kept for provenance in `docs/media-sources/`
(downscaled to 1600 px). They are not served by the site.

## Removed assignments

The 46 derivatives that previously illustrated the Blog, News and FAQ were
deleted once they were replaced: `age-driving-licence`, `blog-driver-map`,
`blog-fleet-airport`, `blog-insurance-inspection`, `carzio-airport-fleet`,
`carzio-airport-jogger`, `carzio-airport-peugeot`, `carzio-booking-pickup`,
`carzio-boot-check`, `carzio-bordeaux-sign`, `carzio-documents-airport`,
`carzio-driver-dacia`, `carzio-grey-fleet-airport`, `carzio-grey-fleet-front`,
`carzio-grey-fleet-side`, `carzio-grey-fleet-vertical`, `carzio-inspection-pair`,
`carzio-junior-pro`, `carzio-luggage-cars`, `carzio-munich-route`,
`carzio-sportage-white`, `carzio-wash-inspection`, `faq-car-ready`,
`faq-carzio-screen`, `faq-duster-sand`, `faq-extra-taghazout`,
`faq-rental-advisor`, `news-agadir-marina`, `news-beach-convoy`,
`news-carplay-screen`, `news-country-road`, `news-desert-road`,
`news-driving-morocco`, `news-driving-road`, `news-duster-track`,
`news-family-airport`, `news-family-group`, `news-headlight-safety`,
`news-key-handover`, `news-payment-terminal`, `news-pedestrian-safety`,
`news-road-signs`, `news-taghazout-night`, `news-tamraght-coast`,
`touchscreen-carplay`, `touchscreen-navigation` (all `.webp`).

The original JPG/PNG library in `public/images/journal` is untouched: it holds
material shared with other pages and the untouched source photographs.

## Fleet images

All car-card images are 16:9 WebP on a pure white background, trimmed and
enlarged inside the frame:

`dacia-sandero-stepway.webp`, `dacia-sandero-streetway.webp`, `dacia-logan.webp`, `dacia-duster-automatic-2025.webp`, `dacia-duster-manual-2026.webp`, `dacia-jogger.webp`, `renault-clio-5.webp`, `peugeot-208.webp`, `hyundai-i10.webp`, `vw-troc.webp`, `kia-sportage.webp`, `hyundai-tucson.webp`.

The Kia Sportage derivative uses `new kia/Modern White Kia SUV Studio Render.jpg`
(owner-authorised on 2026-11-10): the flat studio backdrop is flood-filled and
normalised to pure white, the car is placed at its natural resolution without
upscaling, and the plate carries no readable registration number.

The **Dacia Duster Manual 2026** card uses the owner-supplied cut-out
`new duster dacia/LikSts4h9HE8dJOOl0p6.jpg` (supplied by the owner on
2026-11-10). The RGBA cut-out is composited on a pure-white 1600×900 canvas at
its natural resolution, with the "DUSTER" plate and a natural ground shadow —
no upscaling, no background residue. The earlier derivative built from the
same folder with a `.webp` extension has been removed from the repository, so
the unauthorised asset no longer ships with the code.

The remaining ten car cards use the vehicle photographs that already shipped
with the project (`public/images/*.jpg|png`), remixed onto pure white. They are
car photographs of the original project assets — they were not imported from
an unauthorised folder and are not duplicated from the Blog, News or FAQ set.

## Hero slides

`public/images/hero/new-slide-2.webp` through `new-slide-7.webp`, in filename
order from `new 6 home page`. Slide 1 remains `/images/55.jpg` (surf and sun).

## About

`public/images/about-new.webp` from `new about foto/Carzio_ Drive with Confidence.png`,
rendered in a 16:9 frame so the full Carzio logo stays visible.
