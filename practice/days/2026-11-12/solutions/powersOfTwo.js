const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const pow2 = [];
  for (let p = 2; p <= 2000000000; p *= 2) pow2.push(p);
  const M = 262144;
  const MASK = M - 1;
  const keys = new Int32Array(M);
  const cnts = new Int32Array(M);
  let ans = 0;
  let maxA = 0;
  for (let i = 0; i < n; i++) {
    const v = parseInt(tokens[ptr++], 10);
    for (let j = 0; j < pow2.length; j++) {
      const need = pow2[j] - v;
      if (need <= 0) continue;
      if (need > maxA) break;
      let h = Math.imul(need, 0x9e3779b1) & MASK;
      while (keys[h] !== 0) {
        if (keys[h] === need) {
          ans += cnts[h];
          break;
        }
        h = (h + 1) & MASK;
      }
    }
    if (v > maxA) maxA = v;
    let h = Math.imul(v, 0x9e3779b1) & MASK;
    while (keys[h] !== 0 && keys[h] !== v) {
      h = (h + 1) & MASK;
    }
    keys[h] = v;
    cnts[h]++;
  }
  console.log(ans);
}

solve();
