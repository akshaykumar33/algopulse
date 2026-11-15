const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    const s = [];
    for (let i = 0; i < m; i++) s.push(parseInt(input[ptr++], 10));

    const bench = [1];
    let hasOne = false;
    for (let i = 0; i < m; i++) {
      if (s[i] === 1) hasOne = true;
      else bench.push(s[i]);
    }
    bench.push(n + 1);

    const k = bench.length;
    let base = hasOne ? 1 : 1;
    for (let i = 1; i < k; i++) {
      const diff = bench[i] - bench[i - 1];
      base += Math.floor((diff - 1) / d);
      if (i < k - 1) base += 1;
    }

    let minCookies = Infinity;
    let count = 0;

    if (hasOne) {
      let cur = base;
      if (cur < minCookies) {
        minCookies = cur;
        count = 1;
      } else if (cur === minCookies) {
        count++;
      }
    }

    for (let i = 1; i < k - 1; i++) {
      const oldVal = 1 + Math.floor((bench[i] - bench[i - 1] - 1) / d) + Math.floor((bench[i + 1] - bench[i] - 1) / d);
      const newVal = Math.floor((bench[i + 1] - bench[i - 1] - 1) / d);
      const cur = base - oldVal + newVal;
      if (cur < minCookies) {
        minCookies = cur;
        count = 1;
      } else if (cur === minCookies) {
        count++;
      }
    }

    out.push(minCookies + ' ' + count);
  }
  console.log(out.join('\n'));
}

solve();
