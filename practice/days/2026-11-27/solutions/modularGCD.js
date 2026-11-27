const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007n;
  function powMod(b, e, m) {
    let res = 1n;
    b %= m;
    while (e > 0n) {
      if (e & 1n) res = (res * b) % m;
      b = (b * b) % m;
      e >>= 1n;
    }
    return res;
  }
  function gcd(a, b) {
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const a = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);
    const n = BigInt(tokens[ptr++]);
    if (a === b) {
      out.push(((powMod(a, n, MOD) + powMod(b, n, MOD)) % MOD).toString());
    } else {
      const d = a > b ? a - b : b - a;
      const num = (powMod(a, n, d) + powMod(b, n, d)) % d;
      out.push((gcd(d, num) % MOD).toString());
    }
  }
  console.log(out.join('\n'));
}
