const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const [n, k] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);

    if (k === 1) {
      let ans = BigInt(a[0]) + BigInt(a[n - 1]);
      const m = Math.max(a[0], a[n - 1]);
      let mid = -Infinity;
      for (let i = 1; i < n - 1; i++) {
        if (a[i] > mid) mid = a[i];
      }
      if (mid !== -Infinity) {
        const cand = BigInt(m) + BigInt(mid);
        if (cand > ans) ans = cand;
      }
      out.push(ans.toString());
    } else {
      a.sort((x, y) => y - x);
      let sum = 0n;
      for (let i = 0; i <= k && i < n; i++) {
        sum += BigInt(a[i]);
      }
      out.push(sum.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
