const {
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
} = require('./loopIterators');
const {
  plusFive,
  greaterThan50 ,
  lessThan2,
  toSum,
  toFlattened,
  addIndex
} = require('./operations');

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