const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const pos = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      pos[parseInt(input[ptr++], 10)] = i;
    }
    const prev = new Int32Array(n);
    const next = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      prev[i] = i - 1;
      next[i] = i + 1;
    }
    let ans = 0n;
    for (let x = 1; x <= n; x++) {
      const p = pos[x];
      const l1 = prev[p];
      const l2 = l1 >= 0 ? prev[l1] : -1;
      const r1 = next[p];
      const r2 = r1 < n ? next[r1] : n;
      let cnt1 = 0n;
      if (l1 >= 0) {
        cnt1 = BigInt(l1 - l2) * BigInt(r1 - p);
      }
      let cnt2 = 0n;
      if (r1 < n) {
        cnt2 = BigInt(p - l1) * BigInt(r2 - r1);
      }
      ans += BigInt(x) * (cnt1 + cnt2);
      if (l1 >= 0) next[l1] = r1;
      if (r1 < n) prev[r1] = l1;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
