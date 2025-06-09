# Configuring with the FTC Dashboard

It is common to tune your controllers with the
[FTC Dashboard](https://acmerobotics.github.io/ftc-dashboard). To support
this, NextControl allows passing a coefficients/parameters object for each
element instead of directly passing the coefficients.

For example:

:::tabs key:code

== Kotlin

```kotlin
// in a class with @Config

companion object Constants {
    @JvmField
    val coefficients = PIDCoefficients(p, i, d)
}

val controlSystem = controlSystem {
    posPid(coefficients)
}
```

== Java

```java
// in a class with @Config

public static PIDCoefficients coefficients = new PIDCoefficients(p, i, d);

ControlSystem controlSystem = ControlSystem.builder()
        .posPid(coefficients)
        .build();
```

:::

Now, our PID is configurable from the dashboard.

Although this example is for a PID element, every other element in NextControl
has a coefficients/parameters object as well.