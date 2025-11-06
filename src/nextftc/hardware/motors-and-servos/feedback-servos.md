# Feedback Servos

Feedback servos can be one of two types: ```FeedbackCRServoEx``` or ```FeedbackServoEx```. 

## FeedbackServoEx

:::tabs key:code 

== Kotlin 

```Kotlin
val servo: FeedbackServoEx = FeedbackServoEx {
    cacheTolerance = 0.01, // Or whatever you'd like to use
    feedbackFactory = { ActiveOpMode.hardwareMap.analogInput.get("analog-name") },
    servoFactory = { ActiveOpMode.hardwareMap.servo.get("servo-name") }
}

// Alternatively
val servo: FeedbackServoEx = FeedbackServoEx("analog-name", "servo-name", 0.01)

// Alternatively
val analogInput: AnalogInput = ActiveOpMode.hardwareMap.analogInput.get("analog-name")
val servoFactory: Servo = ActiveOpMode.hardwareMap.servo.get("servo-name")
val servo: FeedbackServoEx = FeedbackServoEx(analogInput, servoFactory, 0.01) // Using cache tolerance = 0.01
```
== Java
```Java
FeedbackServoEx servo = new FeedbackServoEx(
    0.01, // Or your preferred cache tolerance
    () -> { ActiveOpMode.hardwareMap.analogInput.get("analog-name") }, 
    () -> { ActiveOpMode.hardwareMap.servo.get("servo-name") }
);

// Alternatively
FeedbackServoEx servo = new FeedbackServoEx("analog-name", "servo-name", 0.01);

// Alternatively
AnalogInput analogInput = ActiveOpMode.hardwareMap.analogInput.get("analog-name");
Servo servoFactory = ActiveOpMode.hardwareMap.servo.get("servo-name");
FeedbackServoEx servo = new FeedbackServoEx(analogInput, servoFactory, 0.01);
```
==
:::

The caching tolerance is the same for any normal ```ServoEx``` or other implementation.


## FeedbackCRServoEx

:::tabs key:code

== Kotlin
```Kotlin
val servo: FeedbackCRServoEx = FeedbackCRServoEx {
    cacheTolerance = 0.01, // Or whatever you'd like to use
    feedbackFactory = { ActiveOpMode.hardwareMap.analogInput.get("analog-name") },
    servoFactory = { ActiveOpMode.hardwareMap.servo.get("servo-name") }
}
```
== Java
```Java
FeedbackServoEx servo = new FeedbackServoEx(
    0.01, // Or your preferred cache tolerance
    () -> { ActiveOpMode.hardwareMap.analogInput.get("analog-name") }, 
    () -> { ActiveOpMode.hardwareMap.servo.get("servo-name") }
);
```
==
:::

Note that this is a little different than the ```FeedbackCRServoEx```. There are not currently any overloaded constructors as opposed to the other class. This will probably be updated soon. But in the meantime, you have to do it this way. 

## Features 

Both ```FeedbackCRServoEx``` and ```FeedbackServoEx``` share the same method internally of ```getCurrentPosition()```. This returns the current position of the servo in radians from 0 to 2 pi.

## Example Usage

:::tabs key:code

== Kotlin

```Kotlin
double currentAngle = servo.getCurrentPosition();
deltaHeading = currentAngle - previousAngle;

if (deltaHeading > Math.PI) deltaHeading -= 2 * Math.PI;
else if (deltaHeading < -Math.PI) deltaHeading += 2 * Math.PI;

totalAngle += deltaHeading;
previousAngle = currentAngle;
``` 

:::

This code would result in the tracked position of the servo (beyond 0 to 2 pi). This is incredibly useful for ```FeedbackCRServoEx```. 
