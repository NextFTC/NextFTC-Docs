# Delays

In NextFTC there are two types of delays.

## `Delay`

A `Delay` is a command that waits a certain amount of time before finishing.

:::tabs key:code
== Kotlin

A `Delay` takes a `Duration` from
[`kotlin.time`](https://kotlinlang.org/docs/time-measurement.html) to determine
how long it waits for. Alternatively, it can take a `Double` in seconds.

```kotlin
// it can take a Duration:
Delay(5.seconds)
Delay(500.milliseconds)

// or a time in seconds, as a Double
Delay(5.0)
```

== Java

A `Delay` takes a `Duration` from
[`java.time`](https://www.baeldung.com/java-period-duration#duration-class) to
determine how long it
waits for. Alternatively, it can take a `double` in seconds.

```java
// it can take a Duration:
new Delay(Duration.ofSeconds(5))
new Delay(Duration.ofMilliseconds(500))

// or a time in seconds, as a double
new Delay(5)
```

:::

## `WaitUntil`

`WaitUntil` evaluates a check every loop and ends when it returns true.

:::tabs key:code
== Kotlin

```kotlin
WaitUntil { false } // never ends
```

== Java

```java
new WaitUntil(() -> false) // never ends
```

:::

## Delay Utilities

There are a few utilities that help you write common delays more easily.

### `endAfter`

`endAfter` returns a `ParallelRaceGroup` with the command and a `Delay`. This
causes the command to have a maximum time it can be before it ends.

:::tabs key:code
== Kotlin

```kotlin
// All are equivalent
command.endAfter(2.seconds)
command.endAfter(2000.milliseconds)
command.endAfter(2.0)
ParallelRaceGroup(
    command,
    Delay(2.seconds)
)
```

== Java

```java
// All are equivalent
command.endAfter(Duration.ofSeconds(2))
command.endAfter(Duration.ofMilliseconds(2000))
command.endAfter(2)
new ParallelRaceGroup(
    command,
    new Delay(Duration.ofSeconds(2))
)
```

:::

### `afterTime`

`afterTime` returns a `SequentialGroup` with a `Delay` and then the command.
This causes the command to wait a certain amount of time before starting.

:::tabs key:code
== Kotlin

```kotlin
// All are equivalent
command.afterTime(2.seconds)
command.afterTime(2000.milliseconds)
command.afterTime(2.0)
SequentialGroup(
    Delay(2.seconds),
    command
)
```

== Java

```java
// All are equivalent
command.afterTime(Duration.ofSeconds(2))
command.afterTime(Duration.ofMilliseconds(2000))
command.afterTime(2)
new SequentialGroup(
    new Delay(Duration.ofSeconds(2)),
    command
)
```

:::

### `thenWait`

`thenWait` is like `afterTime`, but the opposite! `thenWait` returns a
`SequentialGroup` with the command *and then* a `Delay`.

:::tabs key:code
== Kotlin

```kotlin
// All are equivalent
command.thenWait(2.seconds)
command.thenWait(2000.milliseconds)
command.thenWait(2.0)
SequentialGroup(
    command,
    Delay(2.seconds)
)
```

== Java

```java
// All are equivalent
command.thenWait(Duration.ofSeconds(2))
command.thenWait(Duration.ofMilliseconds(2000))
command.thenWait(2)
new SequentialGroup(
    command,
    new Delay(Duration.ofSeconds(2))
)
```

:::