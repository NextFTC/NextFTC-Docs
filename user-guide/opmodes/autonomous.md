# Autonomous

Creating an autonomous in NextFTC is fairly straighforward. This page will walk you through creating an autonomous. I will not be covering usage of PedroPathing in this page; refer to the [PedroPathing page](/user-guide/pedropathing) for details on that.

This autonomous program will introduce you to some core features of NextFTC such as command groups, delays, and running the commands you created in your Subsystems.

Let's get started!

## Step 1: Create your class

OpModes in NextFTC will extend one of two classes: `NextFTCOpMode` and `PedroOpMode`, depending on if you're using PedroPathing.

This example will use `NextFTCOpMode`. Refer to the [PedroPathing page](/user-guide/pedropathing) to learn how to convert a NextFTCOpMode to a PedroOpMode and incorporate PedroPathing.

That being said, here is the basic structure for every Autonomous OpMode:

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "NextFTC Autonomous Program Kotlin")
class AutonomousProgram: NextFTCOpMode() {

}
```

== Java

```java
@Autonomous(name = "NextFTC Autonomous Program Java")
public class AutonomousProgram extends NextFTCOpMode {

}
```

:::

That's not all, though. We want our autonomous program to use the Lift and Claw subsystems we created in the [subsystems guide](../subsystems.md). To do that, we need to
add them into the constructor of NextFTCOpMode.

:::tabs key:code

== Kotlin

```kotlin
class AutonomousProgram: NextFTCOpMode(Claw, Lift) {
```

== Java
We will create a constructor for the AutonomousProgram class, in which we can call the super constructor with our subsystems:

```java
public AutonomousProgram() {
    super(Claw.INSTANCE, Lift.INSTANCE);
}
```

:::

This will tell NextFTC that we will be using those subystems in this OpMode, and will initialize them accordingly.

## Step 2: Creating a routine

You've already learned how to create individual commands, such as motor and servo movements. Now, it's time to group them together into useful behaviors. This is where `CommandGroups` and routines come into play. Before we can create our own, we first need to understand how commands are run behind the scenes.

The `CommandManager` stores an internal list of actively running commands. It goes through each command and calls its `update()` function every single loop. It also determines which commands to cancel, handles subsystem conflicts, and offers additional functionality as well. The important thing to note is that all commands that are directly stored by the CommandManager run _simultaneously_. Knowing that, you may be wondering why `ParallelGroups` exist, if you can just schedule commands directly. Trust me, we'll get there. Before that, we need to understand what a `SequentialGroup` does.

A `SequentialGroup` stores a collection of commands and runs them _in a row_. Instead of scheduling all of its children at once, it schedules the first one, and then waits to schedule the next one until the first has completed, then continues scheduling them one by one until they've all completed. If you think about it a little bit, it may become apparent what a `ParallelGroup` is for. If you are using a `SequentialGroup`, you may have things you want to happen simultaneously _within_ that group. For example:

1. Drive to a location
2. _Simultaneously_ raise a lift and rotate an arm
3. Open a claw
4. _Simultaneously_ lower the lift, reset the arm, and drive to a different location

This could only be accomplished using `ParallelGroups` in conjunction with `SequentialGroups`.

Now that we know what CommandGroups do, let's learn how to create them. For this example, we will create a routine that does the following:

1. Raise the lift to the high position
2. _Simultaneously_ open the claw and move the lift to the middle position
3. Wait for half a second
4. _Simultaneously_ close the claw and move the lift to the low position

This routine is unlikely to actually be useful in an autonomous program, but it will introduce you to the mental processes behind creating commands, and will give you the tools you need to create your own. Let's go ahead and create our command.

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup()
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup();
}
```

:::

I've made an empty SequentialGroup here, for demonstration purposes.

> [!CAUTION]
> Do not attempt to use empty `SequentialGroups` in your code. They will cause errors that break your OpMode. If you need a placeholder, use a [`NullCommand`](https://nextftc.dev/reference/core/com.rowanmcalpin.nextftc.core.command.utility/-null-command/).
>
> The above snippet is incomplete and that's why it appears to create an empty `SequentialGroup`. That won't work in practice.

As mentioned above, we need to put something in our sequential group in order to avoid errors. In our list, we said the first thing we want to do is raise the lift to the high position. We can add the `Lift.toHigh` command into our group very easily:

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup(
        Lift.toHigh
    )
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup(
            Lift.INSTANCE.toHigh()
    );
}
```

:::

The next thing we wanted to do is _simultaneously_ open the claw and move the lift to the middle position. To add another command to the group, add a comma at the end of your last item (in this case, `Lift.toHigh`) and add the next command on a new line (before the close parenthesis). In this case, we want to add a `ParallelGroup` because we want to do things simultaneously next.

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup(
        Lift.toHigh,
        ParallelGroup()
    )
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup(
            Lift.INSTANCE.toHigh(),
            new ParallelGroup()
    );
}
```

:::

Just like with `SequentialGroups`, you shouldn't create empty `ParallelGroups` (although it won't cause an error like `SequentialGroups` do). Let's populate it with our `Lift.toMiddle` and `Claw.close` commands:

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup(
        Lift.toHigh,
        ParallelGroup(
            Lift.toMiddle,
            Claw.close
        )
    )
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup(
            Lift.INSTANCE.toHigh(),
            new ParallelGroup(
                    Lift.INSTANCE.toMiddle(),
                    Claw.INSTANCE.close()
            )
    );
}
```

:::

Since command groups are also just commands, we can just continue to add commands after the ParallelGroup. Let's wait for half a second using a `Delay` command. That takes a single value, the amount of time to delay in seconds.

> [!IMPORTANT]
> Delays should (almost) always be inside of `SequentialGroups`. A delay used inside a ParallelGroup will usually accomplish nothing.
>
> An exception to this is if you want a ParallelGroup to take a minimum amount of time, then you can put a delay in it as well.

Let's create our delay:

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup(
        Lift.toHigh,
        ParallelGroup(
            Lift.toMiddle,
            Claw.close
        ),
        Delay(0.5)
    )
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup(
            Lift.INSTANCE.toHigh(),
            new ParallelGroup(
                    Lift.INSTANCE.toMiddle(),
                    Claw.INSTANCE.close()
            ),
            new Delay(0.5)
    );
}
```

