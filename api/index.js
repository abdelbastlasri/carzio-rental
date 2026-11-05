import express from 'express';
import cors from 'cors';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.warn('WARNING: ADMIN_PASSWORD env var not set — the admin API is disabled. Set it in Vercel before using admin panel.');
}
const TOKEN_SECRET = crypto.createHash('sha256').update(ADMIN_PASSWORD || crypto.randomBytes(32).toString('hex')).digest('hex');
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');

// Sanitize SMTP credentials before use.
// Gmail App Passwords are often pasted grouped like "abcd efgh ijkl mnop"
// (with spaces) or with quotes/newlines attached. Gmail then replies
// "535-5.7.8 Username and Password not accepted" even when the password
// itself is correct. Stripping whitespace/quotes fixes that exact case.
const rawPass = process.env.SMTP_PASS || '';
const cleanValue = (v) => String(v || '').trim().replace(/^["']|["']$/g, '');
// Fallback login account removed from source. When SMTP_USER is unset, Gmail
// stays disabled and Resend is used instead — fail loudly and never ship a
// personal address in the public repo.
const SMTP_USER = cleanValue(process.env.SMTP_USER || '');
const SMTP_PASS = cleanValue(rawPass).replace(/\s+/g, '');
// Destination for owner notifications (new-booking alerts and confirm/reject
// owner copies). Defaults to contact@carzio.ma; override with ADMIN_NOTIFY_EMAIL.
const ADMIN_NOTIFY_EMAIL = cleanValue(process.env.ADMIN_NOTIFY_EMAIL || 'contact@carzio.ma');
// Provider preference: 'resend' (default, out-of-the-box) or 'gmail' (send from
// the configured Gmail account first — e.g. while carzio.ma is not yet verified
// in Resend). Either way the other provider remains an automatic fallback.
const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || 'resend').trim().toLowerCase();
// Diagnostic: true when the value was actually provided by the environment
// (Vercel), false when the fallback above is in effect.
const smtpUserFromEnv = !!process.env.SMTP_USER;
const smtpPassFromEnv = !!process.env.SMTP_PASS;
// Optional: the address shown as sender. Defaults to SMTP_USER.
// Useful when authenticating as a real Gmail account (SMTP_USER)
// but displaying a branded address (must be a verified "Send mail as" alias).
const SMTP_FROM = process.env.SMTP_FROM ? cleanValue(process.env.SMTP_FROM) : SMTP_USER;

const smtpCredentialShape = SMTP_PASS
  ? {
      length: SMTP_PASS.length,
      originalHadSpaces: /\s/.test(rawPass),
      originalHadQuotes: /["']/.test(rawPass),
      is16Chars: SMTP_PASS.length === 16,
      allLowerLetters: /^[a-z]{16}$/.test(SMTP_PASS),
    }
  : null;

console.log(`[SMTP] host=${SMTP_HOST}:${SMTP_PORT} user=${maskEmail(SMTP_USER)} from=${maskEmail(SMTP_FROM)} configured=${!!(SMTP_USER && SMTP_PASS)} passLength=${SMTP_PASS ? SMTP_PASS.length : 0}`);

// ===== Runtime SMTP config (set from the admin panel) =====
// The admin dashboard can store working SMTP credentials in Supabase so the
// site owner never needs to touch Vercel env vars. Stored as a hidden marker
// row inside the existing `bookings` table (no schema change) and hidden from
// every booking listing below.
const SMTP_BEACON_ID = 'SMTP-CONFIG-ROOT';
let dbSmtp = null; // { user, pass } provided by the admin panel
let dbSmtpLoaded = false;

async function loadDbSmtp() {
  if (dbSmtpLoaded || !supabase) return;
  dbSmtpLoaded = true;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('customer_email, customer_phone')
      .eq('id', SMTP_BEACON_ID)
      .maybeSingle();
    if (error) throw error;
    if (data && (data.customer_email || data.customer_phone)) {
      const dbU = cleanValue(data.customer_email);
      const dbP = cleanValue(data.customer_phone).replace(/\s+/g, '');
      dbSmtp = { user: dbU, pass: dbP };
      console.log('[SMTP] using credentials stored from the admin panel');
    }
  } catch (e) {
    console.warn('[SMTP] could not load stored credentials:', e.message);
  }
}

function activeSmtpUser() { return SMTP_USER || dbSmtp?.user; }
function activeSmtpPass() { return SMTP_PASS || dbSmtp?.pass; }
// Sender (From:) must match the account that authenticates — Gmail rejects
// messages whose From doesn't belong to the authenticated account.
function activeSmtpFrom() { return SMTP_FROM || dbSmtp?.user || SMTP_USER; }

// ===== Resend =====
// Resend is an HTTP email API with no password to revoke. Default order is
// Resend → Gmail fallback; set EMAIL_PROVIDER=gmail to flip the order while
// carzio.ma is not yet a verified sending domain. Which provider is primary is
// a pure env decision — both stay available as fallbacks either way.
const RESEND_BEACON_ID = 'RESEND-CONFIG-ROOT';
// Used until carzio.ma is verified as a sending domain in Resend. Resend only
// allows this address while the domain is unverified.
const RESEND_DEFAULT_FROM = 'Carzio <onboarding@resend.dev>';
// After carzio.ma is verified as a sending domain in Resend (DKIM+DMARC), set
// RESEND_FROM=Carzio <contact@carzio.ma> in Vercel — no code change needed.
const RESEND_FROM_ENV = cleanValue(process.env.RESEND_FROM || '');
let dbResend = null; // { key, from, enabled }
let dbResendLoaded = false;
let resendVerify = { verified: false, lastError: null, checkedAt: null };

async function loadDbResend() {
  if (dbResendLoaded || !supabase) return;
  dbResendLoaded = true;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('customer_email, customer_phone, status')
      .eq('id', RESEND_BEACON_ID)
      .maybeSingle();
    if (error) throw error;
    if (data && (data.customer_email || data.customer_phone)) {
      dbResend = {
        key: cleanValue(data.customer_email),
        from: cleanValue(data.customer_phone),
        enabled: data.status !== 'disabled',
      };
      console.log('[Resend] using API key stored from the admin panel');
    }
  } catch (e) {
    console.warn('[Resend] could not load stored key:', e.message);
  }
}

