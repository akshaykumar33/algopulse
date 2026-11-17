const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let idx = 0;
  const T = parseInt(input[idx++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    if (idx >= input.length) break;
    const parts = input[idx++].trim().split(/\s+/);
    if (parts.length < 2) continue;
    const n = parseInt(parts[0], 10);
    const k = parseInt(parts[1], 10);
    const sPrime = input[idx++].trim();

    const ans = new Array(n);
    let l = 0;
    let r = k - 1;
    for (let i = k - 1; i >= 0; i--) {
      if ((k - 1 - i) % 2 === 0) {
        ans[i] = sPrime[l++];
      } else {
        ans[i] = sPrime[r--];
      }
    }

    for (let i = k; i < n; i++) {
      ans[i] = sPrime[i];
    }

    out.push(ans.join(''));
  }

  console.log(out.join('\n'));
}

solve();
