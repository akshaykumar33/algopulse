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
    const nodes = [];
    for (let i = 1; i <= n; i++) {
      p[i] = nextInt();
      nodes.push(i);
    }
    nodes.sort((a, b) => p[b] - p[a]);
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n - 1; i++) {
      const u = nextInt(), v = nextInt();
      adj[u].push(v);
      adj[v].push(u);
    }
    for (let i = 1; i <= n; i++) {
      adj[i].sort((a, b) => a - b);
    }
    function isNeighbor(u, target) {
      let l = 0, r = adj[u].length - 1;
      while (l <= r) {
        const mid = (l + r) >> 1;
        if (adj[u][mid] === target) return true;
        if (adj[u][mid] < target) l = mid + 1;
        else r = mid - 1;
      }
      return false;
    }
    const ans = new Int32Array(n + 1);
    for (let v = 1; v <= n; v++) {
      if (1 + adj[v].length === n) {
        ans[v] = 0;
        continue;
      }
      for (let k = 0; k < n; k++) {
        const cand = nodes[k];
        if (cand !== v && !isNeighbor(v, cand)) {
          ans[v] = cand;
          break;
        }
      }
    }
    out.push(Array.from(ans.subarray(1)).join(' '));
  }
  console.log(out.join('\n'));
}
solve();