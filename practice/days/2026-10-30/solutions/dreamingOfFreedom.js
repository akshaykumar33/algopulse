const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);

  const MAX = 1000000;
  const spf = new Int32Array(MAX + 1);
  for (let i = 2; i <= MAX; i++) {
    if (spf[i] === 0) {
      for (let j = i; j <= MAX; j += i) {
        if (spf[j] === 0) spf[j] = i;
      }
    }
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    if (n === 1) {
      out.push('YES');
    } else if (spf[n] <= m) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }
  console.log(out.join('\n'));
}

solve();
