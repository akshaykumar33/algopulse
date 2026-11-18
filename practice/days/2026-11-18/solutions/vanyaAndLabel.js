const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  function charToVal(c) {
    const code = c.charCodeAt(0);
    if (code >= 48 && code <= 57) return code - 48;
    if (code >= 65 && code <= 90) return code - 65 + 10;
    if (code >= 97 && code <= 122) return code - 97 + 36;
    if (c === '-') return 62;
    if (c === '_') return 63;
    return 0;
  }

  let zeros = 0;
  for (let i = 0; i < s.length; i++) {
    const val = charToVal(s[i]);
    for (let b = 0; b < 6; b++) {
      if (((val >> b) & 1) === 0) zeros++;
    }
  }

  const MOD = 1000000007n;
  let ans = 1n;
  let base = 3n;
  let exp = BigInt(zeros);

  while (exp > 0n) {
    if (exp & 1n) ans = (ans * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }

  console.log(ans.toString());
}

solve();
