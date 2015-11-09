console.log(1)
var p = new Promise(function (resolve, reject) {
  console.log(2)
  setTimeout(function () {
    resolve(2)
  },200)
})
p.then(function (v) {
  console.log(v)
})
console.log(3)
