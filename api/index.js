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
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (() => { console.warn('WARNING: ADMIN_PASSWORD env var not set, using default!'); return 'admin'; })();
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');

// Sanitize SMTP credentials before use.
// Gmail App Passwords are often pasted grouped like "abcd efgh ijkl mnop"
// (with spaces) or with quotes/newlines attached. Gmail then replies
// "535-5.7.8 Username and Password not accepted" even when the password
// itself is correct. Stripping whitespace/quotes fixes that exact case.
const rawPass = process.env.SMTP_PASS || '';
const cleanValue = (v) => String(v || '').trim().replace(/^["']|["']$/g, '');
// Fallback login account used only when SMTP_USER is not set in the environment.
// This is the account that owns the App Password currently in use.
const SMTP_USER = cleanValue(process.env.SMTP_USER || 'abdelbast.lasri@gmail.com');
const SMTP_PASS = cleanValue(rawPass).replace(/\s+/g, '');
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

function activeSmtpUser() { return dbSmtp?.user || SMTP_USER; }
function activeSmtpPass() { return dbSmtp?.pass || SMTP_PASS; }
// Sender (From:) must match the account that authenticates — Gmail rejects
// messages whose From doesn't belong to the authenticated account.
function activeSmtpFrom() { return dbSmtp?.user || SMTP_FROM; }


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

function maskEmail(email) {
  if (!email || typeof email !== 'string') return null;
  const at = email.indexOf('@');
  if (at <= 0) return email;
  return email.slice(0, 1) + '***' + email.slice(at);
}

const TOKEN_SECRET = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest('hex');

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
  const t = await getTransporter();
  if (!t) {
    const reason = !activeSmtpPass() || !activeSmtpUser() ? 'SMTP not configured (email address / 16-letter password are empty)' : 'Transporter unavailable';
    console.warn(`Email not sent - ${reason}`);
    return { ok: false, error: reason };
  }
  const plainText = text || stripHtml(html);
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
    console.log(`Email sent to ${to}: ${subject}`);
    return { ok: true };
  } catch (err) {
    console.error(`Failed to send email to ${to} (${subject}) via ${SMTP_HOST}:${SMTP_PORT} from ${activeSmtpUser()}:`, err);
    transporter = null;
    return { ok: false, error: err && err.message ? err.message : String(err) };
  }
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function bookingEmailTemplate({ name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, status, phone, email, age, transportFee, paymentMethod, noDepositAgreed }) {
  const safe = { name: esc(name), carName: esc(carName), pickupLocation: esc(pickupLocation), dropoffLocation: esc(dropoffLocation), email: esc(email || ''), phone: esc(phone || ''), paymentMethod: esc(paymentMethod || '') };
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
<img src="https://carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:40px;border:0"/>
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
${safe.phone ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Phone</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.phone}</div><div style="border-top:1px solid #e5e7eb;margin:8px 0"></div>` : ''}
${safe.email ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Email</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.email}</div><div style="border-top:1px solid #e5e7eb;margin:8px 0"></div>` : ''}
${age ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Age</div><div style="color:#1f2937;font-size:15px;font-weight:600">${age}</div><div style="border-top:1px solid #e5e7eb;margin:8px 0"></div>` : ''}
${transportFee > 0 ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Transport fee</div><div style="color:#b8860b;font-size:15px;font-weight:600">${transportFee} EUR</div><div style="border-top:1px solid #e5e7eb;margin:8px 0"></div>` : ''}
${safe.paymentMethod ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Payment Method</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.paymentMethod}</div><div style="border-top:1px solid #e5e7eb;margin:8px 0"></div>` : ''}
${noDepositAgreed ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">No Deposit Policy</div><div style="color:#1f2937;font-size:15px;font-weight:600">Accepted</div>` : ''}
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;color:#9ca3af;font-size:11px;padding-top:20px">
<p style="margin:0 0 4px 0"><strong>Carzio</strong> &#8212; N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000</p>
<p style="margin:0">contact@carzio.ma &#8212; +212 680-318003</p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

