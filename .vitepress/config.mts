import {defineConfig} from "vitepress";
import {tabsMarkdownPlugin} from "vitepress-plugin-tabs";
import guide from "./sidebar/guide.mts";
import nextftc from "./sidebar/nextftc.mts";
import bindings from "./sidebar/bindings.mts";
import control from "./sidebar/control.mts";
import extensions from "./sidebar/extensions.mts";
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: "src",
    head: [
        ["link", {rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico"}],
        ["link", {rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96"}],
        ["link", {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"}],
        [
            "link",
            {
                rel: "apple-touch-icon",
                href: "/apple-touch-icon.png",
                sizes: "180x180"
            }
        ],
        ["link", {rel: "manifest", href: "/site.webmanifest"}]
    ],
    cleanUrls: true,
    ignoreDeadLinks: true,
    markdown: {
        config(md) {
            md.use(tabsMarkdownPlugin);
        }
    },
    title: "NextFTC Documentation",
    description: "Simple but powerful libraries for FTC",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: "Guide", link: "/guide/about", activeMatch: "^/guide/"},
            {
                text: "Libraries",
                items: [
                    {text: "NextFTC", link: "/nextftc/", activeMatch: "^/nextftc/"},
                    {text: "NextControl", link: "/control/", activeMatch: "^/control/"},
                    {text: "NextBindings", link: "/bindings/", activeMatch: "^/bindings/"},
                    {text: "Extensions", link: "/extensions/", activeMatch: "^/extensions/"},
                ],
                activeMatch: "^/(nextftc|control|bindings|extensions)/"

            },
            {
                text: "v1.0.0",
                items: [
                    {text: "v0.6", link: "https://v0.nextftc.dev"} // TODO: Update to `v0.nextftc.dev` when v1 is released
                ]
            },
            {
                text: "KDoc",
                link: "https://javadoc.io/doc/dev.nextftc"
            },
            {text: "Contributing", link: "/contributing"},
            {text: "Code of Conduct", link: "/code-of-conduct"}
        ],

        sidebar: {
            '/guide/': guide,
            '/nextftc/': nextftc,
            '/bindings/': bindings,
            '/control/': control,
            '/extensions/': extensions
        },

        socialLinks:
            [
                {icon: "github", link: "https://github.com/NextFTC"},
                {icon: "discord", link: "https://nextftc.dev/discord"}
            ],
        editLink:
            {
                pattern: "https://github.com/NextFTC/NextFTC-Docs/edit/main/src/:path" // TODO: Update to `NextFTC-Docs` when v1 is released
            }
        ,
        search: {
            provider: "local"
        }
    },
    vite: {
        plugins: [llmstxt()]
    }
});
