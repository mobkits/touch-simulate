/*global describe, it*/
var assert = require('assert')
var prop = require('..')

describe('transition-property', function() {
  it('should be transition', function () {
    assert.equal(prop, 'transition')
  })
})
