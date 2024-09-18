# activity-processor

This very small library is capable of loading several data sets and prepare a summary of it

## Installing

In order to test locally in another project `npm link ../activity-processor-directory` can be used.

Of course if we go public and publish to `npm` it would be enough to do simple `npm install the-best-activity-processor`.

## Usage

```
const activityProcessor = require('./index.js');

const processor = activityProcessor();

const result = processor.loadSummary(summary)
    .loadSamples(samples)
    .loadLaps(laps)
    .process();
```

## Code coverage

In order to be able to use `nyc` code coverage easily without too much effort in setting up the project I decided to downgrade from
esmodule to normal CommonJS module.

Coverage report is accessible after `npm test` run under `build/coverage/index.html`

## Code formatting

For consistency across the codebase `prettier` formatter is added to the project and can be executed through `npm run format`.