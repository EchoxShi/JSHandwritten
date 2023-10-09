// console.log('Hello World!');

// debounce 实现

1; // 执行

2;

3; // 执行

// 停留超过 3s

4; // 执行

5;

6;

7; // 执行

function debounce(fn, delay) {
  let timer = null;
  // let flag = true
  return (...agrs) => {
    if (!timer) {
      fn.apply(this, agrs);
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, agrs);
      timer = null
    }, delay);
  };
}

function test(num) {
  console.log(num);
}
let debouncefunc = debounce(test, 1000);

setTimeout(() => debouncefunc(1), 0);
setTimeout(() => debouncefunc(2), 0);
setTimeout(() => debouncefunc(3), 0);
setTimeout(() => {
  setTimeout(() => debouncefunc(4), 0);
  setTimeout(() => debouncefunc(5), 0);
  setTimeout(() => debouncefunc(6), 0);
  setTimeout(() => debouncefunc(7), 0);
}, 2000);
