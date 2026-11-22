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
  const n = nextInt();
  if (n === null) return;
  const q = nextInt();
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 2; i <= n; i++) {
    const p = nextInt();
    adj[p].push(i);
  }
  for (let i = 1; i <= n; i++) {
    adj[i].sort((a, b) => a - b);
  }
  const tin = new Int32Array(n + 1);
  const sz = new Int32Array(n + 1);
  const order = new Int32Array(n + 1);
  let timer = 0;
  const dfsStack = [1];
  const idxStack = [0];
  tin[1] = ++timer;
  order[timer] = 1;
  while (dfsStack.length > 0) {
    const u = dfsStack[dfsStack.length - 1];
    const idx = idxStack[idxStack.length - 1];
    if (idx < adj[u].length) {
      const v = adj[u][idx];
      idxStack[idxStack.length - 1]++;
      dfsStack.push(v);
      idxStack.push(0);
      tin[v] = ++timer;
      order[timer] = v;
    } else {
      let totalSz = 1;
      for (let i = 0; i < adj[u].length; i++) {
        totalSz += sz[adj[u][i]];
      }
      sz[u] = totalSz;
      dfsStack.pop();
      idxStack.pop();
    }
  }
  const out = [];
  for (let i = 0; i < q; i++) {
    const u = nextInt(), k = nextInt();
    if (k > sz[u]) out.push(-1);
    else out.push(order[tin[u] + k - 1]);
  }
  console.log(out.join('\n'));
}
solve();