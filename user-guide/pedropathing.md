# PedroPathing

If you're using [Pedro Pathing](https://pedropathing.com/), an Advanced Reactive Vector Follower developed by FTC Team 10158, NextFTC has a simple integration of this path following system in your autonomous programs. It's recommended that you first read and implement the [Autonomous](/user-guide/opmodes/autonomous) page into your code, before referring to this page. 

This guide will show you how to use the basic following features of Pedro Pathing, using its follower, with the core features of NextFTC such as command groups and delays.

Let's begin!

## Step 1: Create your class

On the autonomous page, your OpMode extended the class `NextFTCOpMode`. Here, we're going to change it to extend the `PedroOpMode`. 

We'll assume you know how to instantiate your subsystems, in this case, our claw and our lift.

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "NextFTC Autonomous Program 2 Kotlin")
class AutonomousProgram: PedroOpMode(Claw, Lift) {
}
```

== Java

```java
@Autonomous(name = "NextFTC Autonomous Program 2 Java")
public class AutonomousProgram extends PedroOpMode {
    public AutonomousProgram() {
        super(Claw.INSTANCE, Lift.INSTANCE);
    }
}
```

:::

## Step 2: Defining your PedroPathing Paths

We'll assume that you're following an autonomous similar to the PedroPathing Example Auto, so you should have two poses and one `PathChain` that's already been built in a `buildPaths()` function. Place your poses right below where you instantiate your subsystems, then place your paths below that. It should look like this:

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "NextFTC Autonomous Program 2 Kotlin")
class AutonomousProgram: PedroOpMode(Claw, Lift) {
    private val startPose = Pose(9.0, 60.0, Math.toRadians(0.0))
    private val finishPose = Pose(37.0, 50.0, Math.toRadians(180.0))

    private lateinit var move: PathChain

    fun buildPaths() {
        move = follower.pathBuilder()
            .addPath(BezierLine(Point(startPose), Point(finishPose)))
            .setLinearHeadingInterpolation(startPose.heading, finishPose.heading)
            .build()
    }
}
```

== Java

```java
@Autonomous(name = "NextFTC Autonomous Program 2 Java")
public class AutonomousProgram extends PedroOpMode {
    public AutonomousProgram() {
        super(Claw.INSTANCE, Lift.INSTANCE);
    }

    private final Pose startPose = new Pose(9.0, 60.0, Math.toRadians(0.0));
    private final Pose finishPose = new Pose(37.0, 50.0, Math.toRadians(180.0));

    private PathChain move;

    public void buildPaths() {
        move = follower.pathBuilder()
                .addPath(new BezierLine(new Point(startPose), new Point(finishPose)))
                .setLinearHeadingInterpolation(startPose.getHeading(), finishPose.getHeading())
                .build();
    }
}
```

:::

> [!CAUTION]
> If you are using the Example Auto from the PedroPathing website, DO NOT declare `private Follower follower;`. If you do, your autonomous will most likely not run or you will get a `FollowerNotInitializedException`.
> 
> The reason is that you will create your follower in the `onInit()` function, which is shown below, so there's no need to declare it at the beginning of your program. 
> 
> It is also recommended that you don't use any of the timers, as there is no essential need for them in the `PedroOpMode`.

## Step 3: Constructing your Path Following Routine

Now, to actually run your paths as part of your routine, it's very straightforward! We're going to take our previous routine and create a new one, this time with path following. The routine will:

1. _Simultaneously_ move your robot forward and raise the lift to the high position
2. _Simultaneously_ open the claw and move the lift to the middle position
3. Wait for a second
4. Move the lift to the low position

We're going to start by creating a new routine:

:::tabs key:code

== Kotlin

```kotlin
val secondRoutine: Command
```

== Java

```java
public Command secondRoutine() {
}
```

:::

We will then create our main `SequentialGroup`. Since the first step of our routine is to _simultaneously_ move the robot and move the lift to the high position, we'll also create a `ParallelGroup` that does this. 

In order to actually have our robot follow a path, we can use the `FollowPath` command to tell our follower to follow a specific path or path chain.

In this case, we will use our path chain we defined before, called `move`. 

:::tabs key:code

== Kotlin

```kotlin
val secondRoutine: Command
    get() = SequentialGroup(
        ParallelGroup(
            FollowPath(move),
            Lift.toHigh
        )
    )
```

== Java

```java
public Command secondRoutine() {
    return new SequentialGroup(
        new ParallelGroup(
            new FollowPath(move),
            Lift.INSTANCE.toHigh()
        )
    );
}
```

:::

For the second step, to _simultaneously_ open the claw and move the lift to the middle position, we will simply create another `ParallelGroup` that does this

:::tabs key:code

== Kotlin

```kotlin
val secondRoutine: Command
    get() = SequentialGroup(
        ParallelGroup(
            FollowPath(move),
            Lift.toHigh
        ),
        ParallelGroup(
            Claw.open,
            Lift.toMiddle
        )
    )
```

== Java

```java
public Command secondRoutine() {
    return new SequentialGroup(
        new ParallelGroup(
            new FollowPath(move),
            Lift.INSTANCE.toHigh()
        ),
        new ParallelGroup(
            Claw.INSTANCE.open(),
            Lift.INSTANCE.toMiddle()
        )
    );
}
```

