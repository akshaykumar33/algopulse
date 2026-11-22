const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt(), m = nextInt(), k = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt() - 1;
    const b = Array.from({ length: n }, () => new Int32Array(m));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) b[i][j] = nextInt();
    }
    const c = Array.from({ length: n }, () => new Int32Array(m));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) c[i][j] = nextInt();
    }
    let baseScore = 0;
    const gains = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const initColor = a[i];
      const curScore = b[i][initColor];
      baseScore += curScore;
      let maxGain = 0;
      for (let col = 0; col < m; col++) {
        const gain = b[i][col] - c[i][col] - curScore;
        if (gain > maxGain) maxGain = gain;
      }
      gains[i] = maxGain;
    }
    gains.sort();
    let addScore = 0;
    for (let i = 0; i < k && i < n; i++) {
      const g = gains[n - 1 - i];
      if (g > 0) addScore += g;
      else break;
    }
    out.push(baseScore + addScore);
  }
  console.log(out.join('\n'));
}
solve();