:::

Finally, we can add our last `ParallelGroup` to our routine. The final routine looks like this:

:::tabs key:code

== Kotlin

```kotlin
val firstRoutine: Command
    get() = SequentialGroup(
        Lift.toHigh,
        ParallelGroup(
            Lift.toMiddle,
            Claw.close
        ),
        Delay(0.5),
        ParallelGroup(
            Claw.open,
            Lift.toLow
        )
    )
```

== Java

```java
public Command firstRoutine() {
    return new SequentialGroup(
            Lift.INSTANCE.toHigh(),
            new ParallelGroup(
                    Lift.INSTANCE.toMiddle(),
                    Claw.INSTANCE.close()
            ),
            new Delay(0.5),
            new ParallelGroup(
                    Claw.INSTANCE.open(),
                    Lift.INSTANCE.toLow()
            )
    );
}
```

:::

## Step 3: Running our routine

Now that we have our routine, we just need to run it. To do this, let's override the `onStartButtonPressed()` function.

:::tabs key:code

== Kotlin

To schedule a command, you can either call `CommandManager.scheduleCommand(commandToAdd)`, or you can just do `commandToAdd()`. In this case, let's do the latter.

```kotlin
override fun onStartButtonPressed() {
    firstRoutine()
}
```

== Java

To schedule a command, you can either call `CommandManager.INSTANCE.scheduleCommand(commandToAdd())`, or you can just do `commandToAdd().invoke()`. In this case, let's do the latter.

```java
@Override
public void onStartButtonPressed() {
    firstRoutine().invoke();
    
    // Note that you can use invoke() function only once.
    // In order to run several routine functions put them into one new SequentialGroup() and invoke() it.
}
```

:::

## Final result

That's it! You have created your very first autonomous program and, perhaps more importantly, learned about some of the tools you have at your disposal to create more complex autonomous programs.

Here is the final result:

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "NextFTC Autonomous Program Kotlin")
class AutonomousProgram: NextFTCOpMode(Claw, Lift) {
    val firstRoutine: Command
        get() = SequentialGroup(
            Lift.toHigh,
            ParallelGroup(
                Lift.toMiddle,
                Claw.close
            ),
            Delay(0.5),
            ParallelGroup(
                Claw.open,
                Lift.toLow
            )
        )

    override fun onStartButtonPressed() {
        firstRoutine()
    }
}
```

== Java

```java
@Autonomous(name = "NextFTC Autonomous Program Java")
public class AutonomousProgram extends NextFTCOpMode {
    public AutonomousProgram() {
        super(Claw.INSTANCE, Lift.INSTANCE);
    }

    public Command firstRoutine() {
        return new SequentialGroup(
                Lift.INSTANCE.toHigh(),
                new ParallelGroup(
                        Lift.INSTANCE.toMiddle(),
                        Claw.INSTANCE.close()
                ),
                new Delay(0.5),
                new ParallelGroup(
                        Claw.INSTANCE.open(),
                        Lift.INSTANCE.toLow()
                )
        );
    }

    @Override
    public void onStartButtonPressed() {
        firstRoutine().invoke();
    }
}
```

:::
