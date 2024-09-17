module.exports = function activityProcessor() {
  let inputs = {};
  const validate = () => {
    if (!inputs.summary || !inputs.laps || !inputs.samples) {
      throw new Error("provide all three: samples, laps and summary");
    }
  };
  const process = () => {
    validate();
    return {
      activityOverview: {
        userId: inputs.summary.userId,
        type: inputs.summary.activityType,
        device: inputs.summary.deviceName,
      },
    };
  };

  const actions = {
    loadSummary: (summary) => {
      if (!summary) {
        throw new Error("missing summary");
      }
      if (summary.activityType !== "INDOOR_CYCLING") {
        throw new Error("invalid summary");
      }
      inputs.summary = summary;
      return actions;
    },
    loadLaps: (laps) => {
      if (!laps) {
        throw new Error("missing laps");
      }
      if (!laps.length) {
        throw new Error("empty laps");
      }
      inputs.laps = laps;
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
      inputs.samples = samples;
      return actions;
    },
    process,
  };

  return actions;
};
