import { useState, useEffect } from 'react';
import { BookingRecord } from '../../types';

export default function AdminBookings() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, newStatus: 'confirmed' | 'rejected') => {
    setUpdating(id);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const sendEmail = async (bookingId: string) => {
    setSending(bookingId);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookingId }),
      });
      if (res.ok) alert('Email sent!');
      else { const d = await res.json(); alert(d.error || 'Failed'); }
    } catch {
      alert('Failed to send email');
    } finally {
      setSending(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking permanently?')) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b.id !== id));
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete');
      }
    } catch {
      alert('Failed to delete booking');
    } finally {
      setDeleting(null);
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return `px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.pending}`;
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">Loading bookings...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-heading text-2xl font-bold">Bookings</h1>
        <button onClick={fetchBookings} className="text-gray-400 hover:text-white text-sm transition">
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-zinc-900/80 backdrop-blur rounded-xl p-4 border border-white/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-base">{booking.customer_name}</h3>
                    <span className={statusBadge(booking.status)}>{booking.status}</span>
                  </div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <p><span className="text-gray-500">Car:</span> {booking.car_name}</p>
                    <p><span className="text-gray-500">Pickup:</span> {booking.pickup_date} at {booking.pickup_time} — {booking.pickup_location}</p>
                    <p><span className="text-gray-500">Return:</span> {booking.dropoff_date} at {booking.dropoff_time} — {booking.dropoff_location}</p>
                    <p><span className="text-gray-500">Total:</span> €{booking.total_price}</p>
                    {booking.customer_age && <p><span className="text-gray-500">Age:</span> {booking.customer_age}</p>}
                    {booking.transport_fee !== undefined && booking.transport_fee > 0 && (
                      <p><span className="text-gray-500">Transport fee:</span> €{booking.transport_fee}</p>
                    )}
                    <p><span className="text-gray-500">Contact:</span> {booking.customer_phone} | {booking.customer_email}</p>
                    {booking.submitted_at && <p><span className="text-gray-500">Submitted:</span> {new Date(booking.submitted_at).toLocaleString()}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        disabled={updating === booking.id}
                        className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                      >
                        {updating === booking.id ? '...' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'rejected')}
                        disabled={updating === booking.id}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                      >
                        {updating === booking.id ? '...' : 'Reject'}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => sendEmail(booking.id)}
                    disabled={sending === booking.id}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-medium rounded-lg transition disabled:opacity-50"
                  >
                    {sending === booking.id ? '...' : 'Email'}
                  </button>
                  {booking.status !== 'pending' && (
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      disabled={deleting === booking.id}
                      className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800/80 text-red-300 text-xs font-medium rounded-lg border border-red-800/50 transition disabled:opacity-50"
                    >
                      {deleting === booking.id ? '...' : 'Delete'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
