/* global describe, after, it*/
var chai = require('chai')
var assert = chai.assert

describe('=== smartDate-input ===', function () {
  this.timeout(90000)

  it('smartDate, init', function (done) {
    this.client
      .url('/index.html')
      .execute("$('.input-lg').smartDate()")
      .catch(function (err) {
        console.log('🚨 🚨 🚨 🚨 🚨 🚨 ')
        console.log(err)
      })
      .call(done)
  })

  it('smartDate, set Date', function (done) {
    this.client
      .url('/index.html')
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
    this.client
      .url('/index.html')
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

  it.skip('smartDate, options (https://github.com/gr2m/smartdate-input/pull/8)', function (done) {
    this.client
      .url('/index.html')
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
    this.client.end(done)
  })
})
