const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8');
  const len = raw.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && raw.charCodeAt(ptr) <= 32) ptr++;
    if (ptr >= len) return -1;
    let res = 0;
    while (ptr < len) {
      const c = raw.charCodeAt(ptr);
      if (c <= 32) break;
      res = res * 10 + (c - 48);
      ptr++;
    }
    return res;
  }

  const n = nextInt();
  if (n < 0) return;
  const m = nextInt();
  const total = n * m;

  const grid = new Uint8Array(total);
  for (let i = 0; i < total; i++) {
    grid[i] = nextInt();
  }

  const vis = new Uint8Array(total);
  const q = new Int32Array(total);
  const rooms = [];

  for (let idx = 0; idx < total; idx++) {
    if (vis[idx]) continue;
    vis[idx] = 1;
    let head = 0;
    let tail = 0;
    q[tail++] = idx;

    while (head < tail) {
      const cur = q[head++];
      const r = (cur / m) | 0;
      const c = cur - r * m;
      const mask = grid[cur];

      if ((mask & 8) === 0 && r > 0) {
        const nxt = cur - m;
        if (!vis[nxt]) {
          vis[nxt] = 1;
          q[tail++] = nxt;
        }
      }
      if ((mask & 4) === 0 && c + 1 < m) {
        const nxt = cur + 1;
        if (!vis[nxt]) {
          vis[nxt] = 1;
          q[tail++] = nxt;
        }
      }
      if ((mask & 2) === 0 && r + 1 < n) {
        const nxt = cur + m;
        if (!vis[nxt]) {
          vis[nxt] = 1;
          q[tail++] = nxt;
        }
      }
      if ((mask & 1) === 0 && c > 0) {
        const nxt = cur - 1;
        if (!vis[nxt]) {
          vis[nxt] = 1;
          q[tail++] = nxt;
        }
      }
    }

    rooms.push(tail);
  }

  rooms.sort((a, b) => b - a);
  console.log(rooms.join(' '));
}

solve();
