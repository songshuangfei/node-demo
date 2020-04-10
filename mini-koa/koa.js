var http = require("http");


function reducer(middlewares, ctx) {
  const dispatch = (i) => {
    if (i === middlewares.length)
      return ()=>{};
    const middleware = middlewares[i];
    return middleware(ctx, ()=>dispatch(i + 1));
  }
  return function () {
    return dispatch(0);
  }()
}

class Context {
  constructor(req,res){
    this.req = req;
    this.res = res;
    this.body = null;
  }

  get url(){
    return this.req.url
  }

  get method(){
    return this.req.method
  }
}

class App {
  constructor(){
    this.middlewares = [];
  }

  listen(...args){
    let server = http.createServer(async (req, res) => {
      let ctx = new Context(req, res);
      await reducer(this.middlewares, ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}

module.exports = App;
