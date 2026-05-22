import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'contact@carzio.ma';
const SMTP_PASS = process.env.SMTP_PASS;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

let supabase;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  try {
    transporter = nodemailer.createTransport({
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

function bookingEmailTemplate({ name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, status, confirmationMethod, phone, email, age, transportFee, paymentMethod, noDepositAgreed }) {
  const statusColor = status === 'confirmed' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#d97706';
  const statusText = status === 'confirmed' ? 'Confirmed' : status === 'rejected' ? 'Not Available' : 'Pending Review';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:0;font-size:14px;line-height:1.5}
  .container{max-width:600px;margin:0 auto;padding:30px 16px}
  .header{text-align:center;margin-bottom:24px}
  .header h1{color:#b8860b;font-size:22px;margin:12px 0 0}
  .card{background:#ffffff;border-radius:8px;padding:20px 24px;margin-bottom:12px;border:1px solid #e5e7eb}
  .label{color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px}
  .value{color:#1f2937;font-size:15px;font-weight:600}
  .gold{color:#b8860b}
  .status{color:${statusColor};font-weight:700;font-size:15px}
  .footer{text-align:center;color:#9ca3af;font-size:11px;margin-top:24px}
  .footer a{color:#b8860b;text-decoration:none}
  hr{border:none;border-top:1px solid #e5e7eb;margin:12px 0}
</style></head><body>
<div class="container">
  <div class="header">
    <img src="https://carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:44px"/>
    <h1>${status === 'confirmed' ? 'Booking Confirmed' : status === 'rejected' ? 'Booking Update' : 'Booking Request Received'}</h1>
  </div>
  <div class="card">
    <p style="margin:0 0 8px">Hello <strong>${name}</strong>,</p>
    ${status === 'pending'
      ? '<p style="margin:0">Your booking request has been received. We will review availability and get back to you soon.</p>'
      : status === 'confirmed'
      ? '<p style="margin:0">Great news! Your booking has been confirmed. We look forward to serving you.</p>'
      : '<p style="margin:0">Unfortunately, the vehicle is not available for your requested dates. Please visit carzio.ma to browse other options.</p>'}
  </div>
  <div class="card">
    <div class="label">Booking ID</div><div class="value">${bookingId}</div><hr>
    <div class="label">Vehicle</div><div class="value">${carName}</div><hr>
    <div class="label">Pickup</div><div class="value">${pickupDate} at ${pickupTime} &mdash; ${pickupLocation}</div><hr>
    <div class="label">Return</div><div class="value">${dropoffDate} at ${dropoffTime} &mdash; ${dropoffLocation}</div><hr>
    <div class="label">Total</div><div class="value gold">${totalPrice}€</div><hr>
    <div class="label">Status</div><div class="value status">${statusText}</div>
  </div>
  ${confirmationMethod ? `<div class="card"><p style="margin:0">We will contact you via <strong>${confirmationMethod}</strong>.</p></div>` : ''}
  <div class="card">
    ${phone ? `<div class="label">Phone</div><div class="value">${phone}</div><hr>` : ''}
    ${email ? `<div class="label">Email</div><div class="value">${email}</div><hr>` : ''}
    ${age ? `<div class="label">Age</div><div class="value">${age}</div><hr>` : ''}
    ${transportFee > 0 ? `<div class="label">Transport fee</div><div class="value gold">&euro;${transportFee}</div><hr>` : ''}
    ${paymentMethod ? `<div class="label">Payment Method</div><div class="value">${paymentMethod}</div><hr>` : ''}
    ${noDepositAgreed ? `<div class="label">No Deposit Policy</div><div class="value">Accepted</div>` : ''}
  </div>
  <div class="footer">
    <p style="margin:0 0 4px"><strong>Carzio</strong> &mdash; N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000</p>
    <p style="margin:0"><a href="mailto:contact@carzio.ma">contact@carzio.ma</a> &mdash; <a href="https://wa.me/212680318003">+212 680-318003</a></p>
  </div>
</div></body></html>`;
}

function adminPendingEmailTemplate({ name, bookingId, carName, pickupDate, pickupTime, pickupLocation, dropoffDate, dropoffTime, dropoffLocation, totalPrice, confirmationMethod, phone, email, age, transportFee, paymentMethod, noDepositAgreed }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{font-family:Arial,Helvetica,sans-serif;background:#f4f4f5;color:#1f2937;margin:0;padding:0;font-size:14px;line-height:1.5}
  .container{max-width:600px;margin:0 auto;padding:30px 16px}
  .header{text-align:center;margin-bottom:24px}
  .header h1{color:#b8860b;font-size:22px;margin:12px 0 0}
  .card{background:#ffffff;border-radius:8px;padding:20px 24px;margin-bottom:12px;border:1px solid #e5e7eb}
  .label{color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px}
  .value{color:#1f2937;font-size:15px;font-weight:600}
  .gold{color:#b8860b}
  .badge{display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:uppercase}
  .footer{text-align:center;color:#9ca3af;font-size:11px;margin-top:24px}
  .footer a{color:#b8860b;text-decoration:none}
  hr{border:none;border-top:1px solid #e5e7eb;margin:12px 0}
</style></head><body>
<div class="container">
  <div class="header">
    <img src="https://carzio.ma/images/carzio-logo.png" alt="Carzio" style="height:44px"/>
    <h1>New Booking Request</h1>
    <span class="badge">Pending Review</span>
  </div>
  <div class="card">
    <p style="margin:0 0 8px">Hello <strong>Carzio Team</strong>,</p>
    <p style="margin:0">A new booking request has been submitted by <strong>${name}</strong>. Review the details below and confirm availability in the admin panel.</p>
  </div>
  <div class="card">
    <div class="label">Booking ID</div><div class="value">${bookingId}</div><hr>
    <div class="label">Customer</div><div class="value">${name}</div><hr>
    <div class="label">Vehicle</div><div class="value">${carName}</div><hr>
    <div class="label">Pickup</div><div class="value">${pickupDate} at ${pickupTime} &mdash; ${pickupLocation}</div><hr>
    <div class="label">Return</div><div class="value">${dropoffDate} at ${dropoffTime} &mdash; ${dropoffLocation}</div><hr>
    <div class="label">Total</div><div class="value gold">${totalPrice}€</div><hr>
    ${phone ? `<div class="label">Phone</div><div class="value">${phone}</div><hr>` : ''}
    ${email ? `<div class="label">Email</div><div class="value">${email}</div><hr>` : ''}
    ${age ? `<div class="label">Age</div><div class="value">${age}</div><hr>` : ''}
    ${transportFee > 0 ? `<div class="label">Transport fee</div><div class="value gold">&euro;${transportFee}</div><hr>` : ''}
    ${paymentMethod ? `<div class="label">Payment Method</div><div class="value">${paymentMethod}</div><hr>` : ''}
    ${noDepositAgreed ? `<div class="label">No Deposit Policy</div><div class="value">Accepted</div><hr>` : ''}
    ${confirmationMethod ? `<div class="label">Customer prefers</div><div class="value">Contact via ${confirmationMethod}</div>` : ''}
  </div>
  <div class="card" style="background:#fefce8;border-color:#fde68a">
    <p style="margin:0;color:#92400e;font-size:13px">
      <strong>Action required:</strong> Log in to <a href="https://admin.carzio.ma" style="color:#b8860b">admin.carzio.ma</a> to confirm or reject this booking.
    </p>
  </div>
  <div class="footer">
    <p style="margin:0 0 4px"><strong>Carzio</strong> &mdash; N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000</p>
    <p style="margin:0"><a href="mailto:contact@carzio.ma">contact@carzio.ma</a> &mdash; <a href="https://wa.me/212680318003">+212 680-318003</a></p>
  </div>
</div></body></html>`;
}

// ===== PUBLIC =====

app.get('/api/status', (req, res) => {
  res.json({
    supabaseConfigured: !!supabase,
    adminConfigured: !!ADMIN_PASSWORD,
    smtpConfigured: !!SMTP_PASS,
    whatsappConfigured: !!(WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID),
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

    try {
      if (saved.customer_email) {
        await sendEmail({
          to: saved.customer_email,
          subject: `Booking Request Received - ${saved.id}`,
          html: bookingEmailTemplate({
            name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
            pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
            dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
            totalPrice: saved.total_price, status: 'pending', confirmationMethod: saved.confirmation_method,
            phone: saved.customer_phone, email: saved.customer_email, age: saved.customer_age,
            transportFee: saved.transport_fee, paymentMethod: saved.payment_method, noDepositAgreed: saved.no_deposit_agreed,
          }),
        });
      }
      await sendEmail({
        to: SMTP_USER,
        subject: `New Booking Request - ${saved.customer_name}`,
        html: adminPendingEmailTemplate({
          name: saved.customer_name, bookingId: saved.id, carName: saved.car_name,
          pickupDate: saved.pickup_date, pickupTime: saved.pickup_time, pickupLocation: saved.pickup_location,
          dropoffDate: saved.dropoff_date, dropoffTime: saved.dropoff_time, dropoffLocation: saved.dropoff_location,
          totalPrice: saved.total_price,
          confirmationMethod: saved.confirmation_method, phone: saved.customer_phone, email: saved.customer_email,
          age: saved.customer_age, transportFee: saved.transport_fee, paymentMethod: saved.payment_method,
          noDepositAgreed: saved.no_deposit_agreed,
        }),
      });
    } catch (emailErr) {
      console.error('Email sending error:', emailErr.message);
    }
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
    if (updated && status !== 'pending') {
      const isEmail = updated.confirmation_method === 'email';
      const isWhatsApp = updated.confirmation_method === 'whatsapp';
      if (updated.customer_email && isEmail) {
        await sendEmail({
          to: updated.customer_email,
          subject: `Booking ${status === 'confirmed' ? 'Confirmed' : 'Not Available'} - ${updated.id}`,
          html: bookingEmailTemplate({
            name: updated.customer_name, bookingId: updated.id, carName: updated.car_name,
            pickupDate: updated.pickup_date, pickupTime: updated.pickup_time, pickupLocation: updated.pickup_location,
            dropoffDate: updated.dropoff_date, dropoffTime: updated.dropoff_time, dropoffLocation: updated.dropoff_location,
            totalPrice: updated.total_price, status,
            confirmationMethod: updated.confirmation_method, phone: updated.customer_phone, email: updated.customer_email,
            age: updated.customer_age, transportFee: updated.transport_fee, paymentMethod: updated.payment_method,
            noDepositAgreed: updated.no_deposit_agreed,
          }),
        });
      }
      if (updated.customer_phone && isWhatsApp) {
        await sendWhatsApp({
          to: updated.customer_phone,
          customerName: updated.customer_name,
          bookingId: updated.id,
          carName: updated.car_name,
          status,
        });
      }
    }
    res.json(updated || { success: true });
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
      subject: `Booking Details - ${data.id}`,
      html: bookingEmailTemplate({
        name: data.customer_name, bookingId: data.id, carName: data.car_name,
        pickupDate: data.pickup_date, pickupTime: data.pickup_time, pickupLocation: data.pickup_location,
        dropoffDate: data.dropoff_date, dropoffTime: data.dropoff_time, dropoffLocation: data.dropoff_location,
        totalPrice: data.total_price, status: data.status,
        confirmationMethod: data.confirmation_method, phone: data.customer_phone, email: data.customer_email,
        age: data.customer_age, transportFee: data.transport_fee, paymentMethod: data.payment_method,
        noDepositAgreed: data.no_deposit_agreed,
      }),
    });
    res.json({ success: true, message: 'Email sent' });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// ===== ADMIN SEND WHATSAPP =====

async function sendWhatsApp({ to, customerName, bookingId, carName, status }) {
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    console.warn('WhatsApp not configured - set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN');
    return;
  }
  const cleanPhone = to.replace(/\s+/g, '').replace(/^0+/, '');
  const text = status === 'confirmed'
    ? `Hello ${customerName}, your booking ${bookingId} for ${carName} is CONFIRMED! Come to N208, MAG N2 Avenue Al khaouarizmi, Agadir 80000 to pick up your vehicle.`
    : status === 'rejected'
    ? `Hello ${customerName}, we apologize but ${carName} is not available for your requested dates (Booking ${bookingId}). Please visit carzio.ma to choose another vehicle.`
    : `Hello ${customerName}, your booking ${bookingId} for ${carName} has been received. We will confirm availability soon.`;
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: text },
      }),
    });
    const result = await res.json();
    if (!res.ok) {
      console.error('WhatsApp API error:', result);
    } else {
      console.log(`WhatsApp sent to ${to}: ${result.messages?.[0]?.id || 'ok'}`);
    }
  } catch (err) {
    console.error('Failed to send WhatsApp:', err.message);
  }
}

app.post('/api/admin/send-whatsapp', requireAuth, async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const { data, error } = await supabase.from('bookings').select('*').eq('id', bookingId).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Booking not found' });
    try {
      await sendWhatsApp({
        to: data.customer_phone,
        customerName: data.customer_name,
        bookingId: data.id,
        carName: data.car_name,
        status: data.status,
      });
      res.json({ success: true, message: 'WhatsApp sent' });
    } catch (waErr) {
      console.error('WhatsApp send error:', waErr.message);
      res.status(500).json({ error: waErr.message });
    }
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// --- Static files + SPA ---
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export default app;
export const handler = serverless(app);
