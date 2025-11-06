# `FateComponent`

The main feature added by this extension is the `FateComponent`,
which can be added to your OpModes alongside other components:

:::tabs key:code

== Kotlin

```kotlin
addComponents(
    /* existing components */
    FateComponent
)
```

== Java

```java
addComponents(
    /* existing components */
    FateComponent.INSTANCE
);
```

:::

`FateComponent` will automatically log timestamps and the current
Command snapshot at the end of every `OpMode` loop!

## Basic Logging Methods 

To log a message, use the `write` method:

:::tabs key:code

== Kotlin

```kotlin
// in `onUpdate` method
FateComponent.write("ChannelName", object)
```

== Java

```java
//in `onUpdate` method
FateComponent.write("ChannelName", object);
```

:::

## Channels

You can also use `FateComponent` to create [channel](https://docs.fate.zharel.gay/ftc/gay.zharel.fateweaver.flight/-flight-log-channel/index.html) objects!

:::tabs key:code

== Kotlin

```kotlin
val channel = FateComponent.createChannel("ChannelName", SomeClass::class)
```

== Java

```java
LogChannel<SomeClass> channel = FateComponent.createChannel("ChannelName", SomeClass.class);
```

:::

> [!WARNING]
> Channels must be created during an `OpMode`.
> Creating a channel before an `OpMode` is initialized will result in an exception.
