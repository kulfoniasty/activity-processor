const activityProcessor = require("../../lib/processor.js");
const { summary } = require("./summary.fixtures.js");
const { samples } = require("./sample.fixtures.js");
const { laps } = require("./lap.fixtures.js");
const { processingResult: expectedResult } = require("./result.fixtures.js");

describe("GIVEN processor", () => {
  let processor;

  beforeEach(() => {
    processor = activityProcessor();
  });

  describe("AND loadSummary method", () => {
    it("WHEN invoked with activityType different than INDOOR_CYCLING THEN error is thrown", (done) => {
      try {
        processor.loadSummary({ ...summary, activityType: "SNORKLING" });
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("invalid summary"));
        done();
      }
    });

    it("WHEN invoked without summary parameter THEN error is thrown", (done) => {
      try {
        processor.loadSummary();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("missing summary"));
        done();
      }
    });

    it("WHEN invoked with INDOOR_CYCLING summary it succeeds", () => {
      processor.loadSummary({ ...summary });
    });
  });

  describe("AND loadSamples method", () => {
    it("WHEN invoked with empty array THEN error is thrown", (done) => {
      try {
        processor.loadSamples([]);
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("empty samples"));
        done();
      }
    });

    it("WHEN invoked without samples at all THEN error is thrown", (done) => {
      try {
        processor.loadSamples();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("missing samples"));
        done();
      }
    });

    it("WHEN invoked with proper samples it succeeds", () => {
      processor.loadSamples([...samples]);
    });
  });

  describe("AND loadLaps method", () => {
    it("WHEN invoked without laps at all THEN error is thrown", (done) => {
      try {
        processor.loadLaps();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("missing laps"));
        done();
      }
    });

    it("WHEN invoked with empty array THEN error is thrown", (done) => {
      try {
        processor.loadLaps([]);
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("empty laps"));
        done();
      }
    });

    it("WHEN invoked with proper laps it succeeds", () => {
      processor.loadLaps([...laps]);
    });
  });

  describe("AND process method", () => {
    it("WHEN invoked without initializing summary THEN error is thrown", (done) => {
      try {
        processor
          .loadSamples([...samples])
          .loadLaps([...laps])
          .process();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(
          new Error("provide all three: samples, laps and summary"),
        );
        done();
      }
    });

    it("WHEN invoked without initializing laps THEN error is thrown", (done) => {
      try {
        processor
          .loadSamples([...samples])
          .loadSummary({ ...summary })
          .process();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(
          new Error("provide all three: samples, laps and summary"),
        );
        done();
      }
    });

    it("WHEN invoked without initializing samples THEN error is thrown", (done) => {
      try {
        processor
          .loadLaps([...laps])
          .loadSummary({ ...summary })
          .process();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(
          new Error("provide all three: samples, laps and summary"),
        );
        done();
      }
    });

    describe("WHEN invoked with all inputs set", () => {
      let processingResult;
      beforeEach(() => {
        processingResult = processor
          .loadSamples([...samples])
          .loadLaps([...laps])
          .loadSummary({ ...summary })
          .process();
      });

      it("THEN activityOverview is present", () => {
        expect(processingResult.activityOverview).toEqual(
          jasmine.objectContaining({
            userId: summary.userId,
            type: summary.activityType,
            device: summary.deviceName,
            duration: summary.durationInSeconds,
            maxHeartRate: summary.maxHeartRateInBeatsPerMinute,
          }),
        );
      });

      it("THEN lap data for each lap is present", () => {
        expect(processingResult.lapsData).toEqual(
          laps.map((lap) =>
            jasmine.objectContaining({
              startTime: lap.startTimeInSeconds,
              distance: lap.totalDistanceInMeters,
              duration: lap.timerDurationInSeconds,
            }),
          ),
        );
      });

      it("THEN heart data for each lap is present", () => {
        const heartRateSamples = samples
          .filter(isHeartRateSample)
          .reduce((accumulator, value, index) => {
            const lapNumber = Math.floor(index / 2);
            accumulator[lapNumber] = accumulator[lapNumber] || [];
            accumulator[lapNumber].push(value);
            return accumulator;
          }, {});

        expect(processingResult.lapsData).toEqual(
          laps.map((lap, index) =>
            jasmine.objectContaining({
              heartRateSamples: heartRateSamples[index]
                .flatMap(({ data }) => data.split(","))
                .map((heartRate, sampleIndex) => ({
                  sampleIndex,
                  heartRate: heartRate !== "null" ? parseInt(heartRate) : null,
                })),
            }),
          ),
        );
      });

      it("THEN it matches the manually created expected result", () => {
        expect(processingResult).toEqual(
          jasmine.objectContaining(expectedResult),
        );
      });

      function isHeartRateSample(sample) {
        return sample["sample-type"] == "2";
      }
    });
  });
});
