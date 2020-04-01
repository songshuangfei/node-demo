const fs = require('fs');
const stream = require('stream');
const path = require('path');

class ToFileStream extends stream.Writable {
  constructor(options){
    super(options);
  }

  _write(chunk, encoding, callback) {
    fs.writeFile(chunk.name, chunk.data, callback)
  }
}

module.exports = ToFileStream;