const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = new Float64Array(n);
    let s = 0;
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      arr[i] = val;
      s += val;
    }

    let ans = s;
    let p = 0;
    for (let i = 0; i < n; i++) {
      p += arr[i];
      const cur = Math.max(p, s - p);
      if (cur < ans) {
        ans = cur;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
