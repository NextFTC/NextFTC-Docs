# Flywheel Example

Flywheels are a commonly used mechanism in FTC for launching game elements, 
and most often controlled with a velocity PID feedback controller.

With NextControl, that would be implemented like this (using hypothetical constants):

::: tabs key:code

== Kotlin

```kotlin
controlSystem {
    velPid(0.001, 0.0, 0.0)
}
```

== Java

```java
ControlSystem.builder()
             .velPid(0.001, 0.0, 0.0)
             .build();
```

:::

## What can I do with this?

If you're using a command-based framework, like NextFTC, 
you can create commands using your control system.

If not, we can create OpModes that use our controllers directly. 
For example, let's say we wanted to change the target velocity of our flywheel using a button press.
We can easily do that by simply changing the `goal` of our `ControlSystem`:

::: tabs key:code 

== Kotlin

```kotlin
class FlywheelExample() : OpMode() {
    val flywheelMotor by lazy { hardwareMap.get(DcMotorEx::class.java, "flywheel") }
    val controller = controlSystem {
        velPid(0.001, 0.0, 0.0)
    }

    override fun init() {
        controller.goal = KineticState(0.0)
    }

    override fun loop() {
        if (gamepad1.aWasPressed()) {
            controller.goal = KineticState(0.0, 2000.0)
        } else if (gamepad1.bWasPressed()) {
            controller.goal = KineticState(0.0, 0.0)
        } else if (gamepad1.xWasPressed()) {
            controller.goal = KineticState(0.0, 1000.0)
        }

        flywheelMotor.power = controller.calculate(KineticState(
             flywheelMotor.currentPosition.toDouble(),
             flywheelMotor.velocity
        ))
    }
}
```

== Java

```java 
public class FlywheelExample extends OpMode {
    private DcMotorEx flywheelMotor;
    private ControlSystem controller;

    @Override
    public void init() {
        flywheelMotor = hardwareMap.get(DcMotorEx.class, "flywheel");
        
        controller = ControlSystem.builder()
             .velPid(0.001, 0.0, 0.0)
             .build();
        
        controller.setGoal(new KineticState(0.0));
    }

    @Override
    public void loop() {
        if (gamepad1.aWasPressed()) {
            controller.setGoal(new KineticState(2000.0));
        } else if (gamepad1.bWasPressed()) {
            controller.setGoal(new KineticState(0.0));
        } else if (gamepad1.xWasPressed()) {
            controller.setGoal(new KineticState(1000.0));
        }

        flywheelMotor.setPower(controller.calculate(new KineticState(
                flywheelMotor.getCurrentPosition(), 
                flywheelMotor.getVelocity()))
        );    
    }
}
```

:::

