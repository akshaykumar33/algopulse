const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m1 = parseInt(tokens[ptr++], 10);
  const m2 = parseInt(tokens[ptr++], 10);

  const parent1 = new Int32Array(n + 1);
  const parent2 = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    parent1[i] = i;
    parent2[i] = i;
  }

  function find(parent, i) {
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

  function union(parent, i, j) {
    const rootI = find(parent, i);
    const rootJ = find(parent, j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  for (let i = 0; i < m1; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    union(parent1, u, v);
  }

  for (let i = 0; i < m2; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    union(parent2, u, v);
  }

  const ans = [];
  for (let u = 1; u <= n; u++) {
    for (let v = u + 1; v <= n; v++) {
      if (find(parent1, u) !== find(parent1, v) && find(parent2, u) !== find(parent2, v)) {
        union(parent1, u, v);
        union(parent2, u, v);
        ans.push(`${u} ${v}`);
      }
    }
  }

  const out = [ans.length];
  for (let i = 0; i < ans.length; i++) {
    out.push(ans[i]);
  }
  console.log(out.join('\n'));
}

solve();

