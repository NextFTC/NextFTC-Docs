type Redirects = Record<string, string>;

export const redirects: Redirects = {
  "/introduction": "/getting-started/",
  "/introduction/installation": "/getting-started/installation/",
  "/your-first-robot": "/getting-started/your-first-robot/",
  "/robot/commands": "/commands/",
  "/robot/advanced/coroutine-commands": "/commands/coroutine-commands/",
  "/robot/drive-commands": "/commands/drive-commands/",
  "/robot/command-gamepad": "/commands/command-gamepad/",
  "/robot/triggers": "/commands/triggers/",
  "/robot/telemetry": "/telemetry/",
  "/robot/telemetry/backends": "/telemetry/backends/",
  "/robot/telemetry/structs": "/telemetry/structs/",
  "/robot/advanced/blazeftc": "/hardware/blazeftc/",
  "/hardware/miscellaneous/limelights": "/hardware/vision/limelights/",
  "/hardware/miscellaneous/husky-lens": "/hardware/vision/husky-lens/",
  "/hardware/miscellaneous/rgb-indicator": "/hardware/actuators/rgb-indicator/",
};
