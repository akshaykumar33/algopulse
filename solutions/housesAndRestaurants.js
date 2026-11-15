const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const s = input[ptr++];

  const parent = new Int32Array(n + 1);
  const hasRest = new Uint8Array(n + 1);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
    if (s[i - 1] === 'R') hasRest[i] = 1;
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
      parent[rootI] = rootJ;
      hasRest[rootJ] = (hasRest[rootJ] | hasRest[rootI]);
    }
  }

  let totalCost = 0n;
  const nonNegEdges = [];

  for (let i = 0; i < m; i++) {
    const u = parseInt(input[ptr++], 10);
    const v = parseInt(input[ptr++], 10);
    const w = parseInt(input[ptr++], 10);
    if (w < 0) {
      totalCost += BigInt(w);
      union(u, v);
    } else {
      nonNegEdges.push([w, u, v]);
    }
  }

  nonNegEdges.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < nonNegEdges.length; i++) {
    const [w, u, v] = nonNegEdges[i];
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      if (!hasRest[ru] || !hasRest[rv]) {
        totalCost += BigInt(w);
        union(ru, rv);
      }
    }
  }

  out.push(totalCost.toString());
}
console.log(out.join('\n'));
