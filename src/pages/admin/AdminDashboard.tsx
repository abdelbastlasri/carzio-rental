import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookingRecord } from '../../types';

interface SmtpStatus {
  supabaseConfigured: boolean;
  adminConfigured: boolean;
  smtpConfigured: boolean;
  smtpVerified: boolean;
  smtpError: string | null;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string | null;
  smtpFrom: string | null;
  smtpUserFromDb?: boolean;
  smtpPassFromDb?: boolean;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [smtp, setSmtp] = useState<SmtpStatus | null>(null);
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testTo, setTestTo] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const refreshStatus = () => {
    fetch('/api/status')
      .then(r => r.json())
      .then(setSmtp)
      .catch(() => setSmtp(null));
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    fetch('/api/admin/smtp', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.user) setSmtpUser(data.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    fetchBookings();
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
  };

  const saveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveResult(null);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ smtpUser: smtpUser.trim(), smtpPass: smtpPass.trim() }),
      });
      const body = await res.json();
      if (res.ok && body.success) {
        setSaveResult({ type: 'success', text: `${body.result} — sending as ${body.user}` });
      } else {
        setSaveResult({ type: 'error', text: body.result || body.error || 'Save failed' });
      }
    } catch (err) {
      setSaveResult({ type: 'error', text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setSaving(false);
      refreshStatus();
    }
  };

  const sendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTo.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ to: testTo.trim() }),
      });
      const body = await res.json();
      if (res.ok && body.success) {
        setTestResult({ type: 'success', text: body.result + ` — sent to ${body.sentTo}` });
      } else {
        setTestResult({ type: 'error', text: body.result || body.error || 'Test email failed' });
      }
    } catch (err) {
      setTestResult({ type: 'error', text: err instanceof Error ? err.message : 'Test email failed' });
    } finally {
      setTesting(false);
      refreshStatus();
    }
  };

  const cardClass = 'bg-zinc-900/80 backdrop-blur rounded-xl p-5 border border-white/5';

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-white font-heading text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={cardClass}>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total</p>
          <p className="text-white text-3xl font-bold">{stats.total}</p>
        </div>
        <div className={cardClass}>
          <p className="text-amber-400 text-xs uppercase tracking-wider mb-1">Pending</p>
          <p className="text-amber-400 text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className={cardClass}>
          <p className="text-green-400 text-xs uppercase tracking-wider mb-1">Confirmed</p>
          <p className="text-green-400 text-3xl font-bold">{stats.confirmed}</p>
        </div>
        <div className={cardClass}>
          <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Rejected</p>
          <p className="text-red-400 text-3xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/bookings" className={`${cardClass} hover:border-gold/30 transition flex items-center justify-between`}>
          <div>
            <p className="text-white font-heading font-semibold">Manage Bookings</p>
            <p className="text-gray-400 text-xs mt-1">View and update booking statuses</p>
          </div>
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </Link>
        <Link to="/pricing" className={`${cardClass} hover:border-gold/30 transition flex items-center justify-between`}>
          <div>
            <p className="text-white font-heading font-semibold">Pricing Rules</p>
            <p className="text-gray-400 text-xs mt-1">Manage holiday pricing adjustments</p>
          </div>
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
        <Link to="/login" className={`${cardClass} hover:border-gold/30 transition flex items-center justify-between`} onClick={(e) => { e.preventDefault(); localStorage.removeItem('admin_token'); window.location.href = '/login'; }}>
          <div>
            <p className="text-white font-heading font-semibold">Security</p>
            <p className="text-gray-400 text-xs mt-1">Change password or logout</p>
          </div>
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </Link>
      </div>

      {/* Email setup */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h2 className="text-white font-heading font-semibold mb-1">Email sender (Gmail)</h2>
          <p className="text-gray-400 text-xs mb-4">
            Booking emails are sent from a Gmail address. Set it once here and it works everywhere.
          </p>
          <form onSubmit={saveSmtp} className="space-y-3">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Your Gmail address</label>
              <input
                type="email"
                required
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                placeholder="abdelbast.lasri@gmail.com"
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">16-letter Google password</label>
              <input
                type="password"
                required
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder="abcd efgh ijkl mnop"
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={saving || !smtpUser.trim() || smtpPass.trim().length < 8}
              className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-2.5 rounded-lg transition text-sm disabled:opacity-50"
            >
              {saving ? 'Testing...' : 'Save & Test Email'}
            </button>
            <a
              href="https://myaccount.google.com/apppasswords"
              target="_blank"
              rel="noreferrer"
              className="block text-center text-gold text-xs underline hover:text-gold-light"
            >
              I don't have the 16-letter password — get one from Google ↗
            </a>
            {saveResult && (
              <p className={`text-xs rounded-lg p-2 break-words ${
                saveResult.type === 'success'
                  ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                  : 'text-red-400 bg-red-500/10 border border-red-500/20'
              }`}>
                {saveResult.text}
              </p>
            )}
          </form>
        </div>

        <div className={cardClass}>
          <h2 className="text-white font-heading font-semibold mb-4">Connection Status</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Configured</span>
              <span className={smtp?.smtpConfigured ? 'text-green-400' : 'text-red-400'}>
                {smtp?.smtpConfigured ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Verified with Gmail</span>
              <span className={smtp?.smtpVerified ? 'text-green-400' : 'text-amber-400'}>
                {smtp?.smtpVerified ? 'Connected ✓' : 'Failed'}
              </span>
            </div>
            {smtp && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sending account</span>
                  <span className="text-white">{smtp.smtpUser || '—'}{smtp.smtpUserFromDb ? ' (from panel)' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Host / Port</span>
                  <span className="text-white">{smtp.smtpHost}:{smtp.smtpPort}</span>
                </div>
              </>
            )}
            {(smtp?.smtpConfigured && !smtp?.smtpVerified && smtp?.smtpError) && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-2 mt-2 break-words">
                {smtp.smtpError}
              </p>
            )}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <h3 className="text-gray-300 font-heading font-semibold text-sm mb-2">Send a test email to my inbox</h3>
            <form onSubmit={sendTestEmail} className="space-y-2">
              <input
                type="email"
                required
                value={testTo}
                onChange={(e) => setTestTo(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={testing || !testTo.trim()}
                className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-2 rounded-lg transition text-sm disabled:opacity-50"
              >
                {testing ? 'Sending...' : 'Send Test Email'}
              </button>
              {testResult && (
                <p className={`text-xs rounded-lg p-2 break-words ${
                  testResult.type === 'success'
                    ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                    : 'text-red-400 bg-red-500/10 border border-red-500/20'
                }`}>
                  {testResult.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}