const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const a = new Array(n);
  const b = new Array(m);

  for (let i = 0; i < n; i++) {
    a[i] = BigInt(tokens[ptr++]);
  }
  for (let j = 0; j < m; j++) {
    b[j] = BigInt(tokens[ptr++]);
  }

  let ans = null;
  for (let h = 0; h < n; h++) {
    let best = null;
    for (let i = 0; i < n; i++) {
      if (i === h) continue;
      for (let j = 0; j < m; j++) {
        const prod = a[i] * b[j];
        if (best === null || prod > best) {
          best = prod;
        }
      }
    }
    if (ans === null || best < ans) {
      ans = best;
    }
  }

  console.log(ans.toString());
}

solve();
