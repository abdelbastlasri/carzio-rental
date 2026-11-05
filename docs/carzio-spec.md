# Carzio — Spécification du site et des règles métier

Version interne. Source de vérité pour le site, les annonces Google Ads et la fiche Google Business Profile.
Dernière mise à jour : 2 novembre 2026.

## 1. Identité

| Élément | Valeur |
|---|---|
| Marque | Carzio |
| Site | https://www.carzio.ma (canonique, avec `www`) |
| Domaine admin | https://admin.carzio.ma |
| Activité | Location de voitures à Agadir, aéroport Agadir Al Massira (AGA) |
| Adresse | MAG N2, Agadir Airport |
| Téléphone / WhatsApp | +212 680 318003 (numéro unique partout) |
| E-mail client | contact@carzio.ma |
| Langues prévues | FR, EN, DE, ES, PL (i18n côté client aujourd'hui) |
| GA4 | G-5475MNNVFP |
| GBP Place ID | ChIJ82tvQjOFt6_oebrUqdHJKg |

Numéro d'urgence : 190 uniquement. Ne jamais afficher d'autre numéro d'urgence.

## 2. Règles de location (verrouillées)

- Durée minimum : **3 jours (72 h)**.
- Facturation par blocs de **24 h**. Un bloc partiel compte comme un jour complet.
- Âge minimum : **23 ans**, permis détenu depuis **4 ans**, pour toutes les voitures.
- Pas de supplément jeune conducteur.
- Caution : **0 MAD**, pas d'empreinte bancaire. Cartes de débit acceptées.
- Paiement : à la remise des clés (pas de paiement en ligne).
- Annulation : gratuite jusqu'à **24 h avant** la prise en charge.
- Confirmation envoyée au client **et** à contact@carzio.ma.
- Carburant : politique du **même niveau** au départ et au retour.
- 2e conducteur : **gratuit**.
- Siège bébé et rehausseur : **gratuits**.
- Kilométrage : illimité sur toute la flotte.

## 3. Assurance

Assurance standard incluse et verrouillée sur toutes les réservations (vitres, pneus, rétroviseurs couverts).

| Prix journalier | Franchise standard | Assurance complète |
|---|---|---|
| ≤ 39 €/jour | 5 000 MAD | +10 €/jour |
| ≥ 40 €/jour | 8 000 MAD | +15 €/jour |

Règles d'affichage :

- L'assurance complète n'est **visible et sélectionnable qu'à partir de 5 jours (120 h)**.
- Elle n'est **jamais pré-cochée**.
- Si la durée descend sous 5 jours, la case est automatiquement décochée et le prix retiré du total.
- Message public : « Assurance complète disponible · 0 MAD de franchise dès 5 jours ».

## 4. Livraison et restitution

| Lieu | Tarif |
|---|---|
| Aéroport Agadir Al Massira (AGA) | Gratuit |
| Agence Carzio, Agadir | Gratuit |
| Aéroport Marrakech-Menara (RAK) | 80 € par trajet |
| Aéroport Mohammed V, Casablanca (CMN) | 80 € par trajet |
| Taghazout | Sur demande (tarif confirmé avant réservation) |
| Tamraght | Sur demande (tarif confirmé avant réservation) |
| Essaouira | Sur demande (tarif confirmé avant réservation) |

- Marrakech et Casablanca : le site facture **la prise en charge et la restitution** (80 € + 80 € si la voiture est rendue sur place).
- Pour Taghazout, Tamraght et Essaouira, le tarif est confirmé par WhatsApp **avant** la réservation. Ne jamais afficher un montant non validé par le propriétaire.

## 5. Flotte (12 voitures)

Dacia Stepway, Dacia Streetway, Dacia Logan, Hyundai i10, Peugeot 208, Renault Clio, Dacia Duster, Dacia Jogger, Kia Sportage, Volkswagen T-Roc, Hyundai Tucson, Volkswagen Touareg.

- Prix : **25 € à 100 €/jour**.
- GPS : 208, Duster, Sportage, T-Roc, Tucson, Touareg (6 voitures).
- Écran tactile : i10, 208, Clio, Duster, Sportage, T-Roc, Tucson, Touareg (8 voitures).

Ne jamais ajouter d'équipement, de prix ou de modèle qui ne figure pas dans `src/data/fleet.ts`.

## 6. Architecture du site

Routes publiques existantes :

- `/` — accueil
- `/cars` — flotte
- `/about`
- `/contact`
- `/terms`
- `/faq` + `/faq/:slug` (5 catégories, 30 réponses)
- `/location-voiture-agadir`
- `/location-voiture-marrakech`
- `/location-voiture-casablanca`
- `/location-voiture-taghazout`
- `/location-voiture-tamraght`
- `/location-voiture-essaouira`
- `*` — page 404 avec `noindex`

Blog et news (construits et câblés) :

- Blog (`/blog`) : 3 catégories, 3 articles bilingues (FR/EN), hub et pages catégorie localisées (5 langues).
- News (`/news`) : section distincte, 11 rubriques dérivées du fichier d'analyse (4 avec articles publiés), 4 articles bilingues (FR/EN), schema `NewsArticle`.
- Pages villes : refaites en FR avec table de distances, highlights et FAQ locales (6 pages).
- Alternates hreflang sur toutes les pages ; URLs préfixées par langue (`/fr/…`, `/en/…`, …) + alias non préfixé.
- 700 à 900 mots, 1 photo Carzio par article, JSON-LD `Article`/`NewsArticle` + `BreadcrumbList`.
- Rythme : **1 article par semaine, le mardi**. Les rubriques vides restent "Bientôt" (noindex).
- Aucune publication automatique en masse.

## 7. SEO

- Hôte canonique : `https://www.carzio.ma`.
- Redirection 301 apex → `www` dans `vercel.json`.
- Chaque page a un titre, une description et une URL canonique uniques (`src/components/Seo.tsx`).
- `sitemap.xml` contient l'accueil, les voitures, les pages info, les 6 FAQ et les 6 pages villes.
- JSON-LD : `LocalBusiness` sur l'accueil, `FAQPage` sur les pages FAQ, `BreadcrumbList` sur FAQ et pages villes.
- 404 en `noindex`.

## 8. Contenus à ne jamais publier

- Textes ou images copiés d'un concurrent.
- Faux avis, avis incités ou notes inventées.
- Promesses de classement, de trafic ou de nombre de réservations.
- Prix, équipements GPS ou frais de livraison non confirmés.
- Numéros d'urgence autres que le 190.
- Articles générés en masse sans relecture.

## 9. Chaîne de réservation

1. Le client choisit ses dates (minimum 72 h).
2. Il choisit une voiture.
3. L'assurance standard est incluse ; l'assurance complète apparaît à partir de 5 jours.
4. Il envoie la demande (formulaire ou WhatsApp).
5. L'API enregistre la réservation et envoie un e-mail au client et à contact@carzio.ma.
6. Le propriétaire confirme manuellement.

À vérifier après chaque modification : formulaire, modal, WhatsApp, e-mail et affichage dans `admin.carzio.ma`.

## 9.bis Emails — architecture et mise en production

- L'envoi passe par `sendEmail()` (`api/index.js`) : Resend d'abord (défaut `EMAIL_PROVIDER=resend`), Gmail en repli automatique.
- `EMAIL_PROVIDER=gmail` fait passer Gmail en premier — seul moyen de livrer les emails clients tant que `carzio.ma` n'est pas vérifié dans Resend (DKIM+DMARC chez NindoHost) : `onboarding@resend.dev` ne livre qu'à l'adresse du compte Resend.
- `ADMIN_NOTIFY_EMAIL` (défaut `contact@carzio.ma`) reçoit les copies propriétaire : notification « nouveau booking » à la création, et copie de chaque confirmation/refus (ancien chemin confirm/reject).
- `RESEND_FROM` (défaut `Carzio <onboarding@resend.dev>`) : passer à `Carzio <contact@carzio.ma>` après vérification du domaine — aucune modification de code nécessaire.
- L'adresse personnelle ayant servi de repli SMTP n'est plus présente dans le code ; sans `SMTP_USER` configuré, Gmail est désactivé proprement (Resend reste).
- Vérifier après déploiement : `GET /api/status` (provider, `smtpVerified`, `emailProvider`), puis un vrai e-mail test depuis l'API (`POST /api/admin/test-email`) vers une adresse perso et vers contact@carzio.ma.

## 10. Ce qui reste à confirmer par le propriétaire

- Frais exacts de livraison à Taghazout, Tamraght et Essaouira.
- Migration Supabase des colonnes d'assurance, vol, extras et demandes spéciales : **faite** (12 lignes `ALTER TABLE` ; `server/add-insurance-columns.sql`).
- DKIM et DMARC Resend chez NindoHost.
- Jeton de vérification Search Console (si nécessaire).
- Date de démarrage éditorial (mardi 10 novembre 2026 ou juillet 2027).
- Langue de rédaction (FR d'abord ou EN d'abord).
- Photos : dossier propriétaire ou visuels neutres Carzio.
