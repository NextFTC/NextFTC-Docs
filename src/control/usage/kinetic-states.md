# Kinetic States

A `KineticState` is simply a structure for storing the one-dimensional motion
states of a system at a given point in time.
It contains a `position`, a `velocity`, and an `acceleration`, and works for
whatever unit you provide. For example, if `position` is given in inches,
`velocity` should be given in inches per second and `acceleration` should be
given in inches per second per second.

`KineticStates` can also be added or subtracted componentwise and multiplied
or divided by a scalar.

:::tabs key:code

== Kotlin

```kotlin
val state = KineticState(1.0, 2.0, 3.0)
val sum = state + KineticState(3.0, 2.0, 1.0) // KineticState(4.0, 4.0, 4.0)
val difference = state - KineticState(2.0, 2.0, 2.0) // KineticState(-1.0, 0.0, 1.0)
val product = state * 3 // KineticState(3.0, 6.0, 9.0)
val quotient = state / 2 // KineticState(0.5, 1.0, 1.5)
```

== Java

```java
KineticState state = new KineticState(1, 2, 3);
KineticState sum = state.plus(new KineticState(3, 2, 1)); // KineticState(4, 4, 4)
KineticState difference = state.minus(new KineticState(2, 2, 2)); // KineticState(-1, 0, 1)
KineticState product = state.times(3); // KineticState(3, 6, 9)
KineticState quotient = state.div(2); // KineticState(0.5, 1, 1.5)`
```

:::