let { tasks } = require("./mock/tasks")

function runTask(callback) {
  let finished = 0;
  tasks.forEach((task, i) => {
    task().then(() => {
      console.log(`task${i + 1} finished`)
      finished++;
      if (finished === tasks.length) {
        callback();
      }
    })
  });
}

console.time('tasks time');
runTask(() => {
  console.log("all finished");
  console.timeEnd('tasks time');
})