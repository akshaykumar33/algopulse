const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const cnt = new Array(n + 1).fill(0);
  for (let i = 0; i < m; i++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    for (let j = a; j <= b; j++) {
      cnt[j]++;
    }
  }

  for (let i = 1; i <= n; i++) {
    if (cnt[i] !== 1) {
      console.log(i + ' ' + cnt[i]);
      return;
    }
  }
  console.log('OK');
}

solve();
