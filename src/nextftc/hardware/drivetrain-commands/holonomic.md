# Holonomic Drivetrain

> [!IMPORTANT]
> This page outlines how to use the mecanum drivetrain command to control your
> robot in TeleOp. Even though it has mecanum in the name, it works for x-drives
> as well.

> [!TIP] INFO
> Any holonomic drive can be controlled in one of two ways: **robot centric** or
**field centric**.
>
> Robot-centric assumes that each push of the joystick is in relation to the
> local position of the robot—this means that whenever the user pushes the drive
> stick forward, the robot will drive in the direction of its front-facing side.
>
> Field-centric assumes that each push of the joystick is in relation to the
> global position of the robot—this means that whenever the user pushes the
> drive
> stick forward, the robot will move away from the driver no matter its
> orientation. This is done by rotating the direction of the joystick clockwise
> by
> an angle measurement equivalent to the global heading of the robot.

> In both robot-centric and field-centric modes we negate `leftStickY`. This is
> a common FTC convention because gamepads report a negative Y when the stick is
> pushed forward and a positive Y when it’s pulled back. Use the `.negate`
> helper (for example `Gamepads.gamepad1.leftStickY.negate`) to apply this
> adjustment.

## Usage

First, we need to create the motors. Let's create variables for them:

:::tabs key:code
== Kotlin

```kotlin
private val frontLeftMotor = MotorEx("front_left").breakMode().reversed()
private val frontRightMotor = MotorEx("front_right").breakMode()
private val backLeftMotor = MotorEx("back_left").breakMode().reversed()
private val backRightMotor = MotorEx("back_right").breakMode()
```

== Java

```java
private MotorEx frontLeftMotor = new MotorEx("front_left").breakMode().
reversed();
private MotorEx frontRightMotor = new MotorEx("front_right").breakMode();
private MotorEx backLeftMotor = new MotorEx("back_left").breakMode().reversed();
private MotorEx backRightMotor = new MotorEx("back_right").breakMode();
```

:::

Then, we'll create a variable for the imu. **Only do this if you are using
field-centric driving.**

:::tabs key:code
== Kotlin

```kotlin
private val imu = IMUEx("imu", Direction.UP, Direction.FORWARD).zeroed()
```

== Java

```java
private IMUEx imu = new IMUEx("imu", Direction.UP, Direction.FORWARD).zeroed()
```

:::


Lastly, in `onStartButtonPressed()`, we will create and schedule our command.

You can run it robot-centric:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = MecanumDriverControlled(
    frontLeftMotor,
    frontRightMotor,
    backLeftMotor,
    backRightMotor,
    Gamepads.gamepad1.leftStickY.negate,
    Gamepads.gamepad1.leftStickX,
    Gamepads.gamepad1.rightStickX
)
driverControlled()
```

== Java

```java
driverControlled = new MecanumDriverControlled(
    frontLeftMotor,
    frontRightMotor,
    backLeftMotor,
    backRightMotor,
    Gamepads.gamepad1().leftStickY().negate(),
    Gamepads.gamepad1().leftStickX(),
    Gamepads.gamepad1().rightStickX()
);
driverControlled.schedule();
```

:::

Or field-centric:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = MecanumDriverControlled(
    frontLeftMotor,
    frontRightMotor,
    backLeftMotor,
    backRightMotor,
    Gamepads.gamepad1.leftStickY.negate,
    Gamepads.gamepad1.leftStickX,
    Gamepads.gamepad1.rightStickX,
    HolonomicMode.FieldCentric(imu)
)
driverControlled()
```

== Java

```java
driverControlled = new MecanumDriverControlled(
    frontLeftMotor,
    frontRightMotor,
    backLeftMotor,
    backRightMotor,
    Gamepads.gamepad1().leftStickY().negate(),
    Gamepads.gamepad1().leftStickX(),
    Gamepads.gamepad1().rightStickX(),
    new HolonomicMode.FieldCentric(imu)
);
driverControlled.schedule();
```

:::

That's it! Now you are able to control your holonomic drivetrain using a
gamepad.