function resendActive() { return !!(dbResend?.key && dbResend.enabled); }
function resendFrom() { return dbResend?.from || RESEND_FROM_ENV || RESEND_DEFAULT_FROM; }

async function resendSend({ to, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${dbResend.key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: resendFrom(), to: [to], subject, html, text }),
  });
  const raw = await res.text();
  let parsed = {};
  try { parsed = JSON.parse(raw); } catch { /* non-JSON error body */ }
  if (!res.ok) {
    const detail = parsed?.message || parsed?.name || raw.slice(0, 180);
    throw new Error(`Resend (HTTP ${res.status}): ${detail}`);
  }
  return parsed;
}

// Cheap authenticated read: proves the key is live without sending any mail.
async function verifyResend(force = false) {
  await loadDbResend();
  if (!dbResend?.key) {
    resendVerify = { verified: false, lastError: 'Resend API key not configured', checkedAt: new Date().toISOString() };
    return resendVerify;
  }
  if (!force && resendVerify.checkedAt && (Date.now() - new Date(resendVerify.checkedAt).getTime()) < 60000) {
    return resendVerify;
  }
  try {
    const res = await fetch('https://api.resend.com/domains', { headers: { 'Authorization': `Bearer ${dbResend.key}` } });
    if (!res.ok) throw new Error(`Resend rejected the API key (HTTP ${res.status})`);
    resendVerify = { verified: true, lastError: null, checkedAt: new Date().toISOString() };
  } catch (err) {
    resendVerify = { verified: false, lastError: err.message, checkedAt: new Date().toISOString() };
  }
  return resendVerify;
}


let supabase;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

let transporter = null;
let smtpVerify = { verified: false, lastError: null, checkedAt: null };

function getTransporter() {
  const u = activeSmtpUser();
  const p = activeSmtpPass();
  if (!p || !u) return null;
  // Recreate the transporter if the active credentials changed (e.g. saved
  // from the admin panel while the server stayed warm).
  if (transporter && transporter.options && transporter.options.auth &&
      transporter.options.auth.user === u && transporter.options.auth.pass === p) {
    return transporter;
  }
  try {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: u, pass: p },
    });
  } catch (e) {
    console.warn('Nodemailer not available:', e.message);
  }
  return transporter;
}

async function verifySmtp(force = false) {
  await loadDbSmtp();
  await loadDbResend();
  // Resend is the primary sender: a live API key is all that is required, and
  // unlike an App Password it cannot be revoked without notice.
  if (resendActive()) {
    const r = await verifyResend(force);
    if (r.verified) {
      smtpVerify = { verified: true, lastError: null, checkedAt: new Date().toISOString() };
      return smtpVerify;
    }
    console.warn('[Resend] verification failed — falling back to Gmail:', r.lastError);
  }
  if (!SMTP_PASS && !dbSmtp?.pass) {
    smtpVerify = { verified: false, lastError: 'SMTP credentials not configured (SMTP_USER / SMTP_PASS)', checkedAt: new Date().toISOString() };
    return smtpVerify;
  }
  const t = getTransporter();
  if (!t) {
    smtpVerify = { verified: false, lastError: 'Transporter creation failed', checkedAt: new Date().toISOString() };
    return smtpVerify;
  }
  // Cache verification result for 60s; force refreshes (used by test-email)
  if (!force && smtpVerify.checkedAt && (Date.now() - new Date(smtpVerify.checkedAt).getTime()) < 60000) {
    return smtpVerify;
  }
  try {
    await t.verify();
    smtpVerify = { verified: true, lastError: null, checkedAt: new Date().toISOString() };
  } catch (err) {
    smtpVerify = { verified: false, lastError: err.message, checkedAt: new Date().toISOString() };
    transporter = null;
  }
  return smtpVerify;
}

app.use(cors());
app.use(express.json());

function toSnake(obj) {
  const out = {};
  for (const key in obj) {
    const snake = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    out[snake] = obj[key];
  }
  return out;
}

