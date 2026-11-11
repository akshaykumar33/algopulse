var minOperations = function(grid, x) {
  const m = grid.length;
  const n = grid[0].length;
  const total = m * n;
  const arr = new Int32Array(total);
  const rem = grid[0][0] % x;
  let k = 0;
  for (let i = 0; i < m; i++) {
    const row = grid[i];
    for (let j = 0; j < n; j++) {
      const v = row[j];
      if (v % x !== rem) return -1;
      arr[k++] = v;
    }
  }
  arr.sort();
  const med = arr[total >> 1];
  let ans = 0;
  for (let i = 0; i < total; i++) {
    ans += Math.abs(arr[i] - med) / x;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === minOperations.length && !(Array.isArray(parsed[0]) && parsed[0].length === minOperations.length && parsed.every((p) => Array.isArray(p) && p.length === minOperations.length))) {
      console.log(JSON.stringify(minOperations(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(minOperations(...p)));
      }
    }
  }
}

module.exports = minOperations;
