# Continuous Rotation Servos

`CRServoEx` wraps a `CRServo` exactly like a `ServoEx` wraps a `Servo` but implements `Powerable` instead of `Positionable`. 

## Declarations

You can declare `CRServoEx` in the following manner, much like a normal `ServoEx`:

:::tabs key:code

== Kotlin

```kotlin
val crServoEx: CRServoEx = CRServoEx("cr_servo_name")

// Alternatively 
val crServoEx: CRServoEx = CRServoEx { crServo }

// Alternatively
val crServoEx: CRServoEx = CRServoEx(crServo)

```

== Java
```java
CRServoEx crServoEx = new CRServoEx("cr_servo_name");

// Alternatively
CRServoEx crServoEx = new CRServoEx(() -> crServo);

// Alternatively
CRServoEx crServoEx = new CRServoEx(crServo);

```

::: 

Additionally you can pass a cache tolerance (default is 0.01), exactly like a normal servo. 

:::tabs key:code

== Kotlin
```kotlin
var crServoEx = CRServoEx("cr_servo_name", cacheTolerance)
var crServoEx = CRServoEx(cacheTolerance) { crServo }
var crServoEx = CRServoEx(crServo, cacheTolerance)
```
== Java
```java
CRServoEx crServoEx = new CRServoEx("cr_servo_name", cacheTolerance);
CRServoEx crServoEx = new CRServoEx(cacheTolerance, () -> crServo);
CRServoEx crServoEx = new CRServoEx(crServo, cacheTolerance);
```
:::

## Usage

`CRServoEx` has only a `power` property to set or get the power of the motor. Like a `MotorEx` the power can vary from -1 to 1. 

:::tabs key:code

== Kotlin

```kotlin
crServoEx.power = 0.0 // To turn off
crServoEx.power = -1.0 // To spin in reverse fully
crServoEx.power = 0.5 // To spin forward partially
```

== Java

```java
crServoEx.setPower(0.0); // To turn off
crServoEx.setPower(-1.0); // To spin in reverse fully
crServoEx.setPower(0.5); // To spin forward partially
```

:::

