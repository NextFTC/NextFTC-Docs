# Linear Slides Example

Linear slides are a commonly used mechanism in FTC, 
and most often controlled with a positional PID feedback 
controller and a constant feedforward term to account for gravity.

With NextControl, that would be implemented like this (using hypothetical constants):

::: tabs key:code

== Kotlin

```kotlin
controlSystem {
    posPid(0.1, 0.0, 0.0)
    elevatorFF(0.04)
}
```

== Java

```java
ControlSystem.builder()
             .posPid(0.1, 0.0, 0.0)
             .elevatorFF(0.04)
             .build();
```

:::

## What can I do with this?

If you're using a command-based framework, like NextFTC, 
you can create commands using your control system.
An example of a Linear Slides subsystem using NextControl can be found 
[here](../../guide/subsystems/lift.md).

If not, we can create OpModes that use our controllers directly. 
For example, let's say we wanted to change the target of our slides using a button press.
We can easily do that by simply changing the `goal` of our `ControlSystem`:

::: tabs key:code 

== Kotlin

```kotlin
class SlideExample() : OpMode() {
    val slideMotor by lazy { hardwareMap.get(DcMotorEx::class.java, "slides") }
    val controller = controlSystem {
        posPid(0.1, 0.0, 0.0)
        elevatorFF(0.04)
    }

    override fun init() {
        controller.goal = KineticState(0.0)
    }

    override fun loop() {
        if (gamepad1.a) {
            controller.goal = KineticState(1000.0)
        } else if (gamepad1.b) {
            controller.goal = KineticState(0.0)
        } else if (gamepad1.x) {
            controller.goal = KineticState(500.0)
        }

        slideMotor.power = controller.calculate(KineticState(
            slideMotor.currentPosition.toDouble(),
            slideMotor.velocity
        ))
    }
}
```

== Java

```java 
public class SlideExample extends OpMode {
    private DcMotorEx slideMotor;
    private ControlSystem controller;

    @Override
    public void init() {
        slideMotor = hardwareMap.get(DcMotorEx.class, "slides");
        
        controller = ControlSystem.builder()
             .posPid(0.1, 0.0, 0.0)
             .elevatorFF(0.04)
             .build();
        
        controller.setGoal(new KineticState(0));
    }

    @Override
    public void loop() {
        if (gamepad1.a) {
            controller.setGoal(new KineticState(1000.0));
        } else if (gamepad1.b) {
            controller.setGoal(new KineticState(0.0));
        } else if (gamepad1.x) {
            controller.setGoal(new KineticState(500.0));
        }

        slideMotor.setPower(controller.calculate(new KineticState(
                slideMotor.getCurrentPosition(), 
                slideMotor.getVelocity()))
        );    
    }
}
```

