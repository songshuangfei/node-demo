var EditJsonFile = require('./mode/EditJsonFile')

var jsonData = new EditJsonFile("./data.json");
//更新json文件，第一个参数是
jsonData.updateAttr({sex:"man"},(newJsonObj)=>{
    console.log("修改后json对象"+JSON.stringify(newJsonObj))
})

//删除json文件值
// jsonData.deleteAttr("sex",(newJsonObj)=>{
//     console.log("修改后json对象"+JSON.stringify(newJsonObj))
// })