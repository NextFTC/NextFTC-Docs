# Control Systems

Control systems are the most important thing in NextControl. They are what
powers everything else. A control system can be nearly any type of controller.

## The Four Elements

A control system is made up of four "elements": feedback, feedforward,
filter, and interpolator. If you don't pass one of them, a sensible default
is used.

- **Feedback elements** provide feedback (closed-loop) control for your system.
  For example, PID Control, SquID Control, and Bang-Bang Control.

- **Feedforward elements** provide feedforward (open-loop) control. NextControl
  has three feedforward controllers: basic, elevator, and arm.

- **Filter elements** filter your sensor measurements to remove noise. Examples
  are low-pass filters and Kalman filters.

- **Interpolator elements** interpolate the setpoint in order to smooth out
  setpoint changes. For example, a trapezoidal motion profile or a
  moving-average setpoint filter.

The control system calculation process involves:

1. Filtering sensor measurements
2. Obtaining the current reference from the interpolator
3. Calculating feedback component based on error
4. Calculating feedforward component based on reference
5. Returning the sum of feedback and feedforward

## Creating Control Systems

It is highly recommended that you use the control system builder to create
your control systems. To create a control system, pass the feedback,
feedforward, filter, and interpolator elements. All are optional, and
sensible defaults will be used if one isn't passed.

:::tabs key:code

== Kotlin

```kotlin
val controlSystem = controlSystem {
  feedback(/* feedback element */)
  feedforward(/* feedforward element */)
  posFilter { custom(/* position filter */) }
  velFilter { custom(/* velocity filter */) }
  accelFilter { custom(/* acceleration filter */) }
  interpolator(/* interpolator element */)
}
```

== Java

```java
ControlSystem controlSystem = ControlSystem.builder()
        .feedback(/* feedback element */)
        .feedforward(/* feedforward element */)
        .posFilter(filter -> filter.custom(/* position filter */))
        .velFilter(filter -> filter.custom(/* velocity filter */))
        .accelFilter(filter -> filter.custom(/* acceleration filter */))
        .interpolator(/* interpolator element */)
        .build();
```

:::

There are also numerous helper methods, outlined in the following pages.
Because of these helper methods, you will almost never need to construct
your own elements!

## Using a Control System

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