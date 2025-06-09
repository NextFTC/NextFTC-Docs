import {defineConfig} from "vitepress";
import {tabsMarkdownPlugin} from "vitepress-plugin-tabs";
import guide from "./sidebar/guide.mts";
import nextftc from "./sidebar/nextftc.mts";
import bindings from "./sidebar/bindings.mts";
import control from "./sidebar/control.mts";

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
    description: "Simple but powerful library for FTC",
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
                    {text: "NextPedro", link: "/pedro/", activeMatch: "^/pedro/"}
                ],
                activeMatch: "^/(nextftc|control|bindings|pedro)/"

            },
            {
                text: "v1.0.0",
                items: [
                    {text: "v0.6.1", link: "https://v0.nextftc.dev"}
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
            '/control/': control
        },

        socialLinks:
            [
                {icon: "github", link: "https://github.com/rowan-mcalpin/nextftc"},
                {icon: "discord", link: "https://discord.gg/PjP9Ze6fkX"}
            ],
        editLink:
            {
                pattern: "https://github.com/rowan-mcalpin/nextftc-docs/edit/main/src/:path"
            }
        ,
        search: {
            provider: "local"
        }
    }
})
;
