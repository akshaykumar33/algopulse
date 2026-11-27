const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      if (a[i] > maxA) maxA = a[i];
    }
    const freq = new Int32Array(maxA + 1);
    let maxStar = 0;
    for (let i = 0; i < n; i++) {
      const v = a[i];
      if (freq[v] > maxStar) maxStar = freq[v];
      for (let d = 1; d * d <= v; d++) {
        if (v % d === 0) {
          freq[d]++;
          if (d * d !== v) freq[v / d]++;
        }
      }
    }
    out.push(maxStar);
  }
  console.log(out.join('\n'));
}
