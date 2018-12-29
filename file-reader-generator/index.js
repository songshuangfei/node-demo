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

var writeFilesInOne = function*(){//读写逻辑
    var data1 = yield fileReader("./files/1.txt");
    var data2 = yield fileReader("./files/2.txt");
    var data3 = yield fileReader("./files/3.txt");
    var data4 = yield fileReader("./files/4.txt");
    var data = data1+data2+data3+data4;
    fs.writeFile("./files/new.txt",data,err => {
        if(err)
            console.log(err);
    })
};

function run(gen){
    var g = gen();

    function next(data){
        var resulet = g.next(data);
        if(resulet.done) return;
        resulet.value.then(data =>{
            next(data);
        })
    }
    next();
}

run(writeFilesInOne);
