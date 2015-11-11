var detect = require('prop-detect')
var raf = require('raf')
var Tween = require('tween')
var Emitter = require('emitter')
var has3d = detect.has3d
var transform = detect.transform

var uid = (function () {
  var id = 1
  return function () {
    return id++
  }
})()

function assign(to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

function createEvent(type, x, y) {
  var e = new UIEvent(type, {
      bubbles: true,
      cancelable: false,
      detail: 1
  })
  var touch = customEvent('touch')
  assign(touch, {
    identifier: uid(),
    screenX: x,
    screenY: y,
    clientX: x,
    clientY: y,
    pageX: x + document.body.scrollLeft,
    pageY: y + document.body.scrollTop
  })
  e.changedTouches = [touch]
  e.targetTouches = [touch]
  e.touches = [touch]
  return e
}

function customEvent(name) {
  var e
  try {
    e = new CustomEvent(name)
  } catch(error) {
    try {
      e = document.createEvent('CustomEvent')
      e.initCustomEvent(name, false, false, 0)
    } catch(err) {
      return
    }
  }
  return e
}
/**
 * Construct TouchSimulate with dispatch element and options
 *
 * @param  {Element}  el
 * @param {Object} opts
 * @api public
 */
function TouchSimulate(el, opts) {
  if (!(this instanceof TouchSimulate)) return new TouchSimulate(el, opts)
  this.el = el
  opts = opts || {}
  this.opts = opts
  this._speed = opts.speed || 40
  this._ease = opts.ease || 'linear'
  this.fixTarget = opts.fixTarget
  if (opts.point && !this.fixTarget)  {
    this.createPoint()
    var self = this
    this.on('start', function (x, y) {
      self.showPoint()
      self.movePoint(x, y)
    })
    this.on('end', function () {
      self.hidePoint()
    })
    this.on('move', function (x, y) {
      self.movePoint(x, y)
    })
  }
}

Emitter(TouchSimulate.prototype)

/**
 * Set speed to n
 *
 * @param  {Number}  n
 * @api public
 */
TouchSimulate.prototype.speed = function (n) {
  this._speed = n
  return this
}

/**
 * Set ease function
 *
 * @param {String} ease
 * @api public
 */
TouchSimulate.prototype.ease = function (ease) {
  this._ease = ease
  return this
}


/**
 * Start moving at position
 *
 * @param {String} pos
 * @api public
 */
TouchSimulate.prototype.start = function (pos) {
  if (this.moving) throw new Error('It\'s moving, can not start')
  this.started = true
  var cor
  if (pos === true && this.clientX != null && this.clientY != null) {
    cor = {x: this.clientX, y: this.clientY}
  } else {
    cor = getCoordinate(this.el, pos)
  }
  var x = cor.x
  var y = cor.y
  this.clientX = x
  this.clientY = y
  this.fireEvent('touchstart', x, y)
  this.emit('start', x, y)
  return this
}

/**
 * Move up
 *
 * @param {Number} distance
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.moveUp = function (distance, end) {
  var a = Math.PI*1.5
  return this.move(a, distance, end)
}

/**
 * Move down
 *
 * @param {Number} distance
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.moveDown = function (distance, end) {
  var a = Math.PI/2
  return this.move(a, distance, end)
}

/**
 * Move left
 *
 * @param {Number} distance
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.moveLeft = function (distance, end) {
  var a = Math.PI
  return this.move(a, distance, end)
}

/**
 * Move right
 *
 * @param {Number} distance
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.moveRight = function (distance, end) {
  var a = 0
  return this.move(a, distance, end)
}

/**
 * Move to the position
 *
 * @param {Number} x
 * @param {Number} y
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.moveTo = function (x, y, end) {
  if (!this.started) this.start(true)
  return this.transit({x: x, y: y}, end)
}

/**
 * Move by angle and distance
 *
 * @param {Number} angle
 * @param {Number} distance
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.move = function (angle, distance, end) {
  if (!this.started) this.start(true)
  if (distance === 0) throw new Error('distance should not be 0')
  var dx  = distance*Math.cos(angle)
  var dy  = distance*Math.sin(angle)
  var y = this.clientY + dy
  var x = this.clientX + dx
  return this.transit({x: x, y: y}, end)
}

/**
 * Tap element at postion
 *
 * @param {String} pos optional
 * @param {duration} duration of milisecond optional
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.tap = function (pos, duration) {
  var self = this
  duration = duration || 50
  this.start(pos)
  return this.wait(duration).then(function () {
    var e = self.fireEvent('touchend', self.clientX, self.clientY)
    self.started = false
    self.emit('end')
    return e
  })
}

/**
 * Wait for milisecond
 *
 * @param  {String|Number}  n
 * @return {Promise}
 * @api public
 */
TouchSimulate.prototype.wait = function (n) {
  var promise = this.createPromise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, n)
  })
  return promise
}

