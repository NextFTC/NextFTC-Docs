# Pedro Example Auto

To get your PedroPathing journey started with NextFTC, here is an `example` autonomous composed with next ftc, involving `subsystems` as well.

This code starting in the `far` launch zone for autonomous, steps a few inches forward to shoot, then advancing to the leave point away from the wall.

:::tabs key:code

== Kotlin

```kotlin
@Autonomous(name = "PedroExample")
class PedroExample: NextFTCOpMode() {
    init {
        addComponents(
            SubsystemComponent(Flywheel, ShooterAngle),
            BulkReadComponent,
            PedroComponent(Constants::createFollower)
        )
    }

    private val startPose = Pose(56.0, 7.5, Math.toRadians(90.0))
    private val shootPose = Pose(56.0, 10.5, Math.toRadians(90.0))
    private val leavePoint = Pose(36.49, 8.20, Math.toRadians(90.0))

    private lateinit var leave: PathChain
    private lateinit var shoot: PathChain

    private fun buildPaths() {
        shoot = follower.pathBuilder()
            .addPath(BezierLine(startPose,shootPose))
            .setLinearHeadingInterpolation(startPose.heading, shootPose.heading)
            .build()
        Leave = follower.pathBuilder()
            .addPath(BezierLine(startPose,leavePoint))
            .setLinearHeadingInterpolation(startPose.heading, leavePoint.heading)
            .setLinearHeadingInterpolation(shootPose.heading, leavePoint.heading)
            .build()
    }

    val autoRoutine: Command
        get() =
            SequentialGroup(
                ParallelGroup(
                   Flywheel.goTo(3000.0),
                   ShooterAngle.angle_up,
                    FollowPath(shoot)

                ),
                Delay(2.0.seconds),
                ParallelGroup(
                    Flywheel.goTo(0.0),
                    ShooterAngle.angle_down,
                ),  
                    FollowPath(leave)            
                )

    override fun onInit() {
        follower.setMaxPower(1.0)
    }

    override fun onStartButtonPressed() {
        follower.setStartingPose(startPose)
        buildPaths()
        autoRoutine()
    }
```

== Java

```java
@Autonomous(name = "PedroExample")
public class PedroExample extends NextFTCOpMode {
    private final Pose2d startPose = new Pose2d(56.0, 7.5, Math.toRadians(90.0));
    private final Pose2d shootPose = new Pose2d(56.0, 10.5, Math.toRadians(90.0));
    private final Pose2d leavePoint = new Pose2d(36.49, 8.20, Math.toRadians(90.0));

    private PathChain leave;
    private PathChain shoot;

    public PedroExample() {
        addComponents(
            new SubsystemComponent(Flywheel, ShooterAngle),
            BulkReadComponent,
            new PedroComponent(Constants::createFollower)
        );
    }

    private void buildPaths() {
        shoot = follower.pathBuilder()
            .addPath(new BezierLine(startPose, shootPose))
            .setLinearHeadingInterpolation(startPose.getHeading(), shootPose.getHeading())
            .build();

        Leave = follower.pathBuilder()
            .addPath(new BezierLine(startPose, leavePoint))
            .setLinearHeadingInterpolation(startPose.getHeading(), leavePoint.getHeading())
            .setLinearHeadingInterpolation(shootPose.getHeading(), leavePoint.getHeading())
            .build();
    }

    private Command autoRoutine() {
        return new SequentialGroup(
            new ParallelGroup(
                Flywheel.goTo(3000.0),
                ShooterAngle.angle_up,
                new FollowPath(shoot)
            ),
            new Delay(Duration.ofSeconds(2)),
            new ParallelGroup(
                Flywheel.goTo(0.0),
                ShooterAngle.angle_down
            ),
            new FollowPath(leave)
        );
    }

    @Override
    public void onInit() {
        follower.setMaxPower(1.0);
    }

    @Override
    public void onStartButtonPressed() {
        follower.setStartingPose(startPose);
        buildPaths();
        autoRoutine().schedule();
    }
}
```

:::
