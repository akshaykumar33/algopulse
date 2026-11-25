var minFlips = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let rowFlips = 0;
  for (let r = 0; r < m; r++) {
    const row = grid[r];
    for (let c = 0; c < (n >> 1); c++) {
      if (row[c] !== row[n - 1 - c]) rowFlips++;
    }
  }
  let colFlips = 0;
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < (m >> 1); r++) {
      if (grid[r][c] !== grid[m - 1 - r][c]) colFlips++;
    }
  }
  return rowFlips < colFlips ? rowFlips : colFlips;
};

var solve = minFlips;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const grid = JSON.parse(lines[i]);
      out.push(JSON.stringify(minFlips(grid)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = minFlips;
