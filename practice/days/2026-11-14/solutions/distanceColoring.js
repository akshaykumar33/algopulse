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
  const MOD = 1000000007n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const limit = Math.min(n, k);
    let ans = 1n;
    for (let i = 0; i < limit; i++) {
      ans = (ans * BigInt(k - i)) % MOD;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
