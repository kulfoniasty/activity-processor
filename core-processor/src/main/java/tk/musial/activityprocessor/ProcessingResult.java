package tk.musial.activityprocessor;

import java.util.List;

public record ProcessingResult(
    String userId,
    ActivityType activityType,
    String deviceName,
    int maxHeartRateInBeatsPerMinute,
    long durationInSeconds,
    List<LapResult> laps) {

  public record LapResult(
      String startTimeInSeconds,
      long totalDistanceInMeters,
      long timerDurationInSeconds,
      HartRateResult[] samples) {}

  public record HartRateResult(long index, int heartRate) {}
}
