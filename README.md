# Mayank Raj — Portfolio

Minimal React + Vite portfolio in ivory, charcoal, and muted bronze.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. No backend or environment variables are required.

## Content and design

- `src/App.jsx`: content, accessible navigation, project illustrations, and copy-email interaction.
- `src/index.css`: responsive layout, typography, colors, and motion preferences.
- `public/Mayank-Raj-Resume.pdf`: downloadable resume supplied by the owner.
- Project illustrations are labeled interface concepts, not screenshots of the live products.
- Facts and project URLs are sourced from the supplied October 11, 2026 resume, GitHub profile, and publicly indexed LinkedIn profile. Research selection is described as selection for presentation, not publication.

## Performance and accessibility

Only React and React DOM are runtime dependencies. No WebGL, animation libraries, custom cursor loop, scroll interception, or loading gate. Brief animations use opacity and transform; reduced-motion preferences disable animations and smooth scrolling. Native pointer cursors, keyboard focus styles, a skip link, mobile navigation, and semantic sections are provided. Google Fonts uses `display=swap` with system fallbacks.

Production bundle at implementation: approximately 64 KB gzip JavaScript and 4 KB gzip CSS, excluding fonts and the downloadable PDF. Actual frame rate depends on device and browser; no fixed FPS is guaranteed.
