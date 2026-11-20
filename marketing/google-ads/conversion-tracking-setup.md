# Carzio - Mise en place du suivi de conversion Google Ads

**Objectif :** faire passer `generate_lead` de *« En attente de conversions »* a actif, et que chaque demande de reservation soit attribuee a la bonne campagne/mot-cle.

---

## 1. Ce qui est deja en place (ne pas toucher)

- Le site envoie l'evenement **`generate_lead`** a chaque demande de reservation reussie (GA4, ID `G-5475MNNVFP`).
- Le site capture le **`gclid`** et les **UTM** a l'arrivee, les garde pour toute la visite, et les envoie avec la reservation -> stockes en base avec le statut `pending`.
- Le code de suivi est dans `src/lib/analytics.ts` (`trackBookingConversion`, `captureAttribution`, `getAttribution`).
- Le formulaire (`BookingModal.tsx`) appelle `trackBookingConversion({ value, carName, days })` apres envoi reussi.
- Le backend (`api/index.js`) stocke `gclid`, `utm_*`, `landing_page`, `attribution_captured_at`.

**Decouverte du 20 nov.** : le site en production emet **deja** le tag Google Ads `AW-18452928840` (requete `pagead/viewthroughconversion/18452928840` visible au chargement de la page). L'ID est donc connu et a ete integre dans le code (`GOOGLE_ADS_ID = 'AW-18452928840'`). **Il ne manque plus que le libelle de conversion** (la partie apres le `/`), specifique a l'action « Demande de reservation ».

Rien d'autre a recoder. Il manque le **libelle** + un vrai test apres un clic publicitaire.

---

## 2. Etape A - Verifier cote GA4 (gratuit, 5 min)

1. Ouvrir **analytics.google.com** -> propriete Carzio (`G-5475MNNVFP`).
2. **Admin -> Evenements** : chercher `generate_lead`. Il doit apparaitre (envoye lors du test du 17 nov).
3. **Admin -> Conversions** : verifier que `generate_lead` est marque comme **conversion**. Si ce n'est pas le cas, l'activer (bouton « Marquer comme conversion »).
4. **Admin -> Liens avec Google Ads** : verifier que le compte Google Ads `462-074-7929` est bien lie. Sans ce lien, Google Ads ne voit jamais les conversions GA4.

> Si l'evenement n'apparait pas dans GA4, c'est que le site n'envoie rien - verifier que le code est bien deploye et qu'aucun bloqueur ne bloque gtag.

---

## 3. Etape B - (Recommande) Ajouter le tag Google Ads direct

Le tag direct evite de dependre uniquement de l'import GA4 -> Google Ads. C'est plus fiable et plus rapide.

### 3.1 Recuperer le libelle dans Google Ads

Le tag account-level `AW-18452928840` existe deja (confirme en ligne). Il faut recuperer le **libelle** de l'action de conversion « Demande de reservation ».

**Si l'action de conversion existe deja** (probable, vu que le tag est en ligne) :
1. Google Ads -> **Outils et parametres** (icone cle) -> **Conversions** (section « Mesure »).
2. Clique sur l'action de conversion **« Demande de reservation »** (ou celle qui correspond).
3. Onglet **Tag setup** / **Configuration du tag**.
4. Repere la ligne **`send_to`** : elle contient `AW-18452928840/XXXXXXXXXXXXXXXX`. Copie la partie apres le `/`.

**Si aucune action de conversion n'existe** :
1. Google Ads -> **Outils et parametres** -> **Conversions** -> **+ Nouvelle action de conversion**.
2. **Site web** -> remplis (Lead, nom `Carzio - Demande de reservation`, valeur dynamique, compter = Une, 30 jours, dernier clic).
3. **Creer et continuer** -> **Installer le tag vous-meme**.
4. Copie la valeur **Libelle** : `AW-18452928840/XXXXXXXXXXXXXXXX`.

5. **Envoie-moi le libelle** (la partie apres le `/`, ex. `AbCdEfGhIjKlMnOp`). L'ID est deja connu : `AW-18452928840`.

### 3.2 Coller le libelle dans le code

L'ID est deja integre (`AW-18452928840`). Il ne reste que le libelle.

Fichier : `src/lib/analytics.ts`, ligne 19 :

```ts
export const GOOGLE_ADS_BOOKING_LABEL = 'AW-18452928840/XXXXXXXXXXXXXXXX'; // <-- remplacer XXXXXXXXXXXXXXXX par le libelle
```

Remplacer `XXXXXXXXXXXXXXXX` par le libelle recupere a l'etape 3.1. **Ne rien inventer** : si le libelle n'est pas recupere dans Google Ads, laisser tel quel (le code ignore les placeholders).

### 3.3 Rebuild + deployer

```bash
npm run build
git add src/lib/analytics.ts
git commit -m "Fill Google Ads conversion label"
git push origin master
```

> Ne faire cette etape qu'apres avoir recupere le vrai libelle.

---

## 4. Etape C - Test reel (le declencheur)

C'est cette etape qui fait passer `generate_lead` de *« En attente »* a actif. Sans elle, aucun evenement ne remonte.

1. Ouvrir **Google Ads -> Outils -> Apercu et diagnostics des annonces**.
2. Choisir le mot-cle `location voiture Agadir` + ville **Agadir**.
3. Si une annonce Carzio apparait, **cliquer dessus** (c'est un clic reel compte, mais a 0 MAD si pas de conversion facturee - attention, un vrai clic peut etre facture).
4. Sur le site, faire une **vraie reservation** (ou une reservation test avec un nom clair, ex. `TEST CARZIO - IGNORER`).
5. Verifier dans l'admin que la reservation apparait avec son `gclid` / UTM.
6. Attendre **24 a 48 h**.

> Alternative moins couteuse : attendre qu'un vrai visiteur clique sur une annonce et reserve. Mais ca depend du trafic.

---

## 5. Etape D - Verifier que ca a marche

Apres 24-48 h :

- **Google Ads -> Conversions** : `generate_lead` ne doit plus etre *« En attente de conversions »*. Le nombre de conversions doit etre >= 1.
- **Google Analytics -> Rapports -> Engagement -> Evenements** : `generate_lead` avec les parametres (value, currency, item_name).
- **Admin Carzio** : la reservation test apparait avec `gclid` rempli.

Si rien ne remonte apres 48 h :

1. Verifier dans **Chrome -> DevTools -> Network** que `gtag` envoie bien l'evenement `generate_lead` (filtrer par `google-analytics` / `collect`).
2. Verifier que le consentement cookies est **accorde** (sinon `ad_storage` reste `denied` et les conversions Google Ads ne partent pas).
3. Verifier le lien GA4 <-> Google Ads (etape A.4).
4. Verifier que `generate_lead` est bien marque comme conversion dans GA4 (etape A.3).

---

## 6. Point d'attention - devise et valeur

Le code envoie la valeur brute de la reservation avec `currency` par defaut **`EUR`** (`trackBookingConversion`, ligne 98). Les prix du site sont en MAD. A verifier avec le proprietaire : soit envoyer la devise reelle (MAD), soit convertir. Aujourd'hui, une reservation de 750 MAD est envoyee comme `value: 750, currency: EUR`. Cela peut fausser le ROAS dans Google Ads. **Ne pas modifier sans decision** - le noter dans le brief.

---

## 7. Ce que je ne fais pas

- Je ne remplis pas le libelle `AW-...` a ta place (je ne l'invente pas). Je prepare le code pour le recevoir.
- Je ne lance pas de campagne, je ne change pas de budget, je ne deploie rien sans accord.