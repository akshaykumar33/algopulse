var maximumSafenessFactor = function(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return 0;

  const dist = Array.from({ length: n }, () => new Int32Array(n).fill(-1));
  const qR = new Int32Array(n * n);
  const qC = new Int32Array(n * n);
  let head = 0;
  let tail = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        dist[r][c] = 0;
        qR[tail] = r;
        qC[tail++] = c;
      }
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (head < tail) {
    const r = qR[head];
    const c = qC[head++];
    const d = dist[r][c];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === -1) {
        dist[nr][nc] = d + 1;
        qR[tail] = nr;
        qC[tail++] = nc;
      }
    }
  }

  function canReach(minD) {
    if (dist[0][0] < minD || dist[n - 1][n - 1] < minD) return false;
    const vis = Array.from({ length: n }, () => new Uint8Array(n));
    vis[0][0] = 1;
    let bHead = 0;
    let bTail = 0;
    qR[bTail] = 0;
    qC[bTail++] = 0;

    while (bHead < bTail) {
      const r = qR[bHead];
      const c = qC[bHead++];
      if (r === n - 1 && c === n - 1) return true;

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc] && dist[nr][nc] >= minD) {
          vis[nr][nc] = 1;
          qR[bTail] = nr;
          qC[bTail++] = nc;
        }
      }
    }
    return false;
  }

  let l = 0;
  let r = 2 * n;
  let ans = 0;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (canReach(mid)) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return ans;
};

var solve = maximumSafenessFactor;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      let parsed = JSON.parse(raw);
      while (Array.isArray(parsed) && parsed.length === 1 && Array.isArray(parsed[0])) {
        parsed = parsed[0];
      }
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
