const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

app.use(cors());
app.use(express.json());

// Bookings API
app.get('/api/bookings', async (req, res) => {
  if (!supabase) return res.json([]);
  const { data } = await supabase.from('bookings').select('*').order('submitted_at', { ascending: false });
  res.json(data || []);
});

app.post('/api/bookings', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Database not configured' });
  const newBooking = { id: `BK-${Date.now()}`, ...req.body, submitted_at: new Date().toISOString() };
  const { data } = await supabase.from('bookings').insert(newBooking).select();
  res.status(201).json(data?.[0] || newBooking);
});

app.delete('/api/bookings/:id', async (req, res) => {
  if (!supabase) return res.json({ success: true });
  await supabase.from('bookings').delete().eq('id', req.params.id);
  res.json({ success: true });
});

// Contacts API
app.get('/api/contacts', async (req, res) => {
  if (!supabase) return res.json([]);
  const { data } = await supabase.from('contacts').select('*').order('submitted_at', { ascending: false });
  res.json(data || []);
});

app.post('/api/contacts', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Database not configured' });
  const newContact = { id: `CT-${Date.now()}`, ...req.body, submitted_at: new Date().toISOString() };
  const { data } = await supabase.from('contacts').insert(newContact).select();
  res.status(201).json(data?.[0] || newContact);
});

app.delete('/api/contacts/:id', async (req, res) => {
  if (!supabase) return res.json({ success: true });
  await supabase.from('contacts').delete().eq('id', req.params.id);
  res.json({ success: true });
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Only listen when run directly (not via Vercel serverless)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Carzio server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
