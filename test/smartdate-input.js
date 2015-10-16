/* global describe, before, after, it*/
var webdriverio = require('webdriverio')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

var assert = chai.assert
chai.use(chaiAsPromised)
chai.Should()

describe('=== smartDate-input ===', function () {

  this.timeout(90000)
  var client = {}

  before(function (done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} })
    client.init(done)
  })

  it('smartDate, set new Date', function (done) {
    client
      .url('file://' + __dirname + '/../index.html')
      .execute("$('.input-lg').smartDate('set', 'Tuesday, October 13, 2015 6:07pm')")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .getValue('.input-lg', function (err, val) {
        assert.equal(err, undefined)
        assert.strictEqual(val, 'Tuesday, October 13, 2015 6:07pm')
      })
      .call(done)
  })

  after(function (done) {
    client.end(done)
  })
})
