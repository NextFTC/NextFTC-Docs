# Subsystem Groups 

NextFTC offers a [`SubsystemGroup`](https://javadoc.io/doc/dev.nextftc/core/latest/-next-f-t-c%20-core/dev.nextftc.core.subsystems/-subsystem-group/index.html) class, 
which allows you to group multiple subsystems together for easier management and control. 
This is particularly useful for complex robots with many subsystems, 
as it enables you to treat them as a single unit.

This can be used in multiple ways.
Some examples include a double-jointed arm mechanism,
or a swerve drive train with multiple modules that can be controlled independently.
This example also illustrates using a `SubsystemGroup` to represent your robot as a whole, 
allowing for more streamlined control and coordination between subsystems.

Just like regular subsystems, 
subsystem groups have an `initialize` and `periodic` function;
in addition, the `initialize` function of each subsystem in the group 
will be called when the group is initialized, 
and the `periodic` function of each subsystem will be called every loop.

## Creating a Subsystem Group

To create a `SubsystemGroup`, 
you must create a subclass of `SubsystemGroup`,
and provide the necessary subsystem instances to its constructor.

::: tabs key:code

== Kotlin

```kotlin 
object MySubsystemGroup() : SubsystemGroup(
    MyFirstSubsystem,
    MySecondSubsystem
)
```

== Java

Just like regular subsystems, 
we must provide some boilerplate code to create a `SubsystemGroup` in Java.

```java
public class MySubsystemGroup extends SubsystemGroup {
    public static final MySubsystemGroup INSTANCE = new MySubsystemGroup();

    private MySubsystemGroup() {
        super(
            MyFirstSubsystem.INSTANCE,
            MySecondSubsystem.INSTANCE
        );
    }
}
```

:::

## Using a Subsystem Group

To register a subsystem group, you can simply pass its instance
to the `SubsystemComponent` constructor in a NextFtcOpMode
the way you would with a regular subsystem:

::: tabs key:code

== Kotlin

```kotlin
init {
    addComponents(
        SubsystemComponent(MySubsystemGroup)
    )
}
```

== Java 

```java
public MyOpMode() {
    addComponents(
        SubsystemComponent(MySubsystemGroup.INSTANCE)
    );
}
```

:::
