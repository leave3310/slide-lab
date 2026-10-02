# open-slide workspace

Slides as React components. Each slide lives under `slides/<id>/index.tsx` and default-exports an array of page components. The `@open-slide/core` runtime handles layout, scaling, navigation, thumbnails, and fullscreen play mode — you just write the pages.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the dev server and create a slide at `slides/<your-slide>/index.tsx`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server with hot reload. |
| `pnpm build` | Build a static bundle you can deploy. |
| `pnpm preview` | Preview the built bundle locally. |

## Deploying to GitHub Pages

In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
Push to `main`, or run **Deploy to GitHub Pages** manually from the Actions tab.
The workflow builds and uploads `dist/`; generated files do not need to be committed.

The Pages build reads the site's base path from GitHub, so both URLs are supported:

| Site URL | Build base |
| --- | --- |
| `https://leave3310.github.io/event-loop-to-ts/` | `/event-loop-to-ts/` |
| `https://slides.itskylen.com/` (after configuring the custom domain) | `/` |

After changing the custom domain in Pages settings, rerun the workflow to rebuild
asset URLs and the router base. No source changes are needed for that switch.
Local `pnpm dev`, `pnpm build`, and `pnpm preview` retain their existing configuration.

### Google Analytics

Production deployments load Google Analytics when `GA_MEASUREMENT_ID` is set to a
GA4 Measurement ID such as `G-XXXXXXXXXX`. For GitHub Pages, add it as a repository
variable under **Settings → Secrets and variables → Actions → Variables**. Vercel and
Netlify can use an environment variable with the same name.

To reproduce the project-site build locally:

```bash
PAGES_BASE_PATH=/event-loop-to-ts/ node scripts/build-pages.mjs
```

For a custom domain at the root, use `PAGES_BASE_PATH=/` instead. The script defaults
to `/` when the variable is unset. To preview a Pages build with the existing
`pnpm preview` command, use the root-domain build; project-subpath builds need a
preview server configured with the matching base path.

The Pages build also copies `index.html` to `404.html` so opening or refreshing a
slide URL can render the React app. GitHub Pages still returns HTTP 404 for those
fallback requests.

## Authoring a slide

```tsx
// slides/my-slide/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Every page renders into a fixed **1920 × 1080** canvas — design with absolute pixel values. Put images, videos, and fonts under `slides/<id>/assets/` and import them directly.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide.

## Navigation

- Arrow keys / PageUp / PageDown move between pages.
- `F` enters fullscreen play mode; Esc exits.
- In play mode: Space / → next, ← prev.

## Claude Code integration

This workspace ships with Claude Code skills preconfigured under `.claude/skills/` and `.agents/skills/`. Ask Claude Code to "make slides about X" and the `create-slide` skill takes over. Use `apply-comments` to iterate via inspector-style markers inside your source.

## Config

Optional `open-slide.config.ts` at the workspace root:

```ts
import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  port: 5173,
};

export default openSlideConfig;
```

Supported fields: `slidesDir`, `port`.
