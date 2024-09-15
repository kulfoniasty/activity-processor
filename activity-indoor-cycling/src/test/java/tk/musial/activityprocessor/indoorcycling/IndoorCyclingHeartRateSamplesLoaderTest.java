package tk.musial.activityprocessor.indoorcycling;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.ByteArrayInputStream;
import org.junit.jupiter.api.Test;

class IndoorCyclingHeartRateSamplesLoaderTest {

  @Test
  void failsToLoadInvalidJson() {
    var jsonResource = this.getClass().getResourceAsStream("samples.invalid.json");
    assertThatExceptionOfType(RuntimeException.class)
        .isThrownBy(
            () -> {
              var loader = new IndoorCyclingHeartRateSamplesLoader(jsonResource);
              loader.load();
            })
        .withCauseInstanceOf(JsonParseException.class);
  }

  @Test
  void failsIfNoSamples() {
    assertThatExceptionOfType(IllegalStateException.class)
        .isThrownBy(
            () -> {
              var loader = new IndoorCyclingHeartRateSamplesLoader(toInputStream("[]"));
              loader.load();
            })
        .withMessage("Samples are required");
  }

  private static ByteArrayInputStream toInputStream(String json) throws JsonProcessingException {
    return new ByteArrayInputStream(new ObjectMapper().writeValueAsBytes(json));
  }
}