/**
 * Transfrom between start and end
 *
 * @param {Object} start
 * @param {Object} end
 * @api public
 */
TouchSimulate.prototype.transit = function (end, up) {
  var self = this
  this.moving = true
  var start = {x: this.clientX, y: this.clientY}
  var duration = this.getDuration(start, end)
  var tween = Tween(start)
    .ease(this._ease)
    .to(end)
    .duration(duration)

  tween.update(function(o){
    self.fireEvent('touchmove', o.x, o.y)
    self.clientX = o.x
    self.clientY = o.y
    self.emit('move', o.x, o.y)
  })

  var promise = this.createPromise(function (resolve) {
    tween.on('end', function(){
      self.moving = false
      self.started = false
      if (up !== false) {
        var e = self.fireEvent('touchend', self.clientX, self.clientY)
        self.emit('end')
      }
      animate = function(){} // eslint-disable-line
      resolve(e)
    })
  })

  function animate() {
    raf(animate)
    tween.update()
  }

  animate()
  return promise
}

/**
 * Get duration in milisecond
 *
 * @param {Object} start
 * @param {Object} end
 * @return {Number}
 * @api public
 */
TouchSimulate.prototype.getDuration = function (start, end) {
  var dx = Math.abs(start.x - end.x)
  var dy = Math.abs(start.y - end.y)
  var distance = Math.sqrt(dx*dx + dy*dy)
  return 1000*distance/this._speed
}

/**
 * Fire event with type, clientX and clientY
 *
 * @param {String} type
 * @param {Number} x
 * @param {Number} y
 * @return {Event}
 * @api public
 */
TouchSimulate.prototype.fireEvent = function (type, x, y) {
  var e = createEvent(type, x, y)
  var target
  if (this.fixTarget) {
    target = document.elementFromPoint(x, y)
  } else {
    target = this.el
  }
  target.dispatchEvent(e)
  return e
}

TouchSimulate.prototype.createPoint = function () {
  var div = document.createElement('div')
  var s = div.style
  s.position = 'absolute'
  s.top = '0'
  s.left = '0'
  s.width = '10px'
  s.height = '10px'
  s.borderRadius = '50%'
  s.zIndex = '9999'
  s.backgroundColor = 'rgba(0,0,0,0.3)'
  document.body.appendChild(div)
  var r = div.getBoundingClientRect()
  div.dataset.x = r.left + r.width/2
  div.dataset.y = r.top + r.height/2
  this.point = div
}

TouchSimulate.prototype.hidePoint = function () {
  var s = this.point.style
  s.backgroundColor = 'rgba(0,0,0,0)'
}

TouchSimulate.prototype.showPoint = function () {
  var s = this.point.style
  s.backgroundColor = 'rgba(0,0,0,0.3)'
}

TouchSimulate.prototype.movePoint = function (x, y) {
  var p = this.point
  var s = p.style
  x = x - Number(p.dataset.x) + document.body.scrollLeft
  y = y - Number(p.dataset.y) + document.body.scrollTop
  if (has3d) {
    s[transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)'
  } else {
    s[transform] = 'translateX(' + x + 'px),translateY(' + y + 'px)'
  }
}

/**
 * Create a decorater for TouchSimulate
 *
 * @param  {Function}  fn
 * @return {Promise}
 * @api private
 */
TouchSimulate.prototype.createPromise = function (fn) {
  var promise = new Promise(fn)
  var names = ['start', 'moveUp', 'moveDown', 'moveLeft', 'moveRight', 'moveTo', 'move', 'wait']
  var self = this
  names.forEach(function (name) {
    promise[name] = function () {
      var args = arguments
      return self.createPromise(function (resolve, reject) {
        promise.then(function () {
          try {
            var p = self[name].apply(self, args)
          } catch (err) {
            return reject(err)
          }
          resolve(p)
        })
      })
    }
  })
  return promise
}
/**
 * Get coordinate by element and position string
 *
 * @param  {Element}  el
 * @param {String} position
 * @return {Object}
 * @api public
 */
function getCoordinate(el, position) {
  var rect = el.getBoundingClientRect()
  var x = rect.left
  var y = rect.top
  var delta = 3
  switch (position) {
    case 't':
      x = x + rect.width/2
      y = y + delta
      break;
    case 'b':
      x = x + rect.width/2
      y = y + rect.height - delta
      break;
    case 'l':
      y = y + rect.height/2
      x = x + delta
      break;
    case 'r':
      x = x + rect.widht - delta
      y = y + rect.height/2
      break;
    default:
      x = x + rect.width/2
      y = y + rect.height/2
  }
  return {x: x, y: y}
}

module.exports = TouchSimulate
