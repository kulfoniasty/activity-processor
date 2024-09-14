package tk.musial.activityprocessor;

public record Summary(
    String userId,
    long activityId,
    String activityName,
    long durationInSeconds,
    long startTimeInSeconds,
    long startTimeOffsetInSeconds,
    ActivityType activityType,
    int averageHeartRateInBeatsPerMinute,
    int activeKilocalories,
    String deviceName,
    int maxHeartRateInBeatsPerMinute) {}
