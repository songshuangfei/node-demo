var fs = require("fs")

function readJson(fileName, callback){
  fs.readFile(fileName, 'utf8', (err, data) => {
    if(err){
      return callback(err)
    }

    let parsed;
    try {
      parsed = JSON.parse(data)      
    } catch (error) {
      let parseErr = new Error(`${fileName} is not a json file`)
      callback(parseErr)
      return
    }
    callback(null, parsed)
  })
}

exports.readJson = readJson