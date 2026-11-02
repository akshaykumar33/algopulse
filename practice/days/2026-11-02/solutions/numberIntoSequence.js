const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let n = BigInt(tokens[ptr++]);
    let orig = n;

    let bestP = n;
    let maxCount = 1;

    for (let d = 2n; d * d <= n; d++) {
      if (n % d === 0n) {
        let count = 0;
        while (n % d === 0n) {
          count++;
          n /= d;
        }
        if (count > maxCount) {
          maxCount = count;
          bestP = d;
        }
      }
    }

    const seq = [];
    for (let i = 0; i < maxCount - 1; i++) {
      seq.push(bestP.toString());
      orig /= bestP;
    }
    seq.push(orig.toString());

    out.push(maxCount);
    out.push(seq.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

