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
