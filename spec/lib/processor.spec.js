import activityProcessor from "../../lib/processor.js";
import { summary } from "./summary.fixtures.js";

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
        done();
      }
    });
  });

  it("empty test", () => {
    processor.loadSummary({}).loadLaps({});
  });
});
