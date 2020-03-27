let tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => Promise.resolve(i));

Promise.all(tasks).then(a=>{
  console.log(a,"all completed");
})