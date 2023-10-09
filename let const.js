function fn(){
  let a = b = 100
  var x = 101
}
fn()
console.log(window.b)
console.log(b,x)