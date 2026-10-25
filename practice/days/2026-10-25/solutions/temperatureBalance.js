const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    let pref = 0n;
    let total = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(input[idx++]);
      pref += v;
      if (i < n - 1) {
        total += (pref < 0n ? -pref : pref);
      }
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}

solve();
