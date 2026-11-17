import { promises as fs } from 'node:fs';

const key = (await fs.readFile('public/indexnow-key.txt', 'utf8')).trim();
const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urls.length) {
  console.error('No URLs found in dist/sitemap.xml. Run npm run build first.');
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'www.carzio.ma',
    key,
    keyLocation: 'https://www.carzio.ma/indexnow-key.txt',
    urlList: urls,
  }),
});

console.log(`IndexNow: ${response.status} ${response.statusText} for ${urls.length} URLs.`);
if (!response.ok) process.exit(1);
