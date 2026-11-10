var countSubIslands = function(grid1, grid2) {
  const m = grid1.length;
  const n = grid1[0].length;
  const qx = new Int32Array(m * n);
  const qy = new Int32Array(m * n);
  const dirs = [0, 1, 0, -1, 0];
  let ans = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid2[i][j] === 1) {
        let isSub = true;
        let head = 0, tail = 0;
        grid2[i][j] = 0;
        qx[tail] = i;
        qy[tail++] = j;

        while (head < tail) {
          const r = qx[head];
          const c = qy[head++];
          if (grid1[r][c] === 0) isSub = false;

          for (let d = 0; d < 4; d++) {
            const nr = r + dirs[d];
            const nc = c + dirs[d + 1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid2[nr][nc] === 1) {
              grid2[nr][nc] = 0;
              qx[tail] = nr;
              qy[tail++] = nc;
            }
          }
        }

        if (isSub) ans++;
      }
    }
  }

  return ans;
};

var solve = countSubIslands;

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
