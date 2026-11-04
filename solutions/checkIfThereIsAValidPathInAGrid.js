const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const PORTS = [
  [],
  [1, 3],
  [0, 2],
  [2, 3],
  [1, 2],
  [0, 3],
  [0, 1],
];

var hasValidPath = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => new Uint8Array(n));

  const q = [[0, 0]];
  visited[0][0] = 1;
  let head = 0;

  while (head < q.length) {
    const [r, c] = q[head++];
    if (r === m - 1 && c === n - 1) return true;

    const ports = PORTS[grid[r][c]];
    for (let i = 0; i < ports.length; i++) {
      const d = ports[i];
      const nr = r + DIRS[d][0];
      const nc = c + DIRS[d][1];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        const nextPorts = PORTS[grid[nr][nc]];
        const opposite = (d + 2) % 4;
        if (nextPorts.includes(opposite)) {
          visited[nr][nc] = 1;
          q.push([nr, nc]);
        }
      }
    }
  }

  return false;
};

var checkIfThereIsAValidPathInAGrid = hasValidPath;
var solve = typeof checkIfThereIsAValidPathInAGrid !== 'undefined' ? checkIfThereIsAValidPathInAGrid : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

