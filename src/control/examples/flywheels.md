# Flywheel Example
Flywheels are commonly used for launching game elements, 
They are typically controlled using a velocity PID feedforward controller.

With NextControl, that would be implemented like this (using hypothetical constants):

::: tabs key:code

== Kotlin

```kotlin
controlSystem {
    velPid(0.005, 0.0, 0.0)
    basicFF(0.01, 0.02, 0.03)
}
```

== Java

```java
ControlSystem.builder()
             .velPid(0.005, 0.0, 0.0)
             .basicFF(0.01, 0.02, 0.03)
             .build();
```

:::

## What can I do with this?
If you're using a command-based framework like NextFTC,
you can create commands that spin the flywheel up or shut it down.

An example of a Flywheel subsystem using NextControl can be found 
[here](../../guide/subsystems/flywheel.md).

::: tabs key:code 

== Kotlin

```kotlin
object Flywheel : Subsystem {
    private val motor = MotorEx("flywheel_motor")

    private val controller: ControlSystem = controlSystem {
        velPid(0.005, 0.0, 0.0)
        basicFF(0.01, 0.02, 0.03)
    }

    val off: Command = RunToVelocity(controller, 0.0).named("FlywheelOff")
    val on: Command = RunToVelocity(controller, 500.0).named("FlywheelOn")

    override fun periodic() {
        motor.power = controller.calculate(motor.state)
    }
}
```

== Java

```java 
public class Flywheel implements Subsystem {
    public static final Flywheel INSTANCE = new Flywheel();
    private Flywheel() { }

    private final MotorEx motor = new MotorEx("flywheel_motor");

    private final ControlSystem controller = ControlSystem.builder()
            .velPid(0.005, 0, 0)
            .basicFF(0.01, 0.02, 0.03)
            .build();

    public final Command off = new RunToVelocity(controller, 0.0)
            .requires(this)
            .named("FlywheelOff");

    public final Command on = new RunToVelocity(controller, 500.0)
            .requires(this)
            .named("FlywheelOn");

    @Override
    public void periodic() {
        motor.setPower(controller.calculate(motor.getState()));
    }
}
```
