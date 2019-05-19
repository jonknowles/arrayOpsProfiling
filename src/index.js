const largeArray = [];
for (let i = 0; i < 1000000; i++) {
  largeArray[i] = Math.floor(Math.random() * 100);
}

const plusFive = x => x + 5;
const greaterThan50 = x => x > 50;
const toSum = (acc, curr) => acc + curr;
const addIndex = (e, i) => e + i;

const withProfile = (fn, desc) => (...args) => {
  const start = new Date();
  const result = fn(...args);
  const duration = new Date() - start;
  console.log(`${desc}: ${duration}`);
  return result;
};

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

const forLoopForEach = fn => arr => {
  const _len = arr.length;
  for (let i = 0; i < _len; i++) {
    fn(arr[i], i, arr);
  }
};

const arrayMap = (fn) => (arr) => {
  return arr.map(fn);
};

const arrayFilter = (fn) => (arr) => {
  return arr.filter(fn);
};

const arrayReduce = (fn, seed) => (arr) => {
  return arr.reduce(fn, seed);
};

const arrayForEach = (fn) => (arr) => {
  return arr.forEach(fn);
};

const use = iteratorFn => innerFn => arr => {
  return iteratorFn(innerFn)(arr);
};

console.log('map');
console.group();
withProfile(use(whileLoopMap)(plusFive), 'whileLoopMap')(largeArray);
withProfile(use(forLoopMap)(plusFive), 'forLoopMap')(largeArray);
withProfile(use(arrayMap)(plusFive), 'arrayMap')(largeArray);
console.groupEnd();

console.log('filter');
console.group();
withProfile(use(forLoopFilter)(greaterThan50), 'forLoopFilter')(largeArray);
withProfile(use(arrayFilter)(greaterThan50), 'arrayFilter')(largeArray);
console.groupEnd();

console.log('reduce');
console.group();
withProfile(use(forLoopReduce)(toSum, 0), 'forLoopReduce')(largeArray);
withProfile(use(arrayReduce)(toSum, 0), 'arrayReduce')(largeArray);
console.groupEnd();

console.log('forEach');
console.group();
withProfile(use(forLoopForEach)(addIndex), 'forLoopForEach')(largeArray);
withProfile(use(arrayForEach)(addIndex), 'arrayForEach')(largeArray);
console.groupEnd();