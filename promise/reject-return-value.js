function operation(){
  return new Promise((rs, rj) => { 
    rj("a");
  })
}

//then 返回一个新的Promise newOperation，newOperation将resolve "b"
let newOperation = operation().then(null, (d) => {
  console.log(d);
  return "b"
});

newOperation.then(d=>{
  console.log(d);//b
})

