const RandomStream = require("./RandomStream");
const ToFileStream = require("./ToFileStream");
const MiddleStream = require("./MiddleStream");

const rs = new RandomStream({ objectMode: true });
const ws = new ToFileStream({objectMode: true});
const ms = new MiddleStream({objectMode: true})

// rs.on("readable",()=>{
//   let chunk;
//   while ((chunk = rs.read()) !== null){
//     console.log(chunk)
//     ws.write(chunk)
//   }
//   ws.end();
// })

// or
rs.pipe(ms).pipe(ws)

