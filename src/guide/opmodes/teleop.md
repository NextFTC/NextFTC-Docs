# TeleOp

Creating a TeleOp in NextFTC is just as easy as autonomous! This page will walk
you through creating a TeleOp. This page
assumes you have already read the [Autonomous](autonomous.md) guide.

This TeleOp program will teach you how to bind commands to gamepad buttons and
control your drivetrain using NextFTC.

## Step 1: Create your OpMode

Just like for autonomous, your OpMode will extend `NextFTCOpMode`.
With that in mind, here is the basic structure for a TeleOp:

::: tabs key:code

== Kotlin

```kotlin [TeleOpProgram.kt]
@TeleOp(name = "NextFTC TeleOp Program Kotlin")
class TeleOpProgram : NextFTCOpMode() {

}
```

== Java

```java [TeleOpProgram.java]
@TeleOp(name = "NextFTC TeleOp Program Java")
public class TeleOpProgram extends NextFTCOpMode {

}
```

:::

Just like for autonomous, we need to add the required subsystems as a
`SubsystemComponent`. We will also add a
`BulkReadComponent`. Additionally, we will add a `BindingsComponent`, which
allows us to use gamepads from [NextBindings](/bindings).

:::tabs key:code

== Kotlin

```kotlin
class TeleOpProgram : NextFTCOpMode() {
    init {
        addComponents(
            SubsystemComponent(Lift, Claw),
            BulkReadComponent,
            BindingsComponent
        )
    }
}
```

== Java

```java
public class TeleOpProgram extends NextFTCOpMode {
    public TeleOpProgram() {
        addComponents(
            new SubsystemComponent(Lift.INSTANCE, Claw.INSTANCE),
            BulkReadComponent.INSTANCE,
            BindingsComponent.INSTANCE
        );
    }
}
```

:::

That's all! Now we will allow the joysticks to control our robot's driving.

## Step 2: Create your drive command

NextFTC has built-in commands for common drivetrains.

> [!IMPORTANT]
> Currently, NextFTC only has support for mecanum, x-drive, and differential
> (tank) drivetrains. If you write a command for another, please share it with
> us!

Go to the [drivetrain commands](/nextftc/hardware/drivetrain-commands) page to
get the code for your
drivetrain. In this guide we will be using the `MecanumDriverControlled`
command. If you are using a different
drivetrain
command, follow the instructions there to get it set up and then come back to
this guide.

After adding the `MecanumDriverControlled` command, here is our code:

:::tabs key:code
== Kotlin

```kotlin
// change the names and directions to suit your robot
private val frontLeftMotor = MotorEx("front_left").reversed()
private val frontRightMotor = MotorEx("front_right")
private val backLeftMotor = MotorEx("back_left").reversed()
private val backRightMotor = MotorEx("back_right")

override fun onStartButtonPressed() {
    val driverControlled = MecanumDriverControlled(
        frontLeftMotor,
        frontRightMotor,
        backLeftMotor,
        backRightMotor,
        -Gamepads.gamepad1.leftStickY,
        Gamepads.gamepad1.leftStickX,
        Gamepads.gamepad1.rightStickX
    )
    driverControlled()
}
```

== Java

```java
// change the names and directions to suit your robot
private final MotorEx frontLeftMotor = new MotorEx("front_left").reversed();
private final MotorEx frontRightMotor = new MotorEx("front_right");
private final MotorEx backLeftMotor = new MotorEx("back_left").reversed();
private final MotorEx backRightMotor = new MotorEx("back_right");

@Override
public void onStartButtonPressed() {
    Command driverControlled = new MecanumDriverControlled(
        frontLeftMotor,
        frontRightMotor,
        backLeftMotor,
        backRightMotor,
        Gamepads.gamepad1().leftStickY().negate(),
        Gamepads.gamepad1().leftStickX(),
        Gamepads.gamepad1().rightStickX()
    );
    driverControlled.schedule();
}
```

:::

## Step 3: Create your gamepad bindings

In the last guide you learned how to schedule a command when the OpMode starts.
Now you will learn how to schedule a
command whenever the driver presses a button. We will
use [NextBindings](/bindings) to do this.

In this guide, we will have the following buttons, all on gamepad 2:

- Pressing d-pad up moves the lift up.
- Releasing d-pad up opens the claw.
- Pressing the right trigger closes the claw _and then_ moves the lift up.
- Pressing the left bumper opens the claw _and at the same time_ moves the lift
  down.

> [!NOTE]
> It is unlikely that these commands will be useful for any real robot, but it
> will give you an idea of how you can
> achieve practically any gamepad bindings possible with NextBindings.

> [!TIP]
> It is best to have the most commonly used functions activated by bumpers and
> triggers. This is because to press any
> other button, your thumb must move, while no finger has to move to press the
> bumpers and triggers.

We will bind our commands in `onStartButtonPressed()`. If we wanted them
accessible in init, we would do it in `onInit()`.

> [!CAUTION]
> Although it is possible to bind the commands in init, keep in mind that your
> robot is not allowed to move during the
> transition from autonomous to TeleOp. There is almost never a time you would
> want to use the gamepads during init
> in TeleOp.

First, we will make d-pad up move the lift up when pressed:

:::tabs key:code
== Kotlin

```kotlin
Gamepads.gamepad2.dpadUp whenBecomesTrue Lift.toHigh
```

== Java

