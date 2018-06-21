const cheerio = require('cheerio');
const config = require('./config');

function findImg(dom, callback){
    let $ = cheerio.load(dom);
    $('img').each((i,elem)=>{
        let imgSrc = elem.attribs.src;
        if(imgSrc){
            callback(imgSrc,i);
        }
    })
}

module.exports.findImg = findImg;