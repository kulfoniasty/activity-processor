export default function activityProcessor() {
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
    loadSamples: () => {
      return actions;
    },
    process,
  };

  return actions;
}
