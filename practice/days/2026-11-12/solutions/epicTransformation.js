const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }
    arr.sort();

    let maxFreq = 1;
    let cur = 1;
    for (let i = 1; i < n; i++) {
      if (arr[i] === arr[i - 1]) {
        cur++;
        if (cur > maxFreq) maxFreq = cur;
      } else {
        cur = 1;
      }
    }

    if (maxFreq > n - maxFreq) {
      out.push(2 * maxFreq - n);
    } else {
      out.push(n & 1);
    }
  }

  console.log(out.join('\n'));
}

solve();