// ===== Rate limiting (best-effort, per serverless instance) =====
// Slows brute force and form spam. Not a DDoS defense; the real protection for
// the admin panel is the password + token model.
const rateBuckets = new Map();
function rateLimitOk(key, max, windowMs) {
  const now = Date.now();
  const fresh = (rateBuckets.get(key) || []).filter((ts) => now - ts < windowMs);
  if (fresh.length >= max) { rateBuckets.set(key, fresh); return false; }
  fresh.push(now);
  rateBuckets.set(key, fresh);
  return true;
}
function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || (req.socket && req.socket.remoteAddress) || 'unknown';
}
function rateLimit(max, windowMs) {
  return (req, res, next) => {
    if (!rateLimitOk(`${req.path}:${clientIp(req)}`, max, windowMs)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    next();
  };
}

function maskEmail(email) {
  if (!email || typeof email !== 'string') return null;
  const at = email.indexOf('@');
  if (at <= 0) return email;
  return email.slice(0, 1) + '***' + email.slice(at);
}

function generateToken() {
  const payload = { t: Date.now(), e: Date.now() + 86400000, s: crypto.randomBytes(8).toString('hex') };
  const data = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET).update(data).digest('hex');
  return Buffer.from(JSON.stringify({ d: data, h: hmac })).toString('base64');
}

function verifyToken(token) {
  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64').toString());
    const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(parsed.d).digest('hex');
    if (expected !== parsed.h) return false;
    const payload = JSON.parse(parsed.d);
    return payload.e > Date.now();
  } catch { return false; }
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ') || !verifyToken(auth.slice(7))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

