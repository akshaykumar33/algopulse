var minimumMoves = function(grid) {
  const zeros = [];
  const extras = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[r][c] === 0) zeros.push([r, c]);
      else if (grid[r][c] > 1) {
        for (let k = 1; k < grid[r][c]; k++) extras.push([r, c]);
      }
    }
  }
  if (zeros.length === 0) return 0;
  let minCost = Infinity;
  const visited = new Uint8Array(extras.length);
  function backtrack(zIdx, curCost) {
    if (curCost >= minCost) return;
    if (zIdx === zeros.length) {
      minCost = curCost;
      return;
    }
    const [zr, zc] = zeros[zIdx];
    for (let i = 0; i < extras.length; i++) {
      if (!visited[i]) {
        visited[i] = 1;
        const [er, ec] = extras[i];
        backtrack(zIdx + 1, curCost + Math.abs(zr - er) + Math.abs(zc - ec));
        visited[i] = 0;
      }
    }
  }
  backtrack(0, 0);
  return minCost;
};

var solve = minimumMoves;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const grid = (parsed.length === 1 && Array.isArray(parsed[0]) && Array.isArray(parsed[0][0])) ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(grid)));
    }
  } catch (e) {}
}

module.exports = minimumMoves;