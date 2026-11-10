# Carzio — owner actions runbook

Last checked: 2026-11-10

Everything below is outside the repository: DNS zones, Google Search Console and
the Google Business Profile. The code side is already in place; this file lists
the exact remaining steps and the evidence we have for each one.

---

## 1. E-mail deliverability — DNS records still missing

**Status of the sending setup (production, `/api/status`):**

| Check | Value |
|---|---|
| SMTP host | `smtp.gmail.com:587` (Google) |
| SMTP user | `c***@carzio.ma` |
| SMTP verified | **yes** (`smtpVerified: true`, `smtpError: null`) |
| Effective primary | **Gmail** (`emailPrimary: "gmail"`), Resend as automatic fallback |
| Live test | `POST https://www.carzio.ma/api/contacts` → **HTTP 201**, `notification: "sent"` (row `CT-1794308448944-xj48`) |

**What is already in DNS for `carzio.ma`:**

| Record | Type | Value | Status |
|---|---|---|---|
| `carzio.ma` | MX | `SMTP.GOOGLE.COM` | ✅ present |
| `google._domainkey.carzio.ma` | TXT | `v=DKIM1; k=rsa; p=…` | ✅ present (Gmail DKIM) |
| `carzio.ma` | TXT | `google-site-verification=…` | ✅ present (Search Console) |
| `carzio.ma` | TXT | **SPF missing** | ❌ to add |
| `_dmarc.carzio.ma` | TXT | **DMARC missing** | ❌ to add |
| `resend._domainkey.carzio.ma` | TXT | **Resend DKIM missing** | ❌ to add (only needed for the fallback provider) |

**Records to add**

1. **SPF** — TXT on the apex `carzio.ma` (single record, do not add a second SPF record):

   ```
   v=spf1 include:_spf.google.com include:resend.com ~all
   ```

2. **DMARC** — TXT on `_dmarc.carzio.ma`. Start in monitoring mode, then tighten
   once the reports look clean:

   ```
   v=DMARC1; p=none; rua=mailto:contact@carzio.ma; fo=1
   ```

   After a few weeks of clean reports, move to `p=quarantine` and then `p=reject`.

3. **Resend DKIM** (only if you want to keep Resend as a working fallback) —
   copy the TXT record from Resend → Domains → `carzio.ma` → DKIM. The record
   name is `resend._domainkey.carzio.ma` (Resend also shows a CNAME variant —
   use exactly what their dashboard shows).

Until at least SPF exists, the Gmail sender still works (Google signs with its
own domain), but SPF alignment for `carzio.ma` is missing, which hurts
deliverability to other providers.

---

## 2. Google Search Console

**Evidence already gathered (no action needed to prepare):**

- `https://www.carzio.ma/robots.txt` → 200, `Allow: /` + `Sitemap: https://www.carzio.ma/sitemap.xml`
- `https://www.carzio.ma/sitemap.xml` → 200, valid XML, **117 URLs**, hreflang
  alternates for `en / fr / de / es / pl` + `x-default`
- **All 117 sitemap URLs return HTTP 200** (checked 2026-11-10)
- The `google-site-verification` TXT record is already published

**Remaining steps (need your Google account):**

1. Open <https://search.google.com/search-console> and add the
   *Domain property* `carzio.ma` (the TXT record is already there, so it will
   verify immediately).
2. Sitemaps → submit `https://www.carzio.ma/sitemap.xml`.
3. URL Inspection → test `https://www.carzio.ma/` and `https://www.carzio.ma/en/privacy`.
4. Check **Settings → Hreflang**: the `x-default` tag points to the English
   version of each page (fixed in the code on 2026-11-10).

---

## 3. Google Business Profile — “from 5 days”

The website itself never said “from 7 days” (verified by a full-text search of
the source and of the five locale files) — it says:

> Full Insurance from 5 days — a surcharge of 10 € per day when the vehicle is in
> the higher band, available only from 5 billed days.

So only the **Business Profile** listing needs updating. Suggested replacement
description (paste it into the profile “Business description” field):

```
Car rental at Agadir Al Massira Airport (Carzio). Free delivery at the
airport and at our Agadir agency. 0 MAD deposit, no card hold, payment at key
handover. Full Insurance from 5 days. Minimum rental 72 hours, billed in
24-hour blocks. Free second driver, free baby seat and booster. Unlimited
kilometres. Delivery to Marrakech and Casablanca: 80 € per trip; Taghazout,
Tamraght and Essaouira on request. Open 24/7 at Agadir Al Massira airport.
```

---

## 4. Re-run the live checks after the DNS change

```powershell
# SPF
nslookup -type=TXT carzio.ma
# DMARC
nslookup -type=TXT _dmarc.carzio.ma
# Resend DKIM
nslookup -type=TXT resend._domainkey.carzio.ma
# Contact form end-to-end (one message, then check the inbox)
curl.exe -s -X POST https://www.carzio.ma/api/contacts `
  -H "Content-Type: application/json" `
  --data-binary "@contact-test.json"
```

Expected response: `"notification":"sent"`.
