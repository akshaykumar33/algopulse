const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const k = nextInt();

  const parent = new Int32Array(n + 1);
  const size = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
    size[i] = 1;
  }

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      let nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      if (size[rootI] < size[rootJ]) {
        parent[rootI] = rootJ;
        size[rootJ] += size[rootI];
      } else {
        parent[rootJ] = rootI;
        size[rootI] += size[rootJ];
      }
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const u = nextInt();
    const v = nextInt();
    const x = nextInt();
    if (x === 0) {
      union(u, v);
    }
  }

  const MOD = 1000000007n;

  function power(base, exp) {
    let res = 1n;
    let b = BigInt(base) % MOD;
    let e = BigInt(exp);
    while (e > 0n) {
      if (e & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return res;
  }

  let total = power(n, k);
  for (let i = 1; i <= n; i++) {
    if (parent[i] === i) {
      total = (total - power(size[i], k) + MOD) % MOD;
    }
  }

  console.log(total.toString());
}

solve();
