# Lift Subsystem

A subsystem that is found in almost all FTC robots in most seasons is a flywheel,
here will learn how to program your own flywheel subsystem.

> [!TIP]
> This subsystem can be generalized to any subsystem with a motor.

## Step 1: Create your subsystem

The first step to creating your subsystem is setting up the structure for it.
There should only be one instance of each
subsystem. To do this, we will make our subsystem
a [singleton](https://www.geeksforgeeks.org/singleton-design-pattern/).

:::tabs key:codes

== Kotlin

Creating our subsystem with the `object` keyword makes it a singleton:

```kotlin
object Flywheel : Subsystem {

}
```

== Java
In Java, there are a couple lines of boilerplate you will need to add to the top
of every subsystem you create to
make it a singleton:

```java
public class Flywheel implements Subsystem {
    public static final Flywheel INSTANCE = new Flywheel();
    private Flywheel() { }
    
}
```

:::

## Step 2: Create your motor

Next, we need to set up a motor to power our flywheel. Let's start by creating a
variable to store our motor. It should be
of type `MotorEx`.

:::tabs key:code

== Kotlin

```kotlin
private val motor = MotorEx("lift_motor")
```

== Java

```java
private MotorEx motor = new MotorEx("lift_motor");
```

:::

We also need a `ControlSystem`, since we want to move our motor. We'll be
using [NextControl](/control), NextFTC's
solution to control in FTC. NextControl makes it very easy to create more
complex controllers if you ever need them.
Let's use a PID controller with a basic feedforward.

:::tabs key:code
== Kotlin

```kotlin
private val controller = controlSystem {
    velPid(0.005, 0.0, 0.0)
    basicFF(0.0, 0.0, 0.0)
}
```

== Java

```java
private ControlSystem controlSystem = ControlSystem.builder()
    .velPid(0.005, 0.0, 0.0)
    .basicFF(0.0, 0.0, 0.0)
    .build();
```

:::

> [!IMPORTANT]
> Don't forget to tune your controller!

Now, we must set our motor power to the `ControlSystem`'s output every loop. We
can run code every loop by overriding the `periodic()` function.

The reason we set the motor power in `periodic()` instead of in our commands is
that the `ControlSystem` needs to be updated every loop to work properly. If we
only set the motor power in our commands, the motor power would only be updated
when a command is running, meaning once a command finishes, the motor power
would stop being updated and thus remain at whatever it was last set to,
pushing it past its target velocity.

:::tabs key:code

== Kotlin

```kotlin
override fun periodic() {
    motor.power = controlSystem.calculate(motor.state)
}
```

== Java

```java
@Override
public void periodic() {
    motor.setPower(controlSystem.calculate(motor.getState()));
}
```

:::

That's all you need to do to create a motor in NextFTC.

We're not quite done, though. We still need to create our commands!

## Step 3: Create commands

The last step when you create a Subsystem is to create the commands you'll be
using. This process varies with each
subsystem. Here, we'll create three commands that each move
the lift to a different height: `toLow`,
`toMiddle`, and `toHigh`.

To control our motor's position, we will be using the `RunToPosition` command.

Let's create our first `RunToVelocity` command.

:::tabs key:code
== Kotlin

```kotlin
val on: Command = RunToVelocity(controller, 500.0).named("FlywheelOn")
```

== Java

```java
public final Command on = new RunToVelocity(controller, 500.0)
            .requires(this)
            .named("FlywheelOn");
```

:::

Pretty easy, right? Let's duplicate it and update our variable name and target
position to create our other two commands:

:::tabs key:code
== Kotlin

```kotlin
val off: Command = RunToVelocity(controller, 0.0).named("FlywheelOff")
```

== Java

```java
public final Command off = new RunToVelocity(controller, 0.0)
            .requires(this)
            .named("FlywheelOff");
```

:::

## Final result

That's it! You've created your first subsystem! Here is the final result:

:::tabs key:code
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

:::
