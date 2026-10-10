const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const c = Number(input[ptr++]);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(Number(input[ptr++]));
    }
    const s = input[ptr++];
    let sum0 = 0;
    let sum1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        sum1 += a[i];
      } else {
        sum0 += a[i];
      }
    }
    if (sum0 >= c && sum1 > c) {
      out.push(sum0 - c + sum1);
    } else {
      out.push(sum0);
    }
  }
  console.log(out.join('\n'));
}

solve();
