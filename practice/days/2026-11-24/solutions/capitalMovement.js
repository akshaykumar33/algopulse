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
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = nextInt();
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(2 * n);
    const nextEdge = new Int32Array(2 * n);
    let edgeCnt = 0;
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt();
      const v = nextInt();
      to[edgeCnt] = v;
      nextEdge[edgeCnt] = head[u];
      head[u] = edgeCnt++;
      to[edgeCnt] = u;
      nextEdge[edgeCnt] = head[v];
      head[v] = edgeCnt++;
    }
    const order = new Int32Array(n);
    for (let i = 0; i < n; i++) order[i] = i + 1;
    order.sort((a, b) => p[b] - p[a]);
    const blocked = new Uint8Array(n + 1);
    const ans = new Int32Array(n);
    for (let v = 1; v <= n; v++) {
      blocked[v] = 1;
      let e = head[v];
      while (e !== -1) {
        blocked[to[e]] = 1;
        e = nextEdge[e];
      }
      let capital = 0;
      for (let k = 0; k < n; k++) {
        const candidate = order[k];
        if (blocked[candidate] === 0) {
          capital = candidate;
          break;
        }
      }
      ans[v - 1] = capital;
      blocked[v] = 0;
      e = head[v];
      while (e !== -1) {
        blocked[to[e]] = 0;
        e = nextEdge[e];
      }
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
