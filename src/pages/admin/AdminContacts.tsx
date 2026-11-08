import { useState, useEffect } from 'react';
import { ContactRecord } from '../../types';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setError('');
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to delete message');
      }
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">Loading messages...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-heading text-2xl font-bold">Contact messages</h1>
          <p className="text-gray-400 text-xs mt-1">
            Messages sent from the public contact form.
          </p>
        </div>
        <button onClick={fetchContacts} className="text-gray-400 hover:text-white text-sm transition">
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-lg border text-sm bg-red-500/10 text-red-400 border-red-500/30">
          {error}
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <article
              key={contact.id}
              className="bg-zinc-900/80 backdrop-blur rounded-xl p-4 border border-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base">{contact.name}</h2>
                  <div className="text-gray-400 text-xs space-y-1 mt-1">
                    <p>
                      <span className="text-gray-500">Email:</span>{' '}
                      <a href={`mailto:${contact.email}`} className="text-gold hover:underline">
                        {contact.email}
                      </a>
                    </p>
                    {contact.phone && (
                      <p>
                        <span className="text-gray-500">Phone:</span>{' '}
                        <a href={`tel:${contact.phone}`} className="text-gold hover:underline">
                          {contact.phone}
                        </a>
                      </p>
                    )}
                    {contact.submitted_at && (
                      <p>
                        <span className="text-gray-500">Received:</span>{' '}
                        {new Date(contact.submitted_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-200">
                    {contact.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: your message to Carzio`)}`}
                    className="px-4 py-1.5 bg-gold hover:bg-gold-light text-black text-xs font-semibold rounded-lg transition"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    disabled={deleting === contact.id}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                  >
                    {deleting === contact.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
