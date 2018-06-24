const request = require('request');
const path = require('path');
const fs = require('fs')

const config =require('./config');
const analyze = require('./analyze');


function download(imgUrl,i){
    let ext = imgUrl.split('.').pop();
    try {
        request(imgUrl).pipe(fs.createWriteStream(path.join(config.imgDir,i + '.' + ext),{
            'encoding':'utf8'
        }));
    } catch (error) {
        console.log(`第${i}张图片无法获取,错误:${error}`)
        return;
    }
    console.log(`第${i}张图片下载成功`);
}

function start(){
    request(config.url,(err, res, body)=>{
        console.log('start');
        if(!err && res){
            console.log('start');
            analyze.findImg(body,download);
        }
    })
}


start();
