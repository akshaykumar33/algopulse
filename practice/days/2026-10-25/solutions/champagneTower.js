var champagneTower = function(poured, query_row, query_glass) {
  let row = [poured];
  for (let r = 0; r < query_row; r++) {
    const nextRow = new Float64Array(r + 2);
    for (let c = 0; c <= r; c++) {
      if (row[c] > 1) {
        const excess = (row[c] - 1) / 2;
        nextRow[c] += excess;
        nextRow[c + 1] += excess;
      }
    }
    row = nextRow;
  }
  return Math.min(1, row[query_glass]);
};

var solve = champagneTower;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(Number(solve(parsed[0], parsed[1], parsed[2]).toFixed(5))));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = champagneTower;
