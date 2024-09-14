package tk.musial.activityprocessor.indoorcycling;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class IndoorCyclingHeartRateSamplesLoaderTest {


    @Test
    void failsToLoadInvalidJson() {

        new IndoorCyclingHeartRateSamplesLoader(this.getClass().getResourceAsStream("samples.invalid.json"));
    }
}