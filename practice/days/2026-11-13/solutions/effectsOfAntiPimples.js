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

  const a = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = nextInt();
  }

  const v = new Int32Array(n);
  for (let i = 1; i <= n; i++) {
    let maxVal = a[i];
    for (let j = i; j <= n; j += i) {
      if (a[j] > maxVal) maxVal = a[j];
    }
    v[i - 1] = maxVal;
  }

  v.sort();

  const MOD = 998244353n;
  const pow2 = new Int32Array(n + 1);
  pow2[0] = 1;
  for (let i = 1; i <= n; i++) {
    pow2[i] = (pow2[i - 1] * 2) % 998244353;
  }

  let ans = 0n;
  for (let i = 0; i < n; i++) {
    ans = (ans + BigInt(v[i]) * BigInt(pow2[i])) % MOD;
  }

  console.log(ans.toString());
}

solve();
