import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const files = [
  'public/images/55.jpg',
  'public/images/tamraght.jpg',
  'public/images/cable-car.jpg',
  'public/images/agadir-airport.jpg',
  'public/images/marrakech-airport.jpg',
  'public/images/essaouira-airport.jpg',
  'public/images/taghazout-beach.jpg',
  'public/images/casablanca-airport.jpg',
  'public/images/hero/carzio-pickup.jpg',
  'public/images/hero/agadir-airport-arrival.jpg',
  'public/images/journal/essaouira-port.jpg',
];

for (const relative of files) {
  const input = path.join(ROOT, relative);
  const output = input.replace(/\.(jpe?g|png)$/i, '.webp');
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  if (meta.width && meta.width > 1920) {
    image.resize({ width: 1920, withoutEnlargement: true });
  }
  await image.webp({ quality: 82, effort: 5 }).toFile(output);
  const stats = await fs.stat(output);
  console.log(`${relative} -> ${path.relative(ROOT, output)} (${Math.round(stats.size / 1024)} KB)`);
}

const replacements = [
  ['src/components/Hero.tsx', "'/images/55.jpg'", "'/images/55.webp'"],
  ['src/components/ExploreAgadir.tsx', "'/images/tamraght.jpg'", "'/images/tamraght.webp'"],
  ['src/components/ExploreAgadir.tsx', "'/images/cable-car.jpg'", "'/images/cable-car.webp'"],
  ['src/components/ExploreAgadir.tsx', "'/images/agadir-airport.jpg'", "'/images/agadir-airport.webp'"],
  ['src/data/locations.ts', "'/images/agadir-airport.jpg'", "'/images/agadir-airport.webp'"],
  ['src/data/locations.ts', "'/images/marrakech-airport.jpg'", "'/images/marrakech-airport.webp'"],
  ['src/data/locations.ts', "'/images/essaouira-airport.jpg'", "'/images/essaouira-airport.webp'"],
  ['src/data/locations.ts', "'/images/taghazout-beach.jpg'", "'/images/taghazout-beach.webp'"],
  ['src/data/locations.ts', "'/images/tamraght.jpg'", "'/images/tamraght.webp'"],
  ['src/data/locations.ts', "'/images/casablanca-airport.jpg'", "'/images/casablanca-airport.webp'"],
  ['src/content/support.ts', "'/images/hero/carzio-pickup.jpg'", "'/images/hero/carzio-pickup.webp'"],
  ['src/content/support.ts', "'/images/hero/agadir-airport-arrival.jpg'", "'/images/hero/agadir-airport-arrival.webp'"],
  ['src/content/support.ts', "'/images/journal/essaouira-port.jpg'", "'/images/journal/essaouira-port.webp'"],
  ['src/content/support.ts', "'/images/taghazout-beach.jpg'", "'/images/taghazout-beach.webp'"],
  ['src/pages/AirportPage.tsx', "url('/images/hero/agadir-airport-arrival.jpg')", "url('/images/hero/agadir-airport-arrival.webp')"],
];

for (const [file, from, to] of replacements) {
  const full = path.join(ROOT, file);
  const source = await fs.readFile(full, 'utf8');
  if (!source.includes(from)) continue;
  await fs.writeFile(full, source.split(from).join(to), 'utf8');
  console.log(`updated ${file}: ${from} -> ${to}`);
}
