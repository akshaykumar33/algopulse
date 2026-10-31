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
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    const sufNeg = new Array(n + 1).fill(0n);
    for (let i = n - 1; i >= 0; i--) {
      sufNeg[i] = sufNeg[i + 1] + (a[i] < 0n ? -a[i] : 0n);
    }

    let maxScore = sufNeg[0];
    let prefPos = 0n;

    for (let i = 0; i < n; i++) {
      if (a[i] > 0n) prefPos += a[i];
      const cur = prefPos + sufNeg[i + 1];
      if (cur > maxScore) maxScore = cur;
    }

    out.push(maxScore.toString());
  }

  console.log(out.join('\n'));
}

solve();

