type SidebarLink = string | { label?: string; slug: string };

interface SidebarGroup {
  label: string;
  collapsed?: boolean;
  items: SidebarItem[];
}

type SidebarItem = SidebarLink | SidebarGroup;

export const sidebar: SidebarItem[] = [
  {
    label: "Getting Started",
    items: [
      "getting-started",
      "getting-started/installation",
      "getting-started/your-first-robot",
    ],
  },
  {
    label: "Command Framework",
    items: [
      { label: "Overview", slug: "commands" },
      "commands/command-gamepad",
      "commands/triggers",
      "commands/drive-commands",
      "commands/coroutine-commands",
    ],
  },
  {
    label: "Robot Framework",
    items: [
      { label: "Overview", slug: "robot" },
      "robot/mechanisms",
      "robot/nextrobot",
      "robot/nextopmode",
      "robot/project-structure",
    ],
  },
  {
    label: "Pedro Pathing",
    items: [{ label: "Overview", slug: "pedro" }, "pedro/nextmecanum"],
  },
  {
    label: "Telemetry",
    items: [
      { label: "Overview", slug: "telemetry" },
      { label: "Backends", slug: "telemetry/backends" },
      "telemetry/structs",
    ],
  },
  {
    label: "Hardware",
    items: [
      { label: "Overview", slug: "hardware" },
      {
        label: "Actuators",
        items: [
          "hardware/actuators/motors",
          "hardware/actuators/servos",
          "hardware/actuators/cr-servos",
          "hardware/actuators/feedback-servos",
          "hardware/actuators/rgb-indicator",
        ],
      },
      {
        label: "Sensors",
        items: [
          "hardware/sensors/color-sensor",
          "hardware/sensors/distance-sensor",
          "hardware/sensors/digital-sensor",
          "hardware/sensors/pinpoint",
          "hardware/sensors/imu",
          "hardware/sensors/analog-inputs",
        ],
      },
      {
        label: "Vision",
        items: ["hardware/vision/limelights", "hardware/vision/husky-lens"],
      },
      "hardware/blazeftc",
    ],
  },
  {
    label: "Control",
    items: [{ label: "Overview", slug: "control" }],
  },
  {
    label: "References",
    items: ["references/example-repos"],
  },
];