async function sendEmail({ to, subject, html, text }) {
  await loadDbSmtp();
  await loadDbResend();
  const plainText = text || stripHtml(html);
  const gmailConfigured = !!(activeSmtpUser() && activeSmtpPass());

  const gmailSend = async () => {
    const t = await getTransporter();
    if (!t) {
      const reason = !activeSmtpPass() || !activeSmtpUser() ? 'SMTP not configured (email address / 16-letter password are empty)' : 'Transporter unavailable';
      console.warn(`Email not sent - ${reason}`);
      return { ok: false, error: reason };
    }
    try {
      await t.sendMail({
        from: activeSmtpFrom(),
        to,
        subject,
        text: plainText,
        html,
        headers: {
          'Precedence': 'bulk',
          'List-Unsubscribe': '<mailto:contact@carzio.ma?subject=unsubscribe>',
        },
      });
      console.log(`Email sent to ${to}: ${subject} via Gmail`);
      return { ok: true, provider: 'gmail' };
    } catch (err) {
      console.error(`Failed to send email to ${to} (${subject}) via ${SMTP_HOST}:${SMTP_PORT} from ${activeSmtpUser()}:`, err);
      transporter = null;
      return { ok: false, error: err && err.message ? err.message : String(err) };
    }
  };
  const resendSendWrapped = async () => {
    try {
      const sent = await resendSend({ to, subject, html, text: plainText });
      console.log(`Email sent to ${to}: ${subject} via Resend (id ${sent?.id || 'n/a'})`);
      return { ok: true, provider: 'resend' };
    } catch (err) {
      console.error(`Resend failed for ${to} (${subject}):`, err.message);
      return { ok: false, error: err.message };
    }
  };

  // Default: Resend first (as before). EMAIL_PROVIDER=gmail flips the order —
  // the practical fix while carzio.ma is not yet verified in Resend, because
  // onboarding@resend.dev can only deliver to the Resend account owner.
  if (EMAIL_PROVIDER === 'gmail' && gmailConfigured) {
    const g = await gmailSend();
    if (g.ok) return g;
    console.error('Gmail path failed — falling back to Resend:', g.error);
    if (resendActive()) {
      const r = await resendSendWrapped();
      if (r.ok) return r;
    }
    return g;
  }
  if (resendActive()) {
    const r = await resendSendWrapped();
    if (r.ok) return r;
    console.error('Resend primary path failed — falling back to Gmail.');
    return gmailSend();
  }
  return gmailSend();
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function humanPaymentMethod(m) {
  return m === 'payment_upon_delivery' ? 'Payment at key handover' : (m ? String(m).replace(/_/g, ' ') : '');
}

function safeExtras(extras) {
  let list = extras;
  if (typeof extras === 'string') {
    try { list = JSON.parse(extras); } catch { list = extras.trim() ? [extras] : []; }
  }
  if (Array.isArray(list)) return list.filter(Boolean).map(String);
  return list == null ? [] : [String(list)];
}

function formatExtras(extras) {
  return safeExtras(extras)
    .map((n) => `${esc(n)}${/baby seat|booster seat/i.test(n) ? ' (Free)' : ''}`)
    .join(', ');
}

function billedDaysJs(pickupDate, dropoffDate, pickupTime, dropoffTime) {
  if (!pickupDate || !dropoffDate) return null;
  const start = new Date(`${pickupDate}T${pickupTime || '00:00'}:00`);
  const end = new Date(`${dropoffDate}T${dropoffTime || '00:00'}:00`);
  const ms = end - start;
  if (!(ms > 0)) return null;
  return Math.ceil(ms / 86400000);
}

function insuranceRow(b) {
  if (!b.insuranceType) return '';
  // Business rule: Full Risk is only valid from 5 billed days. A 3-4 day
  // booking must always show Standard Insurance in customer emails.
  const days = Number(b.days) || billedDaysJs(b.pickupDate, b.dropoffDate, b.pickupTime, b.dropoffTime) || 0;
  const wantsFull = b.fullInsurance || b.insuranceType === 'full';
  const full = wantsFull && days >= 5;
  const label = full ? 'Full Risk Insurance' : 'Standard Insurance';
  const note = full ? 'Included in the total price' : 'Included';
  return row('Insurance', `${label} — ${note}`);
}

function row(label, valueHtml) {
  return `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">${esc(label)}</div><div style="color:#1f2937;font-size:15px;font-weight:600">${valueHtml}</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>`;
}

function bookingDetailRows(b) {
  const parts = [];
  const add = (label, value) => {
    if (value === undefined || value === null || value === '') return;
    parts.push(row(label, typeof value === 'string' ? esc(value) : value));
  };
  const days = b.days || billedDaysJs(b.pickupDate, b.dropoffDate, b.pickupTime, b.dropoffTime);
  add('Phone', b.phone);
  add('Email', b.email);
  add('Age', b.age);
  add('Flight number', b.flightNumber);
  add('Billed days', days ? `${days} day(s)` : '');
  add('Extras', formatExtras(b.extras));
  add('Special requests', b.specialRequests);
  if (b.transportFee > 0) parts.push(row('Transport fee', `<div style="color:#b8860b;font-size:15px;font-weight:600">${esc(b.transportFee)} EUR</div>`));
  parts.push(insuranceRow(b));
  add('Payment method', humanPaymentMethod(b.paymentMethod));
  if (b.noDepositAgreed) parts.push(row('No deposit policy', 'Accepted'));
  return parts.filter(Boolean).join('');
}

function bookingEmailTemplate(b) {
  const { name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, status, paymentMethod } = b;
  const safe = { name: esc(name), carName: esc(carName), pickupLocation: esc(pickupLocation), dropoffLocation: esc(dropoffLocation), email: esc(b.email || ''), phone: esc(b.phone || ''), paymentMethod: esc(humanPaymentMethod(paymentMethod) || '') };
  const statusText = status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Not Available' : 'Pending Review';
  const greeting = status === 'pending'
    ? `<p style="margin:0 0 12px 0">Hello ${safe.name},</p><p style="margin:0">Your booking request has been received. We will review availability and get back to you soon.</p>`
    : status === 'confirmed'
    ? `<p style="margin:0 0 12px 0">Hello ${safe.name},</p><p style="margin:0">Your booking has been confirmed. We look forward to serving you.</p>`
    : `<p style="margin:0 0 12px 0">Hello ${safe.name},</p><p style="margin:0">The vehicle is not available for your requested dates. Please visit carzio.ma to browse other options.</p>`;
  const subject = status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Not Available' : 'Request Received';
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:0;font-size:14px;line-height:1.5">
<table cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:24px 16px"><tr><td>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;padding-bottom:24px">
<img src="https://www.carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:40px;border:0"/>
<h1 style="color:#b8860b;font-size:20px;margin:10px 0 0 0;font-weight:700">${subject}</h1>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;margin-bottom:8px"><tr><td style="padding:20px 24px">
${greeting}
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;margin-bottom:8px"><tr><td style="padding:20px 24px">
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Booking ID</div><div style="color:#1f2937;font-size:15px;font-weight:600">${bookingId}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Vehicle</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.carName}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Pickup</div><div style="color:#1f2937;font-size:15px;font-weight:600">${pickupDate} at ${pickupTime} &#8212; ${safe.pickupLocation}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Return</div><div style="color:#1f2937;font-size:15px;font-weight:600">${dropoffDate} at ${dropoffTime} &#8212; ${safe.dropoffLocation}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Total</div><div style="color:#b8860b;font-size:15px;font-weight:600">${totalPrice} EUR</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Status</div><div style="color:${status === 'confirmed' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#d97706'};font-weight:700;font-size:15px">${statusText}</div>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;margin-bottom:8px"><tr><td style="padding:16px 24px"><p style="margin:0">We will contact you via Email or WhatsApp.</p></td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb"><tr><td style="padding:16px 24px">
${bookingDetailRows(b)}
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;color:#9ca3af;font-size:11px;padding-top:20px">
<p style="margin:0 0 4px 0"><strong>Carzio</strong> &#8212; MAG N2, Agadir Airport</p>
<p style="margin:0">contact@carzio.ma &#8212; +212 680-318003</p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

function adminPendingEmailTemplate(b) {
  const { name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, paymentMethod } = b;
  const safe = { name: esc(name), carName: esc(carName), pickupLocation: esc(pickupLocation), dropoffLocation: esc(dropoffLocation), email: esc(b.email || ''), phone: esc(b.phone || ''), paymentMethod: esc(humanPaymentMethod(paymentMethod) || '') };
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:0;font-size:14px;line-height:1.5">
<table cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:24px 16px"><tr><td>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;padding-bottom:24px">
<img src="https://www.carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:40px;border:0"/>
<h1 style="color:#b8860b;font-size:20px;margin:10px 0 0 0;font-weight:700">New Booking Request</h1>
<span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;margin-top:6px">Pending Review</span>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;margin-bottom:8px"><tr><td style="padding:20px 24px">
<p style="margin:0 0 8px 0">Hello <strong>Carzio Team</strong>,</p>
<p style="margin:0">A new booking request has been submitted by <strong>${safe.name}</strong>. Review the details below.</p>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;margin-bottom:8px"><tr><td style="padding:20px 24px">
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Booking ID</div><div style="color:#1f2937;font-size:15px;font-weight:600">${bookingId}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Customer</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.name}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Vehicle</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.carName}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Pickup</div><div style="color:#1f2937;font-size:15px;font-weight:600">${pickupDate} at ${pickupTime} &#8212; ${safe.pickupLocation}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Return</div><div style="color:#1f2937;font-size:15px;font-weight:600">${dropoffDate} at ${dropoffTime} &#8212; ${safe.dropoffLocation}</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Total</div><div style="color:#b8860b;font-size:15px;font-weight:600">${totalPrice} EUR</div>
<div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>
${bookingDetailRows(b)}
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#fefce8;border-radius:6px;border:1px solid #fde68a"><tr><td style="padding:16px 24px">
<p style="margin:0;color:#92400e;font-size:13px"><strong>Action required:</strong> Log in to <a href="https://admin.carzio.ma" style="color:#b8860b">admin.carzio.ma</a> to confirm or reject.</p>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;color:#9ca3af;font-size:11px;padding-top:20px">
<p style="margin:0 0 4px 0"><strong>Carzio</strong> &#8212; MAG N2, Agadir Airport</p>
<p style="margin:0">contact@carzio.ma &#8212; +212 680-318003</p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

