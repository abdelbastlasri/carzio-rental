import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'contact@carzio.ma';
const SMTP_PASS = process.env.SMTP_PASS;

let supabase;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

let transporter = null;
async function getTransporter() {
  if (transporter) return transporter;
  try {
    const nodemailer = await import('nodemailer');
    transporter = nodemailer.default.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  } catch (e) {
    console.warn('Nodemailer not available:', e.message);
  }
  return transporter;
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

function generateToken() {
  const payload = { t: Date.now(), e: Date.now() + 86400000 };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
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

async function sendEmail({ to, subject, html }) {
  const t = await getTransporter();
  if (!t || !SMTP_PASS) {
    console.warn('Email not sent - SMTP not configured');
    return;
  }
  try {
    await t.sendMail({ from: `"Carzio" <${SMTP_USER}>`, to, subject, html });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}

function bookingEmailTemplate({ name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, status, confirmationMethod }) {
  const statusColor = status === 'confirmed' ? '#22c55e' : status === 'rejected' ? '#ef4444' : '#f0ad4e';
  const statusText = status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Not Available' : 'Pending Review';
  return `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;background:#111;color:#fff;margin:0;padding:0}
  .container{max-width:600px;margin:0 auto;padding:40px 20px}
  .header{text-align:center;margin-bottom:30px}h1{color:#d4a853;font-size:24px}
  .card{background:#1a1a1a;border-radius:12px;padding:24px;margin-bottom:16px}
  .label{color:#888;font-size:12px;text-transform:uppercase;margin-bottom:4px}
  .value{color:#fff;font-size:16px;font-weight:600}
  .gold{color:#d4a853}.status{color:${statusColor};font-weight:700}
  .footer{text-align:center;color:#555;font-size:12px;margin-top:30px}
  hr{border:none;border-top:1px solid #222;margin:16px 0}
</style></head><body>
<div class="container">
  <div class="header"><img src="https://carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:50px"/>
    <h1>Booking ${status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Update' : 'Request Received'}</h1></div>
  <div class="card">
    <p>Hello <strong>${name}</strong>,</p>
    ${status === 'pending' ? '<p>Your booking request has been received. We will review availability and get back to you soon.</p>' :
      status === 'confirmed' ? '<p>Great news! Your booking has been confirmed. We look forward to serving you.</p>' :
      '<p>Unfortunately, the vehicle is not available for your requested dates. Please browse our other options.</p>'}
  </div>
  <div class="card">
    <div class="label">Booking ID</div><div class="value">${bookingId}</div><hr>
    <div class="label">Vehicle</div><div class="value">${carName}</div><hr>
    <div class="label">Pickup</div><div class="value">${pickupDate} at ${pickupTime} - ${pickupLocation}</div><hr>
    <div class="label">Return</div><div class="value">${dropoffDate} at ${dropoffTime} - ${dropoffLocation}</div><hr>
    <div class="label">Total</div><div class="value gold">${totalPrice}€</div><hr>
    <div class="label">Status</div><div class="value status">${statusText}</div>
  </div>
  ${confirmationMethod ? `<div class="card"><p>We will contact you via <strong>${confirmationMethod}</strong>.</p></div>` : ''}
  <div class="footer">
    <p>Carzio - N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000</p>
    <p>contact@carzio.ma | +212 680-318003</p>
  </div>
</div></body></html>`;
}

// ===== PUBLIC =====

app.get('/api/status', (req, res) => {
  res.json({
    supabaseConfigured: !!supabase,
    adminConfigured: !!ADMIN_PASSWORD,
    smtpConfigured: !!SMTP_PASS,
  });
});

app.get('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('bookings').select('*').order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const booking = { ...toSnake(req.body), status: 'pending', submitted_at: new Date().toISOString() };
    const newBooking = { id: `BK-${Date.now()}`, ...booking };
    const { data, error } = await supabase.from('bookings').insert(newBooking).select();
    if (error) throw error;
    const saved = data?.[0] || newBooking;

    if (saved.customer_email) {
      sendEmail({
        to: saved.customer_email,
        subject: `Booking Request Received - ${saved.id}`,
        html: bookingEmailTemplate({
          name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
          pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
          dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
          totalPrice: saved.total_price, status: 'pending', confirmationMethod: saved.confirmation_method,
        }),
      });
    }
    sendEmail({
      to: SMTP_USER,
      subject: `New Booking Request - ${saved.customer_name}`,
      html: bookingEmailTemplate({
        name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
        pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
        dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
        totalPrice: saved.total_price, status: 'pending',
      }),
    });
    res.status(201).json(saved);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true });
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
    const newContact = { id: `CT-${Date.now()}`, ...toSnake(req.body), submitted_at: new Date().toISOString() };
    const { data, error } = await supabase.from('contacts').insert(newContact).select();
    if (error) throw error;
    res.status(201).json(data?.[0] || newContact);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true });
    const { error } = await supabase.from('contacts').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.get('/api/prices', async (req, res) => {
  try {
    if (!supabase) return res.json({ basePrice: 0, adjustedPrice: 0, rules: [] });
    const { data: rules, error } = await supabase.from('pricing_rules').select('*').eq('active', true);
    if (error) throw error;
    const carId = req.query.car_id;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const relevantRules = (rules || []).filter(r => {
      if (!r.active) return false;
      if (r.car_id && r.car_id !== carId) return false;
      if (startDate && endDate) {
        const s = new Date(startDate), e = new Date(endDate);
        const rs = new Date(r.start_date), re = new Date(r.end_date);
        if (e < rs || s > re) return false;
      }
      return true;
    });
    const maxMultiplier = relevantRules.length > 0 ? Math.max(...relevantRules.map(r => r.multiplier)) : 1;
    res.json({ rules: relevantRules.map(r => r.name), maxMultiplier, ruleCount: relevantRules.length });
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
    const { data, error } = await supabase.from('bookings').select('*').order('submitted_at', { ascending: false });
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
    const updated = data?.[0];
    if (updated && updated.customer_email && status !== 'pending') {
      sendEmail({
        to: updated.customer_email,
        subject: `Booking ${status === 'confirmed' ? 'Confirmed' : 'Not Available'} - ${updated.id}`,
        html: bookingEmailTemplate({
          name: updated.customer_name, bookingId: updated.id, carName: updated.car_name,
          pickupDate: updated.pickup_date, pickupTime: updated.pickup_time, pickupLocation: updated.pickup_location,
          dropoffDate: updated.dropoff_date, dropoffTime: updated.dropoff_time, dropoffLocation: updated.dropoff_location,
          totalPrice: updated.total_price, status,
        }),
      });
    }
    res.json(updated || { success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.get('/api/admin/pricing-rules', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('pricing_rules').select('*').order('start_date', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.post('/api/admin/pricing-rules', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const rule = { ...req.body, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('pricing_rules').insert(rule).select();
    if (error) throw error;
    res.status(201).json(data?.[0] || rule);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/pricing-rules/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { data, error } = await supabase.from('pricing_rules').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    res.json(data?.[0] || { success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/admin/pricing-rules/:id', requireAuth, async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true });
    const { error } = await supabase.from('pricing_rules').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// --- Static files + SPA ---
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export default app;
export const handler = serverless(app);
