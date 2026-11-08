const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  const b = new Array(n);
  for (let i = 0; i < n; i++) b[i] = parseInt(input[ptr++], 10);

  const mx = new Map();
  for (let i = 0; i < n; i++) {
    mx.set(a[i], b[i]);
  }

  const m = parseInt(input[ptr++], 10);
  const c = new Array(m);
  for (let i = 0; i < m; i++) c[i] = parseInt(input[ptr++], 10);
  const d = new Array(m);
  for (let i = 0; i < m; i++) d[i] = parseInt(input[ptr++], 10);

  const my = new Map();
  for (let i = 0; i < m; i++) {
    my.set(c[i], d[i]);
    if (!mx.has(c[i]) || d[i] > mx.get(c[i])) {
      console.log(0);
      return;
    }
  }

  const MOD = 998244353;
  let ans = 1;
  for (const [p, expX] of mx.entries()) {
    const expY = my.get(p) || 0;
    if (expY < expX) {
      ans = (ans * 2) % MOD;
    }
  }

  console.log(ans);
}

solve();
