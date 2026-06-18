# Mayank Raj Portfolio

React + Vite portfolio built with JavaScript/JSX.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Performance Notes

- The 3D hero is lazy-loaded so the main interface renders first.
- The Three.js scene uses raw buffer geometry instead of heavy helper/postprocessing packages.
- Postprocessing bloom, chromatic aberration, text geometry, and scroll blur were removed to reduce GPU jank.
- Reduced-motion preferences are respected.
