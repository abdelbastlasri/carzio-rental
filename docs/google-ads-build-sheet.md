# Carzio — Feuille de construction Google Ads

Document interne. **Rien n'est lancé et aucun euro n'est dépensé sans accord explicite du propriétaire.**
Devise du compte : MAD. Budget total maximum : **3 000 MAD/mois** (environ 100 MAD/jour), 2 campagnes maximum.

> Contexte honnête : 3 000 MAD/mois est un budget de test, pas un budget de croissance. Il permet de mesurer le coût par réservation sur une zone limitée. Il ne suffit pas pour dominer Agadir, Marrakech et Casablanca en même temps.

## 1. Prérequis avant de créer une campagne

1. Compte Google Ads relié au compte Google du propriétaire.
2. Moyen de paiement valide et plafond mensuel réglé à 3 000 MAD.
3. GA4 `G-5475MNNVFP` relié à Google Ads.
4. Événements GA4 marqués comme conversions :
   - clic WhatsApp ;
   - envoi du formulaire de réservation ;
   - clic sur le numéro de téléphone.
5. Numéro de téléphone et WhatsApp identiques partout : +212 680 318003.
6. Page de destination vérifiée sur mobile (390 px) et desktop.
7. Les 6 pages villes et les 5 pages FAQ répondent en HTTPS sur `www.carzio.ma`.

Ne pas lancer si l'un de ces points manque : les conversions seraient fausses.

## 2. Structure (2 campagnes)

### Campagne 1 — Search Agadir Aéroport

| Réglage | Valeur |
|---|---|
| Type | Search |
| Budget | 80 MAD/jour |
| Réseau | Recherche uniquement (désactiver Display) |
| Zones | Agadir + 30 km, Maroc ; priorité aux voyageurs déjà sur place |
| Langues | Français, Anglais |
| Stratégie d'enchères | Maximiser les clics avec plafond CPC de 4 MAD (phase de test) |
| Pages finales | `/location-voiture-agadir` et `/cars` |

Groupes d'annonces :

**G1 — Location voiture Agadir**
- `[location voiture agadir]`
- `"location de voiture agadir"`
- `"louer une voiture agadir"`
- `[location voiture agadir aeroport]`
- `"location voiture aeroport agadir"`

**G2 — Anglais**
- `[car rental agadir airport]`
- `"car hire agadir"`
- `"rent a car agadir"`
- `"agadir airport car rental"`

### Campagne 2 — Search Livraison Marrakech & Casablanca

| Réglage | Valeur |
|---|---|
| Type | Search |
| Budget | 20 MAD/jour |
| Réseau | Recherche uniquement |
| Zones | Marrakech, Casablanca + 30 km |
| Langues | Français, Anglais |
| Stratégie | Maximiser les clics, plafond CPC 4 MAD |
| Pages finales | `/location-voiture-marrakech` et `/location-voiture-casablanca` |

Groupes d'annonces :

**G3 — Marrakech**
- `[location voiture marrakech]`
- `"location voiture marrakech aeroport"`
- `"car rental marrakech airport"`

**G4 — Casablanca**
- `[location voiture casablanca]`
- `"location voiture casablanca aeroport"`
- `"car rental casablanca airport"`

Total : 80 + 20 = **100 MAD/jour**, soit environ 3 000 MAD sur 30 jours.

## 3. Annonces responsives (RSA)

### RSA français — G1

Titres (30 caractères maximum) :
1. Location Voiture Agadir
2. Aéroport Al Massira
3. Dès 25 €/Jour
4. 0 MAD de Caution
5. Annulation Gratuite
6. Assurance Incluse
7. Kilométrage Illimité
8. 12 Voitures Récentes
9. Livraison Aéroport
10. Réponse sous 24 h
11. Sans Frais Cachés
12. Réservez sur WhatsApp

Descriptions (90 caractères maximum) :
1. 12 voitures dès 25 €/jour à Agadir. Assurance incluse et 0 MAD de caution.
2. Livraison gratuite à l'aéroport Agadir Al Massira. Kilométrage illimité.
3. Minimum 3 jours. Annulation gratuite jusqu'à 24 h avant la prise en charge.
4. Paiement à la remise des clés. Devis confirmé avant réservation.

### RSA anglais — G2

Titres :
1. Car Rental Agadir
2. Agadir Airport Delivery
3. From €25 per Day
4. 0 MAD Deposit
5. Free Cancellation
6. Insurance Included
7. Unlimited Mileage
8. 12 Recent Cars
9. Book on WhatsApp
10. Reply Within 24 h

Descriptions :
1. 12 cars from €25/day in Agadir. Insurance included, 0 MAD deposit.
2. Free delivery at Agadir Al Massira Airport. Unlimited mileage.
3. Minimum 3 days. Free cancellation up to 24 h before pickup.
4. Pay on key handover. Quote confirmed before you book.

### RSA français — G3 / G4

Réutiliser les titres et descriptions de G1 en remplaçant « Agadir » par « Marrakech » ou « Casablanca », et remplacer « Livraison gratuite » par « Livraison aéroport 80 € ».
Ne pas promettre la gratuité à Marrakech ou Casablanca.

## 4. Extensions

**Liens annexes (sitelinks)**
- Nos voitures → `/cars`
- FAQ → `/faq`
- Assurance → `/faq/assurance`
- Conditions → `/terms`

**Accroches (callouts)**
- 0 MAD de caution
- Assurance incluse
- Kilométrage illimité
- Annulation gratuite
- 2e conducteur gratuit
- Siège bébé gratuit

**Extrait de structure**
- Types : Location de voiture
- Modèles : Citadine, SUV, Automatique

**Appel**
- +212 680 318003, suivi des appels activé.

Ne pas utiliser d'extension d'avis tant que les avis ne sont pas vérifiables dans le compte.

## 5. Mots-clés négatifs (liste de départ)

`gratuit`, `gratuite`, `pas cher gratuit`, `emploi`, `recrutement`, `stage`, `occasion`, `vente`, `leasing`, `longue durée`, `location longue durée`, `camping car`, `moto`, `scooter`, `taxi`, `vtc`, `chauffeur`, `avec chauffeur`, `car ferries`, `bateau`, `hôtel`, `vol`, `billet avion`.

Ajouter les négatifs issus du rapport de recherche de termes chaque semaine.

## 6. Suivi et pilotage

À vérifier chaque semaine :

- impressions, clics, CTR, CPC moyen ;
- coût total vs 3 000 MAD ;
- nombre de clics WhatsApp et de formulaires ;
- réservations confirmées et coût par réservation ;
- termes de recherche → ajouter les négatifs.

Règles d'arrêt :

- Aucune réservation après 1 000 MAD dépensés → mettre en pause et revoir les annonces et les pages.
- CPC moyen supérieur à 6 MAD → baisser le plafond ou resserrer les mots-clés.
- Campagne 2 sans conversion après 400 MAD → la mettre en pause.

## 7. Message public à conserver partout

« Assurance complète disponible · 0 MAD de franchise dès 5 jours »

Ne jamais écrire « à partir de 7 jours » : la règle est **5 jours**.

## 8. Ce qui n'est pas autorisé

- Dépasser 3 000 MAD/mois ou créer une 3e campagne sans accord.
- Afficher un faux prix, une fausse promotion ou un faux avis.
- Promettre une place en tête des résultats.
- Envoyer le trafic vers une page qui ne correspond pas à l'annonce.
- Lancer avant que le suivi des conversions soit vérifié.
