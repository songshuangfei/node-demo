var stream = require('stream');

class MiddleStream extends stream.Transform {
  constructor(options){
    super(options)
  }
  _transform(chunk, encoding, callback){
    console.log(chunk)
    let a = {...chunk};
    a.data += ";";
    this.push(a)
    callback();
  }
}

module.exports =  MiddleStream