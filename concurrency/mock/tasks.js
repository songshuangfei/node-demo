let tasks = [];

for (let i = 0; i < 10; i++) {
  tasks.push(function () {
    let time = (i + 1) * 100;
    return new Promise((rs, rj) => {
      setTimeout(() => {
        rs(i)
      }, 2000-time);
    })
  })
}

exports.tasks = tasks;