// ===== PUBLIC =====

app.get('/api/status', async (req, res) => {
  await loadDbSmtp();
  await loadDbResend();
  const smtpStatus = await verifySmtp();
  res.json({
    supabaseConfigured: !!supabase,
    adminConfigured: !!ADMIN_PASSWORD,
    smtpConfigured: !!(activeSmtpUser() && activeSmtpPass()),
    smtpVerified: smtpStatus.verified,
    smtpError: smtpStatus.lastError,
    smtpHost: SMTP_HOST,
    smtpPort: SMTP_PORT,
    smtpUser: maskEmail(activeSmtpUser()),
    smtpFrom: maskEmail(activeSmtpFrom()),
    emailProvider: resendActive() ? 'resend' : 'gmail',
    resendConfigured: resendActive(),
    resendFrom: resendActive() ? resendFrom() : null,
    smtpUserFromEnv,
    smtpPassFromEnv,
    smtpUserFromDb: !!dbSmtp?.user,
    smtpPassFromDb: !!dbSmtp?.pass,
    emailPrimary: (() => {
      const gmailConfigured = !!(activeSmtpUser() && activeSmtpPass());
      if (EMAIL_PROVIDER === 'gmail' && gmailConfigured) return 'gmail';
      if (resendActive()) return 'resend';
      return gmailConfigured ? 'gmail' : 'none';
    })(),
    // Credential shape stays server-side only: this endpoint is public and
    // details such as password length/character class weaken security.
  });
});

// NOTE: the unauthenticated GET /api/bookings handler was removed — it exposed
// every customer's personal data (name, email, phone, age, flight number) to
// anyone on the internet. The admin panel uses /api/admin/bookings (requireAuth).

