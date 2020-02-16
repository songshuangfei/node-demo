let jonsFileParser = require("./jsonFileParser")
let path = require("path")

jonsFileParser(path.join(__dirname, "./data.json"))
  .on("error", err => {
    console.log(err)
  })
  .on("succeed", data => {
    console.log(data)
  })

