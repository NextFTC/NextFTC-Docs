# Components

Components are NextFTC's approach to making OpModes more modular and
customizable. Each component has 10 functions that get run before and after each
OpMode function (`onInit`, `onWaitForStart`, `onStartButtonPressed`, `onUpdate`, and
`onStop`). This means that components are extremely versatile and can be used to
accomplish a wide range of functions when they're used in your OpModes.

NextFTC has several built-in components, including:

- `BulkReadComponent`
- `BindingsComponent` (for [NextBindings](/bindings))
- `LoopTimeComponent`
- `PedroComponent` (for the PedroPathing Extension)
- `SubsystemComponent`
- `CommandManager`

## Creating Components

To create a component, all you must do is implement the `Component` 
interface. You need only implement the functions that you use.

:::tabs key:code

== Kotlin

```kotlin
class MyComponent : Component {
    override fun preInit() { }
    override fun postInit() { }
    override fun preWaitForStart() { }
    override fun postWaitForStart() { }
    override fun preStartButtonPressed() { }
    override fun postStartButtonPressed() { }
    override fun preUpdate() { }
    override fun postUpdate() { }
    override fun preStop() { }
    override fun postStop() { }
}
```

== Java

```java
public class MyComponent implements Component {
    @Override public void preInit() { }
    @Override public void postInit() { }
    @Override public void preWaitForStart() { }
    @Override public void postWaitForStart() { }
    @Override public void preStartButtonPressed() { }
    @Override public void postStartButtonPressed() { }
    @Override public void preUpdate() { }
    @Override public void postUpdate() { }
    @Override public void preStop() { }
    @Override public void postStop() { }
}
```

:::

# Registering Components

To register components in your `NextFTCOpMode`, simply call the 
`addComponents` function in the instance initializer block of your OpMode. 
For example:

:::tabs key:code

== Kotlin

```kotlin
init {
    addComponents(
        MyComponent(),
        BindingsComponent
    )
}
```

== Java

```java
{
    addComponents(
        new MyComponent(),
        BindingsComponent.INSTANCE
    );
}
```

:::

Components' `pre`- functions are called in the order they're set and `post`- 
functions are called in the reverse order.
