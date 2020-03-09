let { tasks } = require("./mock/tasks")

function runTask(callback) {
  let index = 0, finished = 0;
  function next() {
    let task = tasks[index++];
    task().then(() => {
      finished++;
      console.log(`task${index} finished`)
      if (finished === tasks.length)
        return callback();
      next();
    })
  };
  next();
}

console.time(`tasks time`)
runTask(() => {
  console.log("all finished");
  console.timeEnd('tasks time');
})
