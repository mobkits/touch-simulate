var detect = require('prop-detect')
var has3d = detect.has3d
var transform = detect.transform
var TouchSimulate = require('..')
var el = document.getElementById('demo')
var m = moveable(el)

var touch = new TouchSimulate(el, {
  speed: 80,
  fixTarget: true
})

function run() {
  touch.start()
  touch.moveRight(150)
  .then(function () {
    return touch.wait(1000)
  })
  .then(function () {
    return touch.moveDown(150)
  })
  .then(function () {
    return touch.wait(1000)
  })
  .then(function () {
    return touch.moveLeft(150)
  })
  .then(function () {
    return touch.wait(1000)
  })
  .then(function () {
    return touch.moveUp(150)
  })
  .then(function () {
    return touch.move(Math.PI/4, 150)
  })
  .then(function () {
    m.reset()
    return touch.wait(1000)
  })
  .then(function () {
    run()
  })
}

run()

function moveable(node) {
  var last
  var x = 0
  var y = 0
  node.addEventListener('touchstart', function (e) {
    var t = e.touches[0]
    last = {
      x: t.pageX,
      y: t.pageY
    }
  }, false)

  node.addEventListener('touchmove', function (e) {
    var t = e.touches[0]
    x = x + t.pageX - last.x
    y = y + t.pageY - last.y
    var s = node.style
    if (has3d) {
      s[transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)'
    } else {
      s[transform] = 'translateX(' + x + 'px),translateY(' + y + 'px)'
    }
    last = {
      x: t.pageX,
      y: t.pageY
    }
  }, false)

  node.addEventListener('touchend', function (e) {
  })

  return {
    reset: function () {
      x = 0,
      y = 0,
      node.style[transform] = ''
    }
  }
}

