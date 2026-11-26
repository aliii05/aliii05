# SNS Nails — website

React + TypeScript + Tailwind (Vite). No animation library: motion is plain CSS and IntersectionObserver, which keeps it fast on older phones and respects `prefers-reduced-motion`.

## Run
```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
npm run preview  # preview the build at http://localhost:4173
```

## Edit content
Everything lives in **`src/config/site.ts`**: prices, services, opening hours, reviews, phone, address, Instagram and gallery images. The LocalBusiness structured data (JSON-LD) is built from the same file.

## Photos
Put the five salon photos in `public/gallery/` as `nail-1.webp` … `nail-5.webp`. Until then, a branded placeholder shows in their place.
Optimise them first (about 1200px on the long edge, WebP, quality around 78):
```bash
npx sharp-cli -i photo.jpg -o public/gallery/nail-1.webp resize 1200 --format webp --quality 78
```
Also add `public/og-image.jpg` (1200×630) for social sharing.

## Hero video (optional)
After an OpenArt clip is approved and generated, set `heroVideo` in `site.ts` to its paths: an MP4 under 3 MB, plus an optional mobile 9:16 cut and a poster image.

## Deploy (Vercel)
Import the repo in Vercel, set the root directory to `sns-nails`, and select the Vite framework preset. `vercel.json` sets the cache headers.
Before going live, update `business.url`, the canonical/OG URLs in `index.html`, `robots.txt`/`sitemap.xml`, and confirm `business.geo` on Google Maps.
