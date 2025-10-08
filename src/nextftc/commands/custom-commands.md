# Custom Commands

While NextFTC includes many useful commands, 
you often will need to create your own.

The recommended way to create a command is by using the `LambdaCommand` class, 
which allows you to define the command's behavior using lambda functions.
This approach is concise and flexible, making it easy to create custom commands
without needing to create a new class for each command.

Here is how the builtin `RunToPosition` command could
be implemented using `LambdaCommand`:

::: tabs key:code

== Java
```java
public static Command runToPosition(ControlSystem system, double position, KineticState tolerance) {
    return new LambdaCommand("RunToPosition(" + position + ")")
            .setStart(() -> system.setGoal(new KineticState(position)))
            .setIsDone(() -> system.isWithinTolerance(tolerance))
            .requires(system);
{
```

Because Java doesn't have default parameters,
we must make another method to use a default tolerance.
This example uses a tolerance of 10.0:

```java
public static Command runToPosition(ControlSystem system, double position) {
    return runToPosition(system, position, new KineticState(10.0));
}
```

== Kotlin
```kotlin
fun runToPosition(
    system: ControlSystem, 
    position: Double, 
    tolerance: KineticState = KineticState(10.0)
) = LambdaCommand("RunToPosition($position)")
    .setStart { system.goal = KineticState(position) }
    .setIsDone { system.isWithinTolerance(tolerance) }
    .requires(system)
```

:::

The `setStart`, `setUpdate`, `setIsDone`, and `setStop` 
methods directly map to the methods of the `Command` class.
