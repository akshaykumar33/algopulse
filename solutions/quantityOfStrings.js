const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = BigInt(input[1]);
  const k = parseInt(input[2], 10);
  const MOD = 1000000007n;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
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
  function union(i, j) {
    const ri = find(i), rj = find(j);
    if (ri !== rj) parent[ri] = rj;
  }
  for (let i = 0; i <= n - k; i++) {
    for (let j = 0; j < k; j++) {
      const u = i + j;
      const v = i + k - 1 - j;
      if (u < v) union(u, v);
    }
  }
  let comp = 0;
  for (let i = 0; i < n; i++) {
    if (find(i) === i) comp++;
  }
  let ans = 1n;
  for (let i = 0; i < comp; i++) {
    ans = (ans * m) % MOD;
  }
  console.log(ans.toString());
}
solve();