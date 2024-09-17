const activityProcessor = require("../../lib/processor.js");
const { summary } = require("./summary.fixtures.js");
const { samples } = require("./sample.fixtures.js");

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

    it("WHEN invoked with samples array with odd length not appropriate for Indoor Cycling THEN error is thrown", (done) => {
      try {
        const oddSamples = [...samples].slice(1);
        processor.loadSamples(oddSamples);
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("expected even number of samples"));
        done();
      }
    });

    it("WHEN invoked with proper samples it succeeds", () => {
      processor.loadSamples([...samples]);
    });
  });
});
