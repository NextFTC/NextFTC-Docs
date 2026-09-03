# NextFTC v2 Docs (Beta)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Documentation site for **NextFTC v2**, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
Deployed to [beta.nextftc.dev](https://beta.nextftc.dev).

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

Pushes to `main` are built and deployed to GitHub Pages automatically via `.github/workflows/deploy.yaml`.

## 👀 Want to learn more?

Check out [Starlight's docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [NextFTC Discord server](https://nextftc.dev/discord).
