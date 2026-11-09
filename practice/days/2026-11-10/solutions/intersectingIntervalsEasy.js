const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = BigInt(tokens[pos++]);
    const b = new Array(n);
    for (let i = 0; i < n; i++) b[i] = BigInt(tokens[pos++]);

    const prefA = new Array(n);
    prefA[0] = a[0];
    for (let i = 1; i < n; i++) {
      prefA[i] = a[i] + (prefA[i - 1] > 0n ? prefA[i - 1] : 0n);
    }

    const suffA = new Array(n);
    suffA[n - 1] = a[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      suffA[i] = a[i] + (suffA[i + 1] > 0n ? suffA[i + 1] : 0n);
    }

    const prefB = new Array(n);
    prefB[0] = b[0];
    for (let i = 1; i < n; i++) {
      prefB[i] = b[i] + (prefB[i - 1] > 0n ? prefB[i - 1] : 0n);
    }

    const suffB = new Array(n);
    suffB[n - 1] = b[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      suffB[i] = b[i] + (suffB[i + 1] > 0n ? suffB[i + 1] : 0n);
    }

    let ans = null;
    for (let i = 0; i < n; i++) {
      const bestA = prefA[i] + suffA[i] - a[i];
      const bestB = prefB[i] + suffB[i] - b[i];
      const cur = bestA + bestB;
      if (ans === null || cur > ans) ans = cur;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
