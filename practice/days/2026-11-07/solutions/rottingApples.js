const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const grid = Array.from({ length: n }, () => new Int32Array(m));
  const dist = Array.from({ length: n }, () => new Int32Array(m).fill(-1));
  const q = [];
  let fresh = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      grid[r][c] = parseInt(tokens[ptr++], 10);
      if (grid[r][c] === 2) {
        dist[r][c] = 0;
        q.push(r * m + c);
      } else if (grid[r][c] === 1) {
        fresh++;
      }
    }
  }

  let head = 0;
  let maxTime = 0;
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (head < q.length) {
    const idx = q[head++];
    const r = Math.floor(idx / m);
    const c = idx % m;
    const curD = dist[r][c];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 1 && dist[nr][nc] === -1) {
        dist[nr][nc] = curD + 1;
        if (curD + 1 > maxTime) maxTime = curD + 1;
        fresh--;
        q.push(nr * m + nc);
      }
    }
  }

  console.log(fresh > 0 ? -1 : maxTime);
}

solve();
