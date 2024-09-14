package tk.musial.activityprocessor;

import java.io.OutputStream;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ProcessingJob {

  private final Summary summary;
  private final List<Lap> laps;
  private final List<Sample> samples;

  public static Builder builder() {
    return new Builder();
  }

  public OutputStream execute() {
    return null;
  }

  public static final class Builder {

    public Builder withSummary(SummaryLoader summaryLoader) {
      return this;
    }

    public Builder withLaps(LapsLoader lapsLoader) {
      return this;
    }

    public Builder withSamples(SamplesLoader samplesLoader) {
      return this;
    }
  }
}
