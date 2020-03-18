let throttle = require("./throttle");
let debounce = require("./debounce");

function _add(a,b){
  console.log(a+b);
}

let add1 = throttle(_add,200);
let add2 = throttle(_add,200);
add1(1,1);
add2(99,1);
add1(1,2);
add2(999,1);
setTimeout(()=>{
  add1(3,3);
  add2(9999,1);
},300);


function _search(keyword) {
  console.log("searching " + keyword)
}


let search1 = debounce(_search, 300);
search1("a");
search1("ab");
search1("abc");

setTimeout(() => {
  search1("ab");
}, 400);
