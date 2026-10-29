const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = new Int32Array(n + 1);
    const hasChild = new Uint8Array(n + 1);
    let root = 1;

    for (let i = 1; i <= n; i++) {
      const parent = parseInt(input[ptr++], 10);
      p[i] = parent;
      if (parent === i) {
        root = i;
      } else {
        hasChild[parent] = 1;
      }
    }

    if (n === 1) {
      out.push('1');
      out.push('1');
      out.push('1');
      out.push('');
      continue;
    }

    const leaves = [];
    for (let i = 1; i <= n; i++) {
      if (!hasChild[i]) leaves.push(i);
    }

    const vis = new Uint8Array(n + 1);
    const paths = [];

    for (const leaf of leaves) {
      const path = [];
      let curr = leaf;
      while (curr !== 0 && !vis[curr]) {
        vis[curr] = 1;
        path.push(curr);
        if (p[curr] === curr) break;
        curr = p[curr];
      }
      path.reverse();
      paths.push(path);
    }

    out.push(paths.length.toString());
    for (const path of paths) {
      out.push(path.length.toString());
      out.push(path.join(' '));
    }
    out.push('');
  }
  console.log(out.join('\n').trim());
}

solve();