app.post('/api/bookings', rateLimit(5, 10 * 60 * 1000), async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { customerName, customerEmail, customerPhone, pickupDate, dropoffDate } = req.body;
    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !dropoffDate) {
      return res.status(400).json({ error: 'Missing required fields: name, email, phone, pickup date, dropoff date' });
    }
    const booking = { ...toSnake(req.body), status: 'pending', submitted_at: new Date().toISOString() };
    const newBooking = { id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...booking };
    // Never lose a booking: if the DB is missing any of the newer columns, drop
    // exactly that column and retry (bounded). Columns we own are all optional
    // to the insert; missing data is loudly logged instead of silently lost.
    const OPTIONAL_COLS = new Set([
      'insurance_type', 'insurance_price', 'insurance_franchise', 'insurance_band',
      'full_insurance', 'full_insurance_price', 'flight_number', 'extras', 'special_requests', 'days',
    ]);
    let insertResult;
    if (supabase.from) {
      let working = { ...newBooking };
      for (let attempt = 0; attempt <= OPTIONAL_COLS.size; attempt++) {
        const r = await supabase.from('bookings').insert(working).select();
        if (!r.error) { insertResult = r; break; }
        const match =
          (r.error.message || '').match(/could not find the ['"`]([a-z0-9_]+)['"`]/i) ||
          (r.error.message || '').match(/column ["']?([a-z0-9_]+)["']? does not exist/i);
        const missing = match && match[1] ? match[1] : null;
        if (!missing || !OPTIONAL_COLS.has(missing) || !(missing in working)) { insertResult = r; break; }
        delete working[missing];
        console.warn(`Column ${missing} missing, saving booking without it`);
        if (attempt === OPTIONAL_COLS.size) insertResult = r;
      }
    } else {
      insertResult = await supabase.from('bookings').insert(newBooking).select();
    }
    const { data, error } = insertResult;
    if (error) throw error;
    const saved = data?.[0] || newBooking;

    // Shared payload for both email templates (admin + customer).
    const templateInput = {
      name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
      pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
      dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
      totalPrice: saved.total_price, phone: saved.customer_phone, email: saved.customer_email,
      age: saved.customer_age, transportFee: saved.transport_fee,
      paymentMethod: saved.payment_method, noDepositAgreed: saved.no_deposit_agreed,
      days: saved.days, flightNumber: saved.flight_number, extras: saved.extras, specialRequests: saved.special_requests,
      insuranceType: saved.insurance_type, insuranceFranchise: saved.insurance_franchise,
      insurancePrice: saved.insurance_price, fullInsurance: saved.full_insurance,
    };

    let customerNotify = null;
    let adminNotify = null;
    try {
      if (saved.customer_email) {
        customerNotify = await sendEmail({
          to: saved.customer_email,
          subject: `Your reservation (${saved.id})`,
          html: bookingEmailTemplate({ ...templateInput, status: 'pending' }),
        });
      } else {
        customerNotify = { ok: false, error: 'No customer email provided' };
      }
      adminNotify = await sendEmail({
        to: ADMIN_NOTIFY_EMAIL,
        subject: `New reservation from ${saved.customer_name}`,
        html: adminPendingEmailTemplate(templateInput),
      });
    } catch (notifyErr) {
      console.error('Notification error:', notifyErr);
      customerNotify = customerNotify || { ok: false, error: 'Notification error: ' + (notifyErr.message || notifyErr) };
      adminNotify = adminNotify || { ok: false, error: 'Notification error: ' + (notifyErr.message || notifyErr) };
    }
    res.status(201).json({
      ...saved,
      notification: {
        customer: customerNotify ? (customerNotify.ok ? 'sent' : `failed: ${customerNotify.error}`) : 'skipped',
        admin: adminNotify ? (adminNotify.ok ? 'sent' : `failed: ${adminNotify.error}`) : 'skipped',
      },
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/bookings/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    if (req.params.id === SMTP_BEACON_ID) return res.status(400).json({ error: 'This row is protected system configuration' });
    const { error } = await supabase.from('bookings').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// NOTE: the unauthenticated GET /api/contacts handler was removed — it exposed
// every contact message (name, email, phone, message) to anyone on the internet.

app.post('/api/contacts', rateLimit(5, 10 * 60 * 1000), async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }
    const newContact = { id: `CT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...toSnake(req.body), submitted_at: new Date().toISOString() };
    const { data, error } = await supabase.from('contacts').insert(newContact).select();
    if (error) throw error;
    const saved = data?.[0] || newContact;
    // Notify the owner by email — until now, contact messages arrived nowhere.
    // Failure to notify must not fail the submission: the message is stored.
    let notify = null;
    try {
      notify = await sendEmail({
        to: ADMIN_NOTIFY_EMAIL,
        subject: `Contact — ${saved.name}`,
        html: `<!DOCTYPE html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:24px">
<table cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:6px"><tr><td style="padding:24px">
<h1 style="font-size:18px;margin:0 0 12px 0">Contact message — carzio.ma</h1>
<p style="margin:0 0 8px 0"><strong>Name:</strong> ${esc(saved.name || '')}</p>
<p style="margin:0 0 8px 0"><strong>Email:</strong> ${esc(saved.email || '')}</p>
<p style="margin:0 0 8px 0"><strong>Phone:</strong> ${esc(saved.phone || '-')}</p>
<p style="margin:0 0 8px 0"><strong>Message:</strong></p>
<p style="margin:0;white-space:pre-wrap">${esc(saved.message || '')}</p>
</td></tr></table>
</body></html>`,
      });
    } catch (notifyErr) {
      console.error('Contact notification failed:', notifyErr);
      notify = { ok: false, error: notifyErr.message || String(notifyErr) };
    }
    res.status(201).json({ ...saved, notification: notify ? (notify.ok ? 'sent' : `failed: ${notify.error}`) : 'skipped' });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/contacts/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { error } = await supabase.from('contacts').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== PUBLIC PRICES =====

app.get('/api/car-prices', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('car_prices').select('*').order('car_id');
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.get('/api/prices', async (req, res) => {
  try {
    if (!supabase) return res.json({ pricePerDay: null });
    const carId = req.query.car_id;
    if (carId) {
      const { data, error } = await supabase.from('car_prices').select('*').eq('car_id', carId).maybeSingle();
      if (error) throw error;
      return res.json({ pricePerDay: data?.price_per_day || null });
    }
    res.json({ pricePerDay: null });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN =====

app.post('/api/admin/login', rateLimit(10, 5 * 60 * 1000), (req, res) => {
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'Admin is not configured. Set ADMIN_PASSWORD in Vercel.' });
  }
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ token: generateToken() });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.get('/api/admin/bookings', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('bookings').select('*').not('id', 'in', `("${SMTP_BEACON_ID}","${RESEND_BEACON_ID}")`).order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/bookings/:id/status', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { status } = req.body;
    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const { data, error } = await supabase.from('bookings').update({ status }).eq('id', req.params.id).select();
    if (error) throw error;
    if (!data?.[0]) return res.status(404).json({ error: 'Booking not found' });
    const updated = data[0];
    // Shared template payload for the confirm/reject emails — kept in sync with
    // the insert path (POST /api/bookings) so the customer always sees the same
    // full booking detail, including the flight number.
    const templateInput = {
      name: updated.customer_name, bookingId: updated.id, carName: updated.car_name,
      pickupDate: updated.pickup_date, pickupTime: updated.pickup_time, pickupLocation: updated.pickup_location,
      dropoffDate: updated.dropoff_date, dropoffTime: updated.dropoff_time, dropoffLocation: updated.dropoff_location,
      totalPrice: updated.total_price, status,
      phone: updated.customer_phone, email: updated.customer_email,
      age: updated.customer_age, transportFee: updated.transport_fee, paymentMethod: updated.payment_method,
      noDepositAgreed: updated.no_deposit_agreed,
      days: updated.days, flightNumber: updated.flight_number, extras: updated.extras,
      specialRequests: updated.special_requests,
      insuranceType: updated.insurance_type, insuranceFranchise: updated.insurance_franchise,
      insurancePrice: updated.insurance_price, insuranceBand: updated.insurance_band,
      fullInsurance: updated.full_insurance,
    };
    let emailNotification = null;
    let ownerCopy = null;
    const ownerInbox = ADMIN_NOTIFY_EMAIL;
    if (status !== 'pending') {
      // Customer confirmation (skips gracefully when there is no customer email;
      // the owner copy still goes out).
      if (updated.customer_email) {
        emailNotification = await sendEmail({
          to: updated.customer_email,
          subject: `Reservation ${status === 'confirmed' ? 'confirmed' : 'update'} (${updated.id})`,
          html: bookingEmailTemplate(templateInput),
        });
      }
      // Owner gets a copy of every confirmation so the audit trail is complete —
      // previously only the client was notified, and with no flight number.
      ownerCopy = await sendEmail({
        to: ownerInbox,
        subject: `[Copy] Reservation ${status === 'confirmed' ? 'confirmed' : 'update'} — ${updated.customer_name} (${updated.id})`,
        html: bookingEmailTemplate(templateInput),
      });
    }
    res.json({
      ...updated,
      notification: emailNotification
        ? (emailNotification.ok ? 'Email sent to customer' : `Email failed: ${emailNotification.error}`)
        : (status === 'pending' ? 'No email sent (status pending)' : 'No email sent (customer has no email)'),
      ownerCopy: ownerCopy
        ? (ownerCopy.ok ? `Copy sent to ${ownerInbox}` : `Owner copy failed: ${ownerCopy.error}`)
        : (status === 'pending' ? 'No owner copy (status pending)' : 'Not attempted'),
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN CAR PRICES =====

app.get('/api/admin/car-prices', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('car_prices').select('*').order('car_id');
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/car-prices/:carId', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { price_per_day } = req.body;
    if (price_per_day === undefined || price_per_day === null || price_per_day < 0) {
      return res.status(400).json({ error: 'Invalid price' });
    }
    const { data, error } = await supabase.from('car_prices').upsert(
      { car_id: req.params.carId, price_per_day, updated_at: new Date().toISOString() },
      { onConflict: 'car_id' }
    ).select();
    if (error) throw error;
    res.json(data?.[0] || { success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN SMTP SETTINGS =====

app.get('/api/admin/smtp', requireAuth, async (req, res) => {
  try {
    await loadDbSmtp();
    const st = await verifySmtp(true);
    res.json({
      user: activeSmtpUser(),
      smtpUserFromEnv: !!process.env.SMTP_USER,
      smtpUserFromDb: !!dbSmtp?.user,
      smtpPassFromEnv: !!process.env.SMTP_PASS,
      smtpPassFromDb: !!dbSmtp?.pass,
      smtpConfigured: !!(activeSmtpUser() && activeSmtpPass()),
      smtpVerified: st.verified,
      smtpError: st.lastError,
      host: SMTP_HOST,
      port: SMTP_PORT,
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/admin/smtp', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { smtpUser, smtpPass } = req.body || {};
    const user = cleanValue(smtpUser);
    const pass = cleanValue(smtpPass).replace(/\s+/g, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) return res.status(400).json({ error: 'Enter a valid Gmail address' });
    if (pass.length < 8) return res.status(400).json({ error: 'Enter the 16-letter Google password (at least 8 characters)' });
    // Store inside the bookings table as a hidden marker row (no schema change).
    const { error } = await supabase.from('bookings').upsert({
      id: SMTP_BEACON_ID,
      car_name: '__SMTP_CONFIG__',
      total_price: 0,
      days: 1,
      customer_name: 'System',
      customer_email: user,
      customer_phone: pass,
      status: 'pending',
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    if (error) throw error;
    dbSmtp = null;
    dbSmtpLoaded = false;
    transporter = null;
    smtpVerify = { verified: false, lastError: null, checkedAt: null };
    await loadDbSmtp();
    const st = await verifySmtp(true);
    res.json({
      success: st.verified,
      verified: st.verified,
      result: st.verified ? 'Credentials accepted — emails are now enabled' : `Gmail rejected the login: ${st.lastError}`,
      user: activeSmtpUser(),
      smtpUserFromDb: !!dbSmtp?.user,
      smtpPassFromDb: !!dbSmtp?.pass,
      smtpError: st.lastError,
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN RESEND (primary sender) =====

app.post('/api/admin/resend', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { resendKey, resendFrom: from, enabled } = req.body || {};
    const key = cleanValue(resendKey);
    if (!key) return res.status(400).json({ error: 'Resend API key is required' });
    if (!/^re_[A-Za-z0-9_]+$/.test(key)) return res.status(400).json({ error: 'That does not look like a Resend API key (expected re_...)' });
    const fromAddr = cleanValue(from);
    if (fromAddr && !/^[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+(\s*<[^<>@\s]+@[^<>@\s]+>)?$/.test(fromAddr)) {
      return res.status(400).json({ error: 'Enter a valid From address, e.g. Carzio <contact@carzio.ma>' });
    }
    // Hidden marker row in the bookings table — same trick as the SMTP beacon,
    // so no schema migration and no secret ever lands in the git repository.
    const { error } = await supabase.from('bookings').upsert({
      id: RESEND_BEACON_ID,
      car_name: '__RESEND_CONFIG__',
      total_price: 0,
      days: 1,
      customer_name: 'System',
      customer_email: key,
      customer_phone: fromAddr,
      status: enabled === false ? 'disabled' : 'pending',
      submitted_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    if (error) throw error;
    dbResend = null;
    dbResendLoaded = false;
    resendVerify = { verified: false, lastError: null, checkedAt: null };
    await loadDbResend();
    const r = await verifyResend(true);
    res.json({
      success: r.verified,
      verified: r.verified,
      active: resendActive(),
      from: resendFrom(),
      result: r.verified
        ? `Resend key accepted — sending via Resend as "${resendFrom()}"`
        : `Resend rejected the key: ${r.lastError}`,
      fallback: 'Gmail SMTP remains active as an automatic fallback',
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/resend', requireAuth, async (req, res) => {
  try {
    await loadDbResend();
    const r = await verifyResend();
    res.json({
      configured: resendActive(),
      verified: r.verified,
      active: resendActive(),
      from: resendActive() ? resendFrom() : null,
      keyShape: dbResend?.key ? { length: dbResend.key.length, prefix: dbResend.key.slice(0, 3) } : null,
      smtpFallback: { user: maskEmail(activeSmtpUser()), verified: smtpVerify.verified },
    });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN TEST EMAIL =====

app.post('/api/admin/test-email', requireAuth, async (req, res) => {
  try {
    const { to } = req.body;
    if (!to || typeof to !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return res.status(400).json({ error: 'A valid recipient email is required' });
    }
    const smtpStatus = await verifySmtp(true);
    const result = await sendEmail({
      to: to.trim(),
      subject: 'Carzio SMTP Test',
      html: `<p>This is a <strong>test email</strong> from the Carzio server.</p><p>Sent at ${new Date().toLocaleString()} (UTC ${new Date().toUTCString()}).</p>`,
    });
    res.json({
      success: result.ok,
      result: result.ok ? 'Email sent successfully' : `Email failed: ${result.error}`,
      sentTo: to.trim(),
      config: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        from: activeSmtpFrom(),
        authUser: activeSmtpUser(),
        smtpVerifiedBeforeSend: smtpStatus.verified,
        smtpVerifyError: smtpStatus.lastError,
        smtpCredentialShape,
      },
    });
  } catch (err) {
    console.error('test-email error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

// ===== ADMIN SEND EMAIL =====

app.post('/api/admin/send-email', requireAuth, async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { data, error } = await supabase.from('bookings').select('*').eq('id', bookingId).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Booking not found' });
    await sendEmail({
      to: data.customer_email,
      subject: `Reservation details (${data.id})`,
      html: bookingEmailTemplate({
        name: data.customer_name, bookingId: data.id, carName: data.car_name,
        pickupDate: data.pickup_date, pickupTime: data.pickup_time, pickupLocation: data.pickup_location,
        dropoffDate: data.dropoff_date, dropoffTime: data.dropoff_time, dropoffLocation: data.dropoff_location,
        totalPrice: data.total_price, status: data.status,
        phone: data.customer_phone, email: data.customer_email,
        age: data.customer_age, transportFee: data.transport_fee, paymentMethod: data.payment_method,
        noDepositAgreed: data.no_deposit_agreed,
      }),
    });
    res.json({ success: true, message: 'Email sent' });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN DELETE BOOKING =====

app.delete('/api/admin/bookings/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { error } = await supabase.from('bookings').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// --- Static files + SPA ---
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export default app;
export const handler = serverless(app);
// Test-only exports: not used by the server or Vercel routing.
export { bookingEmailTemplate, adminPendingEmailTemplate, bookingDetailRows, safeExtras, billedDaysJs };
