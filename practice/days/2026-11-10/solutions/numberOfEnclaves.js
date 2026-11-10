var numEnclaves = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const qx = new Int32Array(m * n);
  const qy = new Int32Array(m * n);
  let head = 0, tail = 0;

  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) {
      grid[i][0] = 0;
      qx[tail] = i;
      qy[tail++] = 0;
    }
    if (grid[i][n - 1] === 1) {
      grid[i][n - 1] = 0;
      qx[tail] = i;
      qy[tail++] = n - 1;
    }
  }

  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 1) {
      grid[0][j] = 0;
      qx[tail] = 0;
      qy[tail++] = j;
    }
    if (grid[m - 1][j] === 1) {
      grid[m - 1][j] = 0;
      qx[tail] = m - 1;
      qy[tail++] = j;
    }
  }

  const dirs = [0, 1, 0, -1, 0];
  while (head < tail) {
    const r = qx[head];
    const c = qy[head++];
    for (let d = 0; d < 4; d++) {
      const nr = r + dirs[d];
      const nc = c + dirs[d + 1];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 0;
        qx[tail] = nr;
        qy[tail++] = nc;
      }
    }
  }

  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) ans++;
    }
  }

  return ans;
};

var solve = numEnclaves;

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
