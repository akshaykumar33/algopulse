const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const pos = [];
    const neg = [];
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v > 0) pos.push(BigInt(v));
      else if (v < 0) neg.push(BigInt(-v));
    }

    pos.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    neg.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

    let maxDist = 0n;
    if (pos.length > 0 && pos[0] > maxDist) maxDist = pos[0];
    if (neg.length > 0 && neg[0] > maxDist) maxDist = neg[0];

    let total = 0n;
    for (let i = 0; i < pos.length; i += k) {
      total += pos[i] * 2n;
    }
    for (let i = 0; i < neg.length; i += k) {
      total += neg[i] * 2n;
    }

    total -= maxDist;
    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
