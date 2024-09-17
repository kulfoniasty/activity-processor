module.exports = function activityProcessor() {
  const process = () => {};

  const actions = {
    loadSummary: (summary) => {
      if (!summary) {
        throw new Error("missing summary");
      }
      if (summary.activityType !== "INDOOR_CYCLING") {
        throw new Error("invalid summary");
      }

      return actions;
    },
    loadLaps: () => {
      return actions;
    },
    loadSamples: (samples) => {
      if (!samples) {
        throw new Error("missing samples");
      }
      if (!samples.length) {
        throw new Error("empty samples");
      }
      if (samples.length % 2 === 1) {
        throw new Error("expected even number of samples");
      }
      return actions;
    },
    process,
  };

  return actions;
};
