var detect = require('prop-detect')
var has3d = detect.has3d
var transform = detect.transform
var TouchSimulate = require('..')
var el = document.getElementById('demo')
moveable(el)

var touch = new TouchSimulate(el, {
  speed: 80,
  point: true
})

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

function moveable(node) {
  var last
  var x = 0
  var y = 0
  node.addEventListener('touchstart', function (e) {
    var t = e.touches[0]
    last = {
      x: t.clientX,
      y: t.clientY
    }
  }, false)

  node.addEventListener('touchmove', function (e) {
    var t = e.touches[0]
    x = x + t.clientX - last.x
    y = y + t.clientY - last.y
    var s = node.style
    if (has3d) {
      s[transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)'
    } else {
      s[transform] = 'translateX(' + x + 'px),translateY(' + y + 'px)'
    }
    last = {
      x: t.clientX,
      y: t.clientY
    }
  }, false)

  node.addEventListener('touchend', function (e) {
    var t =  e.touches[0]
  })
}
