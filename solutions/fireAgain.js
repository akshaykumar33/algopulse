const fs = require('fs');

function solve() {
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf-8');
  } catch {}
  if (!raw || raw.trim().length === 0) {
    if (fs.existsSync('input.txt')) {
      raw = fs.readFileSync('input.txt', 'utf-8');
    }
  }

  const input = raw.trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const dist = Array.from({ length: n + 1 }, () => new Int32Array(m + 1).fill(-1));
  const qx = new Int32Array(n * m + 5);
  const qy = new Int32Array(n * m + 5);
  let head = 0, tail = 0;

  for (let i = 0; i < k; i++) {
    const r = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    dist[r][c] = 0;
    qx[tail] = r;
    qy[tail++] = c;
  }

  let lastX = qx[0], lastY = qy[0];
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (head < tail) {
    const x = qx[head];
    const y = qy[head++];
    lastX = x;
    lastY = y;

    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];
      if (nx >= 1 && nx <= n && ny >= 1 && ny <= m && dist[nx][ny] === -1) {
        dist[nx][ny] = dist[x][y] + 1;
        qx[tail] = nx;
        qy[tail++] = ny;
      }
    }
  }

  const ans = lastX + ' ' + lastY;
  try {
    fs.writeFileSync('output.txt', ans + '\n');
  } catch {}
  console.log(ans);
}

solve();
