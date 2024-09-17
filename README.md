# activity-processor

This very small library is capable of loading several data sets and prepare a summary of it

## Usage

```
const activityProcessor = require('./index.js');

const processor = activityProcessor();

const result = processor.loadSummary(summary)
    .loadSamples(samples)
    .loadLaps(laps)
    .process();
```