:::

And finally, our last two steps of our routine are adding a delay for a second, and then moving our lift to the low position. 

:::tabs key:code

== Kotlin

```kotlin
val secondRoutine: Command
    get() = SequentialGroup(
        ParallelGroup(
            FollowPath(move),
            Lift.toHigh
        ),
        ParallelGroup(
            Claw.open,
            Lift.toMiddle
        ),
        Delay(1.0),
        Lift.toLow
    )
```

== Java

```java
public Command secondRoutine() {
    return new SequentialGroup(
        new ParallelGroup(
            new FollowPath(move),
            Lift.INSTANCE.toHigh()
        ),
        new ParallelGroup(
            Claw.INSTANCE.open(),
            Lift.INSTANCE.toMiddle()
        ),
        new Delay(1.0),
        Lift.INSTANCE.toLow()
    );
}
```

:::

## Step 4: Running your PedroPathing routine

Now that we've completed our routine, we just have to add a few more things to run it. Firstly, you'll want to make sure you're doing these four things on initialization, in order for PedroPathing to have everything it needs to run properly. 

1. Set your Constants
2. Instantiate your follower
3. Set your follower's starting pose
4. Build your paths, if you have a `buildPaths()` function like I do

To do this, we will override the `onInit()` function.

:::tabs key:code

== Kotlin

```kotlin
override fun onInit() {
    Constants.setConstants(FConstants::class.java, LConstants::class.java)
    follower = Follower(hardwareMap)
    follower.setStartingPose(new Pose(0, 0, 0))
    buildPaths()
}
```

== Java

```java
@Override
public void onInit() {
    Constants.setConstants(FConstants.class, LConstants.class);
    follower = new Follower(hardwareMap);
    follower.setStartingPose(new Pose(0, 0, 0));
    buildPaths();
}
```

:::

> [!CAUTION]
> If you are using the Example Auto from the PedroPathing website, there is no need to include any of the other methods or timers that they use, which are not shown in this guide.
> 
> Especially make sure that you ARE NOT calling the `follower.update();` function. This is not required, because by default, the PedroOpMode will update the follower. 

Finally, we can run our routine by overriding the `onStartButtonPressed()` function. 

:::tabs key:code

== Kotlin

```kotlin
override fun onStartButtonPressed() {
    secondRoutine()
}
```

== Java

```java
@Override
public void onStartButtonPressed() {
    secondRoutine().invoke();
}
```

:::

## Final Result

That's everything! This completes the integration of Pedro Pathing with NextFTC in your autonomous program. Hopefully, you can also use what you've learned from this guide to create more complex routines, combining path following with other robot actions. 

Here is the final result:

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "NextFTC Autonomous Program 2 Kotlin")
class AutonomousProgram: PedroOpMode(Claw, Lift) {
    private val startPose = Pose(9.0, 60.0, Math.toRadians(0.0))
    private val finishPose = Pose(37.0, 50.0, Math.toRadians(180.0))

    private lateinit var move: PathChain

    fun buildPaths() {
        move = follower.pathBuilder()
            .addPath(BezierLine(Point(startPose), Point(finishPose)))
            .setLinearHeadingInterpolation(startPose.heading, finishPose.heading)
            .build()
    }

    val secondRoutine: Command
        get() = SequentialGroup(
            ParallelGroup(
                FollowPath(move),
                Lift.toHigh
            ),
            ParallelGroup(
                Claw.open,
                Lift.toMiddle
            ),
            Delay(1.0),
            Lift.toLow
        )

    override fun onInit() {
        Constants.setConstants(FConstants::class.java, LConstants::class.java)
        follower = Follower(hardwareMap)
        follower.setStartingPose(new Pose(0, 0, 0))
        buildPaths()
    }

    override fun onStartButtonPressed() {
        secondRoutine()
    }
}
```

== Java

```java
@Autonomous(name = "NextFTC Autonomous Program 2 Java")
public class AutonomousProgram extends PedroOpMode {
    public AutonomousProgram() {
        super(Claw.INSTANCE, Lift.INSTANCE);
    }

    private final Pose startPose = new Pose(9.0, 60.0, Math.toRadians(0.0));
    private final Pose finishPose = new Pose(37.0, 50.0, Math.toRadians(180.0));

    private PathChain move;

    public void buildPaths() {
        move = follower.pathBuilder()
                .addPath(new BezierLine(new Point(startPose), new Point(finishPose)))
                .setLinearHeadingInterpolation(startPose.getHeading(), finishPose.getHeading())
                .build();
    }

    public Command secondRoutine() {
        return new SequentialGroup(
            new ParallelGroup(
                new FollowPath(move),
                Lift.INSTANCE.toHigh()
            ),
            new ParallelGroup(
                Claw.INSTANCE.open(),
                Lift.INSTANCE.toMiddle()
            ),
            new Delay(1.0),
            Lift.INSTANCE.toLow()
        );
    }

    @Override
    public void onInit() {
        Constants.setConstants(FConstants.class, LConstants.class);
        follower = new Follower(hardwareMap);
        follower.setStartingPose(new Pose(0, 0, 0));
        buildPaths();
    }

    @Override
    public void onStartButtonPressed() {
        secondRoutine().invoke();
    }
}
```

:::