```java
Gamepads.gamepad2().dpadUp()
  .whenBecomesTrue(Lift.INSTANCE.toHigh);
```

:::

Next, we will make it so releasing d-pad up opens the claw:

:::tabs key:code
== Kotlin

```kotlin
Gamepads.gamepad2.dpadUp whenBecomesTrue Lift.toHigh whenBecomesFalse Claw.open
```

== Java

```java
Gamepads.gamepad2().dpadUp()
  .whenBecomesTrue(Lift.INSTANCE.toHigh)
  .whenBecomesFalse(Claw.INSTANCE.open);
```

:::

> [!NOTE]
> If d-pad up is released before the lift has fully finished moving up, then the
> claw will open while the lift is moving up.

Now, we must make the right trigger close the claw _and then_ move the lift up.
To do this, we can use a `SequentialGroup`! We would like to schedule the
command when the right trigger
is greater than 0.2.

:::tabs key:code
== Kotlin

```kotlin
(Gamepads.gamepad2.rightTrigger greaterThan 0.2)
  .whenBecomesTrue(
    Claw.close.then(Lift.toHigh)
  )
```

== Java

```java
Gamepads.gamepad2().rightTrigger().greaterThan(0.2)
  .whenBecomesTrue(
    Claw.INSTANCE.close.then(Lift.INSTANCE.toHigh)
  );
```

:::

> [!TIP]
> The `command.then()` utility is a helper function for creating a
> `SequentialGroup`! You can read about other helper functions on the
> [groups](/nextftc/helpful-commands/groups) and
> [utilities](/nextftc/helpful-commands/utilities) pages.

Lastly, we must make the left bumper open the claw _and at the same time_ move
the lift down. We can use a `ParallelGroup` (using the `command.and()` utility)
for this!

:::tabs key:code
== Kotlin

```kotlin
Gamepads.gamepad2.leftBumper whenBecomesTrue Claw.open.and(Lift.toLow)
```

== Java

```java
Gamepads.gamepad2().leftBumper().whenBecomesTrue(
  Claw.INSTANCE.open.and(Lift.INSTANCE.toLow)
);
```

:::

## Final Result

That's all! You now have created a TeleOp program with driving and operating the
lift and claw. You also now know how to
create any TeleOp you wish, even if it has complicated sequences.

For reference, here is the final result:

:::tabs key:code
== Kotlin

```kotlin
@TeleOp(name = "NextFTC TeleOp Program Kotlin")
class TeleOpProgram : NextFTCOpMode() {
    init {
        addComponents(
            SubsystemComponent(Lift, Claw),
            BulkReadComponent,
            BindingsComponent
        )
    }

    // change the names and directions to suit your robot
    private val frontLeftMotor = MotorEx("front_left").reversed()
    private val frontRightMotor = MotorEx("front_right")
    private val backLeftMotor = MotorEx("back_left").reversed()
    private val backRightMotor = MotorEx("back_right")

    override fun onStartButtonPressed() {
        val driverControlled = MecanumDriverControlled(
            frontLeftMotor,
            frontRightMotor,
            backLeftMotor,
            backRightMotor,
            -Gamepads.gamepad1.leftStickY,
            Gamepads.gamepad1.leftStickX,
            Gamepads.gamepad1.rightStickX
        )
        driverControlled()

        Gamepads.gamepad2.dpadUp whenBecomesTrue Lift.toHigh whenBecomesFalse Claw.open
        
        (Gamepads.gamepad2.rightTrigger greaterThan 0.2)
          .whenBecomesTrue(
            Claw.close.then(Lift.toHigh)
          )
          
        Gamepads.gamepad2.leftBumper whenBecomesTrue Claw.open.and(Lift.toLow)
    }
}
```

== Java

```java
@TeleOp(name = "NextFTC TeleOp Program Java")
public class TeleOpProgram extends NextFTCOpMode {
    public TeleOpProgram() {
        addComponents(
                new SubsystemComponent(Lift.INSTANCE, Claw.INSTANCE),
                BulkReadComponent.INSTANCE,
                BindingsComponent.INSTANCE
        );
    }

    // change the names and directions to suit your robot
    private final MotorEx frontLeftMotor = new MotorEx("front_left").reversed();
    private final MotorEx frontRightMotor = new MotorEx("front_right");
    private final MotorEx backLeftMotor = new MotorEx("back_left").reversed();
    private final MotorEx backRightMotor = new MotorEx("back_right");

    @Override
    public void onStartButtonPressed() {
        Command driverControlled = new MecanumDriverControlled(
                frontLeftMotor,
                frontRightMotor,
                backLeftMotor,
                backRightMotor,
                Gamepads.gamepad1().leftStickY().negate(),
                Gamepads.gamepad1().leftStickX(),
                Gamepads.gamepad1().rightStickX()
        );
        driverControlled.schedule();

        Gamepads.gamepad2().dpadUp()
          .whenBecomesTrue(Lift.INSTANCE.toHigh)
          .whenBecomesFalse(Claw.INSTANCE.open);
                
        Gamepads.gamepad2().rightTrigger().greaterThan(0.2)
          .whenBecomesTrue(
            Claw.INSTANCE.close.then(Lift.INSTANCE.toHigh)
          );
  
        Gamepads.gamepad2().leftBumper().whenBecomesTrue(
          Claw.INSTANCE.open.and(Lift.INSTANCE.toLow)
        );
    }
}
```

:::
