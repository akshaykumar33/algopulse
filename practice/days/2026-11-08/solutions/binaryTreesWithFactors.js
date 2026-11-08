var numFactoredBinaryTrees = function(arr) {
  const MOD = 1000000007;
  arr.sort((a, b) => a - b);
  const dp = new Map();
  for (let i = 0; i < arr.length; i++) {
    dp.set(arr[i], 1);
  }
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    let ways = 1;
    for (let j = 0; j < i; j++) {
      const left = arr[j];
      if (left * left > val) break;
      if (val % left === 0) {
        const right = val / left;
        if (dp.has(right)) {
          const add = (dp.get(left) * dp.get(right)) % MOD;
          if (left === right) {
            ways = (ways + add) % MOD;
          } else {
            ways = (ways + add * 2) % MOD;
          }
        }
      }
    }
    dp.set(val, ways);
  }
  let total = 0;
  for (const count of dp.values()) {
    total = (total + count) % MOD;
  }
  return total;
};

var solve = numFactoredBinaryTrees;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
