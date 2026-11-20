# Carzio — Suivi quotidien Google Ads

**À remplir chaque jour (2 minutes).** Objectif : savoir si l'argent dépensé produit de vraies demandes, et arrêter à temps si ce n'est pas le cas.

---

## 1. Situation au 20 novembre 2026

| Élément | Valeur |
|---|---|
| Campagnes actives | 7 (6 Search + 1 Smart Maps) |
| Budget total | **~95,60 MAD/jour** (~2 868 MAD/mois) |
| Solde du compte | **0,00 MAD** |
| Paiement en attente | 500,00 MAD (20 nov, Mastercard •••• 5242) |
| Statut du paiement | À vérifier dans Facturation → Transactions |
| Conversion `generate_lead` | **En attente de conversions** |
| Compte Google Ads | 462-074-7929 (contact@carzio.ma) |

> Décision du propriétaire : garder **toutes les campagnes actives**, y compris NL à 40 MAD/jour. Les risques sont documentés dans `marketing/google-ads/owner-brief.md` et dans le journal de compte-rendu.

---

## 2. Checklist quotidienne

À faire chaque matin, avant de répondre aux clients :

- [ ] **Solde** : Facturation → Récapitulatif → Solde. Note la valeur.
- [ ] **Coût veille** : Campagnes → colonne Coût (filtre « Hier » ou « 7 derniers jours »).
- [ ] **Clics / impressions** : Campagnes → Impr. et Clics.
- [ ] **Demandes réelles reçues** (formulaire, WhatsApp, appel) — c'est la seule métrique qui compte.
- [ ] **Termes de recherche** : Campagnes → Mot-clés → **Termes de recherche**. Repère les clics inutiles → à ajouter en mot-clé négatif.
- [ ] **Statut de `generate_lead`** : Conversions → voir si elle passe de « En attente » à actif.

Note la ligne dans un tableau (date, solde, coût veille, clics, demandes, coût par demande).

---

## 3. Checklist hebdomadaire (chaque lundi)

- [ ] Coût total de la semaine vs demandes reçues → **coût par demande**.
- [ ] Comparer avec l'objectif : une demande doit coûter bien moins qu'une location (ex. location ≈ 1 500 MAD).
- [ ] Vérifier que les annonces s'affichent : Outils → **Aperçu et diagnostics des annonces** → mot-clé + Agadir.
- [ ] Vérifier Search Console : impressions/clics organiques en hausse (SEO gratuit).
- [ ] Vérifier le pin Google Maps (adresse MAG N2, aéroport Agadir Massira).

---

## 4. Signaux d'arrêt (ne pas attendre)

Arrêter ou mettre en pause **immédiatement** si l'un de ces cas arrive :

1. Le solde se vide en moins de 3 jours sans **aucune** demande réelle.
2. Le coût par clic grimpe au-dessus de 15 MAD sans conversion.
3. Les termes de recherche montrent des clics hors sujet (assurance, hôtel, autres villes) qui ne disparaissent pas avec les négatifs.
4. Aucune demande après 7 jours avec solde crédité et annonces qui s'affichent.
5. `generate_lead` reste « En attente » après 7 jours avec de vraies demandes.

Dans ces cas : mettre en pause **NL en premier** (40 MAD/jour), puis les autres. Garder Smart Maps à 5,60 MAD/jour.

---

## 5. Règles à ne pas casser

- **Ne pas remettre 500 MAD** avant d'avoir vu au moins une demande réelle attribuée.
- **Ne pas augmenter les budgets** sans décision explicite.
- **Ne pas activer le Réseau Display ni les partenaires de recherche** (déjà désactivés — à garder).
- **Répondre à chaque demande sous 24 h** (WhatsApp + e-mail).
- **Ne pas modifier les mots-clés négatifs** sans noter le changement ici.

---

## 6. Où trouver quoi dans Google Ads

| Ce que je cherche | Chemin |
|---|---|
| Solde du compte | Facturation → Récapitulatif |
| Statut d'un paiement | Facturation → Transactions |
| Coût par campagne | Campagnes → colonne Coût |
| Termes de recherche | Campagnes → Mot-clés → Termes de recherche |
| Conversion `generate_lead` | Conversions (menu de gauche) |
| Statut d'une annonce | Campagnes → colonne Statut / Annonces |
| Aperçu d'une annonce | Outils → Aperçu et diagnostics des annonces |
| Alertes de dépense | Paramètres du compte → Alertes (icône cloche) |

---

## 7. Ce que le site fait déjà de son côté

- Capture du `gclid` et des UTM à l'arrivée, stockage local, envoi avec la réservation → stocké en base avec le statut `pending`.
- Événement `generate_lead` envoyé à chaque demande réussie (GA4).
- Tag Google Ads (`AW-...`) : **pas encore renseigné** — voir `conversion-tracking-setup.md`. Tant que les identifiants ne sont pas remplis, aucune conversion Google Ads ne peut remonter.
- Admin : sélection du statut par demande, export CSV avec attribution.

---

## 8. Historique rapide

- 17 nov : brief owner, 7 campagnes en veille, budget 100 MAD/jour.
- 18-19 nov : audit master, schema, sitemap, footer, liens internes.
- 20 nov : mobile nav accordion déployé ; paiement de 500 MAD ; **toutes les campagnes activées par le propriétaire** ; solde toujours à 0 ; `generate_lead` toujours en attente.