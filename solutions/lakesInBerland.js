const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const grid = [];
  for (let i = 0; i < n; i++) grid.push(tokens[ptr++].split(''));
  const vis = new Uint8Array(n * m);
  const qR = new Int32Array(n * m);
  const qC = new Int32Array(n * m);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if ((i === 0 || i === n - 1 || j === 0 || j === m - 1) && grid[i][j] === '.' && !vis[i * m + j]) {
        let head = 0, tail = 0;
        qR[tail] = i; qC[tail++] = j;
        vis[i * m + j] = 1;
        while (head < tail) {
          const r = qR[head], c = qC[head++];
          const dirs = [0, 1, 0, -1, 1, 0, -1, 0];
          for (let d = 0; d < 8; d += 2) {
            const nr = r + dirs[d], nc = c + dirs[d + 1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === '.' && !vis[nr * m + nc]) {
              vis[nr * m + nc] = 1;
              qR[tail] = nr; qC[tail++] = nc;
            }
          }
        }
      }
    }
  }

  const lakes = [];
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (grid[i][j] === '.' && !vis[i * m + j]) {
        let head = 0, tail = 0;
        qR[tail] = i; qC[tail++] = j;
        vis[i * m + j] = 1;
        const cells = [{ r: i, c: j }];
        while (head < tail) {
          const r = qR[head], c = qC[head++];
          const dirs = [0, 1, 0, -1, 1, 0, -1, 0];
          for (let d = 0; d < 8; d += 2) {
            const nr = r + dirs[d], nc = c + dirs[d + 1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === '.' && !vis[nr * m + nc]) {
              vis[nr * m + nc] = 1;
              qR[tail] = nr; qC[tail++] = nc;
              cells.push({ r: nr, c: nc });
            }
          }
        }
        lakes.push(cells);
      }
    }
  }

  lakes.sort((a, b) => a.length - b.length);
  let ans = 0;
  const toFill = lakes.length - k;
  for (let i = 0; i < toFill; i++) {
    ans += lakes[i].length;
    for (const cell of lakes[i]) grid[cell.r][cell.c] = '*';
  }
  console.log(ans);
  console.log(grid.map(row => row.join('')).join('\n'));
}
