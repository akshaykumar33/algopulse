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

    const bits = new Int32Array(31);
    for (let i = 0; i < n; i++) {
      let v = parseInt(tokens[pos++], 10);
      for (let p = 0; p <= 30 && v > 0; p++) {
        if (v & 1) bits[p]++;
        v >>= 1;
      }
    }

    let ans = 0;
    for (let p = 0; p <= 30; p++) {
      if (bits[p] > 0) {
        ans += Math.floor((bits[p] + k - 1) / k);
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
