var minSwaps = function(grid) {
  const n = grid.length;
  const right = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let pos = -1;
    const row = grid[i];
    for (let j = n - 1; j >= 0; j--) {
      if (row[j] === 1) {
        pos = j;
        break;
      }
    }
    right[i] = pos;
  }
  let swaps = 0;
  for (let i = 0; i < n; i++) {
    let found = -1;
    for (let j = i; j < n; j++) {
      if (right[j] <= i) {
        found = j;
        break;
      }
    }
    if (found === -1) return -1;
    for (let j = found; j > i; j--) {
      const tmp = right[j];
      right[j] = right[j - 1];
      right[j - 1] = tmp;
      swaps++;
    }
  }
  return swaps;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(minSwaps(JSON.parse(line))));
    }
  }
}

module.exports = minSwaps;
