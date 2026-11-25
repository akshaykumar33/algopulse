const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

const out = [];

function solve() {
  const t = parseInt(tokens[ptr++], 10);
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = BigInt(tokens[ptr++]);
    const s = tokens[ptr++];
    let cntA = 0n;
    let cntB = 0n;
    let inSingle = 0n;
    for (let i = 0; i < n; i++) {
      const ch = s.charCodeAt(i);
      if (ch === 97) {
        cntA++;
      } else if (ch === 98) {
        cntB++;
        inSingle += cntA;
      }
    }
    const ans = k * inSingle + ((k * (k - 1n)) / 2n) * cntA * cntB;
    out.push(ans.toString());
  }
}

solve();
console.log(out.join('\n'));
