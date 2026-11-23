const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const n = nextInt();
  if (n === null) return;
  const a = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) a[i] = nextInt();
  const dist = new Int32Array(n + 1).fill(-1);
  const q = new Int32Array(n + 1);
  let head = 0, tail = 0;
  dist[1] = 0;
  q[tail++] = 1;
  while (head < tail) {
    const u = q[head++];
    const d = dist[u];
    if (u > 1 && dist[u - 1] === -1) {
      dist[u - 1] = d + 1;
      q[tail++] = u - 1;
    }
    if (u < n && dist[u + 1] === -1) {
      dist[u + 1] = d + 1;
      q[tail++] = u + 1;
    }
    const v = a[u];
    if (dist[v] === -1) {
      dist[v] = d + 1;
      q[tail++] = v;
    }
  }
  const res = [];
  for (let i = 1; i <= n; i++) res.push(dist[i]);
  console.log(res.join(' '));
}

solve();
