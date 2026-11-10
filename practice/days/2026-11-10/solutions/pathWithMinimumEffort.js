var minimumEffortPath = function(heights) {
  const m = heights.length;
  const n = heights[0].length;
  if (m === 1 && n === 1) return 0;
  const dirs = [0, 1, 0, -1, 0];
  let low = 0, high = 1000000, ans = 1000000;
  const qx = new Int32Array(m * n);
  const qy = new Int32Array(m * n);
  const vis = new Uint8Array(m * n);

  while (low <= high) {
    const mid = (low + high) >> 1;
    vis.fill(0);
    let head = 0, tail = 0;
    qx[tail] = 0;
    qy[tail++] = 0;
    vis[0] = 1;
    let reach = false;

    while (head < tail) {
      const r = qx[head];
      const c = qy[head++];
      if (r === m - 1 && c === n - 1) {
        reach = true;
        break;
      }
      for (let d = 0; d < 4; d++) {
        const nr = r + dirs[d];
        const nc = c + dirs[d + 1];
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
          const idx = nr * n + nc;
          if (!vis[idx] && Math.abs(heights[nr][nc] - heights[r][c]) <= mid) {
            vis[idx] = 1;
            qx[tail] = nr;
            qy[tail++] = nc;
          }
        }
      }
    }

    if (reach) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return ans;
};

var solve = minimumEffortPath;

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
