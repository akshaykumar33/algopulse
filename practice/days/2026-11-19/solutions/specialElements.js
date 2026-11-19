const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = new Int32Array(n);
    const count = new Int32Array(n + 1);

    for (let i = 0; i < n; i++) {
      const v = Number(input[ptr++]);
      a[i] = v;
      count[v]++;
    }

    const can = new Uint8Array(n + 1);

    for (let l = 0; l < n; l++) {
      let sum = a[l];
      for (let r = l + 1; r < n; r++) {
        sum += a[r];
        if (sum > n) break;
        can[sum] = 1;
      }
    }

    let ans = 0;
    for (let v = 1; v <= n; v++) {
      if (can[v]) {
        ans += count[v];
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
