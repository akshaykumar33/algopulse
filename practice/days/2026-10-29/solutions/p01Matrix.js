var updateMatrix = function(mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dist = Array.from({ length: m }, () => new Int32Array(n).fill(-1));
  const qx = new Int32Array(m * n);
  const qy = new Int32Array(m * n);
  let head = 0;
  let tail = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        qx[tail] = r;
        qy[tail] = c;
        tail++;
      }
    }
  }

  const dirs = [-1, 0, 1, 0, -1];
  while (head < tail) {
    const r = qx[head];
    const c = qy[head];
    head++;

    const d = dist[r][c] + 1;
    for (let i = 0; i < 4; i++) {
      const nr = r + dirs[i];
      const nc = c + dirs[i + 1];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === -1) {
        dist[nr][nc] = d;
        qx[tail] = nr;
        qy[tail] = nc;
        tail++;
      }
    }
  }
  return dist.map(row => Array.from(row));
};

var solve = typeof updateMatrix !== 'undefined' ? updateMatrix : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
