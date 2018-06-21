var fs = require('fs');

class EditJsonFile {
    constructor(path){
        this._path = path;
        this._openFile = this._openFile.bind(this);
    }

    _openFile(resolve,reject){
        fs.open(this._path,'r+',(err,fd)=>{
            if(err)
            {
                reject(err);
                return;
            }
            resolve(fd);
        })
    }

    _closeFile(fd){
        fs.close(fd,(err)=>{
            if(err)
            {
                return console.log(err);
            }
            console.log("文件已关闭");
        })
    }

    _readFile(fd,callback){
        fs.stat(this._path,(err,stats)=>{
            if(err){
                return console.log(err);
            }
            var readBuffer = new Buffer.alloc(stats.size),//创建符合文件大小的buffer
            offset = 0,
            len = readBuffer.length,
            startPosition = 0;
    
            fs.read(fd,readBuffer,offset,len,startPosition,(err,readByte)=>{
                if(err){
                    return console.log(err);
                }
                callback(readBuffer.toString());
            });
        })
    }

    _writeFile(newObj,callback){
        var newData = JSON.stringify(newObj);
        fs.writeFile(this._path, newData, (err)=>{
            if (err) {
                return console.error(err);
            }else{
                console.log('写入成功');
                if(callback)callback();
            }
            
        });
    }

    _update(old,newAttr,callback){
        let newObj = {...old};
        console.log(`旧json:${JSON.stringify(old)} 更新新键值对: ${JSON.stringify(newAttr)}`)
        for(var key in newAttr){
            newObj[key] = newAttr[key];
        }
        this._writeFile(newObj,callback(newObj));
    }

    _delete(old,deleteName,callback){
        let newObj = {...old};
        console.log("旧json" + JSON.stringify(old),"删除值" + JSON.stringify(deleteName));
        delete newObj[deleteName];
        this._writeFile(newObj,callback(newObj));
    }

    updateAttr(newAttr,callback){
        new Promise(this._openFile).then((fd)=>{
            console.log('文件打开成功：');
            this._readFile(fd,(data)=>{
                this._closeFile(fd);
                this._update(JSON.parse(data),newAttr,callback);
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    deleteAttr(attrName,callback){
        new Promise(this._openFile).then((fd)=>{
            console.log('文件打开成功：');
            this._readFile(fd,(data)=>{
                this._closeFile(fd);
                this._delete(JSON.parse(data),attrName,callback);
            })
        }).catch((err)=>{
            console.log(err);
        });
    }
}


module.exports = EditJsonFile;



//-----------------------------------------------------
// const PATH = './data.json';

// function readFile(fd,callback){
//     fs.stat(PATH,(err,stats)=>{//获取文件状态
//         if(err){
//             return console.log(err);
//         }

//         var readBuffer = new Buffer.alloc(stats.size),//创建符合文件大小的buffer
//         offset = 0,
//         len = readBuffer.length,
//         startPosition = 0;

//         fs.read(fd,readBuffer,offset,len,startPosition,(err,readByte)=>{
//             if(err){
//                 return console.log(err);
//             }
//             console.log(`字节: ${readByte}\n`);
//             console.log(readBuffer)
//             callback(readBuffer.toString());
//         });
//     })
// }

// function writeFile(preData){
//     var temp = JSON.parse(preData);
//     temp.sex = 'man';
//     var newData = JSON.stringify(temp);
//     fs.writeFile(PATH, newData, (err)=>{
//         if (err) {
//             return console.error(err);
//         }
//         console.log('写入成功');
//     });
// }

// function closeFile(fd){
//     fs.close(fd,(err)=>{
//         if(err)
//         {
//             return console.log(err);
//         }
//         console.log("文件已关闭");
//     })
// }

// fs.open(PATH,'r+',(err,fd)=>{
//     if(err)
//     {
//         return console.log(err);
//     }
//     console.log("文件已打开");
//     //edit file
//     readFile(fd,(data)=>{
//         closeFile(fd);
//         console.log(`文件内容：${data}`)
//         writeFile(data);
//     })
// })