import { useState, useEffect } from 'react';
import { fleet } from '../../data/fleet';

export default function AdminPricing() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const fetchPrices = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/admin/car-prices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, number> = {};
        const edit: Record<string, string> = {};
        data.forEach((p: { car_id: string; price_per_day: number }) => {
          map[p.car_id] = p.price_per_day;
          edit[p.car_id] = String(p.price_per_day);
        });
        fleet.forEach(c => {
          if (edit[c.id] === undefined) edit[c.id] = String(c.pricePerDay);
        });
        setPrices(map);
        setEditValues(edit);
      }
    } catch (err) {
      console.error('Failed to fetch car prices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrices(); }, []);

  const savePrice = async (carId: string) => {
    setSaving(carId);
    try {
      const token = localStorage.getItem('admin_token');
      const val = parseFloat(editValues[carId]);
      if (isNaN(val) || val < 0) { alert('Invalid price'); setSaving(null); return; }
      const res = await fetch(`/api/admin/car-prices/${carId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ price_per_day: val }),
      });
      if (res.ok) {
        setPrices(prev => ({ ...prev, [carId]: val }));
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to save');
      }
    } catch (err) {
      console.error('Failed to save price:', err);
      alert('Failed to save');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">Loading car prices...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-heading text-2xl font-bold">Car Prices</h1>
        <span className="text-gray-500 text-xs">Set the daily price per car</span>
      </div>

      <div className="space-y-2">
        {fleet.map(car => {
          const isOverridden = prices[car.id] !== undefined && prices[car.id] !== car.pricePerDay;
          return (
            <div key={car.id} className="bg-zinc-900/80 backdrop-blur rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">{car.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{car.type} · Base: {car.pricePerDay}€/day</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={editValues[car.id] || ''}
                  onChange={(e) => setEditValues(prev => ({ ...prev, [car.id]: e.target.value }))}
                  className="w-24 bg-black text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-gold focus:outline-none text-center"
                />
                <span className="text-gray-400 text-xs">€</span>
                <button
                  onClick={() => savePrice(car.id)}
                  disabled={saving === car.id}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                    isOverridden
                      ? 'bg-gold hover:bg-gold-light text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
                  }`}
                >
                  {saving === car.id ? '...' : isOverridden ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-gray-500 text-xs text-center mt-6">Prices take effect immediately on the website.</p>
    </div>
  );
}
