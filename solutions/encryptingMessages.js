const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const c = parseInt(tokens[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }

  const prefB = new Int32Array(m + 1);
  for (let i = 1; i <= m; i++) {
    prefB[i] = (prefB[i - 1] + parseInt(tokens[ptr++], 10)) % c;
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    const right = Math.min(i + 1, m);
    const left = Math.max(i - (n - m), 0);
    const sumB = (prefB[right] - prefB[left] + c) % c;
    out.push((a[i] + sumB) % c);
  }

  console.log(out.join(' '));
}

solve();

