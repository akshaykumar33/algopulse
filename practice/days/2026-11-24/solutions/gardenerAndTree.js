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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    if (n === 1) {
      out.push(k >= 1 ? 0 : 1);
      continue;
    }
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgePtr = 0;
    const deg = new Int32Array(n + 1);
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgePtr] = v; nxt[edgePtr] = head[u]; head[u] = edgePtr++;
      to[edgePtr] = u; nxt[edgePtr] = head[v]; head[v] = edgePtr++;
      deg[u]++; deg[v]++;
    }
    const q = new Int32Array(n + 1);
    const level = new Int32Array(n + 1);
    let qh = 0, qt = 0;
    for (let i = 1; i <= n; i++) {
      if (deg[i] <= 1) {
        q[qt++] = i;
        level[i] = 1;
      }
    }
    let removed = 0;
    while (qh < qt) {
      const u = q[qh++];
      if (level[u] > k) break;
      removed++;
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        deg[v]--;
        if (deg[v] === 1) {
          level[v] = level[u] + 1;
          q[qt++] = v;
        }
      }
    }
    out.push(n - removed);
  }
  console.log(out.join('\n'));
}

solve();
