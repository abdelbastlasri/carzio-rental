import { useState, useEffect } from 'react';

interface Booking {
  id: string; carName: string; totalPrice: number; days: number;
  pickupLocation: string; dropoffLocation: string;
  pickupDate: string; dropoffDate: string;
  customerName: string; customerEmail: string; customerPhone: string;
  flightNumber: string; extras: string[]; specialRequests: string;
  submittedAt: string;
}

interface Contact {
  id: string; name: string; email: string; phone: string;
  message: string; submittedAt: string;
}

type Tab = 'bookings' | 'contacts';

export default function AdminBookings() {
  const [tab, setTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/api/bookings`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`/api/contacts`).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
    ]).then(([b, c]) => {
      setBookings(b);
      setContacts(c);
      setLoading(false);
    }).catch(() => {
      setLoadError('Failed to load data. Is the server running?');
      setLoading(false);
    });
  }, []);

  const handleDeleteBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete contact:', err);
    }
  };

  const filteredBookings = bookings.filter(b =>
    !search || b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.carName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredContacts = contacts.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  const exportBookingsCSV = () => {
    const headers = ['ID', 'Date', 'Car', 'Customer', 'Phone', 'Email', 'Pickup', 'Dropoff', 'Days', 'Total', 'Flight', 'Extras', 'Requests'];
    const rows = bookings.map(b => [b.id, new Date(b.submittedAt).toLocaleDateString(), b.carName, b.customerName, b.customerPhone, b.customerEmail, b.pickupLocation, b.dropoffLocation, b.days, `${b.totalPrice}€`, b.flightNumber, b.extras.join('; '), b.specialRequests]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'carzio-bookings.csv'; a.click();
  };

  const exportContactsCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Message'];
    const rows = contacts.map(c => [c.id, new Date(c.submittedAt).toLocaleDateString(), c.name, c.email, c.phone, c.message]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'carzio-contacts.csv'; a.click();
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-black font-heading text-2xl md:text-3xl font-bold">Dashboard</h1>
            <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button onClick={() => setTab('bookings')} className={`px-4 py-2 text-sm font-medium transition ${tab === 'bookings' ? 'bg-gold text-black' : 'text-gray-500 hover:text-black'}`}>Bookings ({bookings.length})</button>
              <button onClick={() => setTab('contacts')} className={`px-4 py-2 text-sm font-medium transition ${tab === 'contacts' ? 'bg-gold text-black' : 'text-gray-500 hover:text-black'}`}>Messages ({contacts.length})</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none w-48" />
            <button onClick={tab === 'bookings' ? exportBookingsCSV : exportContactsCSV} className="bg-black hover:bg-zinc-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition">Export CSV</button>
          </div>
        </div>

        {loadError ? (
          <div className="text-center py-20 text-red-500">{loadError}</div>
        ) : loading ? (
          <div className="text-center py-20 text-silver">Loading...</div>
        ) : tab === 'bookings' ? (
          bookings.length === 0 ? (
            <div className="text-center py-20 text-gray-400"><p className="font-medium">No bookings yet</p></div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">ID</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Car</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Customer</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Pickup</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Dropoff</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Days</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Total</th>
                    <th className="text-center px-4 py-3 font-semibold text-black text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gold font-mono text-xs">{b.id}</td>
                      <td className="px-4 py-3 text-gray-600">{new Date(b.submittedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium text-black">{b.carName}</td>
                      <td className="px-4 py-3"><p className="text-black">{b.customerName}</p><p className="text-silver text-xs">{b.customerEmail}</p></td>
                      <td className="px-4 py-3 text-gray-600">{b.customerPhone}</td>
                      <td className="px-4 py-3 text-gray-600">{b.pickupLocation}<br /><span className="text-xs text-silver">{b.pickupDate}</span></td>
                      <td className="px-4 py-3 text-gray-600">{b.dropoffLocation}<br /><span className="text-xs text-silver">{b.dropoffDate}</span></td>
                      <td className="px-4 py-3 text-center text-gray-600">{b.days}</td>
                      <td className="px-4 py-3 text-gold font-bold">{b.totalPrice}€</td>
                      <td className="px-4 py-3 text-center"><button onClick={() => handleDeleteBooking(b.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          contacts.length === 0 ? (
            <div className="text-center py-20 text-gray-400"><p className="font-medium">No messages yet</p></div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">ID</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold text-black text-xs uppercase">Message</th>
                    <th className="text-center px-4 py-3 font-semibold text-black text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map(c => (
                    <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gold font-mono text-xs">{c.id}</td>
                      <td className="px-4 py-3 text-gray-600">{new Date(c.submittedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium text-black">{c.name}</td>
                      <td className="px-4 py-3 text-gray-600">{c.email}</td>
                      <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{c.message}</td>
                      <td className="px-4 py-3 text-center"><button onClick={() => handleDeleteContact(c.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
