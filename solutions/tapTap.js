const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 998244353n;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const g = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    let possible = true;
    for (let i = 0; i < n - 2; i++) {
      if (a[i + 2] - a[i] < g) {
        possible = false;
        break;
      }
    }
    if (!possible) {
      out.push(0);
      continue;
    }

    let comps = 1;
    for (let i = 0; i < n - 1; i++) {
      if (a[i + 1] - a[i] >= g) comps++;
    }
    let ans = 1n;
    for (let i = 0; i < comps; i++) ans = (ans * 2n) % MOD;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();