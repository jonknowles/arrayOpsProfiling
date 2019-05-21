
const forLoopMap = fn => arr => {
  const resultArr = [];
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    resultArr.push(fn(arr[i], i, arr));
  }
  return resultArr;
};

const whileLoopMap = fn => arr => {
  const resultArr = [];
  let i = 0;
  const _len = arr.length;
  while(i < _len) {
    resultArr.push(fn(arr[i], i, arr));
    i++;
  }
  return resultArr;
};

const forLoopFilter = pred => arr => {
  const resultArr = [];
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    const e = arr[i];
    if (pred(e, i, arr)) {
      resultArr.push(e);
    }
  }
  return resultArr;
};

const whileLoopFilter = pred => arr => {
  const resultArr = [];
  const _len = arr.length;
  let i = 0;
  while(i < _len) {
    const e = arr[i];
    if (pred(e, i, arr)) {
      resultArr.push(e);
    }
    i++;
  }
  return resultArr;
};

const forLoopReduce = (fn, seed) => arr => {
  const _len = arr.length;
  let acc = seed === undefined
    ? arr[0]
    : seed;
  for (let i = 0; i < _len; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc;
};

const whileLoopReduce = (fn, seed) => arr => {
  const _len = arr.length;
  let acc = seed === undefined
    ? arr[0]
    : seed;

  let i = 0;
  while(i < _len) {
    acc = fn(acc, arr[i], i, arr);
    i++;
  }
  return acc;
};

const forLoopForEach = fn => arr => {
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    fn(arr[i], i, arr);
  }
};

const whileLoopForEach = fn => arr => {
  const _len = arr.length;
  let i = 0;
  while (i < _len) {
    fn(arr[i], i, arr);
    i++;
  }
};

const forLoopEvery = pred => arr => {
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    if(!pred(arr[i], i, arr)) return false;
  }
  return true;
};

const whileLoopEvery = pred => arr => {
  const _len = arr.length;
  let i = 0;
  while(i < _len) {
    if(!pred(arr[i], i, arr)) return false;
    i++;
  }
  return true;
};

module.exports = {
  forLoopEvery,
  forLoopFilter,
  forLoopForEach,
  forLoopMap,
  forLoopReduce,
  whileLoopEvery,
  whileLoopFilter,
  whileLoopForEach,
  whileLoopMap,
  whileLoopReduce
}