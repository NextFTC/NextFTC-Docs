# Examples

This section contains some examples on creating and using NextControl `ControlSystem`s.

::: tabs key:code

== Kotlin

```kotlin
/**
 * Basic Example: Simple position PID controller
 *
 * This example demonstrates how to create a basic position PID controller
 * for a simple system like a motor.
 */
fun basicPositionPIDExample() {
    // Create a simple position PID controller with kP=0.5
    val controller = ControlSystem.builder()
        .posPid(0.5) // Only using proportional control
        .build()

    // Set the goal position to 100
    controller.goal = KineticState(position = 100.0)

    // In a loop (simulated here), you would:
    val currentPosition = 50.0 // This would come from a sensor
    val power = controller.calculate(KineticState(position = currentPosition))

    // Apply power to your motor
    println("Power to apply: $power")

    // Check if we've reached the goal
    val withinTolerance = controller.isWithinTolerance(KineticState(position = 2.0))
    println("Within tolerance: $withinTolerance")
}

/**
 * Intermediate Example: Velocity control with feedforward
 *
 * This example demonstrates a velocity controller with PID feedback
 * and basic feedforward for better performance.
 */
fun velocityControlWithFeedforwardExample() {
    // Create a velocity controller with PID and feedforward
    val controller = ControlSystem.builder()
        .velPid(kP = 0.1, kI = 0.01, kD = 0.05) // Velocity PID
        .basicFF(kV = 0.02, kS = 0.01) // Basic feedforward with velocity and static friction compensation
        .build()

    // Set the goal velocity to 500 units per second
    controller.goal = KineticState(velocity = 500.0)

    // In a loop (simulated here), you would:
    val currentState = KineticState(
        position = 1000.0, // Current position
        velocity = 450.0   // Current velocity
    )

    val power = controller.calculate(currentState)

    // Apply power to your motor
    println("Power to apply: $power")
}

/**
 * Advanced Example: Elevator control with gravity compensation
 *
 * This example demonstrates a more complex control system for an elevator
 * with gravity compensation, filtering, and smooth interpolation.
 */
fun elevatorControlExample() {
    // Create an elevator controller with position PID, gravity compensation, filtering, and interpolation
    val controller = controlSystem {
        // Position PID with higher derivative gain to prevent oscillation
        posPid(kP = 0.8, kI = 0.0, kD = 0.2)

        // Elevator feedforward with gravity compensation
        elevatorFF(kG = 0.05, kV = 0.01, kA = 0.002, kS = 0.01)

        // Low-pass filter for position measurements to reduce noise
        posFilter { lowPass(alpha = 0.2) }
    }

    // Set the goal position for the elevator
    controller.goal = KineticState(position = 1500.0)

    // In a loop (simulated here), you would:
    val currentState = KineticState(
        position = 1200.0,  // Current position
        velocity = 100.0    // Current velocity
    )

    val power = controller.calculate(currentState)

    // Apply power to your elevator motor
    println("Power to apply: $power")

    // Check if we've reached the goal with tight tolerance
    val tolerance = KineticState(position = 5.0, velocity = 10.0)
    val withinTolerance = controller.isWithinTolerance(tolerance)
    println("Within tolerance: $withinTolerance")
}

/**
 * Expert Example: Arm control with angle wrapping and custom components
 *
 * This example demonstrates a sophisticated control system for a robot arm
 * with angle wrapping, custom filters, and complex motion profiles.
 */
fun robotArmControlExample() {
    // Create a sophisticated arm controller
    val controller = controlSystem {
        // Angular PID for position control with angle wrapping (in radians)
        angular(AngleType.RADIANS) {
            posPid(kP = 1.2, kI = 0.05, kD = 0.3)
        }

        // Arm feedforward with gravity compensation
        armFF(kG = 0.12, kV = 0.02, kA = 0.005, kS = 0.03)

        // adding multiple filters chains them together
        posFilter {
            lowPass(alpha = 0.3)
            lowPass(alpha = 0.5)
        }

        velFilter {
            lowPass(alpha = 0.2)
        }
        
        // EMA interpolator for smooth motion
        emaInterpolator(FirstOrderEMAParameters(
            alpha = 0.2,
            startingReference =  KineticState(
                position = 0.0,
                velocity = 0.0,
                acceleration = 0.0
            )
        ))
    }

    // Set the goal position in radians
    controller.goal = KineticState(position = Math.PI / 2) // 90 degrees

    // In a loop (simulated here), you would:
    val currentState = KineticState(
        position = Math.PI / 4,  // Current position (45 degrees)
        velocity = 0.1           // Current velocity
    )

    val power = controller.calculate(currentState)

    // Apply power to your arm motor
    println("Power to apply: $power")

    // Reset the controller if needed (e.g., after an emergency stop)
    controller.reset()
}
```

== Java

