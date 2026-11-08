const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const r1 = parseInt(input[ptr++], 10) - 1;
  const c1 = parseInt(input[ptr++], 10) - 1;
  const r2 = parseInt(input[ptr++], 10) - 1;
  const c2 = parseInt(input[ptr++], 10) - 1;

  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(input[ptr++]);
  }

  function bfs(startR, startC) {
    const comp = [];
    const vis = Array.from({ length: n }, () => new Uint8Array(n));
    const q = [[startR, startC]];
    vis[startR][startC] = 1;
    let head = 0;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (head < q.length) {
      const [r, c] = q[head++];
      comp.push([r, c]);
      for (let i = 0; i < 4; i++) {
        const nr = r + dirs[i][0];
        const nc = c + dirs[i][1];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc] && grid[nr][nc] === '0') {
          vis[nr][nc] = 1;
          q.push([nr, nc]);
        }
      }
    }
    return { comp, vis };
  }

  const { comp: comp1, vis: vis1 } = bfs(r1, c1);
  if (vis1[r2][c2]) {
    console.log(0);
    return;
  }

  const { comp: comp2 } = bfs(r2, c2);
  let ans = Infinity;
  for (let i = 0; i < comp1.length; i++) {
    const [ra, ca] = comp1[i];
    for (let j = 0; j < comp2.length; j++) {
      const [rb, cb] = comp2[j];
      const dist = (ra - rb) * (ra - rb) + (ca - cb) * (ca - cb);
      if (dist < ans) ans = dist;
    }
  }

  console.log(ans);
}

solve();
