# The Saudade Journal

A GitHub-ready Next.js starting point for a separate editorial home for Chloe Holloway's Substack writing. It uses a dusty-rose archival visual system, paper grain, editorial typography and an article archive sourced from the public Substack archive endpoint.

## Publication identity

- **Name:** The Saudade Journal
- **Author:** Chloe Holloway
- **Eyebrow:** A Collection of Curiosities
- **Description:** On the identities we build, the stories we inherit, the images that move us, and the worlds we make for ourselves and others.
- **Marginal note:** A short definition of *saudade* appears beside the masthead on desktop and moves below it on mobile.
- **Source publication:** https://sudadestudio.substack.com

## Requirements

- Node.js 20.9 or later
- npm
- GitHub account
- Optional Vercel account for hosting

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

The first install will generate `package-lock.json`. Commit that lockfile to GitHub so deployments use reproducible dependency versions.

## Deploy to GitHub and Vercel

1. Create a new empty GitHub repository named `saudade-journal`.
2. Unzip this project and place its contents in the repository folder.
3. In a terminal inside the folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial Saudade Journal website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/saudade-journal.git
   git push -u origin main
   ```

4. In Vercel, import the GitHub repository.
5. Add these environment variables in Vercel:
   - `NEXT_PUBLIC_PUBLICATION_URL=https://sudadestudio.substack.com`
   - `SITE_URL=https://YOUR-DEPLOYED-DOMAIN`
6. Deploy. Use the Vercel preview URL to test before attaching a custom domain.

## Important implementation notes

- The public Substack endpoint used is `/api/v1/archive?sort=new&limit=50&offset=0`. It is an observed, undocumented endpoint, not a guaranteed API contract. If Substack changes it or blocks server requests, the page will show an honest empty/error state.
- The archive fetch paginates until an empty batch, validates post URLs against the configured publication host, and deduplicates by ID.
- Substack response schemas can change. Verify returned tags, subtitle, paid status and image fields against the real publication before launch.
- Cover artwork uses a source image field when available. Otherwise the site uses an explicitly generated typographic placeholder, not a falsely attributed image.
- **Popularity sorting is intentionally not included.** The project does not yet have a verified popularity feed. Do not label reverse chronological order as popularity.
- This project currently does not include a saved archive snapshot. Add a verified snapshot/export before production if uptime independent of Substack is required.
- Article preview is implemented as a dialog-like overlay. Before launch, test keyboard focus entry/return and Escape behaviour on desktop and mobile; a native `<dialog>` or a proven accessible dialog library is recommended for a fully audited modal.
- Reader suggestions and Notion integration are intentionally omitted.
- Metadata currently uses `robots: { index: false }` to discourage indexing while in preview. Change this after you are ready to launch and have set `SITE_URL`.
- Google Fonts are loaded remotely. For stricter privacy or offline reliability, self-host the font files and review their licences.
- This repository does not contain a Substack owner export, private data, credentials, or paid article bodies.

## Before launch checklist

- [ ] `npm install` succeeds and commits `package-lock.json`.
- [ ] `npm run build` succeeds.
- [ ] Compare visible article count with the full Substack dashboard.
- [ ] Verify dates, links, tags, subtitles, paid status and cover image/article pairing.
- [ ] Add and test a saved archive snapshot and a maintenance process.
- [ ] Confirm every link and subscribe CTA.
- [ ] Test at 320px, 375px, 430px and desktop widths.
- [ ] Test keyboard-only use, dialog focus, Escape, touch and reduced motion.
- [ ] Set the final `SITE_URL`, social preview and indexing policy.
- [ ] Only enable indexing once the archive is verified.

## Refreshing

Archive metadata uses Next.js request-triggered revalidation with a one-hour interval. This is not a background scheduled job. To force a fresh deployment, redeploy the project. For a robust production archive, add a scheduled sync script that validates a complete import before replacing a saved snapshot.

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Newsroom.tsx
lib/
  archive.ts
  publication.ts
.env.example
README.md
```
