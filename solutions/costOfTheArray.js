const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    if (n === k) {
      let ans = Math.floor(k / 2) + 1;
      let j = 1;
      for (let i = 1; i < n; i += 2) {
        if (a[i] !== j) {
          ans = j;
          break;
        }
        j++;
      }
      out.push(ans);
    } else {
      let foundNonOne = false;
      const limit = n - k + 1;
      for (let i = 1; i <= limit; i++) {
        if (a[i] !== 1) {
          foundNonOne = true;
          break;
        }
      }
      out.push(foundNonOne ? 1 : 2);
    }
  }

  console.log(out.join('\n'));
}

solve();

