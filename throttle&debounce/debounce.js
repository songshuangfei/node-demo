module.exports = function (fn, interval = 300) {
  let timeOut = null;
  return function (...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      fn(...args);
    }, interval);
  }
}