const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[idx++], 10);
    const a = lines[idx++].trim().split(/\s+/).map(Number);

    const prefMax = new Array(n);
    prefMax[0] = a[0];
    for (let i = 1; i < n; i++) {
      prefMax[i] = Math.max(prefMax[i - 1], a[i]);
    }

    const suffSum = new Array(n + 1);
    suffSum[n] = 0n;
    for (let i = n - 1; i >= 0; i--) {
      suffSum[i] = suffSum[i + 1] + BigInt(a[i]);
    }

    const ans = [];
    for (let k = 1; k <= n; k++) {
      const val = BigInt(prefMax[n - k]) + suffSum[n - k + 1];
      ans.push(val.toString());
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
