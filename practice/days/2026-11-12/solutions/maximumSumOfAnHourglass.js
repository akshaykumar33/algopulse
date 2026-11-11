var maxSum = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = -Infinity;

  for (let r = 0; r <= m - 3; r++) {
    const r0 = grid[r];
    const r1 = grid[r + 1];
    const r2 = grid[r + 2];
    for (let c = 0; c <= n - 3; c++) {
      const s = r0[c] + r0[c + 1] + r0[c + 2] + r1[c + 1] + r2[c] + r2[c + 1] + r2[c + 2];
      if (s > ans) ans = s;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maxSum(JSON.parse(line))));
    }
  }
}

module.exports = maxSum;
