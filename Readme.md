# Touch-simulate

  Simulate touch event(A fake one with pageX, pageY, clientX, clientY available) even at desktop browser for testing.

  TODO: test

## Features

* Automatic emit touchmove when moving
* Corrent `e.clientX` and `e.clientY`
* Promise based

## Install

    npm i touch-simulate -D

## Usage

``` js
var el = document.getElementById('demo')
var TouchSimulate = require('touch-simulate')
moveable(el)

var touch = new TouchSimulate(el, {
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
```

## API

#### TouchSimulate(el, option)

Create TouchSimulate instance with element and options
* `option.speed` set speed of `px/s` default 40
* `option.fixTarget` use the real target at the point instead of `el` to dispatch the event
* `option.point` show a transparent point at the screen, can not use with `fixTarget`
* `option.ease` define a [ease function](https://github.com/component/ease) for the movemonent, default `linear`

#### .speed(number)

Set the speed to number

#### .ease(string)

Set the ease function name

#### .start([position])

Set the touch start el and optional position(default is center)
position could be `t` `l` `r` `b` for alias for top, left, right and bottom
position could also be an array, which contains [x, y] for clientX and clientY
This function would throw error if the movemonent not finished

#### .moveUp(distance)
#### .moveDown(distance)
#### .moveLeft(distance)
#### .moveRight(distance)

Move to one direction, return promise which resolved with event of `touchend`

#### .moveTo(x, y)

Insread of move direction, set move monent destination,
x and y are clientX and clientY (relative to viewport, regardless of scrollbar)

#### .move(angel, distance)

Use `angel` which should be (0 ~ 2*PI) instead of `up` `down` `left` nad `right`

#### .tap([position])

Helper to emit tap event, return promise, resolved with event of `touchend`

#### .wait(ms)

Helper to return a promise after wait for ms
