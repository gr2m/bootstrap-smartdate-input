smartDate Input – a Bootstrap plugin
====================================

> A Bootstrap plugin that understands human date/time inputs & their format

Installation
------------

Install using [bower](http://bower.io/) for usage in browser:

```
bower install --save bootstrap-smartdate-input
```


Usage
-----

```js
var $input = $('input');

// initialize
$input.smartDate();

// set value to Date
$input.smartDate('set', new Date());

// set/change format
$input.smartDate('setFormat', 'dddd, MMMM Do, YYYY h:mma');

// also possible:
$input.smartDate({
  date: new Date(),
  format: 'dddd, MMMM Do, YYYY h:mma'
})

// listen to format changes
$input.on('change:format', function(event, newFormat) {
  // store newFormat as the user's preferred datetime format
});

// listen to changes of the parsed timestamp
$input.on('change:timestamp', function(event, timestamp) {
  // store the timestamp that was parsed from the raw date/time string
});

// per default, change:format & change:timestamp will be checked for
// and triggered on blur. This can be changed with the setEvent method
$input.smartDate('setEvent', 'input');
```

You can make the data input self-initializing by using the data-api.
The input will be initialized on first interaction.

```
<input data-smartdate-spy>
```

You can also set the default date format:

```
<input data-smartdate-spy data-format="MMM Do, YYYY">
```

Or the event when it shall check for & trigger `change:format`

```
<input data-smartdate-spy data-format-event="input">
```

## Setup

```bash
git clone git@github.com:gr2m/smartdate-input.git
cd smartdate-input
npm install
```

## Test

```bash
npm test
```

While working on the tests, you can start Selenium / Chrome driver
once, and then tests re-run on each save

```bash
npm run start_selenium_with_chromedriver
npm run test:mocha:watch
```

### Test configuration

Set log level (`silly`, `verbose`, `info`, `warn`, `error`). Defaults to `error`

```bash
LOG_LEVEL=verbose npm test
```


Running tests in a different browser. Defaults to `selenium:chrome`

```bash
TEST_CLIENT=selenium:firefox npm test
```

Running tests on Sauce Labs

```bash
# a couple of examples
SAUCE_USERNAME=username SAUCE_ACCESS_KEY=accesskey TEST_CLIENT=saucelabs:chrome npm test
SAUCE_USERNAME=username SAUCE_ACCESS_KEY=accesskey TEST_CLIENT='saucelabs:internet explorer' npm test
SAUCE_USERNAME=username SAUCE_ACCESS_KEY=accesskey TEST_CLIENT='saucelabs:internet explorer:10.0:Windows 8' npm test
```

Fine Print
----------

The smartDate Input Plugin have been authored by
[Gregor Martynus](https://github.com/gr2m) ([@gr2m](https://twitter.com/gr2m)),
proud member of the [Hoodie Community](http://hood.ie/).

License: MIT
