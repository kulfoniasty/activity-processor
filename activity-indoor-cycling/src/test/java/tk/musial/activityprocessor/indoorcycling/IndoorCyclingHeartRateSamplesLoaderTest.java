package tk.musial.activityprocessor.indoorcycling;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.core.JsonParseException;
import java.io.InputStream;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

class IndoorCyclingHeartRateSamplesLoaderTest {

  @Test
  void failsToLoadInvalidJson() {
    Assertions.assertThatExceptionOfType(JsonParseException.class)
        .isThrownBy(
            () -> {
              InputStream jsonResource =
                  this.getClass().getResourceAsStream("samples.invalid.json");
              new IndoorCyclingHeartRateSamplesLoader(jsonResource).load();
            });
  }
}
