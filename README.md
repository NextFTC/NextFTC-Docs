# NextFTC v2 Docs (Beta)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Documentation site for **NextFTC v2**, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
Deployed to [nextftc.dev](https://nextftc.dev).

## 🚀 Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   ├── styles/
│   │   └── custom.css
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in `src/content/docs/`.
Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.
Static assets, like favicons, go in `public/`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`       | Build the production site to `./dist/`           |
| `bun preview`         | Preview the build locally, before deploying      |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## Deployment

The site is hosted on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) as a static assets Worker, configured in `wrangler.jsonc`.

- **Production:** pushes to `main` are built and deployed by [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), Cloudflare's git integration.
  This is configured in the Cloudflare dashboard, not in this repo.
- **Previews:** `.github/workflows/build.yaml` builds every PR with `withastro/action`, which uploads `dist/` as an artifact.
  `.github/workflows/preview.yaml` then picks that artifact up, runs `wrangler versions upload --preview-alias pr-<number>`, and comments the preview URL on the PR.
  It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

## 👀 Want to learn more?

Check out [Starlight's docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [NextFTC Discord server](https://nextftc.dev/discord).
