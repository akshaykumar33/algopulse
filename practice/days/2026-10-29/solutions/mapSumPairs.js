var MapSum = function() {
  this.map = new Map();
};

MapSum.prototype.insert = function(key, val) {
  this.map.set(key, val);
};

MapSum.prototype.sum = function(prefix) {
  let total = 0;
  for (const [k, v] of this.map.entries()) {
    if (k.startsWith(prefix)) {
      total += v;
    }
  }
  return total;
};

function solveMapSum() {
  const ms = new MapSum();
  ms.insert("apple", 3);
  const s1 = ms.sum("ap");
  ms.insert("app", 2);
  const s2 = ms.sum("ap");
  return [null, null, s1, null, s2];
}
var solve = solveMapSum;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveMapSum()));
}
module.exports = solve;
