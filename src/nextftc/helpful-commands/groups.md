# Command Groups

Command groups are an essential part of NextFTC. They allow you to group multiple commands together into more complex commands. NextFTC has four types of command groups.

## `SequentialGroup`

A `SequentialGroup` takes an arbitrary number of commands and runs them, one after another, until the last one is done.

:::tabs key:code
== Kotlin

```kotlin
SequentialGroup(
    command1,
    command2,
    // vararg Command
)
```

== Java

```java
new SequentialGroup(
    command1,
    command2,
    // vararg Command
)
```

:::

A `SequentialGroup` can also be created with the `.then` helper function:

:::tabs key:code
== Kotlin

```kotlin
command1.then(
    command2,
    // vararg Command
)
```

== Java

```java
command1.then(
    command2,
    // vararg Command
)
```

:::

## `ParallelGroup`

A `ParallelGroup` takes an arbitrary number of commands and runs them all at the same time, until they have all finished.

:::tabs key:code
== Kotlin

```kotlin
ParallelGroup(
    command1,
    command2,
    // vararg Command
)
```

== Java

```java
new ParallelGroup(
    command1,
    command2,
    // vararg Command
)
```

:::

A `ParallelGroup` can also be created with the `.and` helper function:

:::tabs key:code
== Kotlin

```kotlin
command1.and(
    command2,
    // vararg Command
)
```

== Java

```java
command1.and(
    command2,
    // vararg Command
)
```

:::

## `ParallelRaceGroup`

A `ParallelRaceGroup` is very similar to a `ParallelGroup` in that they both run an arbitrary number of commands in parallel. However unlike a `ParallelGroup`, a `ParallelRaceGroup` only requires *one* of its children to finish before it finishes.

:::tabs key:code
== Kotlin

```kotlin
ParallelRaceGroup(
    command1,
    command2,
    // vararg Command
)
```

== Java

```java
new ParallelRaceGroup(
    command1,
    command2,
    // vararg Command
)
```

:::

A `ParallelRaceGroup` can also be created with the `.raceWith` helper function:

:::tabs key:code
== Kotlin

```kotlin
command1.raceWith(
    command2,
    // vararg Command
)
```

== Java

```java
command1.raceWith(
    command2,
    // vararg Command
)
```

:::

## `ParallelDeadlineGroup`

A `ParallelDeadlineGroup` is very similar to a `ParallelGroup` and a `ParallelRaceGroup`. However unlike a `ParallelRaceGroup`, it has a special command (the deadline) and it finishes whenever the deadline finishes, no matter the status of the other commands.

:::tabs key:code
== Kotlin

```kotlin
ParallelDeadlineGroup(
    deadlineCommand,
    command2,
    // vararg Command
)
```

== Java

```java
new ParallelDeadlineGroup(
    deadlineCommand,
    command2,
    // vararg Command
)
```

:::

A `ParallelDeadlineGroup` can also be created with the `.asDeadline` helper function, where the function it is called on is the deadline:

:::tabs key:code
== Kotlin

```kotlin
deadlineCommand.asDeadline(
    command2,
    // vararg Command
)
```

== Java

```java
deadlineCommand.asDeadline(
    command2,
    // vararg Command
)
```

:::

Additionally, it can be created with the `.withDeadline` helper method, which takes a parameter as a deadline.

:::tabs key:code
== Kotlin

```kotlin
command2.withDeadline(deadlineCommand)
```

== Java

```java
command2.withDeadline(deadlineCommand)
```

:::

> [!NOTE]
> See the [command groups reference](https://nextftc.dev/reference/core/com.rowanmcalpin.nextftc.core.command.groups/index.html) for more information.
