const fs = require('fs');
const zlib =require('zlib');

const file = process.argv[2];

//Caching
// fs.readFile(file, (err, buffer) => {
//   zlib.gzip(buffer,(err,buffer)=>{
//     fs.writeFile(`${file}.gz`,buffer,err=>{
//     })
//   })
// })

//stream
fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(`${file}.gz`))
  .on('finish',()=>{console.log("finished")})
