/* global before*/

var path = require('path')

var chai = require('chai')
var chalk = require('chalk')
var log = require('npmlog')
var sauceConnectLauncher = require('sauce-connect-launcher')
var webdriverio = require('webdriverio')

var SELENIUM_HUB = 'http://localhost:4444/wd/hub/status'

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()
var request = require('request').defaults({json: true})

log.level = process.env.LOG_LEVEL || 'error'

// process.env.TEST_CLIENT is a colon seperated list of
// (saucelabs|selenium):browserName:browserVerion:platform
var tmp = (process.env.TEST_CLIENT || 'selenium:chrome').split(':')
var runner = tmp[0] || 'selenium'
var browser = {
  name: tmp[1] || 'chrome',
  browserName: tmp[1] || 'chrome',
  version: tmp[2] || null, // Latest
  platform: tmp[3] || null
}

var tunnelId = process.env.TRAVIS_JOB_NUMBER || 'tunnel-' + Date.now()
var options = {
  baseUrl: process.env.TEST_URL || 'file://' + path.resolve(__dirname, '/../index.html'),
  logLevel: 'silly',
  desiredCapabilities: browser
}

log.silly('runner', 'runner is %s', runner)
log.silly('options', 'set options.baseUrl to %s', options.baseUrl)

if (runner === 'saucelabs') {
  options.user = process.env.SAUCE_USERNAME
  options.key = process.env.SAUCE_ACCESS_KEY

  log.silly('options', 'set options.user to %s', options.user)
  log.silly('options', 'set options.key to ***')

  // http://webdriver.io/guide/testrunner/cloudservices.html#With_Travis_CI
  options.desiredCapabilities['tunnel-identifier'] = tunnelId
  options.desiredCapabilities.build = process.env.TRAVIS_BUILD_NUMBER

  options.desiredCapabilities['idle-timeout'] = 599
  options.desiredCapabilities['max-duration'] = 60 * 45
  options.desiredCapabilities['command-timeout'] = 599
  options.desiredCapabilities['idle-timeout'] = 599
}

if (process.env.TRAVIS_JOB_NUMBER) {
  options.desiredCapabilities.name += ' - ' + process.env.TRAVIS_JOB_NUMBER
}

log.silly('options', 'set options.desiredCapabilities to %j', options.desiredCapabilities)

var client = webdriverio.remote(options)
chaiAsPromised.transferPromiseness = client.transferPromiseness

before(function (done) {
  var self = this

  this.timeout(180000)
  this.client = client

  var retries = 0
  var started = function () {
    if (++retries > 60) {
      done('Unable to connect to selenium')
      return
    }

    if (client.runner === 'selenium') {
      startSelenium(startTest)
    } else {
      startSauceConnect(startTest)
    }

    function startSelenium (callback) {
      log.verbose('selenium', 'starting ...')
      request(SELENIUM_HUB, function (error, resp) {
        if (error) throw error

        if (resp && resp.statusCode === 200) {
          log.info('selenium', 'started')
          callback()
        } else {
          log.verbose('selenium', 'not yet ready ...')
          setTimeout(started, 1000)
        }
      })
    }

    function startSauceConnect (callback) {
      log.verbose('sauce-connect', 'starting ...')
      var scOptions = {
        username: options.user,
        accessKey: options.key,
        tunnelIdentifier: tunnelId
      }

      sauceConnectLauncher(scOptions, function (error, process) {
        if (error) {
          log.error('sauce-connect', 'Failed to connect')
          log.error('sauce-connect', error)
          return process.exit(1)
        }
        callback()
      })
    }

    function startTest () {
      self.client.on('command', function (command) {
        log.info('selenium', chalk.cyan(command.method), command.uri.path)
        log.info('selenium', command.data)
      })
      self.client.on('erorr', function (error) {
        log.error('selenium', chalk.red(error.body.value.class), error.body.value.message)
      })
      self.client.init(done)
    }
  }

  started()
})
