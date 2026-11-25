// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import starlightLinksValidator from "starlight-links-validator";

import cloudflare from "@astrojs/cloudflare";

import { sidebar } from "./src/config/sidebar.mts";
import { redirects } from "./src/config/redirects.mts";

// https://astro.build/config
export default defineConfig({
  site: "https://nextftc.dev",

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Science Gothic",
      cssVariable: "--font-science-gothic",
      weights: ["400 900"],
      subsets: ["latin"],
    },
  ],

  integrations: [
    starlight({
      title: "NextFTC",
      logo: {
        light: "./src/assets/wordmark-light.svg",
        dark: "./src/assets/wordmark-dark.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      customCss: ["./src/styles/custom.css"],
      components: {
        Head: "./src/components/Head.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/NextFTC/NextFTCSuite",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://nextftc.dev/discord",
        },
      ],
      sidebar: sidebar,
      plugins: [starlightThemeGalaxy(), starlightLinksValidator()],
    }),
  ],
  redirects: redirects,
  adapter: cloudflare({ prerenderEnvironment: "node" }),
  session: false,
});
