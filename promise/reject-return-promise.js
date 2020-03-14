function operation() {
  return new Promise((rs, rj) => {
    rj("a");
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

let newOperation = operation().then(null, d => {
  console.log(d);
  return operation2()
});

newOperation.then(d => {
  console.log("rs", d);
}, (d) => {
  console.log("rj", d)
})


