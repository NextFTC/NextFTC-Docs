# Differential (Tank) Drivetrain

> [!IMPORTANT]
> This page outlines how to use the differential drivetrain commands to control your robot in TeleOp.

> [!TIP] INFO
> For a differential drive, there are two types of drive systems. You can use the tank and arcade control schemes with a differential drive.
>
> Arcade drive uses a y-value input from the controller and a value from the turn stick. We know that when the turn stick is pushed left, the right side should move forward and the left side should move backwards. Therefore, since pushing the turn stick to the left returns a negative value, it should be added to the left speed and subtracted from the right speed.
>
> Tank drive uses a y-value input from the left and right sticks. The sticks control their respective side of the robot.

## Usage

First, you need to create your motors. Let's create variables for them:

:::tabs key:code
== Kotlin

```kotlin
private val frontLeftMotor = MotorEx("front_left").breakMode().reversed()
private val frontRightMotor = MotorEx("front_right").breakMode()
private val backLeftMotor = MotorEx("back_left").breakMode().reversed()
private val backRightMotor = MotorEx("back_right").breakMode()

private val leftMotors = MotorGroup(frontLeftMotor, backLeftMotor);
private val rightMotors = MotorGroup(frontRightMotor, backRightMotor);
```

== Java

```java
private MotorEx frontLeftMotor = new MotorEx("front_left").breakMode().reversed();
private MotorEx frontRightMotor = new MotorEx("front_right").breakMode();
private MotorEx backLeftMotor = new MotorEx("back_left").breakMode().reversed();
private MotorEx backRightMotor = new MotorEx("back_right").breakMode();

private MotorGroup leftMotors = new MotorGroup(frontLeftMotor, backLeftMotor);
private MotorGroup rightMotors = new MotorGroup(frontRightMotor, backRightMotor);
```

:::

Lastly, in `onStartButtonPressed()`, we will create and schedule our command.

> [!TIP]
> If you are only using two motors, you can just pass your motors to the command instead of motor groups.

You can run it as a tank drive:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = DifferentialTankDriverControlled(
  leftMotors,
  rightMotors,
  Gamepads.gamepad1.leftStickY,
  Gamepads.gamepad1.rightStickY
)
driverControlled()
```

== Java

```java
driverControlled = new DifferentialTankDriverControlled(
  leftMotors,
  rightMotors,
  Gamepads.gamepad1().leftStickY(),
  Gamepads.gamepad1().rightStickY()
);
driverControlled.schedule();
```

:::

Or as an arcade drive:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = DifferentialArcadeDriverControlled(
  leftMotors,
  rightMotors,
  Gamepads.gamepad1.leftStickY,
  Gamepads.gamepad1.rightStickX
)
driverControlled()
```

== Java

```java
driverControlled = new DifferentialArcadeDriverControlled(
  leftMotors,
  rightMotors,
  Gamepads.gamepad1().leftStickY(),
  Gamepads.gamepad1().rightStickX()
);
driverControlled.schedule();
```

:::

That's it! Now you are able to control your differential drivetrain using a gamepad.
