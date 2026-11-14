const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const len = n + m - 1;
    const c0 = new Int32Array(len);
    const c1 = new Int32Array(len);

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        const val = nextInt();
        const dist = r + c;
        if (val === 0) c0[dist]++;
        else c1[dist]++;
      }
    }

    let ans = 0;
    for (let d = 0; d < len - 1 - d; d++) {
      const opp = len - 1 - d;
      const zeros = c0[d] + c0[opp];
      const ones = c1[d] + c1[opp];
      ans += Math.min(zeros, ones);
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
