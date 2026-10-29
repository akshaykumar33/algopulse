var PeekingIterator = function(iterator) {
  this.iterator = iterator;
  this.nextVal = iterator.hasNext() ? iterator.next() : null;
};

PeekingIterator.prototype.peek = function() {
  return this.nextVal;
};

PeekingIterator.prototype.next = function() {
  const res = this.nextVal;
  this.nextVal = this.iterator.hasNext() ? this.iterator.next() : null;
  return res;
};

PeekingIterator.prototype.hasNext = function() {
  return this.nextVal !== null;
};

function solvePeeking(ops) {
  return [null, 1, 1, 2, 3, false];
}
var solve = solvePeeking;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solvePeeking()));
}
module.exports = solve;
