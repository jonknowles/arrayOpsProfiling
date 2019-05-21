const {
  expect
}= require('chai');
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
} = require('../src/loopIterators');
const {
  plusFive,
  greaterThan50 ,
  lessThan2,
  toSum,
  toFlattened,
  addIndex
} = require('../src/operations');

const numbers = [ 1, 2, 5, -4, 77, 234, 5, 34356, 6, 342 ];
const nestedNumbers = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 1 ], [ 0 ] , [] ];

describe('reduce', function() {

  const actualSum = numbers.reduce(toSum, 0);

  describe('forLoopReduce', function() {
    const sum = forLoopReduce(toSum, 0)(numbers);
    it('should produce the same results', function() {
      expect(sum).to.equal(actualSum);
    });
  });
  describe('whileLoopReduce', function() {
    const sum = whileLoopReduce(toSum, 0)(numbers);
    it('should produce the same results', function() {
      expect(sum).to.equal(actualSum);
    });
  });

  const actualFlattened = nestedNumbers.reduce(toFlattened, []);

  describe('forLoopReduce', function() {
    const flat = forLoopReduce(toFlattened, [])(nestedNumbers);
    it('should produce the same results', function() {
      expect(flat).to.deep.equal(actualFlattened);
    });
  });
  describe('whileLoopReduce', function() {
    const flat = whileLoopReduce(toFlattened, [])(nestedNumbers);
    it('should produce the same results', function() {
      expect(flat).to.deep.equal(actualFlattened);
    });
  });
});

describe('forEach', function() {

  describe('forLoopForEach', function() {
    const target = [];
    forLoopForEach(e=> target.push(e))(numbers);
    it('should produce the same results', function() {
      expect(target).to.deep.equal(numbers);
    });
  });
  describe('whileLoopForEach', function() {
    const target = [];
    whileLoopForEach(e=> target.push(e))(numbers);
    it('should produce the same results', function() {
      expect(target).to.deep.equal(numbers);
    });
  });
});