function adminPendingEmailTemplate({ name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, phone, email, age, transportFee, paymentMethod, noDepositAgreed }) {
  const safe = { name: esc(name), carName: esc(carName), pickupLocation: esc(pickupLocation), dropoffLocation: esc(dropoffLocation), email: esc(email || ''), phone: esc(phone || ''), paymentMethod: esc(paymentMethod || '') };
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:0;font-size:14px;line-height:1.5">
<table cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:24px 16px"><tr><td>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;padding-bottom:24px">
<img src="https://carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:40px;border:0"/>
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
${safe.phone ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Phone</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.phone}</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}
${safe.email ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Email</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.email}</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}
${age ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Age</div><div style="color:#1f2937;font-size:15px;font-weight:600">${age}</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}
${transportFee > 0 ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Transport fee</div><div style="color:#b8860b;font-size:15px;font-weight:600">${transportFee} EUR</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}
${safe.paymentMethod ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">Payment Method</div><div style="color:#1f2937;font-size:15px;font-weight:600">${safe.paymentMethod}</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}
${noDepositAgreed ? `<div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px">No Deposit Policy</div><div style="color:#1f2937;font-size:15px;font-weight:600">Accepted</div><div style="border-top:1px solid #e5e7eb;margin:10px 0"></div>` : ''}

</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%;background:#fefce8;border-radius:6px;border:1px solid #fde68a"><tr><td style="padding:16px 24px">
<p style="margin:0;color:#92400e;font-size:13px"><strong>Action required:</strong> Log in to <a href="https://admin.carzio.ma" style="color:#b8860b">admin.carzio.ma</a> to confirm or reject.</p>
</td></tr></table>
<table cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="text-align:center;color:#9ca3af;font-size:11px;padding-top:20px">
<p style="margin:0 0 4px 0"><strong>Carzio</strong> &#8212; N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000</p>
<p style="margin:0">contact@carzio.ma &#8212; +212 680-318003</p>
</td></tr></table>
</td></tr></table>
</body></html>`;
}

// ===== PUBLIC =====

app.get('/api/status', async (req, res) => {
  await loadDbSmtp();
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
    smtpUserFromEnv,
    smtpPassFromEnv,
    smtpUserFromDb: !!dbSmtp?.user,
    smtpPassFromDb: !!dbSmtp?.pass,
    smtpCredentialShape,
  });
});

app.get('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('bookings').select('*').neq('id', SMTP_BEACON_ID).order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { customerName, customerEmail, customerPhone, pickupDate, dropoffDate } = req.body;
    if (!customerName || !customerEmail || !customerPhone || !pickupDate || !dropoffDate) {
      return res.status(400).json({ error: 'Missing required fields: name, email, phone, pickup date, dropoff date' });
    }
    const booking = { ...toSnake(req.body), status: 'pending', submitted_at: new Date().toISOString() };
    const newBooking = { id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...booking };
    const { data, error } = await supabase.from('bookings').insert(newBooking).select();
    if (error) throw error;
    const saved = data?.[0] || newBooking;

    let customerNotify = null;
    let adminNotify = null;
    try {
      if (saved.customer_email) {
        customerNotify = await sendEmail({
          to: saved.customer_email,
          subject: `Your reservation (${saved.id})`,
          html: bookingEmailTemplate({
            name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
            pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
            dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
            totalPrice: saved.total_price, status: 'pending',
            phone: saved.customer_phone, email: saved.customer_email, age: saved.customer_age,
            transportFee: saved.transport_fee, paymentMethod: saved.payment_method, noDepositAgreed: saved.no_deposit_agreed,
          }),
        });
      } else {
        customerNotify = { ok: false, error: 'No customer email provided' };
      }
      adminNotify = await sendEmail({
        to: activeSmtpUser(),
        subject: `New reservation from ${saved.customer_name}`,
        html: adminPendingEmailTemplate({
          name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
          pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
          dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
          totalPrice: saved.total_price,
          phone: saved.customer_phone, email: saved.customer_email,
          age: saved.customer_age, transportFee: saved.transport_fee, paymentMethod: saved.payment_method,
          noDepositAgreed: saved.no_deposit_agreed,
        }),
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

app.get('/api/contacts', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('contacts').select('*').order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/contacts', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }
    const newContact = { id: `CT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...toSnake(req.body), submitted_at: new Date().toISOString() };
    const { data, error } = await supabase.from('contacts').insert(newContact).select();
    if (error) throw error;
    res.status(201).json(data?.[0] || newContact);
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

app.post('/api/admin/login', (req, res) => {
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
    const { data, error } = await supabase.from('bookings').select('*').neq('id', SMTP_BEACON_ID).order('submitted_at', { ascending: false });
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
    let emailNotification = null;
    if (status !== 'pending' && updated.customer_email) {
      emailNotification = await sendEmail({
        to: updated.customer_email,
        subject: `Reservation ${status === 'confirmed' ? 'confirmed' : 'update'} (${updated.id})`,
        html: bookingEmailTemplate({
          name: updated.customer_name, bookingId: updated.id, carName: updated.car_name,
          pickupDate: updated.pickup_date, pickupTime: updated.pickup_time, pickupLocation: updated.pickup_location,
          dropoffDate: updated.dropoff_date, dropoffTime: updated.dropoff_time, dropoffLocation: updated.dropoff_location,
          totalPrice: updated.total_price, status,
          phone: updated.customer_phone, email: updated.customer_email,
          age: updated.customer_age, transportFee: updated.transport_fee, paymentMethod: updated.payment_method,
          noDepositAgreed: updated.no_deposit_agreed,
        }),
      });
    }
    res.json({
      ...updated,
      notification: emailNotification
        ? (emailNotification.ok ? 'Email sent to customer' : `Email failed: ${emailNotification.error}`)
        : (status === 'pending' ? 'No email sent (status pending)' : 'No email sent (customer has no email)'),
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
