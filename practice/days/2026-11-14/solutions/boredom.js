const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;

  const MAX = 100001;
  const cnt = new Int32Array(MAX);
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    const v = nextInt();
    cnt[v]++;
    if (v > maxVal) maxVal = v;
  }

  let prev2 = 0n;
  let prev1 = BigInt(cnt[1]);

  for (let i = 2; i <= maxVal; i++) {
    const cur = prev2 + BigInt(i) * BigInt(cnt[i]);
    const best = cur > prev1 ? cur : prev1;
    prev2 = prev1;
    prev1 = best;
  }

  console.log(prev1.toString());
}

solve();
