const fs = require('fs');
const stream = require('stream');

let rs = fs.createReadStream('./data.txt', {
  encoding:'utf8',
});
let ws = fs.createWriteStream(`copy.txt`,{
  encoding:'utf8',
});
let mx = new MixStream();

//当读取流有内容可读就主动读取
// rs.on('readable',()=>{
//   let chunk;
//   do {
//     chunk = rs.read();
//     chunk ? ws.write(chunk) : null;
//   } while (chunk!==null);
//   ws.end()
// })

//或 当读取流有数据时就直接读取
// rs.on('data',chunk=>{
//   ws.write(chunk);
//   ws.end();
// })

//pipe
rs
  .pipe(ws)


