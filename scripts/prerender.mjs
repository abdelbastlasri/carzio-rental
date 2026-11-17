import { createServer } from 'vite';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://www.carzio.ma';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function metaBlock(route) {
  const canonical = `${ORIGIN}${route.canonicalPath}`;
  const image = route.image || `${ORIGIN}/images/hero/new-slide-7.webp`;
  const robots = route.robots || 'index, follow';
  const lines = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  ];

  for (const [lang, href] of Object.entries(route.alternates || {})) {
    if (!href) continue;
    lines.push(`<link rel="alternate" hreflang="${lang}" href="${ORIGIN}${escapeHtml(href)}" />`);
  }
  const xDefault = route.alternates?.en || route.canonicalPath;
  lines.push(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}${escapeHtml(xDefault)}" />`);

  const localeMap = {
    en: 'en_GB',
    fr: 'fr_FR',
    de: 'de_DE',
    es: 'es_ES',
    pl: 'pl_PL',
    nl: 'nl_NL',
  };
  lines.push(
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${route.path.includes('/blog/') || route.path.includes('/news/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="Carzio" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:locale" content="${localeMap[route.lang] || 'en_GB'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  );

  if (route.jsonLd) {
    const json = JSON.stringify(route.jsonLd).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }

  return lines.join('\n    ');
}

function fallbackBlock(route) {
  return `<div id="root"><div style="max-width:72rem;margin:0 auto;padding:4rem 1.5rem;font-family:system-ui,sans-serif;color:#fff;background:#000"><h1 style="font-size:2rem;line-height:1.2;margin:0 0 1rem">${escapeHtml(route.h1)}</h1><p style="max-width:46rem;line-height:1.6;color:#a1a1aa;margin:0 0 1.5rem">${escapeHtml(route.intro)}</p><p><a href="${escapeHtml(route.canonicalPath)}" style="color:#d4af37">Carzio — ${escapeHtml(route.title)}</a></p></div></div>`;
}

function fileForRoute(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  return path.join(DIST, clean, 'index.html');
}

function buildSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes
    .filter((route) => route.sitemap && !String(route.robots || '').includes('noindex'))
    .sort((a, b) => a.canonicalPath.localeCompare(b.canonicalPath));

  const seen = new Set();
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const route of entries) {
    if (seen.has(route.canonicalPath)) continue;
    seen.add(route.canonicalPath);
    lines.push('  <url>');
    lines.push(`    <loc>${ORIGIN}${route.canonicalPath}</loc>`);
    lines.push(`    <lastmod>${route.lastmod || today}</lastmod>`);
    for (const [lang, href] of Object.entries(route.alternates || {})) {
      if (!href) continue;
      lines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}${href}" />`);
    }
    const xDefault = route.alternates?.en || route.canonicalPath;
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${xDefault}" />`);
    lines.push(`    <priority>${(route.priority || 0.5).toFixed(1)}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>', '');
  return lines.join('\n');
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let routes;
try {
  const mod = await server.ssrLoadModule('/src/lib/routeMeta.ts');
  routes = mod.getRouteMeta();
} finally {
  await server.close();
}

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');

if (!template.includes('<!-- seo:start -->') || !template.includes('<!-- seo:end -->')) {
  throw new Error('index.html is missing the SEO markers.');
}

let written = 0;
for (const route of routes) {
  let html = template.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    `<!-- seo:start -->\n    ${metaBlock(route)}\n    <!-- seo:end -->`,
  );
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`);
  html = html.replace('<div id="root"></div>', fallbackBlock(route));

  const file = fileForRoute(route.path);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html, 'utf8');
  written += 1;
}

const notFoundMeta = {
  path: '/404',
  lang: 'en',
  title: 'Page not found | Carzio',
  description: 'This page does not exist. Return to Carzio car rental in Agadir.',
  canonicalPath: '/en',
  robots: 'noindex, follow',
  h1: 'Page not found',
  intro: 'This page does not exist. Return to Carzio car rental in Agadir.',
  alternates: {},
};
let notFoundHtml = template.replace(
  /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
  `<!-- seo:start -->\n    ${metaBlock(notFoundMeta)}\n    <!-- seo:end -->`,
);
notFoundHtml = notFoundHtml
  .replace(/<link rel="canonical"[^>]*>\s*/i, '')
  .replace('<div id="root"></div>', fallbackBlock(notFoundMeta));
await fs.writeFile(path.join(DIST, '404.html'), notFoundHtml, 'utf8');

await fs.writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(routes), 'utf8');
console.log(`Prerendered ${written} routes, generated dist/404.html and dist/sitemap.xml.`);
