# FateWeaver Extension

This extension provides integration with the
[FateWeaver Library](https://fate.zharel.gay/),
a powerful logging library for FTC.

The [FateWeaver API docs](https://docs.fate.zharel.gau/) provide more information
about the library.

## Installation

In the TeamCode `build.gradle`, go to the `dependencies` block.
Add the following lines:

::: tabs key:gradle

== .gradle

```groovy
implementation 'dev.nextftc.extensions:fateweaver:1.0.0'
```

== .gradle.kts

```kotlin
implementation("dev.nextftc.extensions:fateweaver:1.0.0")
```

:::

Then, press the `Sync Now` button that appeared as a banner at the top of your
Gradle file.

*You're good to go!*