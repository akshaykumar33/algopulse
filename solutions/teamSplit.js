const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 1000000;
  const freq = new Int32Array(MOD);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const c = BigInt(input[ptr++]);
    const d = BigInt(input[ptr++]);

    let s = d;
    freq[Number(s)]++;
    for (let i = 1; i < n; i++) {
      s = (a * s * s + b * s + c) % 1000000n;
      freq[Number(s)]++;
    }

    let turn = 0;
    let diff = 0n;

    for (let v = 999999; v >= 0; v--) {
      const cnt = freq[v];
      if (cnt > 0) {
        freq[v] = 0;
        if (cnt % 2 === 0) {
          continue;
        } else {
          if (turn === 0) {
            diff += BigInt(v);
          } else {
            diff -= BigInt(v);
          }
          turn ^= 1;
        }
      }
    }
    out.push(diff < 0n ? (-diff).toString() : diff.toString());
  }
  console.log(out.join('\n'));
}
solve();