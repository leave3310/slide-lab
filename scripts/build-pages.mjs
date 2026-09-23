import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createViteConfig } from '@open-slide/core/vite';
import { build, mergeConfig } from 'vite';

const userCwd = fileURLToPath(new URL('../', import.meta.url));
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const base = basePath ? `/${basePath}/` : '/';
const config = await createViteConfig({ userCwd, mode: 'build' });

console.info(`Building GitHub Pages with base: ${base}`);
await build(mergeConfig(config, { base }));

// GitHub Pages serves this shell for direct React Router links and refreshes.
// The app renders the requested slide, though the HTTP response remains 404.
const outDir = resolve(userCwd, 'dist');
await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
