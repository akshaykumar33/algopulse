const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const k = parseInt(tokens[pos++], 10);

    const arr = new Int32Array(n);
    let maxVal = -2000000000;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[pos++], 10);
      arr[i] = v;
      if (v > maxVal) maxVal = v;
    }

    let ans = 0n;
    for (let i = k - 1; i < n; i++) {
      if (arr[i] === maxVal) {
        ans += BigInt(n - i);
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
