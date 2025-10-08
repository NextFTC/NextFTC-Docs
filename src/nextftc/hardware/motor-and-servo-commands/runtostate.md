# `RunToState`

`RunToState`, along with its children `RunToPosition` and `RunToVelocity`, 
allow you to move a `ControlSystem` (from [NextControl](/control)) to a 
desired state. It is commonly used with `Controllables`, such as 
`MotorEx`. When a 
`RunToState` 
command is 
scheduled, there are 
two steps:

1. Set the goal of the `ControlSystem` to the desired state.
2. Wait until the `ControlSystem` is at the desired state.

Notice that `RunToState` is never directly setting the motor power, as 
that's the responsibility of the user, usually in `periodic` or `onUpdate`. 

The constructor of `RunToState` takes a `ControlSystem` and a goal, along 
with (optionally) a tolerance.

:::tabs key:code

== Kotlin

```kotlin
RunToState(
    controlSystem,
    KineticState(
        posTarget,
        velTarget,
        accelTarget
    )
)
```

== Java

```java
new RunToState(
    controlSystem,
    new KineticState(
        posTarget,
        velTarget,
        accelTarget
    )
)
```

:::

If you do not care about one of the targets, it is usually best to set it to 
zero.

You can also pass a tolerance. The tolerance determines when the command 
will finish. It is checked using `controlSystem.isWithinTolerance(tolerance: 
KineticState)`. If you do not care about one of the tolerances (e.g., 
acceleration in position control,) you can set it to `Double.POSITIVE_INFINITY`.

:::tabs key:code

== Kotlin

```kotlin
RunToState(
    controlSystem,
    goal = KineticState(
        posTarget,
        velTarget,
        accelTarget
    ),
    tolerance = KineticState(
        posTolerance,
        velTolerance,
        accelTolerance
    )
)
```

== Java

```java
new RunToState(
    controlSystem,
    new KineticState(
        posTarget,
        velTarget,
        accelTarget
    ),
    new KineticState(
        posTolerance,
        velTolerance,
        accelTolerance
    )
)
```

:::

## `RunToPosition`

`RunToPosition` is a subclass of `RunToState` that makes position control 
easier. Instead of passing the goal as a `KineticState`, you can just pass 
the position target. The velocity and acceleration targets default to zero. 
Additionally, you only have to pass the position tolerance. The velocity and 
acceleration tolerances default to 5 and `Double.POSITIVE_INFINITY`, 
respectively. The position tolerance defaults to 10. Alternatively, you may 
pass the tolerance as a full `KineticState`, if desired.

:::tabs key:code

== Kotlin

```kotlin
RunToPosition(controlSystem, posTarget)
RunToPosition(controlSystem, posTarget, posTolerance)
RunToPosition(controlSystem, posTarget, fullTolerance)
```

== Java

```java
new RunToPosition(controlSystem, posTarget)
new RunToPosition(controlSystem, posTarget, posTolerance)
new RunToPosition(controlSystem, posTarget, fullTolerance)
```

:::

## `RunToVelocity`

`RunToVelocity` is very similar to `RunToPosition`, except for velocity 
control. The position and acceleration tolerances default to `Double.
POSITIVE_INFINITY`. The velocity tolerance defaults to 5.

:::tabs key:code

== Kotlin

```kotlin
RunToPosition(controlSystem, velTarget)
RunToPosition(controlSystem, velTarget, velTolerance)
RunToPosition(controlSystem, velTarget, fullTolerance)
```

== Java

```java
new RuntToVelocity(controlSystem, velTarget)
new RuntToVelocity(controlSystem, velTarget, velTolerance)
new RuntToVelocity(controlSystem, veltarget, fullTolerance)
```

:::
