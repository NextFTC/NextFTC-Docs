# Continuous Rotation Servos

Continuous rotation servos are servos that instead of moving to a position use power to move. They are more comparable to motors in that sense than a traditional servo.

```CRServoEx``` wraps a ```CRServo``` exactly like a ```ServoEx``` wraps a ```Servo``` but implements ```Powerable``` instead of ```Positionable```. 

## Declarations

You can declare ```CRServoEx``` in the following manner, much like a normal ```ServoEx```:

:::tabs key:code

== Kotlin

```Kotlin
val crservo: CRServoEx = CRServoEx { CRServo }

// Alternatively
val crservo: CRServoEx = CRServoEx(CRServo)

// Alternatively 
val crservo: CRServoEx = CRServoEx("cr_servo_name")

```

== Java
```Java
CRServoEx crservo = new CRServoEx(() -> CRServo);

// Alternatively
CRServoEx crservo = new CRServoEx(CRServo);

// Alternatively
CRServoEx crservo = new ServoEx("servo_name");
```

::: 

## Usage

```CRServoEx``` has only a ```power``` variable to set or get the power of the motor. Like a ```MotorEx``` the power can vary from -1 to 1. 

:::tabs key:code

== Kotlin

```Kotlin
crservo.power = 0.0 // To turn off
crservo.power = -1.0 // To spin in reverse
crservo.power = 1.0 // To spin forward
```

== Java

```Java
crservo.setPower(0.0); // To turn off
crservo.setPower(-1.0); // To spin in reverse
crservo.setPower(1.0); // To spin forward
```

:::tabs

Additionally you can pass a cache tolerance (default is 0.01)
