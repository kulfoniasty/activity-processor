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
        expect(e).toEqual(new Error("invalid summary"));
        done();
      }
    });

    it("WHEN invoked without summary parameter THEN error is thrown", (done) => {
      try {
        processor.loadSummary();
        done.fail("validation error expected");
      } catch (e) {
        expect(e).toEqual(new Error("invalid summary"));
        done();
      }
    });

    it("WHEN invoked with INDOOR_CYCLING summary it succeeds", () => {
      processor.loadSummary({ ...summary });
    });
  });
});
