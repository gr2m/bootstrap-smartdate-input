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

  it('smartDate, init', function (done) {
    client
      .url('file://' + __dirname + '/../index.html')
      .execute("$('.input-lg').smartDate()")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .call(done)
  })

  it('smartDate, set Date', function (done) {
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

  it('smartDate, setFormat', function (done) {
    client
      .url('file://' + __dirname + '/../index.html')
      .execute("$('.input-lg').smartDate('set', 'Tuesday, October 13, 2015 6:07pm')")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .execute("$('.input-lg').smartDate('setFormat', 'DD MMMM YYYY')")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .getValue('.input-lg', function (err, val) {
        assert.equal(err, undefined)
        assert.strictEqual(val, '13 October 2015')
      })
      .call(done)
  })

  it('smartDate, options', function (done) {
    client
      .url('file://' + __dirname + '/../index.html')
      .execute("$('.input-lg').smartDate({date: 'Fri Oct 16 2015 13:03:37 GMT+0200 (CEST)', format: 'DD MM YY'})")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .getValue('.input-lg', function (err, val) {
        assert.equal(err, undefined)
        assert.strictEqual(val, '16 10 15')
      })
      .call(done)
  })

  after(function (done) {
    client.end(done)
  })
})
