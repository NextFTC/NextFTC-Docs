import {DefaultTheme} from "vitepress";

type SidebarItem = DefaultTheme.SidebarItem;

export default [
    {
        text: "Overview",
        link: "/control/"
    },
    {
        text: "Getting Started",
        link: "/control/getting-started"
    },
    {
        text: "Configuring with the FTC Dashboard",
        link: "/control/dashboard"
    },
    {
        text: "Reference",
        items: [
            {
                text: "Control Systems",
                link: "/control/usage/control-systems",
            },
            {
                text: "Kinetic States",
                link: "/control/usage/kinetic-states",
            },
            {
                text: "Feedback Elements",
                link: "/control/usage/feedback-elements"
            },
            {
                text: "Feedforward Elements",
                link: "/control/usage/feedforward-elements"
            },
            {
                text: "Filter Elements",
                link: "/control/usage/filter-elements"
            },
            {
                text: "Interpolator Elements",
                link: "/control/usage/interpolator-elements"
            }
        ]
    },
    {
        text: "Examples",
        items: [
            {
                text: "Slides",
                link: "/control/examples/slides"
            },
            {
                text: "Arms",
                link: "/control/examples/arms"
            },
            {
                text: "Flywheels",
                link: "/control/examples/flywheels"
            }
        ]
    }
] satisfies SidebarItem[]