const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let idx = 0;
  const n = parseInt(tokens[idx++], 10);
  const m = parseInt(tokens[idx++], 10);

  const w = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    w[i] = parseInt(tokens[idx++], 10);
  }

  const b = new Int32Array(m);
  const seen = new Uint8Array(n + 1);
  const stack = [];

  for (let i = 0; i < m; i++) {
    b[i] = parseInt(tokens[idx++], 10);
    if (!seen[b[i]]) {
      seen[b[i]] = 1;
      stack.push(b[i]);
    }
  }

  for (let i = 1; i <= n; i++) {
    if (!seen[i]) {
      stack.push(i);
    }
  }

  let totalWeight = 0;
  for (let i = 0; i < m; i++) {
    const book = b[i];
    let pos = 0;
    while (stack[pos] !== book) {
      totalWeight += w[stack[pos]];
      pos++;
    }
    for (let j = pos; j > 0; j--) {
      stack[j] = stack[j - 1];
    }
    stack[0] = book;
  }

  console.log(totalWeight);
}

solve();
