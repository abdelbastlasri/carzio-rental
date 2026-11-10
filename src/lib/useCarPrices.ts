import { useEffect, useState } from 'react';

/**
 * Live daily prices for the fleet.
 *
 * The database (`car_prices` table, exposed by /api/car-prices) is the single
 * source of truth for prices — including seasonal ones. Every surface that
 * shows a price (the /cars page, the Blog fleet strip, the booking modal)
 * must read the same values, otherwise the site would advertise two different
 * prices for the same car.
 */
export function useCarPrices(): Record<string, number> {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;

    fetch('/api/car-prices')
      .then((response) => response.json())
      .then((data: { car_id: string; price_per_day: number }[]) => {
        if (!active || !Array.isArray(data)) return;
        const map: Record<string, number> = {};
        data.forEach((entry) => {
          map[entry.car_id] = entry.price_per_day;
        });
        setPrices(map);
      })
      .catch(() => {
        // The static price in the fleet data stays visible if the API is down.
      });

    return () => {
      active = false;
    };
  }, []);

  return prices;
}
