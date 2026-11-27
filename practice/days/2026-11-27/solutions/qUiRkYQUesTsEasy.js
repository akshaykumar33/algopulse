const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    a.sort((x, y) => x - y);
    const pref = new Array(n + 1);
    pref[0] = 0n;
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + BigInt(a[i]);
    let maxScore = pref[n];
    for (let k = 1; k <= n; k++) {
      const remainingSum = pref[n] - pref[k];
      const score = remainingSum + BigInt(k) * BigInt(k);
      if (score > maxScore) maxScore = score;
    }
    out.push(maxScore.toString());
  }
  console.log(out.join('\n'));
}
