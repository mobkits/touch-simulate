# Touch-simulate

  [![Build Status](https://secure.travis-ci.org/chemzqm/touch-simulate.svg)](http://travis-ci.org/chemzqm/touch-simulate)

  Simulate touch event(A fake one with pageX, pageY, clientX, clientY available) even at desktop browser for testing.

  You can have touches by `e.touches[0]` `e.changedTouches[0]` or `e.targetTouches[0]`, they are the same.

  Already used for testing my components like [iscroll](https://github.com/chemzqm/iscroll), [pull-to-refresh](https://github.com/chemzqm/pull-to-refresh) and [sweet-sortable](https://github.com/chemzqm/sweet-sortable)

## Features

* Automatic emit touchmove when moving
* Corrent `e.clientX`, `e.clientY` and many others
* Promise based, chainaible methods
* Confige movemoment by speed and ease function

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

touch.start() // fire touchstart at center of element
.moveRight(150, false) // move right 150px, no touchend event
.wait(100) // wait 100ms
.moveDown(150, false)
.wait(100)
.moveLeft(150, false)
.wait(100)
.moveUp(150) // move up 150px and fire touchend
```

You can chain the methods, the function call would wait for previous one to be fullfilled, the chainable method list:
j
`start` `moveUp` `moveDown` `moveLeft` `moveRight` `moveTo` `move` `wait`

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

#### .moveUp(distance, [end])
#### .moveDown(distance, [end])
#### .moveLeft(distance, [end])
#### .moveRight(distance, [end])

If not started, start at the center of element, or the current position
Move to one direction, return promise which resolved with event of `touchend`
If `end` is set to false, no touchend event is fired.

#### .moveTo(x, y, [end])

Insread of move direction, set move monent destination,
x and y are clientX and clientY (relative to viewport, regardless of scrollbar)

#### .move(angel, distance, [end])

Use `angel` which should be (0 ~ 2*PI) instead of `up` `down` `left` nad `right`

#### .tap([position], [duration])

Helper to emit tap event, return promise, resolved with event of `touchend`

#### .wait(ms)

Helper to return a promise after wait for ms
