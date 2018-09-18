var app = require("./route/app");
var path = require("path")

app.SetStatic(path.join(__dirname,"./static"))//设置静态文件目录


app.Get("/user",function(req,res){
    res.write("user page");
    res.end();
})

app.Post("/user",function(req,res){
    res.write("user info");
    res.end();
})

app.Get("/about",function(req,res){
    res.write("about page");
    res.end();
})

app.Serverlisten(8000,function(){
    console.log("listen at 8000")
})


