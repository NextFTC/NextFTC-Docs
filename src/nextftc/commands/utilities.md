# Utilities

NextFTC has a bunch of utility commands to help you simplify your code!

## `InstantCommand`

An `InstantCommand` runs a function and ends instantly.

:::tabs key:code
== Kotlin

```kotlin
InstantCommand {
    // code here
}
```

== Java

```java
new InstantCommand(() -> {
    // code here
})
```

:::

## `NullCommand`

A `NullCommand` is a placeholder command that does nothing. It can take an arbitrary amount of parameters when used as a placeholder for another command.

:::tabs key:code
== Kotlin

```kotlin
NullCommand(parameter1, parameter2)
```

== Java

```java
new NullCommand(parameter1, parameter2)
```

:::

## `ForcedParallelCommand`

A `ForcedParallelCommand` schedules another command and instantly ends. This can be useful in `SequentialGroups` where you want to start a command and move on.

:::tabs key:code
== Kotlin

```kotlin
ForcedParallelCommand(command)
```

== Java

```java
new ForcedParallelCommand(command)
```

:::

Alternatively, you can used the `.forcedParallel()` utility:

:::tabs key:code

== Kotlin

```kotlin
command.forcedParallel()
```

== Java

```java
command.forcedParallel()
```

:::

## `PerpetualCommand`

A `PerpetualCommand` wraps another command and never finishes unless it is interrupted. It simply ignores the `isDone` condition on the command it wraps.

:::tabs key:code
== Kotlin

```kotlin
PerpetualCommand(commandToWrap)
```

== Java

```java
new PerpetualCommand(commandToWrap)
```

:::

Alternatively, you can use the `.perpetually()` utility:

:::tabs key:code
== Kotlin

```kotlin
commandToWrap.perpetually()
```

== Java

```java
commandToWrap.perpetually()
```

:::