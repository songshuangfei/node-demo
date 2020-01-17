var fs = require('fs')
var path = require('path')

function loadModule(fileName, myModule, myRequire ){
  const filePath = path.join(__dirname, fileName)
  const warppedSrc = `(function(myModule, myExports, myRequire){
    ${fs.readFileSync(filePath, 'utf8')}
  })(myModule, myModule.myExports, myRequire);`
  eval(warppedSrc)
}

function myRequire(fileName){
  let myModule =  {
    myExports:{}
  }
  loadModule(fileName, myModule, myRequire);
  return myModule.myExports
}

let math = myRequire("lib/math.js")

console.log(math.add(1,2))


