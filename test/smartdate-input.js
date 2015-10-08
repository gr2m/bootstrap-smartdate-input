/* global before, after*/
'use strict'

var wd = require('wd')
// smartdateInput = require('../smartdate-input')

//var sauceConnectLauncher = require('sauce-connect-launcher')


var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)


describe("using promises and chai-as-promised", function() {
  var browser
 
  before(function() {
    browser = wd.promiseChainRemote()
    return browser.init({browserName:'chrome'})
  })
 
  beforeEach(function() {
    return browser.get("http://gr2m.github.io/smartdate-input/")
  })
 
  after(function() {
    return browser.quit()
  })
 
  it("title is set", function() {
    return browser.title('smartDate Input – a Bootstrap plugin')
  })

  it("input element was found", function() {
    var $input = browser.elementByClassNameOrNull('input-lg')

    return $input.smartDate('set')
  })
})