const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let cnt1 = 0;
    let first = -1;
    let last = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        cnt1++;
        if (first === -1) first = i;
        last = i;
      }
    }
    if (cnt1 === 0) {
      out.push(0);
      continue;
    }
    let ans = cnt1 * 11;
    if (cnt1 === 1) {
      if (n - 1 - last <= k) ans -= 10;
      else if (first <= k) ans -= 1;
    } else {
      if (n - 1 - last <= k) {
        k -= n - 1 - last;
        ans -= 10;
      }
      if (first <= k) {
        ans -= 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
