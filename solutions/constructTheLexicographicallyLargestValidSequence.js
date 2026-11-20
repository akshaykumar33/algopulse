var constructDistancedSequence = function(n) {
  const size = 2 * n - 1;
  const res = new Int32Array(size);
  const used = new Uint8Array(n + 1);

  function backtrack(idx) {
    if (idx === size) return true;
    if (res[idx] !== 0) return backtrack(idx + 1);

    for (let num = n; num >= 1; num--) {
      if (used[num]) continue;
      if (num === 1) {
        res[idx] = 1;
        used[1] = 1;
        if (backtrack(idx + 1)) return true;
        res[idx] = 0;
        used[1] = 0;
      } else {
        const nextIdx = idx + num;
        if (nextIdx < size && res[nextIdx] === 0) {
          res[idx] = num;
          res[nextIdx] = num;
          used[num] = 1;
          if (backtrack(idx + 1)) return true;
          res[idx] = 0;
          res[nextIdx] = 0;
          used[num] = 0;
        }
      }
    }
    return false;
  }

  backtrack(0);
  return Array.from(res);
};

var solve = constructDistancedSequence;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = constructDistancedSequence;