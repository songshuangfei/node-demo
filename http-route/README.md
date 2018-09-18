## http服务器
* 实现了静态文件服务
```javascript
app.SetStatic(path.join(__dirname,"./static"))
```
* 能设置基本的get和post路由匹配
```javascript
app.Get("/user",function(req,res){ //设置get请求
    ...
})

app.Post("/user",function(req,res){//设置post请求
    ...
})
```
