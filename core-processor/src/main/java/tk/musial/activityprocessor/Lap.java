package tk.musial.activityprocessor;

public record Lap(
    String startTimeInSeconds,
    double airTemperatureCelsius,
    int heartRate,
    long totalDistanceInMeters,
    long timerDurationInSeconds) {}
