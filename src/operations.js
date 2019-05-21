const plusFive = x => x + 5;
const greaterThan50 = x => x > 50;
const lessThan2 = x => x < 2;
const toSum = (acc, curr) => acc + curr;
const toFlattened = (acc, curr) => acc.concat(curr);
const addIndex = (e, i) => e + i;

module.exports = {
  plusFive,
  greaterThan50 ,
  lessThan2,
  toSum,
  toFlattened,
  addIndex
}