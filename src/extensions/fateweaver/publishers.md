# Publishers

The FateWeaver extension includes an additional feature called publishers,
which allow you to register a channel that will be automatically logged to
every loop.

Take our [lift subsystem](../../guide/subsystems/lift) from the guide.
Let's add a public `state` getter:

:::tabs key:code

== Kotlin

```kotlin
val state get() = motor.state
```

== Java

```java
public KineticState getState() {
    return motor.getState();
}
```

:::

Now, in the `onStartButtonPressed` method of our OpMode,
we can register a publisher for the lift's state:

:::tabs key:code

== Kotlin

```kotlin
val stateChannel = FateComponent.createChannel("Lift State", KineticState::class)
FateComponent.registerPublisher(stateChannel, Lift::state)
```

== Java

```java
LogChannel<KineticState> stateChannel = FateComponent.createChannel("LiftState", KineticState.class);
FateComponent.registerPublisher(stateChannel, Lift.INSTANCE::getState);
```

:::

This will automatically publish the lift's state to the log file at the end of every loop.

There is an overload for `registerPublisher` that takes a 
channel name and schema (or class) instead of a channel object, 
which could be used as follows:

:::tabs key:code

== Kotlin

```kotlin
FateComponent.registerPublisher("LiftState", KineticState::class, Lift::state)
```

== Java

```java
FateComponent.registerPublisher("LiftState", KineticState.class, Lift.INSTANCE::getState);
```

:::

Publishers are automatically unregistered when the OpMode ends.

In this example, we use method and property references to simplify the code,
but you can also use lambda expressions.
WPILib has has an amazing explanation of method references and lambda expressions
[here](https://docs.wpilib.org/en/stable/docs/software/basic-programming/functions-as-data.html).
For information on Kotlin method references and lambda expressions,
see [the Kotlin documentation](https://kotlinlang.org/docs/lambdas.html).