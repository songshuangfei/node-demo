var fs =require('fs');
var path = require('path');

function readFileThunk(fileName, options) {
  return function (callback) {
    fs.readFile(fileName, options, callback);
  }
}

function writeFileThunk(fileName, options) {
  return function (callback) {
    fs.writeFile(fileName, options, callback);
  }
}

const asyncFlow = (genrator) => {
  function callback(err) {
    if (err) return gen.throw(err);
    const res = Array.prototype.slice.call(arguments, 1);
    const thunk = gen.next(res[0]).value;
    thunk && thunk(callback);//可能是return
  }
  const gen = genrator();
  const thunk =  gen.next().value;
  thunk(callback)
}

asyncFlow(function*(){
  const fileName = path.basename("./data.txt");
  const data = yield readFileThunk(fileName,'utf8');
  yield writeFileThunk(`cp_${fileName}`, data);
})