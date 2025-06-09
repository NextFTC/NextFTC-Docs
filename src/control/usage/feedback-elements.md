# Feedback Elements

A feedback element is any type of closed-loop (feedback) control. For
example, a PID controller, SquID controller, and bang-bang controller are
all feedback elements.

To add a feedback element, call the `feedback` function in a control system
builder.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    feedback(/* feedback element */)
}
```

== Java

```java
ControlSystem.builder()
    .feedback(/* feedback element */)
    .build()
```

:::

## PID Element

To create a PID element, use the `posPid` or `velPid` functions in a control
system builder. Pass either the three PID gains or a `PIDCoefficients` object.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    posPid(p, i, d)
}
```

== Java

```java
ControlSystem.builder()
    .posPid(p, i, d)
    .build()
```

:::

## SquID Element

SquID control is the same as PID control, but the output of the proportional
component is square-rooted.

To create a SquID element, use the `posSquid` or `velSquid` functions in a
control system builder. Pass either the three PID gains or a
`PIDCoefficients` object.

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    posSquid(p, i, d)
}
```

== Java

```java
ControlSystem.builder()
    .posSquid(p, i, d)
    .build()
```

:::

## Bang Bang Element

*TODO*

## Angular Element

When dealing with a **continuous-angle system** (one that can turn in a full
circle, such as a robot's heading or a turret), you should use an angular
element for position control. This allows it to always take the shortest
path to the target.

> [!IMPORTANT]
> Your position error **must** be in the provided unit. To do this, use a
> custom filter. You can see how to do this on the arms example page.

You pass the angle unit along with another feedback element for it to wrap.
For example:

:::tabs key:code

== Kotlin

```kotlin
controlSystem {
    angular(AngleType.DEGREES) {
        posPid(p, i, d)
    }
}
```

== Java

```java
ControlSystem.builder()
    .angular(AngleType.DEGREES, 
        feedback -> feedback.posPid(p, i, d)
    )
    .build()
```

:::

## Custom Feedback Elements

To create a custom feedback element, implement the `FeedbackElement`
interface and pass it to the `feedback` function in a control system builder.
For example:

:::tabs key:code

== Kotlin

```kotlin
class FullPowerFeedback : FeedbackElement {
    override fun calculate(error: KineticState): Double {
        return 1.0
    }
}

controlSystem {
    feedback(FullPowerFeedback())
}
```

== Java

```java
public class FullPowerFeedback : FeedbackElement {
    @Override
    public double calculate(KineticState error) {
        return 1;
    }
}

ControlSystem.builder()
    .feedback(new FullPowerFeedback())
    .build()
```

:::