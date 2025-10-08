import {DefaultTheme} from "vitepress";

type SidebarItem = DefaultTheme.SidebarItem;

export default [
    {
        text: "Introduction", items: [
            {text: "What is NextFTC?", link: "/guide/about"},
            {text: "Installation", link: "/guide/installation"},
        ]
    },
    {
        text: "Subsystems",
        items: [
            {text: "Overview", link: "/guide/subsystems/overview"},
            {text: "Lift", link: "/guide/subsystems/lift"},
            {text: "Claw", link: "/guide/subsystems/claw"},
            {text: "Groups and Robots", link: "/guide/subsystems/groups-and-robot"},
        ]
    },
    {
        text: "OpModes",
        items: [
            {text: "Autonomous", link: "/guide/opmodes/autonomous"},
            {text: "TeleOp", link: "/guide/opmodes/teleop"},
        ]
    },
    {
        text: "Further Reading",
        link: "/guide/further-reading"
    }
] satisfies SidebarItem[]