```java 
/**
     * Basic Example: Simple position PID controller
     * <p>
     * This example demonstrates how to create a basic position PID controller
     * for a simple system like a motor.
     */
    public static void basicPositionPIDExample() {
        // Create a simple position PID controller with kP=0.5
        ControlSystem controller = ControlSystem.builder()
                .posPid(0.5) // Only using proportional control
                .build();

        // Set the goal position to 100
        controller.setGoal(new KineticState(100.0, 0.0, 0.0));

        // In a loop (simulated here), you would:
        double currentPosition = 50.0; // This would come from a sensor
        double power = controller.calculate(new KineticState(currentPosition, 0.0, 0.0));

        // Apply power to your motor
        System.out.println("Power to apply: " + power);

        // Check if we've reached the goal
        boolean withinTolerance = controller.isWithinTolerance(new KineticState(2.0, 0.0, 0.0));
        System.out.println("Within tolerance: " + withinTolerance);
    }

    /**
     * Intermediate Example: Velocity control with feedforward
     * <p>
     * This example demonstrates a velocity controller with PID feedback
     * and basic feedforward for better performance.
     */
    public static void velocityControlWithFeedforwardExample() {
        // Create a velocity controller with PID and feedforward
        ControlSystem controller = ControlSystem.builder()
                .velPid(0.1, 0.01, 0.05) // Velocity PID with kP=0.1, kI=0.01, kD=0.05
                .basicFF(0.02, 0.0, 0.01) // Basic feedforward with kV=0.02, kA=0.0, kS=0.01
                .build();

        // Set the goal velocity to 500 units per second
        controller.setGoal(new KineticState(0.0, 500.0, 0.0));

        // In a loop (simulated here), you would:
        // Create a KineticState with current position and velocity
        KineticState currentState = new KineticState(1000.0, 450.0, 0.0);

        double power = controller.calculate(currentState);

        // Apply power to your motor
        System.out.println("Power to apply: " + power);
    }

    /**
     * Advanced Example: Elevator control with gravity compensation.
     * <p>
     * This example demonstrates a more complex control system for an elevator
     * with gravity compensation, filtering, and smooth interpolation.
     */
    public static void elevatorControlExample() {
        // Create an elevator controller with position PID, gravity compensation, and filtering
        ControlSystem controller = ControlSystem.builder()
                // Position PID with higher derivative gain to prevent oscillation
                .posPid(0.8, 0.0, 0.2)
                // Elevator feedforward with gravity compensation
                .elevatorFF(0.05, 0.01, 0.002, 0.01)
                // Low-pass filter for position measurements to reduce noise
                .posFilter(filterBuilder -> filterBuilder.lowPass(0.2))
                .build();


        // Set the goal position for the elevator
        controller.setGoal(new KineticState(1500.0, 0.0, 0.0));

        // In a loop (simulated here), you would:
        KineticState currentState = new KineticState(1200.0, 100.0, 0.0);

        double power = controller.calculate(currentState);

        // Apply power to your elevator motor
        System.out.println("Power to apply: " + power);

        // Check if we've reached the goal with tight tolerance
        KineticState tolerance = new KineticState(5.0, 10.0, 0.0);
        boolean withinTolerance = controller.isWithinTolerance(tolerance);
        System.out.println("Within tolerance: " + withinTolerance);
    }

    /**
     * Expert Example: Arm control with angle wrapping and custom components
     * <p>
     * This example demonstrates a sophisticated control system for a robot arm
     * with angle wrapping, custom filters, and complex motion profiles.
     */
    public static void robotArmControlExample() {
        // Create a sophisticated arm controller
        ControlSystemBuilder builder = ControlSystem.builder();

        // Angular PID for position control with angle wrapping (in radians)
        builder.angular(AngleType.RADIANS, feedbackBuilder -> feedbackBuilder.posPid(1.2, 0.05, 0.3));

        // Arm feedforward with gravity compensation
        builder.armFF(0.12, 0.02, 0.005, 0.03); // kG=0.12, kV=0.02, kA=0.005, kS=0.03

        // Chained filters for better noise reduction
        builder.posFilter(filterBuilder ->
                filterBuilder.lowPass(0.3)
                    .lowPass(0.5)
        );

        builder.velFilter(filterBuilder -> filterBuilder.lowPass(0.2));

        // Custom interpolator for smooth motion
        FirstOrderEMAParameters emaParams = new FirstOrderEMAParameters(0.2, new KineticState());
        builder.emaInterpolator(emaParams);

        ControlSystem controller = builder.build();

        // Set the goal position in radians
        controller.setGoal(new KineticState(Math.PI / 2, 0.0, 0.0)); // 90 degrees

        // In a loop (simulated here), you would:
        KineticState currentState = new KineticState(Math.PI / 4, 0.1, 0.0); // 45 degrees

        double power = controller.calculate(currentState);

        // Apply power to your arm motor
        System.out.println("Power to apply: " + power);

        // Reset the controller if needed (e.g., after an emergency stop)
        // controller.reset();
    }
```

:::