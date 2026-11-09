var maximumRows = function(matrix, numSelect) {
  const m = matrix.length;
  const n = matrix[0].length;
  const rowMask = new Int32Array(m);
  for (let i = 0; i < m; i++) {
    let mask = 0;
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) mask |= (1 << j);
    }
    rowMask[i] = mask;
  }

  let maxRows = 0;
  const total = 1 << n;
  for (let mask = 0; mask < total; mask++) {
    let cnt = 0;
    let temp = mask;
    while (temp > 0) {
      cnt += (temp & 1);
      temp >>= 1;
    }
    if (cnt === numSelect) {
      let covered = 0;
      for (let i = 0; i < m; i++) {
        if ((rowMask[i] & ~mask) === 0) {
          covered++;
        }
      }
      if (covered > maxRows) maxRows = covered;
    }
  }
  return maxRows;
};

var solve = maximumRows;

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
