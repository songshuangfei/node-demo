
var { readJson } = require("./readJson")
var path = require("path")

readJson(path.join(__dirname, "./data.json"), (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(Reflect.ownKeys(data))
})