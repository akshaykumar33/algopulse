const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const MOD = 1000000007n;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    const m = readInt();
    if (n === null) break;

    const parent = new Int32Array(n + 1);
    const size = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      parent[i] = i;
      size[i] = 1;
    }

    function find(i) {
      let root = i;
      while (root !== parent[root]) {
        root = parent[root];
      }
      let curr = i;
      while (curr !== root) {
        const next = parent[curr];
        parent[curr] = root;
        curr = next;
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

    for (let i = 0; i < m; i++) {
      const u = readInt();
      const v = readInt();
      union(u, v);
    }

    let groups = 0;
    let ways = 1n;

    for (let i = 1; i <= n; i++) {
      if (parent[i] === i) {
        groups++;
        ways = (ways * BigInt(size[i])) % MOD;
      }
    }

    out.push(`${groups} ${ways.toString()}`);
  }

  console.log(out.join('\n'));
}

solve();
