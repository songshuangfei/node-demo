var stream = require("stream");

class RandomStream extends stream.Readable {
  constructor(options){
    super(options);
    this.data = ['a','b','c','d'];
  }

  _read(){
    if(!this.data.length)
      return this.push(null)
    const d = this.data.shift();
    this.push({ name: `${d}.txt`, data: d });
  }
}

module.exports = RandomStream