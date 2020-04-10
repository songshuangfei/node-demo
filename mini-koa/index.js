var Koa = require("./koa");
let app = new Koa();

app.use(async (ctx, next) => { 
  let 
})

app.use(async (ctx, next) => { 
  console.log(`${ctx.method} ${ctx.url} at ${new Date()}`);
  await next();
  console.log(`${ctx.method} ${ctx.url} finished at ${new Date()}`)
})

app.use(async (ctx, next) => {
  console.log("set body");
  ctx.body = "mini koa";
  console.log("body set end");
})

app.listen(3000,()=>{
  console.log("server start");
});