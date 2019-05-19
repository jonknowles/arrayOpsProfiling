const toNumArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }
  return arr;
};

const largeArray = toNumArray(100000);

const nestedArray = [];
for (let i = 0; i < 100; i++) {
  nestedArray[i] = toNumArray(200);
}

const plusFive = x => x + 5;
const greaterThan50 = x => x > 50;
const lessThan2 = x => x < 2;
const toSum = (acc, curr) => acc + curr;
const toFlattened = (acc, curr) => acc.concat(curr);
const addIndex = (e, i) => e + i;

const withProfile = (fn, desc) => (...args) => {
  let result;
  const start = new Date();
  for (let i = 0; i < 100; i++) {
    result = fn(...args);
  }
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

const arrayEvery = (fn) => (arr) => {
  return arr.every(fn);
};

const use = iteratorFn => (...firstArgs) => (...secondArgs) => {
  return iteratorFn(...firstArgs)(...secondArgs);
};

console.group('map');
withProfile(use(whileLoopMap)(plusFive), 'whileLoopMap')(largeArray);
withProfile(use(forLoopMap)(plusFive), 'forLoopMap')(largeArray);
withProfile(use(arrayMap)(plusFive), 'arrayMap')(largeArray);
console.groupEnd();

console.group('filter');
withProfile(use(whileLoopFilter)(greaterThan50), 'whileLoopFilter')(largeArray);
withProfile(use(forLoopFilter)(greaterThan50), 'forLoopFilter')(largeArray);
withProfile(use(arrayFilter)(greaterThan50), 'arrayFilter')(largeArray);
console.groupEnd();

console.group('reduce');
console.log('toSum');
withProfile(use(whileLoopReduce)(toSum, 0), 'whileLoopReduce')(largeArray);
withProfile(use(forLoopReduce)(toSum, 0), 'forLoopReduce')(largeArray);
withProfile(use(arrayReduce)(toSum, 0), 'arrayReduce')(largeArray);
console.log('toFlattened');
withProfile(use(whileLoopReduce)(toFlattened, []), 'whileLoopReduce')(nestedArray);
withProfile(use(forLoopReduce)(toFlattened, []), 'forLoopReduce')(nestedArray);
withProfile(use(arrayReduce)(toFlattened, []), 'arrayReduce')(nestedArray);
console.groupEnd();

console.group('forEach');
withProfile(use(whileLoopForEach)(addIndex), 'whileLoopForEach')(largeArray);
withProfile(use(forLoopForEach)(addIndex), 'forLoopForEach')(largeArray);
withProfile(use(arrayForEach)(addIndex), 'arrayForEach')(largeArray);
console.groupEnd();

console.group('every');
withProfile(use(whileLoopEvery)(lessThan2), 'whileLoopEvery')(largeArray);
withProfile(use(forLoopEvery)(lessThan2), 'forLoopEvery')(largeArray);
withProfile(use(arrayEvery)(lessThan2), 'arrayEvery')(largeArray);
console.groupEnd();