const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const h = input[lineIdx++].trim().split(/\s+/).map(Number);
    const res = [];

    const pref = new Array(n);
    const suff = new Array(n);

    for (let l = 0; l < n; l++) {
      pref[0] = h[l];
      for (let i = 1; i < n; i++) {
        pref[i] = Math.max(pref[i - 1], h[(l + i) % n]);
      }

      suff[n - 1] = h[(l + n - 1) % n];
      for (let i = n - 2; i >= 0; i--) {
        suff[i] = Math.max(suff[i + 1], h[(l + i) % n]);
      }

      let sum = 0n;
      for (let i = 0; i < n - 1; i++) {
        const val = Math.min(pref[i], suff[i + 1]);
        sum += BigInt(val);
      }
      res.push(sum.toString());
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
