//动态构建promise 链
let tasks = [];
for (let index = 0; index < 10; index++) {
  tasks.push(function (d) {
    // if(index===5){
    //   return Promise.reject(index + d)
    // }
    return Promise.resolve(index + d)
  })
}
let promise = Promise.resolve(0);
tasks.forEach(t => {
  promise = promise.then((d) => {
    console.log(t(d))
    return t(d)
  })
});
promise.then(a => {
  console.log(a, "all completed")
}).catch(a => {
  console.log(a, "something failed")
});


// a
let tasks2 = [];
for (let index = 0; index < 11; index++) {
  tasks2.push(function (d) {
    return Promise.resolve(index + d)
  })
}
tasks2.reduce((prev, nextTask) => prev.then(d => nextTask(d)), Promise.resolve(0))
  .then(a => {
    console.log(a, "all completed")
  })