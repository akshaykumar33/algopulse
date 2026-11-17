const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const b = [];
  for (let i = 0; i < n; i++) b.push(BigInt(tokens[ptr++]));
  const g = [];
  for (let i = 0; i < m; i++) g.push(BigInt(tokens[ptr++]));

  b.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
  g.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

  if (b[n - 1] > g[0]) {
    console.log(-1);
    return;
  }

  let sumB = 0n;
  for (let i = 0; i < n; i++) sumB += b[i];
  let ans = sumB * BigInt(m);

  if (b[n - 1] === g[0]) {
    for (let j = 0; j < m; j++) {
      ans += g[j] - b[n - 1];
    }
  } else {
    if (n < 2) {
      console.log(-1);
      return;
    }
    for (let j = 1; j < m; j++) {
      ans += g[j] - b[n - 1];
    }
    ans += g[0] - b[n - 2];
  }

  console.log(ans.toString());
}

solve();
