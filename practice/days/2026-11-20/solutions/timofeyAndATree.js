const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);

  const edges = [];
  for (let i = 0; i < n - 1; i++) {
    edges.push([parseInt(input[ptr++], 10), parseInt(input[ptr++], 10)]);
  }

  const c = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    c[i] = parseInt(input[ptr++], 10);
  }

  let u0 = -1;
  let v0 = -1;
  for (let i = 0; i < n - 1; i++) {
    const [u, v] = edges[i];
    if (c[u] !== c[v]) {
      u0 = u;
      v0 = v;
      break;
    }
  }

  if (u0 === -1) {
    console.log('YES');
    console.log(1);
    return;
  }

  function check(root) {
    for (let i = 0; i < n - 1; i++) {
      const [u, v] = edges[i];
      if (c[u] !== c[v] && u !== root && v !== root) {
        return false;
      }
    }
    return true;
  }

  if (check(u0)) {
    console.log('YES');
    console.log(u0);
  } else if (check(v0)) {
    console.log('YES');
    console.log(v0);
  } else {
    console.log('NO');
  }
}

solve();
