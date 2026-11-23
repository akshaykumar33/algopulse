const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    const n = BigInt(input[ptr++]);
    const l = s.length;
    const d = new Array(l);
    let cur = 0;
    for (let i = 0; i < l; i++) {
      cur += s[i] === 'a' ? 1 : -1;
      d[i] = cur;
    }
    const diff = d[l - 1];
    let ans = 0n;
    for (let i = 0; i < l; i++) {
      const di = d[i];
      if (diff === 0) {
        if (di > 0) ans += n;
      } else if (diff > 0) {
        if (di > 0) {
          ans += n;
        } else {
          const kMin = BigInt(Math.floor(-di / diff) + 1);
          if (kMin < n) {
            ans += n - kMin;
          }
        }
      } else {
        if (di > 0) {
          const negDiff = -diff;
          const kMax = BigInt(Math.floor((di - 1) / negDiff));
          const validK = kMax < n - 1n ? kMax + 1n : n;
          ans += validK;
        }
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
