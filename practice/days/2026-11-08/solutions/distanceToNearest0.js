const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const out = [];

  while (ptr < tokens.length) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const dist = [];
    const q = [];
    let head = 0;

    for (let i = 0; i < n; i++) {
      const row = new Int32Array(m);
      for (let j = 0; j < m; j++) {
        const val = parseInt(tokens[ptr++], 10);
        if (val === 0) {
          row[j] = 0;
          q.push((i << 16) | j);
        } else {
          row[j] = -1;
        }
      }
      dist.push(row);
    }

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    while (head < q.length) {
      const cur = q[head++];
      const r = cur >> 16;
      const c = cur & 0xffff;
      const d = dist[r][c] + 1;

      for (let k = 0; k < 4; k++) {
        const nr = r + dr[k];
        const nc = c + dc[k];
        if (nr >= 0 && nr < n && nc >= 0 && nc < m && dist[nr][nc] === -1) {
          dist[nr][nc] = d;
          q.push((nr << 16) | nc);
        }
      }
    }

    for (let i = 0; i < n; i++) {
      out.push(dist[i].join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
