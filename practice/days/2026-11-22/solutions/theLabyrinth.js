const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const grid = [];
  for (let i = 0; i < n; i++) grid.push(input[2 + i]);
  const compId = new Int32Array(n * m).fill(-1);
  const compSize = [];
  const q = new Int32Array(n * m);
  let comps = 0;
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === '.' && compId[r * m + c] === -1) {
        let head = 0, tail = 0;
        const start = r * m + c;
        q[tail++] = start;
        compId[start] = comps;
        while (head < tail) {
          const curr = q[head++];
          const cr = Math.floor(curr / m), cc = curr % m;
          for (let d = 0; d < 4; d++) {
            const nr = cr + dr[d], nc = cc + dc[d];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === '.' && compId[nr * m + nc] === -1) {
              const nxt = nr * m + nc;
              compId[nxt] = comps;
              q[tail++] = nxt;
            }
          }
        }
        compSize.push(tail);
        comps++;
      }
    }
  }
  const res = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === '.') {
        row += '.';
      } else {
        const seen = [];
        let total = 1;
        for (let d = 0; d < 4; d++) {
          const nr = r + dr[d], nc = c + dc[d];
          if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === '.') {
            const id = compId[nr * m + nc];
            if (!seen.includes(id)) {
              seen.push(id);
              total += compSize[id];
            }
          }
        }
        row += (total % 10);
      }
    }
    res.push(row);
  }
  console.log(res.join('\n'));
}
solve();