let fs = require('fs')
let EventEmitter = require('events')

module.exports = function(file){
  let emiter = new EventEmitter()
  fs.readFile(file, 'utf8', (err, content)=>{
    if(err) {
      emiter.emit("error", err)
      return
    }

    try {
      let data = JSON.parse(content)
      emiter.emit("succeed", data)
    } catch (error) {
      let err = new Error(`${file} is not a json file`)
      emiter.emit("error", err)
    }
  })
  return emiter
}