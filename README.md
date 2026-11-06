# Romme the Builder — portfolio & application hub

[Visit rommethebuilder.com](https://rommethebuilder.com) · [Current resume](https://rommethebuilder.com/files/Terry_Felton_Resume_November2026.pdf)

Personal portfolio for Terry (Romme) Felton, Senior Platform Engineer at JPI. It brings together engineering case studies, professional experience, a downloadable resume, and a hub for private personal applications.

## Applications

- **Garage:** vehicle maintenance, troubleshooting, reminders and costs, with owner-scoped ChatGPT MCP tools.
- **Trip Ledger:** trip budgets, expenses and reimbursements, with a separate authenticated MCP connector.

The portfolio is public. Application source, records and credentials are private. App links require an invited Google identity. This repository contains no financial or vehicle databases.

## Develop

Requires Node.js 22+.

```sh
npm ci
npm run dev
```

`npm run build` copies an explicit public-asset allowlist into `dist/`. The HTML, CSS and browser JavaScript are buildless; Wrangler serves and deploys those assets. The authoritative LaTeX resume source lives under `resume/`; it is not deployed as a webpage.

## Deploy

Cloudflare Worker: `portfolio-website`. Default/production branch: `portfolio-redesign`. Build: `npm run build`; deploy: `npx wrangler deploy`. Pushing this branch triggers the existing Cloudflare build integration.

The legacy `master` branch is retained; its GitHub Pages entry now redirects visitors to the current custom domain on Cloudflare. Repository renaming remains deferred.

## Source map

- `index.html`: content and semantic page structure
- `css/portfolio.css`: responsive styles, reduced-motion support and theme
- `js/portfolio.js`: progressive reveals, expandable case studies and reading progress
- `scripts/build.mjs`: public asset allowlist
- `resume/`: LaTeX source and reproducible PDF build instructions

## Attribution

The earlier portfolio used the KARDS template from [Styleshout](https://www.styleshout.com/). Its original attribution notice is retained in `readme.txt`; the historical template remains on the legacy branch. The current redesign uses a dedicated stylesheet and script. Poppins fonts are distributed under the SIL Open Font License; see `fonts/poppins/OFL.txt`.

## Resume authoring

The current resume is authored in LaTeX, adapted from the archived October 2026 source. Run `npm run resume` with Tectonic and Poppler (`pdfinfo`/`pdftotext`) installed, then `npm run build` to include the verified PDF in the deployment. See [resume/README.md](resume/README.md). The earlier HTML-to-PDF source is superseded; do not recreate it.
