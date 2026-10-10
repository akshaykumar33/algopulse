const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    const [nStr, xStr, yStr] = input[idx++].trim().split(/\s+/);
    const n = parseInt(nStr, 10);
    const x = BigInt(xStr);
    const y = BigInt(yStr);
    const a = input[idx++].trim().split(/\s+/).map(BigInt);
    let totTransfers = 0n;
    for (let i = 0; i < n; i++) {
      totTransfers += a[i] / x;
    }
    const baseGain = totTransfers * y;
    let maxRubles = 0n;
    for (let i = 0; i < n; i++) {
      const cur = baseGain + a[i] - (a[i] / x) * y;
      if (cur > maxRubles) {
        maxRubles = cur;
      }
    }
    out.push(maxRubles.toString());
  }
  console.log(out.join('\n'));
}

solve();
