const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const parent = new Int32Array(n + 1);
    const size = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      parent[i] = i;
      size[i] = 1;
    }

    function find(x) {
      while (x !== parent[x]) {
        parent[x] = parent[parent[x]];
        x = parent[x];
      }
      return x;
    }

    function union(x, y) {
      const rx = find(x);
      const ry = find(y);
      if (rx !== ry) {
        parent[rx] = ry;
        size[ry] += size[rx];
      }
    }

    for (let i = 0; i < m; i++) {
      union(parseInt(input[ptr++], 10), parseInt(input[ptr++], 10));
    }

    let components = 0;
    let ways = 1n;

    for (let i = 1; i <= n; i++) {
      if (parent[i] === i) {
        components++;
        ways = (ways * BigInt(size[i])) % MOD;
      }
    }

    out.push(components + ' ' + ways.toString());
  }
  console.log(out.join('\n'));
}

solve();
