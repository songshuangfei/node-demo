function operation() {
  return new Promise((rs, rj) => {
    rs("a");
  })
}

function operation2() { 
  return new Promise((rs, rj) => {
    let r = Math.random().toFixed(1);
    if (r <= 0.5) {
      rs(r)
    } else {
      rj(r)
    }
  })
}

//operation2的执行结果将作为newOperation的执行结果
let newOperation = operation().then(d => {
  console.log(d);
  return operation2()
}, null);

newOperation.then(d => {
  console.log("rs", d);
}, (d) => {
  console.log("rj", d)
})

