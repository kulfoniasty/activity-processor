package tk.musial.activityprocessor.indoorcycling;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import java.io.InputStream;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.core.JsonParseException;

class IndoorCyclingHeartRateSamplesLoaderTest {

  @Test
  void failsToLoadInvalidJson() {
              var jsonResource =
                  this.getClass().getResourceAsStream("samples.invalid.json");
    assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(
            () -> {
                var loader = new IndoorCyclingHeartRateSamplesLoader(jsonResource);
                loader.load();
            })
      .withCauseInstanceOf(JsonParseException.class);
  }
}
