var maxEqualRowsAfterFlips = function(matrix) {
  const map = new Map();
  let maxCount = 0;

  for (let r = 0; r < matrix.length; r++) {
    const row = matrix[r];
    const flip = row[0] === 1;
    let pattern = '';
    for (let c = 0; c < row.length; c++) {
      pattern += flip ? (row[c] ^ 1) : row[c];
    }

    const count = (map.get(pattern) || 0) + 1;
    map.set(pattern, count);
    if (count > maxCount) maxCount = count;
  }

  return maxCount;
};

var solve = typeof maxEqualRowsAfterFlips !== 'undefined' ? maxEqualRowsAfterFlips : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const matrix = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(matrix)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

