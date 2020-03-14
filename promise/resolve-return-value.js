function operation() {
  return new Promise((rs, rj) => {
    rs("a");
  })
}

//then 返回一个新的Promise newOperation，newOperation将resolve "b"
let newOperation = operation().then(d => {
  console.log(d);
  return "b"
}, null);

newOperation.then(d => {
  console.log(d);//b
})

