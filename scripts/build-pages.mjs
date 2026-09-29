import { createRequire } from 'node:module';
import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createViteConfig } from '@open-slide/core/vite';

const coreRequire = createRequire(import.meta.resolve('@open-slide/core/vite'));
const { build, mergeConfig } = await import(pathToFileURL(coreRequire.resolve('vite')).href);

const userCwd = fileURLToPath(new URL('../', import.meta.url));
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const base = basePath ? `/${basePath}/` : '/';
const gaMeasurementId = process.env.GA_MEASUREMENT_ID?.trim();

if (gaMeasurementId && !/^G-[A-Z0-9]+$/i.test(gaMeasurementId)) {
  throw new Error('GA_MEASUREMENT_ID must be a GA4 Measurement ID such as G-XXXXXXXXXX');
}

const googleAnalyticsPlugin = {
  name: 'open-slide-google-analytics',
  transformIndexHtml() {
    if (!gaMeasurementId) return;

    return [
      {
        tag: 'script',
        attrs: {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`,
        },
        injectTo: 'head',
      },
      {
        tag: 'script',
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`,
        injectTo: 'head',
      },
    ];
  },
};

const config = await createViteConfig({ userCwd, mode: 'build' });

console.info(`Building GitHub Pages with base: ${base}`);
console.info(`Google Analytics: ${gaMeasurementId ? 'enabled' : 'disabled'}`);
await build(mergeConfig(config, { base, plugins: [googleAnalyticsPlugin] }));

// GitHub Pages serves this shell for direct React Router links and refreshes.
// The app renders the requested slide, though the HTTP response remains 404.
const outDir = resolve(userCwd, 'dist');
await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
