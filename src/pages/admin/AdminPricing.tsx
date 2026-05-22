import { useState, useEffect } from 'react';
import { PricingRule } from '../../types';
import { fleet } from '../../data/fleet';

export default function AdminPricing() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', start_date: '', end_date: '', multiplier: 1.5, car_id: '', active: true });

  const fetchRules = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/pricing-rules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRules(data);
      }
    } catch (err) {
      console.error('Failed to fetch pricing rules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRules(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingId ? `/api/admin/pricing-rules/${editingId}` : '/api/admin/pricing-rules';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm({ name: '', start_date: '', end_date: '', multiplier: 1.5, car_id: '', active: true });
        fetchRules();
      }
    } catch (err) {
      console.error('Failed to save rule:', err);
    }
  };

  const deleteRule = async (id: string) => {
    if (!confirm('Delete this pricing rule?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`/api/admin/pricing-rules/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRules();
    } catch (err) {
      console.error('Failed to delete rule:', err);
    }
  };

  const editRule = (rule: PricingRule) => {
    setForm({
      name: rule.name,
      start_date: rule.start_date,
      end_date: rule.end_date,
      multiplier: rule.multiplier,
      car_id: rule.car_id || '',
      active: rule.active,
    });
    setEditingId(rule.id);
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">Loading pricing rules...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-heading text-2xl font-bold">Pricing Rules</h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', start_date: '', end_date: '', multiplier: 1.5, car_id: '', active: true }); }}
          className="bg-gold hover:bg-gold-light text-black font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          Add Rule
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/5">
            <h2 className="text-white font-heading font-bold text-lg mb-4">{editingId ? 'Edit Rule' : 'New Pricing Rule'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Rule Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none" placeholder="Eid Al-Adha 2026" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Start Date</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">End Date</label>
                  <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} required className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Multiplier ({Math.round((form.multiplier - 1) * 100)}% increase)</label>
                <input type="number" step="0.1" min="1" max="5" value={form.multiplier} onChange={(e) => setForm({ ...form, multiplier: parseFloat(e.target.value) || 1 })} required className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                <p className="text-gray-500 text-xs mt-1">1.5 = 50% increase, 2.0 = 100% increase</p>
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1">Car</label>
                <select value={form.car_id} onChange={(e) => setForm({ ...form, car_id: e.target.value })} className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none">
                  <option value="">All Cars</option>
                  {fleet.map(car => (
                    <option key={car.id} value={car.id}>{car.name}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-gold" />
                <span className="text-sm text-gray-300">Active</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gold hover:bg-gold-light text-black font-semibold py-2 rounded-lg text-sm transition">{editingId ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-2 rounded-lg text-sm transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {rules.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No pricing rules yet. Click "Add Rule" to create one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-zinc-900/80 backdrop-blur rounded-xl p-4 border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{rule.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${rule.active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  {rule.start_date} → {rule.end_date} · {Math.round((rule.multiplier - 1) * 100)}% increase{rule.car_id ? ` · Car: ${rule.car_id}` : ' · All cars'}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => editRule(rule)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-medium rounded-lg transition">Edit</button>
                <button onClick={() => deleteRule(rule.id)} className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs font-medium rounded-lg transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
