# NextControl

NextControl is our robust control library that allows you to create any
controller imaginable. It supports PID control, feedforward, and even motion
profiling.

> [!IMPORTANT]
> We haven't gone through the work here explaining in detail what
> different
> control methods do, because [CTRL ALT FTC](https://www.ctrlaltftc.com) is
> already a great resource for that!

## Installation

In the `build.dependencies.gradle` file, go to the `dependencies` block. Add
the following line to the bottom:

:::tabs key:gradle

== .gradle

```groovy
implementation 'dev.nextftc:control:1.0.0'
```

== .gradle.kts

```kotlin
implementation("dev.nextftc:control:1.0.0")
```

:::

Then, press the `Sync Now` button that appeared as a banner at the top of
your Gradle file.

*You're good to go!*