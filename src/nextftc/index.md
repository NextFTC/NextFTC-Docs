# NextFTC

> [!TIP]
> If you are looking to learn NextFTC, take a look at the [guide](/guide/about).

NextFTC is our command-based framework. It has three building-blocks: commands,
subsystems, and components. It also has an optional hardware module that
provides built-in, ready-to-use hardware commands for almost all of your
hardware needs.

## Installation

In the `build.dependencies.gradle` file, go to the `dependencies` block.
Add the following lines to the bottom:

::: tabs key:gradle

== .gradle

```groovy
implementation 'dev.nextftc:core:1.0.0'
implementation 'dev.nextftc:ftc:1.0.0'
implementation 'dev.nextftc:hardware:1.0.0' // If you would like to use the hardware module
```

== .gradle.kts

```kotlin
implementation("dev.nextftc:core:1.0.0")
implementation("dev.nextftc:ftc:1.0.0")
implementation("dev.nextftc:hardware:1.0.0") // If you would like to use the hardware module
```

:::

Then, press the `Sync Now` button that appeared as a banner at the top of your
Gradle
file.

*You're good to go!*