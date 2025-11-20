import {DefaultTheme} from "vitepress";

type SidebarItem = DefaultTheme.SidebarItem;

export default [
    {
        text: "Overview", link: '/extensions/'
    },
    {
        text: "Pedro Pathing", items: [
            {text: "Installation", link: "/extensions/pedro/"},
            {text: "Getting Started", link: "/extensions/pedro/getting-started"},
            {text: "Following Paths", link: "/extensions/pedro/following-paths"},
            {text: "Turning", link: "/extensions/pedro/turning"},
            {text: "TeleOp Driving", link: "/extensions/pedro/teleop"},
        ]
    },
    {
        text: "RoadRunner", items: [
            {text: "Installation", link: "/extensions/roadrunner/"},
            {text: "Trajectory Command Builder", link: "/extensions/roadrunner/command-builder"},
            {text: "Using With Other Commands", link: "/extensions/roadrunner/other-commands"}
        ]
    },
    {
        text: "FateWeaver", items: [
            {text: "Installation", link: "/extensions/fateweaver/"},
            {text: "FateComponent", link: "/extensions/fateweaver/fatecomponent"},
            {text: "Publishers", link: "/extensions/fateweaver/publishers"},
        ]
    }
] satisfies SidebarItem[]