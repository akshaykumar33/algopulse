const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    let sum = 0;
    let firstOdd = -1;
    let lastOdd = -1;

    for (let j = 0; j < n; j++) {
      const val = parseInt(tokens[ptr++], 10);
      arr.push(val);
      sum += val;
      if (val % 2 !== 0) {
        if (firstOdd === -1) firstOdd = j;
        lastOdd = j;
      }
    }

    if (sum % 2 === 0) {
      out.push(n);
    } else {
      const ans = Math.max(n - 1 - firstOdd, lastOdd);
      out.push(ans);
    }
  }

  console.log(out.join('\n'));
}

solve();
