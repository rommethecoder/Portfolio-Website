# Romme's portfolio and personal hub

Static portfolio with engineering project stories, experience, resume, and space for future personal applications.

## Development

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

`npm run build` copies an explicit list of public assets into `dist/`. Personal garage records and credentials do not belong in this repository.

## Cloudflare Workers deployment

- Worker/project name: `portfolio-website`
- Production branch for the initial redesign: `portfolio-redesign`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root

Use the Workers static-assets configuration in `wrangler.jsonc`. The portfolio is public. The future garage application will use a separate deployment and authentication.

The existing GitHub Pages site publishes from `master`; pushing the redesign branch does not change that site. Repository renaming is deferred.
