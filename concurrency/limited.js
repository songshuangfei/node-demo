let { tasks } = require("./mock/tasks")

function runTasks(callback) {
  let finished = 0, running = 0, limit = 2, taskIndex = 0;
  function next() {
    while (taskIndex < tasks.length && running < limit) {
      task = tasks[taskIndex++];
      (function (i) {
        task().then(() => {
          running--;
          finished++;
          console.log(`task${i} finished`)
          if (finished === tasks.length)
            return callback();
          next();
        })
      })(taskIndex)
      running++;
    }
  }
  next();
}

console.time(`tasks time`)
runTasks(() => {
  console.log("all finished");
  console.timeEnd('tasks time');
})
