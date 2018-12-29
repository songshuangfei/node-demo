var fs = require("fs");

var fileReader = function(fileName){//读取函数
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};

var readFile = function*(){//读写逻辑
    var data1 = yield fileReader("./files/1.txt");
    var data2 = yield fileReader("./files/2.txt");
    var data = data1.toString() + data2.toString();
    fs.writeFile("./files/3.txt",data,err => {
        if(err)
            console.log(err);
    })
};

var reader = readFile();
reader.next().value.then((data)=>{//开启读写
    reader.next(data).value.then(data => {
        reader.next(data);
    })
});
