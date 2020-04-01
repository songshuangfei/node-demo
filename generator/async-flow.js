// function* makeGenerator() {
//   let r = yield 1;
//   let r2 = yield 2 + r;
//   let r3 = yield 3 + r2;
//   return 4 + r3
// }

// let g = makeGenerator();
// console.log(g.next());
// console.log(g.next(3));
// console.log(g.next(4));
// // console.log(g.throw(new Error()));

// function* makeGenerator2() {
//   yield 1;
//   yield 2;
//   yield 3;
//   return 4
// }

// let g2 = makeGenerator2();
// for (const iterator of g2) {
//   console.log(iterator)
// }

var fs =require('fs');
var path = require('path');

const asyncFlow = (genrator) => {
  function callback(err) {
    if (err) return gen.throw(err);
    const res = Array.prototype.slice.call(arguments, 1);
    gen.next(res.length > 1 ? res : res[0]);
  }
  const gen = genrator(callback);
  gen.next();
}


asyncFlow(function*(callback){
  const fileName = path.basename("./data.txt");
  const data = yield fs.readFile(fileName,'utf8',callback);
  yield fs.writeFile(`cp_${fileName}`,data,callback)
})