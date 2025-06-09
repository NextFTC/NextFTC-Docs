# Feedforward Elements

A feedforward element is any type of open-loop (feedforward) control.

To add a feedforward element, call the `feedforward` function in a control
system builder.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    feedforward(/* feedforward element */)
}
```

== Java

```java
ControlSystem.builder()
    .feedforward(/* feedforward element */)
    .build()
```

:::

## Basic Feedforward

A basic feedforward is a feedforward with velocity, acceleration, and static
components. Pass either the three gains or a `BasicFeedforwardParameters`
object.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    basicFF(v, a, s)
}
```

== Java

```java
ControlSystem.builder()
    .basicFF(v, a, s)
    .build()
```

:::

## Elevator Feedforward

An elevator feedforward is a feedforward with velocity, acceleration, static,
and constant gravity components. Pass either the four gains or a
`GravityFeedforwardParameters` object.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    elevatorFF(g, v, a, s)
}
```

== Java

```java
ControlSystem.builder()
    .elevatorFF(g, v, a, s)
    .build()
```

:::

## Arm Feedforward

An arm feedforward is a feedforward with velocity, acceleration, static, and
cosine gravity components. Pass either the four gains or a
`GravityFeedforwardParameters` object.

> [!IMPORTANT]
> Your position error **must** be in radians. To do this, use a
> custom filter. You can see how to do this on the arms example page.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    armFF(g, v, a, s)
}
```

== Java

```java
ControlSystem.builder()
    .armFF(g, v, a, s)
    .build()
```

:::

## Custom Feedforward Elements

To create a custom feedforward element, implement the `FeedforwardElement`
interface and pass it to the `feedforward` function in a control system builder.
For example:

:::tabs key:code

== Kotlin

```kotlin
class FullPowerFeedforward : FeedforwardElement {
    override fun calculate(reference: KineticState): Double {
        return 1.0
    }
}

controlSystem {
    feedforward(FullPowerFeedforward())
}
```

== Java

```java
public class FullPowerFeedforward : FeedforwardElement {
    @Override
    public double calculate(KineticState reference) {
        return 1;
    }
}


ControlSystem.builder()
    .feedforward(new FullPowerFeedforward())
    .build()
```

:::