# Getting Started

The simplest control system is a PID. Creating one is simple:

:::tabs key:code

== Kotlin

```kotlin
val controlSystem = controlSystem {
    posPid(p, i, d)
}
```

== Java

```java
ControlSystem controlSystem = ControlSystem.builder()
        .posPid(p, i, d)
        .build();
```

:::

To run the control system's calculations, call `calculate` every loop. Pass
a `KineticState` consisting of the current position and velocity, and
optionally, the acceleration. Calling `calculate` returns the motor power to
set.

:::tabs key:code

== Kotlin

```kotlin
motor.power = controlSystem.calculate(
  KineticState(motor.position, motor.velocity)
);
```

== Java

```java
motor.setPower(
  controlSystem.calculate(
    KineticState(motor.getPosition(), motor.getVelocity())
  )
);
```

:::