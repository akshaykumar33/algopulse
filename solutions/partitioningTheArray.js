const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  function gcd(a, b) {
    while (b) {
      const tmp = b;
      b = a % b;
      a = tmp;
    }
    return a;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    let ans = 0;
    for (let k = 1; k <= n; k++) {
      if (n % k !== 0) continue;
      let g = 0;
      for (let i = 0; i < n - k; i++) {
        const diff = Math.abs(a[i] - a[i + k]);
        g = gcd(g, diff);
        if (g === 1) break;
      }
      if (g !== 1) ans++;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
