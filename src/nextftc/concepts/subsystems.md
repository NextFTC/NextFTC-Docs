# Subsystems

Subsystems are a unit of organization for your code. A subsystem represents
a hardware component on your robot. Although they are
completely optional, it is highly recommended that you use them. They
provide a great alternative to the "robot class" antipattern.

## Creating Subsystems

To create a subsystem, just implement the `Subsystem` interface! You can
optionally implement the `initialize` and/or `periodic` functions as well.

:::tabs key:code

== Kotlin

```kotlin
class MySubsystem : Subsystem {
    // put hardware, commands, etc here
    
    override fun initialize() {
        // initialization logic (runs on init)
    }
    
    override fun periodic() {
        // periodic logic (runs every loop)
    }
}
```

== Java

```java
public class MySubsystem implements Subsystem {
    // put hardware, commands, etc here
    
    @Override
    public void initialize() {
        // initialization logic (runs on init)
    }
    
    @Override
    public void periodic() {
        // periodic logic (runs every loop)
    }
} 
```

:::

## Registering Subsystems

To register a subsystem in your OpMode, pass it to a `SubsystemComponent` as
one of your components. A `SubsystemComponent` can take one or many
subsystems. Registering a subsystem ensures that its `initialize` and
`periodic` functions are called at the appropriate times.

## Subsystems as Requirements

It is generally best to have a subsystem as the requirement for the commands
in that subsystem. For example:

:::tabs key:code

== Kotlin

```kotlin
val open = SetPositon(claw, 1.0).requires(this)
```

== Java

```java
public Command open = new SetPosition(claw, 1).requires(this);
```

:::

However, if you have multiple degrees of freedom in one subsystem, commands
for each degree of freedom should get its own requirement. A simple way to
do this is by using the hardware objects as requirements. See the following
example.

:::tabs key:code

== Kotlin

```kotlin
val openClaw = SetPosition(clawServo, 1.0).requires(clawServo)
val closeClaw = SetPosition(clawServo, 0.0).requires(clawServo)

val pivotLeft = SetPosition(pivotServo, 0.0).requires(pivotServo)
val pivotRight = SetPostion(pivotServo, 1.0).requires(pivotServo)
```

== Java

```java
public Command openClaw = new SetPosition(clawServo, 1).requires(clawServo);
public Command closeClaw = new SetPosition(clawServo, 0).requires(clawServo);

public Command pivotLeft = new SetPosition(pivotServo, 0.0).requires(pivotServo);
public Command pivotRight = new SetPosition(pivotServo, 0.0).requires(pivotServo);
```

:::

## Subsystem Groups

NextFTC provides a `SubsystemGroup` class that can be used to group multiple
subsystems into a single object.
This is useful for commands that require
multiple subsystems to be active at the same time.
It can also be used to simplify the process of adding multiple
subsystems to a `SubsystemComponent`.

For examples of SubsystemGroups,
see the [corresponding guide page](subsystem-groups.md).