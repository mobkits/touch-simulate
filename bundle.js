/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(1)
	var has3d = detect.has3d
	var transform = detect.transform
	var TouchSimulate = __webpack_require__(7)
	var el = document.getElementById('demo')
	var m = moveable(el)
	
	var touch = new TouchSimulate(el, {
	  speed: 80,
	  point: true
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	exports.transition = __webpack_require__(2)
	
	exports.transform = __webpack_require__(3)
	
	exports.touchAction = __webpack_require__(4)
	
	exports.transitionend = __webpack_require__(5)
	
	exports.has3d = __webpack_require__(6)


/***/ },
/* 2 */
/***/ function(module, exports) {

	var styles = [
	  'transition',
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};
	
	/**
	 * Expose `transitionend`
	 */
	
	var el = document.createElement('p');
	
	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(3);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(1)
	var raf = __webpack_require__(8)
	var Tween = __webpack_require__(9)
	var Emitter = __webpack_require__(14)
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
	
	function createEvent(target, type, x, y) {
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
	    pageY: y + document.body.scrollTop,
	    target: target
	  })
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
	  this.el = el
	  this.opts = opts || {}
	  this._speed = opts.speed || 40
	  this._ease = opts.ease || 'linear'
	  if (opts.point)  {
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
	
	TouchSimulate.prototype.speed = function (n) {
	  this._speed = n
	  return this
	}
	
	TouchSimulate.prototype.ease = function (ease) {
	  this._ease = ease
	  return this
	}
	
	
	TouchSimulate.prototype.start = function (pos) {
	  if (this.moving) throw new Error('It\'s moving, can not start')
	  this.started = true
	  var cor = getCoordinate(this.el, pos)
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
	TouchSimulate.prototype.moveUp = function (distance) {
	  var a = Math.PI*1.5
	  return this.move(a, distance)
	}
	
	/**
	 * Move down
	 *
	 * @param {Number} distance
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.moveDown = function (distance) {
	  var a = Math.PI/2
	  return this.move(a, distance)
	}
	
	/**
	 * Move left
	 *
	 * @param {Number} distance
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.moveLeft = function (distance) {
	  var a = Math.PI
	  return this.move(a, distance)
	}
	
	/**
	 * Move right
	 *
	 * @param {Number} distance
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.moveRight = function (distance) {
	  var a = 0
	  return this.move(a, distance)
	}
	
	/**
	 * Move to the position
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.moveTo = function (x, y) {
	  if (!this.started) throw new Error('should call start at first')
	  return this.transit({x: x, y: y})
	}
	
	/**
	 * Move by angle and distance
	 *
	 * @param {Number} angle
	 * @param {Number} distance
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.move = function (angle, distance) {
	  if (!this.started) this.start()
	  if (distance === 0) throw new Error('distance should not be 0')
	  var dx  = distance*Math.cos(angle)
	  var dy  = distance*Math.sin(angle)
	  var y = this.clientY + dy
	  var x = this.clientX + dx
	  return this.transit({x: x, y: y})
	}
	
	/**
	 * Tap element at postion
	 *
	 * @param {String} pos optional
	 * @return {Promise}
	 * @api public
	 */
	TouchSimulate.prototype.tap = function (pos) {
	  var self = this
	  this.start(pos)
	  return this.wait(50).then(function () {
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
	  return new Promise(function (resolve) {
	    setTimeout(function () {
	      resolve()
	    }, n)
	  })
	}
	
	/**
	 * Transfrom between start and end
	 *
	 * @param {Object} start
	 * @param {Object} end
	 * @api public
	 */
	TouchSimulate.prototype.transit = function (end) {
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
	
	  var promise = new Promise(function (resolve) {
	    tween.on('end', function(){
	      self.moving = false
	      self.started = false
	      var e = self.fireEvent('touchend', self.clientX, self.clientY)
	      self.emit('end')
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
	  var e = createEvent(this.el, type, x, y)
	  this.el.dispatchEvent(e)
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
	  switch (position) {
	    case 't':
	      x = x + rect.width/2
	      break;
	    case 'b':
	      x = x + rect.width/2
	      y = y + rect.height
	      break;
	    case 'l':
	      y = y + rect.height/2
	      break;
	    case 'r':
	      x = x + rect.widht
	      y = y + rect.height/2
	      break;
	    default:
	      x = x + rect.width/2
	      y = y + rect.height/2
	  }
	  return {x: x, y: y}
	}
	
	module.exports = TouchSimulate


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(10);
	var clone = __webpack_require__(11);
	var type = __webpack_require__(12);
	var ease = __webpack_require__(13);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(12);
	} catch (_) {
	  type = __webpack_require__(12);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map