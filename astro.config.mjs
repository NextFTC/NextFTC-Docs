// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightLinksValidator from "starlight-links-validator";

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
      plugins: [
        starlightSidebarTopics([
          {
            label: "Introduction",
            link: "/introduction/",
            icon: "rocket",
            items: [{ autogenerate: { directory: "introduction" } }],
          },
          {
            label: "Your First Robot",
            link: "/your-first-robot/",
            icon: "star",
            items: [{ autogenerate: { directory: "your-first-robot" } }],
          },
          {
            label: "Robot Module",
            link: "/robot/",
            icon: "puzzle",
            items: [
              { slug: "robot" },
              { slug: "robot/commands" },
              { slug: "robot/mechanisms" },
              { slug: "robot/nextrobot" },
              { slug: "robot/nextopmode" },
              { slug: "robot/triggers" },
              { slug: "robot/drive-commands" },
              { slug: "robot/project-structure" },
              {
                label: "Advanced",
                items: [{ autogenerate: { directory: "robot/advanced" } }],
              },
            ],
          },
          {
            label: "Hardware Module",
            link: "/hardware/",
            icon: "setting",
            items: [
              {
                label: "Actuators",
                items: [{ autogenerate: { directory: "hardware/actuators" } }],
              },
              {
                label: "Sensors",
                items: [{ autogenerate: { directory: "hardware/sensors" } }],
              },
              {
                label: "Miscellaneous",
                items: [
                  { autogenerate: { directory: "hardware/miscellaneous" } },
                ],
              },
            ],
          },
          {
            label: "Control Module",
            link: "/control/",
            icon: "document",
            items: [{ autogenerate: { directory: "control" } }],
          },
        ]),
        starlightThemeGalaxy(),
        starlightLinksValidator(),
      ],
    }),
  ],
});
