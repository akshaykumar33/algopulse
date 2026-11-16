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
  const m = nextInt();
  if (n === null || m === null) return;

  const parent = new Int32Array(n + 2);
  for (let i = 1; i <= n + 1; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  const ans = new Int32Array(n + 1);

  for (let i = 0; i < m; i++) {
    const l = nextInt();
    const r = nextInt();
    const x = nextInt();

    let v = find(l);
    while (v <= r) {
      if (v === x) {
        v = find(v + 1);
      } else {
        ans[v] = x;
        parent[v] = find(v + 1);
        v = parent[v];
      }
    }
  }

  const out = [];
  for (let i = 1; i <= n; i++) out.push(ans[i]);
  console.log(out.join(' '));
}

solve();
