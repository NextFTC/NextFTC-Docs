# Motors

NextFTC has wrappers for your motors that add several useful features, such as
power caching and encoder offsets. All motors implement the `Controllable`
and `Powerable`interfaces.

## `MotorEx`

`MotorEx` is NextFTC's wrapper over a `DcMotorEx`. To create one, you can do one
of the following:

:::tabs key:code
== Kotlin

```kotlin
val motorEx = MotorEx { dcMotorEx }
val motorEx = MotorEx(dcMotorEx)
val motorEx = MotorEx("motor_name")
```

== Java

```java
MotorEx motorEx = new MotorEx(() -> dcMotorEx);
MotorEx motorEx = new MotorEx(dcMotorEx);
MotorEx motorEx = new MotorEx("motor_name");
```

:::

`MotorEx` has several modifiers that can be used to change the behavior. All
modifiers are mutating and return the `MotorEx`. The order in which the
modifiers are applied will not affect the behavior.

| Modifier                | Description                             |
|-------------------------|-----------------------------------------|
| `.zeroed()`             | Resets the position                     |
| `.atPosition(position)` | Sets the current position to a position |
| `.reversed()`           | Reverses the direction of the motor     |
| `.floatMode()`          | Sets the zero power behavior to float   |
| `.breakMode()`          | Sets the zero power behavior to break   |

For example:

:::tabs key:code

== Kotlin

```kotlin
MotorEx("motor_name")
    .zeroed()
    .reversed()
    .breakMode()
```

== Java

```java
new MotorEx("motor_name")
    .zeroed()
    .reversed()
    .breakMode();
```

:::

## `MotorGroup`

`MotorGroup` is a container for multiple `Controllables` (e.g. `MotorEx`) that
are mechanically linked. The first motor passed to it is the *leader* and the
rest are *followers.* The leader is the one whose encoder will be read.

As `MotorGroup` implements `Controllable`, it can be passed anywhere you would
normally pass a `MotorEx`. Creating a `MotorGroup` is easy:

:::tabs key:code
== Kotlin

```kotlin
val myMotorEx = MotorEx("motor1")
val myMotorEx2 = MotorEx("motor2").reversed()
val myMotorGroup = MotorGroup(myMotorEx, myMotorEx2)

// or inline:
val myMotorGroup = MotorGroup(
    MotorEx("motor1"),
    MotorEx("motor2").reversed()
)
```

== Java

```java
MotorEx myMotorEx = new MotorEx("motor1");
MotorEx myMotorEx2 = new MotorEx("motor2").reversed();
MotorGroup myMotorGroup = new MotorGroup(myMotorEx, myMotorEx2);

// or inline:
MotorGroup myMotorGroup = new MotorGroup(
    new MotorEx("motor1"),
    new MotorEx("motor2").reversed()
);
```

:::

## `VoltageCompensatingMotor`

`VoltageCompensatingMotor` is a class that takes into consideration the voltage
of the robot to set the power of a `MotorEx`, allowing the system to set power to
more or less than the user input, increasing the motor's consistency/stability
to perform in abnormal voltage levels. NextFTC allows for easy use of the 
`VoltageCompensatingMotor` as shown below:

:::tabs key:code
== Kotlin

```kotlin
val myMotorEx = MotorEx("motor_name")

val myVoltageCompensatingMotor = VoltageCompensatingMotor(myMotorEx)

// or with "ideal" voltage(Volts) and voltage caching time(seconds/Duration) specifications
val myVoltageCompensatingMotor = VoltageCompensatingMotor(myMotorEx, 500.milliseconds, 12.0)
val myVoltageCompensatingMotor = VoltageCompensatingMotor(myMotorEx, 0.5, 12.0)
val myVoltageCompensatingMotor = VoltageCompensatingMotor(myMotorEx, "0.5", 12.0)
```

== Java

```java
MotorEx myMotor = new MotorEx("motor_name")

VoltageCompensatingMotor myVoltageCompensatingMotor = new VoltageCompensatingMotor(myMotorEx)

// or with "ideal" voltage(Volts) and voltage caching time(seconds) specifications
VoltageCompensatingMotor myVoltageCompensatingMotor = new VoltageCompensatingMotor(myMotorEx, 0.5, 12.0)
VoltageCompensatingMotor myVoltageCompensatingMotor = new VoltageCompensatingMotor(myMotorEx, "0.5", 12.0)
```

:::
