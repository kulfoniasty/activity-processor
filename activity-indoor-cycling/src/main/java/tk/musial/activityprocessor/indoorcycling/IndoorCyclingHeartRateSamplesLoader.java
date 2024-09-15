package tk.musial.activityprocessor.indoorcycling;

import com.fasterxml.jackson.core.JsonParseException;
import java.io.InputStream;
import java.util.List;
import tk.musial.activityprocessor.SampleInLap;
import tk.musial.activityprocessor.SamplesLoader;

public class IndoorCyclingHeartRateSamplesLoader implements SamplesLoader {

  public IndoorCyclingHeartRateSamplesLoader(InputStream inputStream) {}

  @Override
  public List<SampleInLap> load() {
    throw new RuntimeException(new JsonParseException(null, "some"));
    //    return null;
  }
}
