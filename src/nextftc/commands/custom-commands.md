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
}
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

In general, a lambda command can be created as follows:

:::tabs key:code
== Kotlin

```kotlin
val myLambdaCommand = LambdaCommand()
    .setStart { 
        // Runs on start
    }
    .setUpdate { 
        // Runs on update
    }
    .setStop { interrupted ->
        // Runs on stop
    }
    .setIsDone { true } // Returns if the commmand has finished
    .requires(/* subsystems the command implements */)
    .setInterruptible(true)
    .named("My Command") // sets the name of the command; optional
```

== Java

```java
Command myLambdaCommand = new LambdaCommand()
    .setStart(() -> {
        // Runs on start
    })
    .setUpdate(() -> {
        // Runs on update
    })
    .setStop(interrupted -> {
        // Runs on stop
    })
    .setIsDone(() -> true) // Returns if the command has finished
    .requires(/* subsystems the command implements */)
    .setInterruptible(true)
    .named("My Command"); // sets the name of the command; optional
```

:::

> [!TIP]
> All functions are completely optional. You only need to call the ones you will
> use. They can be called in any order.

## Command Classes

### Commands as Classes

It is unlikely that you will need to use this very often, but you can also
create a command as a class. This is useful for cases where you need to reuse
your command a lot. An command can be created as a class as follows:

:::tabs key:code
== Kotlin

```kotlin
class MyCommand(): Command() {

    init {
        requires(/* subsystems */)
        setInterruptible(true) // this is the default, so you don't need to specify
    }

    override val isDone: Boolean
        get() = false // whether or not the command is done

    override fun start() {
        // executed when the command begins
    }

    override fun update() {
        // executed on every update of the command
    }

    override fun stop(interrupted: Boolean) {
        // executed when the command ends
    }
}
```

== Java

```java
public class MyCommand extends Command {

    public MyCommand() {
        requires(/* subsystems */);
        setInterrptuptible(true); // this is the default, so you don't need to specify
    }

    @Override
    public boolean isDone() {
        return false; // whether or not the command is done
    }

    @Override
    public void start() {
        // executed when the command begins
    }

    @Override
    public void update() {
        // executed on every update of the command
    }

    @Override
    public void stop(boolean interrupted) {
        // executed when the command ends
    }
}
```

:::
