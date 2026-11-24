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
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nxt = new Int32Array(2 * n);
    let edgePtr = 0;
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgePtr] = v; nxt[edgePtr] = head[u]; head[u] = edgePtr++;
      to[edgePtr] = u; nxt[edgePtr] = head[v]; head[v] = edgePtr++;
    }
    const order = new Int32Array(n);
    const parent = new Int32Array(n + 1);
    let qh = 0, qt = 0;
    order[qt++] = 1;
    parent[1] = 0;
    while (qh < qt) {
      const u = order[qh++];
      for (let e = head[u]; e !== -1; e = nxt[e]) {
        const v = to[e];
        if (v !== parent[u]) {
          parent[v] = u;
          order[qt++] = v;
        }
      }
    }
    const sz = new Int32Array(n + 1);
    let low = 1, high = Math.floor(n / (k + 1)), ans = 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      let cuts = 0;
      for (let i = 1; i <= n; i++) sz[i] = 1;
      for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        if (u !== 1 && sz[u] >= mid) {
          cuts++;
        } else if (u !== 1) {
          sz[parent[u]] += sz[u];
        }
      }
      if (cuts > k || (cuts === k && sz[1] >= mid)) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
