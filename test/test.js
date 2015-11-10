/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var Touch = require('..')
var tap = require('tap-event')

var el
var rect
beforeEach(function () {
  el = document.createElement('div')
  el.style.height = '10px'
  el.style.width = '10px'
  document.body.appendChild(el)
  rect = el.getBoundingClientRect()
})

afterEach(function () {
  document.body.removeChild(el)
})

describe('Touch Simulate', function() {
  it('should init with new', function () {
    var touch = new Touch(el)
    assert.equal(touch.el, el)
  })

  it('should init without new', function () {
    var touch = Touch(el)
    assert.equal(touch.el, el)
  })
})

describe('.start()', function () {
  it('should start with out position', function () {
    var fired
    el.addEventListener('touchstart', function (e) {
      fired = true
      assert.equal(e.target, el)
      var t = e.touches[0]
      assert.equal(t.clientX, rect.left + rect.width/2)
      assert.equal(t.clientY, rect.top + rect.height/2)
    })
    var touch = Touch(el)
    touch.start()
    assert.equal(fired, true)
  })

  it('should have changedTouches and targetTouches', function () {
    var fired
    el.addEventListener('touchstart', function (e) {
      fired = true
      assert.equal(e.changedTouches.length, 1)
      assert.equal(e.targetTouches.length, 1)
    })
    var touch = Touch(el)
    touch.start()
    assert.equal(fired, true)
  })

  it('should start with position', function () {
    var fired
    var pos
    el.addEventListener('touchstart', function (e) {
      fired = true
      assert.equal(e.target, el)
      var t = e.touches[0]
      if (pos === 't' || pos === 'b') {
        assert.equal(t.clientX, rect.left + rect.width/2)
      } else {
        assert.equal(t.clientY, rect.top + rect.height/2)
      }
    })
    var touch = Touch(el)
    ;['t', 'l', 'b','r'].forEach(function (v) {
      pos = v
      touch.start(v)
    })
    assert.equal(fired, true)
  })
})

describe('.move()', function () {
  it('should move up', function (done) {
    var vals = []
    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0]
      vals.push(t.clientY)
    })
    el.addEventListener('touchend', function () {
      assert(vals.length)
      vals.reduce(function (pre, curr, i) {
        if (i !== 0) assert(pre > curr)
        return curr
      }, Infinity)
      done()
    })
    var touch = Touch(el)
    touch.speed(80)
    touch.moveUp(10)
  })

  it('should move down', function (done) {
    var vals = []
    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0]
      vals.push(t.clientY)
    })
    el.addEventListener('touchend', function () {
      assert(vals.length)
      vals.reduce(function (pre, curr, i) {
        if (i !== 0) assert(pre < curr)
        return curr
      }, 0)
      done()
    })
    var touch = Touch(el)
    touch.speed(80)
    touch.moveDown(10)
  })

  it('should move left', function (done) {
    var vals = []
    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0]
      vals.push(t.clientX)
    })
    el.addEventListener('touchend', function () {
      assert(vals.length)
      vals.reduce(function (pre, curr) {
        assert(pre > curr)
        return curr
      }, Infinity)
      done()
    })
    var touch = Touch(el)
    touch.speed(80)
    touch.moveLeft(10)
  })

  it('should move right', function (done) {
    var vals = []
    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0]
      vals.push(t.clientX)
    })
    el.addEventListener('touchend', function () {
      assert(vals.length)
      vals.reduce(function (pre, curr) {
        assert(pre < curr)
        return curr
      }, 0)
      done()
    })
    var touch = Touch(el)
    touch.speed(80)
    touch.moveRight(10)
  })

  it('should move by angle', function (done) {
    var arrX = []
    var arrY = []
    el.addEventListener('touchmove', function (e) {
      var t = e.touches[0]
      arrX.push(t.clientX)
      arrY.push(t.clientY)
    })
    el.addEventListener('touchend', function () {
      assert(arrX.length)
      assert(arrY.length)
      arrX.reduce(function (pre, curr) {
        assert(pre < curr)
        return curr
      }, 0)
      arrY.reduce(function (pre, curr) {
        assert(pre < curr)
        return curr
      }, 0)
      done()
    })
    var touch = Touch(el)
    touch.speed(80)
    touch.move(Math.PI/4, 10)
  })
})

describe('.wait(ms)', function () {
  it('should wait', function (done) {
    var touch = Touch(el)
    var d = Date.now()
    var p = touch.wait(100)
    p.then(function () {
      assert(Date.now() - d >= 100)
      done()
    })
  })
})

describe('.tap(pos)', function () {
  it('should tap', function () {
    var fired
    el.addEventListener('touchstart', tap(function () {
      fired = true
    }))
    var touch = Touch(el)
    var p = touch.tap()
    return p.then(function (e) {
      assert.equal(e.target, el)
      assert.equal(fired, true)
    }, function () {
    })
  })
})
