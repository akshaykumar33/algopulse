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
  const m = nextInt();
  const parent = new Int32Array(n + 1);
  const vCount = new Int32Array(n + 1);
  const eCount = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
    vCount[i] = 1;
  }
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
  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      vCount[rv] += vCount[ru];
      eCount[rv] += eCount[ru] + 1;
    } else {
      eCount[ru]++;
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (parent[i] === i) {
      if (eCount[i] === vCount[i] - 1) {
        ans++;
      }
    }
  }
  console.log(ans);
}

solve();
