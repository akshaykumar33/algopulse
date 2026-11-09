const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const parent = [];
  for (let c = 0; c <= m; c++) {
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = i;
    parent.push(p);
  }

  function find(c, i) {
    let root = i;
    while (root !== parent[c][root]) {
      root = parent[c][root];
    }
    let curr = i;
    while (curr !== root) {
      const nxt = parent[c][curr];
      parent[c][curr] = root;
      curr = nxt;
    }
    return root;
  }

  function union(c, u, v) {
    const ru = find(c, u);
    const rv = find(c, v);
    if (ru !== rv) {
      parent[c][ru] = rv;
    }
  }

  const colors = new Set();
  for (let i = 0; i < m; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    union(c, u, v);
    colors.add(c);
  }

  const q = parseInt(tokens[ptr++], 10);
  const out = [];
  const colorList = Array.from(colors);

  for (let i = 0; i < q; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    let count = 0;
    for (let j = 0; j < colorList.length; j++) {
      const c = colorList[j];
      if (find(c, u) === find(c, v)) {
        count++;
      }
    }
    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
