const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const r = nextInt();
  if (r === null) return;
  const c = nextInt(), n = nextInt(), p = nextInt();
  const posR = new Int32Array(n + 1);
  const posC = new Int32Array(n + 1);
  const grid = Array.from({ length: r }, () => new Int32Array(c));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const val = nextInt();
      grid[i][j] = val;
      if (val > 0) {
        posR[val] = i;
        posC[val] = j;
      }
    }
  }
  const seen = new Uint8Array(n + 1);
  let distinctCount = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let i = 1; i <= p; i++) {
    const cr = posR[i], cc = posC[i], shift = p - i;
    for (const [dr, dc] of dirs) {
      const nr = cr + dr, nc = cc + dc;
      if (nr >= 0 && nr < r && nc >= 0 && nc < c) {
        const j = grid[nr][nc];
        if (j > 0) {
          const q = j + shift;
          if (q <= n && !seen[q]) {
            seen[q] = 1;
            distinctCount++;
          }
        }
      }
    }
  }
  console.log(distinctCount + '/' + (n - 1));
}

solve();
