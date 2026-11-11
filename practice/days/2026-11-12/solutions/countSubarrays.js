const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf[ptr] <= 32) ptr++;
    if (ptr >= len) return null;
    let val = 0;
    while (ptr < len && buf[ptr] > 32) {
      val = val * 10 + (buf[ptr] - 48);
      ptr++;
    }
    return val;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];
  const p = new Int32Array(100005);
  const ans = new Int32Array(100005);

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    for (let i = 0; i < n; i++) {
      p[i] = nextInt();
    }
    ans.fill(0, 1, n + 1);
    for (let l = 0; l < n; l++) {
      let sum = 0;
      for (let r = l; r < n; r++) {
        sum += p[r];
        if (sum > n) break;
        ans[sum]++;
      }
    }
    const row = new Array(n);
    for (let i = 1; i <= n; i++) {
      row[i - 1] = ans[i];
    }
    out.push(row.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
