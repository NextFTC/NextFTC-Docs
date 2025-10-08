# Conditionals

NextFTC has two conditional commands to help you implement conditional logic.

## `IfElseCommand`

A `IfElseCommand` takes a condition, a command to run on true, and
a command to run on false. The condition is a boolean supplier, which is
evaluated when the command is scheduled. Optionally, the `falseCommand` can 
be omitted, in which case no command will be run on false.

:::tabs key:code
== Kotlin

```kotlin
IfElseCommand(
    { 1 == 2 },
    trueCommand,
    falseCommand
)
```

== Java

```java
new IfElseCommand(
    () -> 1 == 2,
    trueCommand,
    falseCommand
)
```

:::

## `SwitchCommand`

A `SwitchCommand` is like an `IfElseCommand` but for a
`switch`/`when` statement.

:::tabs key:code
== Kotlin

```kotlin
switchCommand({ "giraffe" }) {
    case("beaver", beaverCommand)
    case("giraffe", giraffeCommand)
    case("hippo", hippoCommand)
    default = defaultCommand // optional
}
```

== Java

```java
new SwitchCommand(() -> "giraffe")
    .withCase("beaver", beaverCommand)
    .withCase("giraffe", giraffeCommand)
    .withCase("hippo", hippoCommand)
    .withDefault(defaultCommand); // optional
```

:::