# Differential (Tank) Drivetrain

> [!IMPORTANT]
> This page outlines how to use the differential drivetrain commands to control your robot in TeleOp.

> [!TIP] INFO
> For a differential drive, there are two types of drive systems. You can use the tank and arcade control schemes with a differential drive.
>
> Arcade drive use a y-value input from the controller and a value from the turn stick. We know that when the turn stick is pushed left, the right side should move forward and the left side should move backwards. Therefore, since pushing the turn stick to the left returns a negative value, it should be added to the left speed and subtracted from the right speed.
>
> Tank drive uses a y-value input from the left and right sticks. The sticks control their respective side of the robot.

## Usage

First, you need to create your motors. Let's create variables for their names:

:::tabs key:code
== Kotlin

```kotlin
val frontLeftName = "front_left"
val frontRightName = "front_right"
val backLeftName = "back_left"
val backRightname = "back_right"
```

== Java

```java
public String frontLeftName = "front_left";
public String frontRightName = "front_right";
public String backLeftName = "back_left";
public String backRightName = "back_right";
```

:::

Next, we'll create variables for the motors and motor groups for each of the sides. If you only have one motor each side, you can skip creating the motor groups.

:::tabs key:code
== Kotlin

```kotlin
lateinit var frontLeftMotor: MotorEx
lateinit var frontRightMotor: MotorEx
lateinit var backLeftMotor: MotorEx
lateinit var backRightMotor: MotorEx

lateinit var leftMotors: MotorGroup
lateinit var rightMtoors: MotorGroup
```

== Java

```java
public MotorEx frontLeftMotor;
public MotorEx frontRightMotor;
public MotorEx backLeftMotor;
public MotorEx backRightMotor;

public MotorGroup leftMotors;
public MotorGroup rightMotors;
```

:::

Lastly, we'll create a variable for the command:

:::tabs key:code
== Kotlin

```kotlin
lateinit var driverControlled: Command
```

== Java

```java
public Command driverControlled;
```

:::

Now, in the `onInit()` function, we will initialize all our variables:

:::tabs key:code
== Kotlin

```kotlin
frontLeftMotor = MotorEx(frontLeftName)
backLeftMotor = MotorEx(backLeftName)
backRightMotor = MotorEx(backRightName)
frontRightMotor = MotorEx(frontRightName)

// Change your motor directions to suit your robot.
frontLeftMotor.direction = DcMotorSimple.Direction.REVERSE
backLeftMotor.direction = DcMotorSimple.Direction.REVERSE
frontRightMotor.direction = DcMotorSimple.Direction.FORWARD
backRightMotor.direction = DcMotorSimple.Direction.FORWARD

// Skip this if you are only using two motors.
leftMotors = MotorGroup(frontLeftMotor, backLeftMotor)
rightMotors = MotorGroup(frontRightMotor, backRightMotor)
```

== Java

```java
frontLeftMotor = new MotorEx(frontLeftName);
backLeftMotor = new MotorEx(backLeftName);
backRightMotor = new MotorEx(backRightName);
frontRightMotor = new MotorEx(frontRightName);

// Change your motor directions to suit your robot.
frontLeftMotor.setDirection(DcMotorSimple.Direction.REVERSE);
backLeftMotor.setDirection(DcMotorSimple.Direction.REVERSE);
frontRightMotor.setDirection(DcMotorSimple.Direction.FORWARD);
backRightMotor.setDirection(DcMotorSimple.Direction.FORWARD);

// Skip this if you are only using two motors.
leftMotors = new MotorGroup(frontLeftMotor, backLeftMotor);
rightMotors = new MotorGroup(frontRightMotor, backRightMotor);
```

:::

Lastly, in `onStartButtonPressed()`, we will create and schedule our command.

> [!TIP]
> If you are only using two motors, you can just pass your motors to the command instead of motor groups.

You can run it as a tank drive:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = DifferentialTankDriverControlled(leftMotors, rightMotors, gamepadManager.gamepad1)
driverControlled()
```

== Java

```java
driverControlled = new DifferentialTankDriverControlled(leftMotors, rightMotors, gamepadManager.gamepad1);
driverControlled.schedule();
```

:::

Or as an arcade drive:

:::tabs key:code
== Kotlin

```kotlin
driverControlled = DifferentialArcadeDriverControlled(leftMotors, rightMotors, gamepadManager.gamepad1, false, imu)
driverControlled()
```

== Java

```java
driverControlled = new DifferentialArcadeDriverControlled(leftMotors, rightMotors, gamepadManager.gamepad1, false, imu);
driverControlled.schedule();
```

:::

That's it! Now you are able to control your differential drivetrain using a gamepad.
