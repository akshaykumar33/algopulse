const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const seen = new Uint8Array(256);
  const vals = new Int32Array(256);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    seen.fill(0);
    seen[0] = 1;
    vals[0] = 0;
    let len = 1;
    let pref = 0;
    let ans = 0;
    for (let i = 0; i < n; i++) {
      pref ^= parseInt(tokens[ptr++], 10);
      for (let j = 0; j < len; j++) {
        const v = pref ^ vals[j];
        if (v > ans) ans = v;
      }
      if (!seen[pref]) {
        seen[pref] = 1;
        vals[len++] = pref;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
