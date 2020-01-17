
var MathErr = myRequire('lib/error.js')

function add(a, b) {
  let sum;
  try {
    if(isNaN(Number(a)))
      throw new MathErr(a, "is not a number")
    if(isNaN(Number(b)))
      throw new MathErr(b, "is not a number")
  } catch (error) {
    console.error(error.msg)
    return
  }
  return a + b
}

myExports.add = add

