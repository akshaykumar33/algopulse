const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n - 1; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    const totalSum = (BigInt(n) * BigInt(n + 1)) / 2n;
    const diffs = [];

    if (a[a.length - 1] !== totalSum) {
      diffs.push(totalSum - a[a.length - 1]);
    }

    let prev = 0n;
    for (let i = 0; i < n - 1; i++) {
      diffs.push(a[i] - prev);
      prev = a[i];
    }

    const count = new Int32Array(n + 1);
    let extraSum = 0n;
    let largeCount = 0;

    for (const d of diffs) {
      if (d <= BigInt(n) && d >= 1n) {
        count[Number(d)]++;
      } else {
        largeCount++;
        extraSum += d;
      }
    }

    const missing = [];
    for (let i = 1; i <= n; i++) {
      if (count[i] === 0) {
        missing.push(BigInt(i));
      } else if (count[i] > 1) {
        for (let k = 0; k < count[i] - 1; k++) {
          largeCount++;
          extraSum += BigInt(i);
        }
      }
    }

    if (largeCount > 1) {
      out.push('NO');
    } else if (largeCount === 0) {
      out.push('YES');
    } else {
      let missingSum = 0n;
      for (const m of missing) missingSum += m;
      if (extraSum === missingSum) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
