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

// Debug endpoint to check Supabase connection
app.get('/api/status', (req, res) => {
  res.json({
    supabaseConfigured: !!supabase,
    supabaseUrl: supabaseUrl ? supabaseUrl.slice(0, 20) + '...' : null,
  });
});

// Bookings API
app.get('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('bookings').select('*').order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error('GET /api/bookings error:', err); res.status(500).json({ error: err.message }); }
});

app.post('/api/bookings', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured', supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
    const newBooking = { id: `BK-${Date.now()}`, ...req.body, submitted_at: new Date().toISOString() };
    const { data, error } = await supabase.from('bookings').insert(newBooking).select();
    if (error) throw error;
    res.status(201).json(data?.[0] || newBooking);
  } catch (err) { console.error('POST /api/bookings error:', err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true });
    const { error } = await supabase.from('bookings').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error('DELETE /api/bookings error:', err); res.status(500).json({ error: err.message }); }
});

// Contacts API
app.get('/api/contacts', async (req, res) => {
  try {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('contacts').select('*').order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) { console.error('GET /api/contacts error:', err); res.status(500).json({ error: err.message }); }
});

app.post('/api/contacts', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Database not configured' });
    const newContact = { id: `CT-${Date.now()}`, ...req.body, submitted_at: new Date().toISOString() };
    const { data, error } = await supabase.from('contacts').insert(newContact).select();
    if (error) throw error;
    res.status(201).json(data?.[0] || newContact);
  } catch (err) { console.error('POST /api/contacts error:', err); res.status(500).json({ error: err.message }); }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    if (!supabase) return res.json({ success: true });
    const { error } = await supabase.from('contacts').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { console.error('DELETE /api/contacts error:', err); res.status(500).json({ error: err.message }); }
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
