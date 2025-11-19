# Feedback Servos

Feedback servos can be one of two types: `FeedbackCRServoEx` or `FeedbackServoEx`. These wrap respectively a `CRServoEx` and a `ServoEx`. They allow you to read the position of the servo from the 4th analog pin. 

## FeedbackServoEx

:::tabs key:code 

== Kotlin 

```kotlin
val servo: FeedbackServoEx = FeedbackServoEx("analog-name", "servo-name", 0.01)

// Alternatively
val servo: FeedbackServoEx = FeedbackServoEx {
    cacheTolerance = 0.01, // Or whatever you'd like to use
    feedbackFactory = { ActiveOpMode.hardwareMap.analogInput.get("analog-name") },
    servoFactory = { ActiveOpMode.hardwareMap.servo.get("servo-name") }
}

// Alternatively
val analogInput: AnalogInput = ActiveOpMode.hardwareMap.analogInput.get("analog-name")
val servoFactory: Servo = ActiveOpMode.hardwareMap.servo.get("servo-name")
val servo: FeedbackServoEx = FeedbackServoEx(analogInput, servoFactory, 0.01) // Using cache tolerance = 0.01
```
== Java
```java
FeedbackServoEx servo = new FeedbackServoEx("analog-name", "servo-name", 0.01);

// Alternatively
FeedbackServoEx servo = new FeedbackServoEx(
    0.01, // Or your preferred cache tolerance
    () -> { ActiveOpMode.hardwareMap().analogInput.get("analog-name") }, 
    () -> { ActiveOpMode.hardwareMap().servo.get("servo-name") }
);

// Alternatively
AnalogInput analogInput = ActiveOpMode.hardwareMap().analogInput.get("analog-name");
Servo servoFactory = ActiveOpMode.hardwareMap().servo.get("servo-name");
FeedbackServoEx servo = new FeedbackServoEx(analogInput, servoFactory, 0.01);
```
==
:::

The caching tolerance is the same for any normal `ServoEx` or other implementation.


## FeedbackCRServoEx

:::tabs key:code 

== Kotlin 

```kotlin
val servo: FeedbackCRServoEx = FeedbackCRServoEx("analog-name", "servo-name", 0.01)

// Alternatively
val servo: FeedbackCRServoEx = FeedbackCRServoEx {
    cacheTolerance = 0.01, // Or whatever you'd like to use
    feedbackFactory = { ActiveOpMode.hardwareMap.analogInput.get("analog-name") },
    servoFactory = { ActiveOpMode.hardwareMap.crservo.get("servo-name") }
}

// Alternatively
val analogInput: AnalogInput = ActiveOpMode.hardwareMap.analogInput.get("analog-name")
val servoFactory: CRServo = ActiveOpMode.hardwareMap.crservo.get("servo-name")
val servo: FeedbackCRServoEx = FeedbackCRServoEx(analogInput, servoFactory, 0.01) // Using cache tolerance = 0.01
```
== Java
```java
FeedbackCRServoEx servo = new FeedbackCRServoEx("analog-name", "servo-name", 0.01);

// Alternatively
FeedbackCRServoEx servo = new FeedbackCRServoEx(
    0.01, // Or your preferred cache tolerance
    () -> { ActiveOpMode.hardwareMap().analogInput.get("analog-name") }, 
    () -> { ActiveOpMode.hardwareMap().crservo.get("servo-name") }
);

// Alternatively
AnalogInput analogInput = ActiveOpMode.hardwareMap.analogInput.get("analog-name");
CRServo servoFactory = ActiveOpMode.hardwareMap.crservo.get("servo-name");
FeedbackCRServoEx servo = new FeedbackCRServoEx(analogInput, servoFactory, 0.01);
```
==
:::

Same deal as `FeedbackServoEx` with caching.

## Features 

Both `FeedbackCRServoEx` and `FeedbackServoEx` share the same method internally of `getCurrentPosition()` or `currentPosition` in Kotlin. This returns the current position of the servo in radians from 0 to 2 pi.

## Example Tracking 

:::tabs key:code

== Java

```java
double currentAngle = servo.getCurrentPosition();
deltaHeading = currentAngle - previousAngle;

if (deltaHeading > Math.PI) deltaHeading -= 2 * Math.PI;
else if (deltaHeading < -Math.PI) deltaHeading += 2 * Math.PI;

totalAngle += deltaHeading;
previousAngle = currentAngle;
``` 

:::

This code would result in the tracked position of the servo (beyond 0 to 2 pi). This is incredibly useful for `FeedbackCRServoEx`. However be warned that the analog wrap may cause issues, but this is merely an example.
