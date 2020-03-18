module.exports = function (fn, interval = 300) {
  let available = true;
  return function(...args){
    if (available){
      fn(...args);
      available = false;
      setTimeout(()=>{
        available = true;
      },interval)
    }
  }
}
