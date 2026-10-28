const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const bestT = new Array(n + 1).fill(Infinity);
  const bestC = new Int32Array(n + 1);

  for (let i = 0; i < m; i++) {
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    const t = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);

    for (let j = l; j <= r; j++) {
      if (t < bestT[j]) {
        bestT[j] = t;
        bestC[j] = c;
      }
    }
  }

  let ans = 0;
  for (let j = 1; j <= n; j++) {
    ans += bestC[j];
  }

  console.log(ans);
}

solve();

