var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var filetype = require("./fileType")

var App = function(){
    var that = this;
    that.server = http.createServer(function(req, res) {
        that._matchRoute(req,res);
    })
};

App.prototype = {
    server:null,
    staticDir:'',
    gets:[],
    posts:[],
    Serverlisten: function(port,callback){
        if(this.server){
            this.server.listen(port,function(){
                callback();
            })
        }
    },

    SetStatic: function(staticDir){
        this.staticDir = staticDir;
    },

    Get: function(path,handlefunc){ //添加get请求处理器
        this.gets.push({path:path,handlefunc:handlefunc});
    },
    Post: function(path,handlefunc){  //添加post请求处理器
        this.posts.push({path:path,handlefunc:handlefunc});
    },

    _matchRoute: function(req,res){//匹配路由
        if(req.method === "GET"){
            this._matchGet(req,res);
        }
        if(req.method === "POST"){
            this._matchPostApi(req,res);
        }
    },

    _matchGet: function(req,res){//匹配get请求
        var that = this;
        if(this.staticDir){
            var filepath;
            if(url.parse(req.url).pathname === "/"){
                filepath = path.join(this.staticDir,"/index.html");
            }else{
                filepath = path.join(this.staticDir,url.parse(req.url).pathname);
            }
            fs.exists(filepath,function(exist){ 
                if(exist){//匹配静态文件
                    var data = fs.readFileSync(filepath);
                    var conType = filetype[path.extname(filepath)];
                    res.writeHead(200,{
                        "content-type":conType
                    })
                    res.write(data);
                    res.end();
                }else{//匹配GET api
                    that._matchGetApi(req,res);
                }
            })
        }
    },

    _matchGetApi:function(req,res){//匹配get api
        for(let i = 0;i < this.gets.length;i++){
            if(url.parse(req.url).pathname === this.gets[i].path){
                this.gets[i].handlefunc(req,res);
                return;
            }
        }
    },

    _matchPostApi: function(req,res){//匹配post请求
        for(let i = 0;i < this.posts.length;i++){
            if(url.parse(req.url).pathname === this.posts[i].path){
                this.posts[i].handlefunc(req,res);
                return;
            }
        }
    }

}


module.exports = new App();
