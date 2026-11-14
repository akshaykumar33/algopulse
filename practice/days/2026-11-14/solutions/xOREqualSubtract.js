const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      map.set(v, (map.get(v) || 0) + 1);
    }
    const vals = Array.from(map.keys()).sort((a, b) => a - b);
    const m = vals.length;
    const dp = new Int32Array(m);
    let ans = 0;
    for (let i = 0; i < m; i++) {
      const vi = vals[i];
      let best = 0;
      for (let j = 0; j < i; j++) {
        const vj = vals[j];
        if ((vi & vj) === vj) {
          if (dp[j] > best) best = dp[j];
        }
      }
      dp[i] = best + map.get(vi);
      if (dp[i] > ans) ans = dp[i];
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
