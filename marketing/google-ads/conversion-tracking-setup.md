# Carzio — Mise en place du suivi de conversion Google Ads

**Objectif :** faire passer `generate_lead` de *« En attente de conversions »* à actif, et que chaque demande de réservation soit attribuée à la bonne campagne/mot-clé.

---

## 1. Ce qui est déjà en place (ne pas toucher)

- Le site envoie l'événement **`generate_lead`** à chaque demande de réservation réussie (GA4, ID `G-5475MNNVFP`).
- Le site capture le **`gclid`** et les **UTM** à l'arrivée, les garde pour toute la visite, et les envoie avec la réservation → stockés en base avec le statut `pending`.
- Le code de suivi est dans `src/lib/analytics.ts` (`trackBookingConversion`, `captureAttribution`, `getAttribution`).
- Le formulaire (`BookingModal.tsx`) appelle `trackBookingConversion({ value, carName, days })` après envoi réussi.
- Le backend (`api/index.js`) stocke `gclid`, `utm_*`, `landing_page`, `attribution_captured_at`.

Rien à recoder. Il manque **deux choses** : les identifiants Google Ads, et un vrai test après un clic publicitaire.

---

## 2. Étape A — Vérifier côté GA4 (gratuit, 5 min)

1. Ouvrir **Google Analytics** → propriété Carzio (`G-5475MNNVFP`).
2. **Admin → Événements** : chercher `generate_lead`. Il doit apparaître (envoyé lors du test du 17 nov).
3. **Admin → Conversions** : vérifier que `generate_lead` est marqué comme **conversion**. Si ce n'est pas le cas, l'activer (bouton « Marquer comme conversion »).
4. **Admin → Liens avec Google Ads** : vérifier que le compte Google Ads `462-074-7929` est bien lié. Sans ce lien, Google Ads ne voit jamais les conversions GA4.

> Si l'événement n'apparaît pas dans GA4, c'est que le site n'envoie rien — vérifier que le code est bien déployé et qu'aucun bloqueur ne bloque gtag.

---

## 3. Étape B — (Recommandé) Ajouter le tag Google Ads direct

Le tag direct évite de dépendre uniquement de l'import GA4 → Google Ads. C'est plus fiable et plus rapide.

### 3.1 Récupérer les identifiants dans Google Ads

1. Google Ads → **Outils et paramètres** (icône clé) → **Conversions** → **+ Nouvelle action de conversion**.
2. Choisir **Site web**.
3. Catégorie : **Lead** (ou « Demande de contact »).
4. Nom : `Carzio - Demande de réservation`.
5. Valeur : **Utiliser des valeurs différentes pour chaque conversion** (le site envoie la valeur dynamique).
6. Compter : **Une** par clic.
7. Fenêtre de conversion : 30 jours (défaut).
8. Attribuer à : **Dernier clic**.
9. Créer et continuer → **Installer le tag vous-même**.
10. Copier :
    - l'**ID de conversion** : `AW-XXXXXXXXXX` (ex. `AW-1234567890`)
    - le **libellé** : `AW-XXXXXXXXXX/XXXXXXXXXXXXXXXX`

### 3.2 Les coller dans le code

Fichier : `src/lib/analytics.ts`, lignes 18-19 :

```ts
export const GOOGLE_ADS_ID = 'AW-XXXXXXXXXX';            // <-- remplacer
export const GOOGLE_ADS_BOOKING_LABEL = 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXX'; // <-- remplacer
```

Remplacer les deux valeurs par les vraies. **Ne rien inventer** : si l'identifiant n'est pas récupéré dans Google Ads, laisser tel quel (le code ignore les placeholders).

### 3.3 Rebuild + déployer

```bash
npm run build
git add src/lib/analytics.ts
git commit -m "Fill Google Ads conversion IDs"
git push origin master
```

> Ne faire cette étape qu'après avoir récupéré les vrais identifiants.

---

## 4. Étape C — Test réel (le déclencheur)

C'est cette étape qui fait passer `generate_lead` de *« En attente »* à actif. Sans elle, aucun événement ne remonte.

1. Ouvrir **Google Ads → Outils → Aperçu et diagnostics des annonces**.
2. Choisir le mot-clé `location voiture Agadir` + villé **Agadir**.
3. Si une annonce Carzio apparaît, **cliquer dessus** (c'est un clic réel compté, mais à 0 MAD si pas de conversion facturée — attention, un vrai clic peut être facturé).
4. Sur le site, faire une **vraie réservation** (ou une réservation test avec un nom clair, ex. `TEST CARZIO - IGNORER`).
5. Vérifier dans l'admin que la réservation apparaît avec son `gclid` / UTM.
6. Attendre **24 à 48 h**.

> Alternative moins coûteuse : attendre qu'un vrai visiteur clique sur une annonce et réserve. Mais ça dépend du trafic.

---

## 5. Étape D — Vérifier que ça a marché

Après 24-48 h :

- **Google Ads → Conversions** : `generate_lead` ne doit plus être *« En attente de conversions »*. Le nombre de conversions doit être ≥ 1.
- **Google Analytics → Rapports → Engagement → Événements** : `generate_lead` avec les paramètres (value, currency, item_name).
- **Admin Carzio** : la réservation test apparaît avec `gclid` rempli.

Si rien ne remonte après 48 h :

1. Vérifier dans **Chrome → DevTools → Network** que `gtag` envoie bien l'événement `generate_lead` (filtrer par `google-analytics` / `collect`).
2. Vérifier que le consentement cookies est **accordé** (sinon `ad_storage` reste `denied` et les conversions Google Ads ne partent pas).
3. Vérifier le lien GA4 ↔ Google Ads (étape A.4).
4. Vérifier que `generate_lead` est bien marqué comme conversion dans GA4 (étape A.3).

---

## 6. Point d'attention — devise et valeur

Le code envoie la valeur brute de la réservation avec `currency` par défaut **`EUR`** (`trackBookingConversion`, ligne 98). Les prix du site sont en MAD. À vérifier avec le propriétaire : soit envoyer la devise réelle (MAD), soit convertir. Aujourd'hui, une réservation de 750 MAD est envoyée comme `value: 750, currency: EUR`. Cela peut fausser le ROAS dans Google Ads. **Ne pas modifier sans décision** — le noter dans le brief.

---

## 7. Ce que je ne fais pas

- Je ne remplis pas les identifiants `AW-...` à ta place (je ne les invente pas). Je prépare le code pour les recevoir.
- Je ne lance pas de campagne, je ne change pas de budget, je ne déploie rien sans accord.